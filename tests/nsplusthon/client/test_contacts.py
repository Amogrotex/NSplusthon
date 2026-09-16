import asyncio
from unittest.mock import AsyncMock, Mock

import pytest

from nsplusthon import SoroushClient, errors, functions, types
from nsplusthon.client.contacts import ContactMethods
from nsplusthon.sessions import MemorySession


def user(uid=1, **kwargs):
    return types.User(id=uid, user_type=0, access_hash=uid + 10, **kwargs)


class Client(ContactMethods):
    def __init__(self, response=None):
        self.session = MemorySession()
        self.session.save = Mock()
        self._sender = object()
        self.requests = []
        self.response = response
        self.target = types.InputPeerChannel(99, 100)
        self.outcomes = []

    async def __call__(self, request):
        self.requests.append(request)
        return self.response

    async def _call(self, sender, request, **kwargs):
        assert kwargs == {'flood_sleep_threshold': 0, 'request_retries': 0}
        self.requests.append(request)
        result = self.outcomes.pop(0) if self.outcomes else self.response
        if isinstance(result, BaseException):
            raise result
        return result

    async def get_input_entity(self, value):
        if value == 'target':
            return self.target
        if isinstance(value, int):
            return types.InputPeerUser(value, value + 10)
        raise ValueError('Unknown user')


@pytest.mark.asyncio
async def test_contacts_search_and_cache():
    client = Client(types.contacts.Contacts([], 2, [
        user(1, first_name='Ali', last_name='Test', phone='989121234567'),
        user(2, first_name='Sara', username='SaraTest')]))
    assert [u.id for u in await client.get_contacts('ALI')] == [1]
    assert [u.id for u in await client.get_contacts('@saratest')] == [2]
    assert [u.id for u in await client.get_contacts('+98 912 1234567')] == [1]
    assert len(await client.get_contacts(limit=1)) == 1
    assert client.session.get_input_entity(1).access_hash == 11
    assert all(r.hash == 0 for r in client.requests)


@pytest.mark.asyncio
async def test_contacts_validation_and_unexpected_response():
    client = Client(types.contacts.ContactsNotModified())
    with pytest.raises(ValueError):
        await client.get_contacts(limit=-1)
    with pytest.raises(TypeError):
        await client.get_contacts(query=123)
    assert await client.get_contacts(limit=0) == []
    assert client.requests == []
    with pytest.raises(RuntimeError):
        await client.get_contacts()


@pytest.mark.asyncio
@pytest.mark.parametrize('status', ['imported', 'retry_required', 'not_imported'])
async def test_add_contact_status_and_mapping(status):
    response = types.contacts.ImportedContacts(
        [types.ImportedContact(user_id=2, client_id=0)] if status == 'imported' else [],
        [], [0] if status == 'retry_required' else [], [user(1), user(2)])
    client = Client(response)
    result = await client.add_contact('+98 (912) 123-4567', ' Ali ', ' Test ')
    assert result.status == status
    assert result.response is response
    assert (result.user.id if result.user else None) == (2 if status == 'imported' else None)
    contact = client.requests[0].contacts[0]
    assert (contact.phone, contact.first_name, contact.last_name) == ('989121234567', 'Ali', 'Test')
    client.session.save.assert_called_once()


@pytest.mark.asyncio
@pytest.mark.parametrize('bad', [
    types.InputPhoneContact(2, 'bad-phone', 'A', ''),
    types.InputPhoneContact(2, '989121234568', '', ''),
    types.InputPhoneContact(1, '989121234568', 'A', ''),
    types.InputPhoneContact(2, '+98 912 1234567', 'A', ''),
    types.InputPhoneContact(2**64, '989121234568', 'A', ''),
])
async def test_import_validates_whole_batch_before_request(bad):
    client = Client()
    with pytest.raises(ValueError):
        await client.import_contacts([types.InputPhoneContact(1, '989121234567', 'A', ''), bad])
    assert client.requests == []


@pytest.mark.asyncio
async def test_import_preserves_client_ids_without_mutating_input():
    response = types.contacts.ImportedContacts([], [], [42], [])
    client = Client(response)
    contact = types.InputPhoneContact(42, '989121234567', ' A ', '')
    assert await client.import_contacts([contact]) is response
    assert client.requests[0].contacts[0].client_id == 42
    assert contact.first_name == ' A '
    assert contact.phone == '989121234567'


@pytest.mark.asyncio
@pytest.mark.parametrize('channel', [True, False])
async def test_invite_routes_and_deduplicates(channel):
    client = Client(object())
    if not channel:
        client.target = types.InputPeerChat(99)
    report = await client.invite_to_group('target', [1, 1, 2], delay=0)
    assert [r.status for r in report.results] == ['invited', 'duplicate', 'invited']
    assert report.invited == [1, 2]
    assert not report.stopped
    assert len(client.requests) == 2
    for request in client.requests:
        if channel:
            assert isinstance(request, functions.channels.InviteToChannelRequest)
            assert request.channel.channel_id == 99
            assert len(request.users) == 1
        else:
            assert isinstance(request, functions.messages.AddChatUserRequest)
            assert request.chat_id == 99
            assert request.fwd_limit == 0


