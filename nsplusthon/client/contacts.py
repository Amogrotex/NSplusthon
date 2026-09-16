"""Contact helpers and explicit, sequential group/channel invitations."""
import asyncio
import math

from .. import errors, utils
from ..contacts import AddContactResult, InviteReport, InviteResult
from ..tl import functions, types


_PHONE_DIGITS = str.maketrans('۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩', '01234567890123456789')


class ContactMethods:
    async def get_contacts(self, query=None, *, limit=None):
        """Fetch saved contacts, optionally filter locally by name/username/phone.

        Always requests a fresh list (hash=0). ``limit`` limits the returned
        list, not the server payload. RPC failures propagate, never become an
        empty contact list. This does not search strangers by phone number.
        """
        if query is not None and not isinstance(query, str):
            raise TypeError('query must be a string or None')
        if limit is not None and (type(limit) is not int or limit < 0):
            raise ValueError('limit must be a non-negative integer or None')
        if limit == 0:
            return []
        response = await self(functions.contacts.GetContactsRequest(hash=0))
        if not isinstance(response, types.contacts.Contacts):
            raise RuntimeError('Expected a full contacts list for hash=0')
        await utils.maybe_async(self.session.process_entities(response))
        users = response.users
        if query and query.strip():
            needle = query.strip().casefold()
            phone = utils.parse_phone(query.translate(_PHONE_DIGITS))
            users = [user for user in users if (
                needle in utils.get_display_name(user).casefold()
                or (needle.lstrip('@') and needle.lstrip('@') in (getattr(user, 'username', None) or '').casefold())
                or (phone and phone in (getattr(user, 'phone', None) or ''))
            )]
        return users if limit is None else users[:limit]

    async def import_contacts(self, contacts):
        """Import 1–100 InputPhoneContact objects in one explicit batch.

        Prefer international numbers with country codes. Iranian local numbers
        are normalized by utils.parse_phone; Persian/Arabic digits are accepted. Client IDs and normalized
        phones must be unique. Validation finishes before any request is sent.
        Returns the raw ImportedContacts, including retry_contacts and original
        client-ID mappings. No automatic retries of imports are performed by
        this helper; server-requested retries must be handled by the caller.
        """
        contacts = list(contacts)
        if not 1 <= len(contacts) <= 100:
            raise ValueError('Provide between 1 and 100 contacts per batch')
        prepared, ids, phones = [], set(), set()
        for contact in contacts:
            if not isinstance(contact, types.InputPhoneContact):
                raise TypeError('Each contact must be an InputPhoneContact')
            if type(contact.client_id) is not int or not -(2**63) <= contact.client_id < 2**63:
                raise ValueError('client_id must be a signed 64-bit integer')
            if not isinstance(contact.phone, str):
                raise TypeError('phone must be a string with country code')
            phone = utils.parse_phone(contact.phone.translate(_PHONE_DIGITS))
            if not phone or not phone.isascii() or not phone.isdigit() or not 7 <= len(phone) <= 15:
                raise ValueError('Use an international phone number with country code (7–15 digits)')
            if not isinstance(contact.first_name, str) or not contact.first_name.strip():
                raise ValueError('first_name must be a non-empty string')
            if not isinstance(contact.last_name, str):
                raise TypeError('last_name must be a string')
            if contact.client_id in ids or phone in phones:
                raise ValueError('Duplicate client_id or phone in contact batch')
            ids.add(contact.client_id)
            phones.add(phone)
            prepared.append(types.InputPhoneContact(
                contact.client_id, phone, contact.first_name.strip(), contact.last_name.strip()))
        response = await self._call(self._sender,
            functions.contacts.ImportContactsRequest(prepared),
            flood_sleep_threshold=0, request_retries=0)
        if not isinstance(response, types.contacts.ImportedContacts):
            raise RuntimeError('Unexpected contact import response')
        await utils.maybe_async(self.session.process_entities(response))
        await utils.maybe_async(self.session.save())
        return response

    async def add_contact(self, phone, first_name, last_name=''):
        """Import one phone contact; return AddContactResult, not a guessed user.

        ``not_imported`` may reflect privacy restrictions or an unregistered
        phone. ``retry_required`` means the server asked to retry later.
        """
        response = await self.import_contacts([
            types.InputPhoneContact(0, phone, first_name, last_name)])
        if 0 in response.retry_contacts:
            return AddContactResult('retry_required', response=response)
        imported = next((item for item in response.imported if item.client_id == 0), None)
        if imported is None:
            return AddContactResult('not_imported', response=response)
        user = next((user for user in response.users if user.id == imported.user_id), None)
        return AddContactResult('imported', user=user, response=response)

    async def invite_to_group(self, entity, users, *, delay=1.0):
        """Invite selected users to a basic group, supergroup or channel.

        Accepts one user or a list/tuple of up to 100 users resolvable by
        get_input_entity. Never fetches/invites the entire address book.
        Deduplicates resolved user IDs. Executes sequentially with ``delay``
        seconds between attempts and no helper-level retries. Requires server
        permission and respects user privacy. No history is forwarded.

        Returns InviteReport with per-user statuses: invited, duplicate,
        already_participant, privacy_restricted, not_mutual_contact,
        user_channels_too_much, user_kicked, invalid_user, failed, unknown,
        or not_attempted. Privacy/user-specific failures allow the next user;
        any other RPC error stops the batch (including flood/admin errors).
        Transport errors stop with unknown outcome; inspect membership before
        retrying. Cancellation propagates. Earlier invitations are not undone.
        """
        if isinstance(delay, bool) or not isinstance(delay, (int, float)) or not math.isfinite(delay) or delay < 0:
            raise ValueError('delay must be a finite non-negative number')
        users = list(users) if isinstance(users, (list, tuple)) else [users]
        if not 1 <= len(users) <= 100:
            raise ValueError('Select between 1 and 100 users per batch')
        target = await self.get_input_entity(entity)
        if not isinstance(target, (types.InputPeerChat, types.InputPeerChannel)):
            raise ValueError('Invitation target must be a group or channel')
        report = InviteReport([])
        seen = set()
        attempted = False
        user_errors = {
            errors.UserAlreadyParticipantError: 'already_participant',
            errors.UserPrivacyRestrictedError: 'privacy_restricted',
            errors.UserNotMutualContactError: 'not_mutual_contact',
            errors.UserChannelsTooMuchError: 'user_channels_too_much',
            errors.UserKickedError: 'user_kicked',
        }
        for user in users:
            if report.stopped:
                report.results.append(InviteResult(user, 'not_attempted'))
                continue
            try:
                resolved = utils.get_input_user(await self.get_input_entity(user))
            except (ValueError, TypeError) as error:
                report.results.append(InviteResult(user, 'invalid_user', error=error))
                continue
            except (errors.RPCError, OSError, asyncio.TimeoutError) as error:
                report.results.append(InviteResult(user, 'failed', error=error))
                report.stopped = True
                continue
            key = getattr(resolved, 'user_id', 'self')
            if key in seen:
                report.results.append(InviteResult(user, 'duplicate'))
                continue
            seen.add(key)
            if attempted and delay:
                await asyncio.sleep(delay)
            attempted = True
            if isinstance(target, types.InputPeerChat):
                request = functions.messages.AddChatUserRequest(target.chat_id, resolved, fwd_limit=0)
            else:
                request = functions.channels.InviteToChannelRequest(
                    utils.get_input_channel(target), [resolved])
            try:
                response = await self._call(self._sender, request,
                    flood_sleep_threshold=0, request_retries=0)
            except tuple(user_errors) as error:
                report.results.append(InviteResult(user, user_errors[type(error)], error=error))
            except (errors.RPCError, OSError, asyncio.TimeoutError) as error:
                # Server/transport errors can occur after the invite took effect.
                uncertain = isinstance(error, (errors.ServerError, OSError, asyncio.TimeoutError))
                report.results.append(InviteResult(user, 'unknown' if uncertain else 'failed', error=error))
                report.stopped = True
            else:
                report.results.append(InviteResult(user, 'invited', response=response))
        return report
