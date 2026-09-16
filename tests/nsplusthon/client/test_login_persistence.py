"""Offline regressions for verified login and session restart."""
import datetime
from unittest.mock import AsyncMock

import pytest

from nsplusthon import SoroushClient, errors, functions, types
from nsplusthon.crypto import AuthKey
from nsplusthon.sessions import SQLiteSession


@pytest.mark.parametrize('store_tmp', [False, True])
@pytest.mark.parametrize('takeout_id', [None, 123456])
def test_sqlite_session_reopens_keys_and_takeout(tmp_path, store_tmp, takeout_id):
    path = str(tmp_path / 'login')
    session = SQLiteSession(path, store_tmp_auth_key_on_disk=store_tmp)
    session.set_dc(2, '127.0.0.1', 443)
    session.auth_key = AuthKey(b'a' * 256)
    session.tmp_auth_key = AuthKey(b'b' * 256)
    session.takeout_id = takeout_id
    session.save()
    session.close()
    restored = SQLiteSession(path, store_tmp_auth_key_on_disk=store_tmp)
    try:
        assert restored.auth_key.key == b'a' * 256
        assert restored.tmp_auth_key.key == (b'b' * 256 if store_tmp else None)
        assert restored.takeout_id == takeout_id
    finally:
        restored.close()


class LoginClient(SoroushClient):
    async def __call__(self, request, *args, **kwargs):
        # A second reader must see verified credentials before any update RPC.
        reader = SQLiteSession(self.session.filename)
        try:
            assert reader.auth_key.key == b'a' * 256
            if self._mb_entity_cache.self_id:
                assert reader.get_input_entity(0).access_hash == 123
                assert reader.get_input_entity(123).access_hash == 456
        finally:
            reader.close()
        if isinstance(request, functions.updates.GetStateRequest):
            if self.fail_state:
                raise errors.ServerError(request=request, message='INTERNAL')
            return types.updates.State(10, 2, datetime.datetime.now(datetime.timezone.utc), 3, 0)
        raise errors.ServerError(request=request, message='INTERNAL')


@pytest.mark.asyncio
@pytest.mark.parametrize('fail_state', [False, True])
@pytest.mark.parametrize('with_user', [False, True])
async def test_verified_login_survives_optional_rpc_failure(tmp_path, fail_state, with_user):
    client = LoginClient(str(tmp_path / 'verified'))
    client.fail_state = fail_state
    client._sender.auth_key = AuthKey(b'a' * 256)
    client._phone_code_hash['123'] = 'old-code-hash'
    user = types.User(user_type=0, id=123, access_hash=456, first_name='Test') if with_user else None
    try:
        assert await client._on_login(user) is user
        assert client._authorized is True
        assert not client._phone_code_hash
        reader = SQLiteSession(client.session.filename)
        try:
            if not fail_state:
                assert reader.get_update_state(0).pts == 10
        finally:
            reader.close()
    finally:
        client.session.close()


@pytest.mark.asyncio
async def test_auth_check_does_not_cache_server_failure():
    class Client(SoroushClient):
        async def __call__(self, request, *args, **kwargs):
            raise errors.ServerError(request=request, message='INTERNAL')
    client = Client(None)
    with pytest.raises(errors.ServerError):
        await client.is_user_authorized()
    assert client._authorized is None


@pytest.mark.asyncio
async def test_auth_check_caches_unregistered_key():
    class Client(SoroushClient):
        async def __call__(self, request, *args, **kwargs):
            raise errors.AuthKeyUnregisteredError(request=request)
    client = Client(None)
    assert await client.is_user_authorized() is False


@pytest.mark.asyncio
async def test_new_auth_key_invalidates_cached_authorization():
    client = SoroushClient(None)
    client._authorized = True
    await client._auth_key_callback(AuthKey(b'c' * 256))
    assert client._authorized is None
    assert client.session.auth_key.key == b'c' * 256


@pytest.mark.asyncio
async def test_invalid_phone_does_not_destroy_key_or_resend_code():
    client = SoroushClient(None)
    client._sender.auth_key = AuthKey(b'a' * 256)
    client.is_connected = lambda: True
    client.is_user_authorized = AsyncMock(return_value=False)
    client.send_code_request = AsyncMock()
    client.sign_in = AsyncMock(side_effect=errors.PhoneNumberInvalidError(request=None))
    client.disconnect = AsyncMock()
    with pytest.raises(errors.PhoneNumberInvalidError):
        await client.start(phone='123456789', code_callback=lambda: '12345')
    assert client._sender.auth_key.key == b'a' * 256
    client.disconnect.assert_not_called()
    client.send_code_request.assert_awaited_once()


@pytest.mark.asyncio
async def test_code_only_sign_in_skips_get_me():
    class Client(SoroushClient):
        async def __call__(self, request, *args, **kwargs):
            assert isinstance(request, functions.auth.SignInRequest)
            return types.auth.Authorization(user=types.User(user_type=0, id=123))
    client = Client(None)
    client._phone = '123456789'
    client._phone_code_hash[client._phone] = 'hash'
    client.get_me = AsyncMock(side_effect=AssertionError('pre-login get_me'))
    client._on_login = AsyncMock()
    await client.sign_in(code='12345')
    client.get_me.assert_not_called()
    client._on_login.assert_awaited_once()