@pytest.mark.asyncio
async def test_invite_privacy_and_already_member_continue():
    client = Client(object())
    client.outcomes = [errors.UserPrivacyRestrictedError(None), errors.UserAlreadyParticipantError(None)]
    report = await client.invite_to_group('target', [1, 2, 3], delay=0)
    assert [r.status for r in report.results] == ['privacy_restricted', 'already_participant', 'invited']
    assert not report.stopped


@pytest.mark.asyncio
@pytest.mark.parametrize('error,status', [
    (errors.FloodWaitError(None, capture=30), 'failed'),
    (errors.PeerFloodError(None), 'failed'),
    (errors.ChatAdminRequiredError(None), 'failed'),
    (errors.ServerError(None, 'INTERNAL'), 'unknown'),
    (ConnectionError('socket closed'), 'unknown'),
])
async def test_invite_global_failure_stops_without_retry(error, status):
    client = Client(object())
    client.outcomes = [error]
    report = await client.invite_to_group('target', [1, 2, 3], delay=0)
    assert report.stopped
    assert [r.status for r in report.results] == [status, 'not_attempted', 'not_attempted']
    assert report.results[0].error is error
    assert len(client.requests) == 1


@pytest.mark.asyncio
async def test_invite_cancellation_propagates():
    client = Client()
    client.outcomes = [asyncio.CancelledError()]
    with pytest.raises(asyncio.CancelledError):
        await client.invite_to_group('target', [1, 2], delay=0)
    assert len(client.requests) == 1


@pytest.mark.asyncio
async def test_invite_invalid_user_and_delay(monkeypatch):
    sleep = AsyncMock()
    monkeypatch.setattr('nsplusthon.client.contacts.asyncio.sleep', sleep)
    client = Client(object())
    report = await client.invite_to_group('target', ['bad', 1, 2], delay=0.5)
    assert [r.status for r in report.results] == ['invalid_user', 'invited', 'invited']
    sleep.assert_awaited_once_with(0.5)


@pytest.mark.asyncio
async def test_invite_invalid_target_and_inputs():
    client = Client()
    for delay in [-1, float('inf'), float('nan'), True]:
        with pytest.raises(ValueError):
            await client.invite_to_group('target', [1], delay=delay)
    with pytest.raises(ValueError):
        await client.invite_to_group('target', [])
    client.target = types.InputPeerUser(1, 10)
    with pytest.raises(ValueError):
        await client.invite_to_group('target', [1])
    assert client.requests == []


@pytest.mark.asyncio
async def test_public_call_forwards_flood_threshold():
    client = SoroushClient(None)
    client._call = AsyncMock(return_value='ok')
    request = functions.contacts.GetContactsRequest(0)
    assert await client(request, flood_sleep_threshold=0) == 'ok'
    client._call.assert_awaited_once_with(client._sender, request, ordered=False, flood_sleep_threshold=0)


@pytest.mark.asyncio
@pytest.mark.parametrize('server_error', [False, True])
async def test_low_level_no_sleep_or_retry(monkeypatch, server_error):
    client = SoroushClient(None)
    request = functions.contacts.GetContactsRequest(0)
    error = errors.ServerError(request, 'INTERNAL') if server_error else errors.FloodWaitError(request, capture=10)
    sends = []
    class Sender:
        def send(self, request, **kwargs):
            sends.append(request)
            async def fail():
                raise error
            return fail()
    sleep = AsyncMock()
    monkeypatch.setattr('nsplusthon.client.users.asyncio.sleep', sleep)
    with pytest.raises(type(error)):
        await client._call(Sender(), request, flood_sleep_threshold=0, request_retries=0)
    assert len(sends) == 1
    sleep.assert_not_called()


@pytest.mark.asyncio
async def test_iranian_local_persian_digits():
    client = Client(types.contacts.ImportedContacts([], [], [], []))
    await client.add_contact('۰۹۱۲۱۲۳۴۵۶۷', 'علی')
    assert client.requests[0].contacts[0].phone == '989121234567'


@pytest.mark.asyncio
async def test_cached_short_flood_wait_is_respected(monkeypatch):
    import time
    client = SoroushClient(None)
    request = functions.contacts.GetContactsRequest(0)
    client._flood_waited_requests[request.CONSTRUCTOR_ID] = time.time() + 2
    sender = type('Sender', (), {'send': lambda *a, **k: pytest.fail('must not send during flood wait')})()
    with pytest.raises(errors.FloodWaitError):
        await client._call(sender, request, flood_sleep_threshold=0)
