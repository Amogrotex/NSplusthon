# Contacts and member invitations

These methods are available on `SoroushClient`. They use the existing Soroush
TL requests; support and permissions are ultimately determined by the server.
Use only contacts you are authorized to import and people expecting an invite.

## Get and search saved contacts

```python
contacts = await client.get_contacts()
matching = await client.get_contacts(query='علی', limit=20)
```

Search is local, case-insensitive, and matches names, usernames and phone digits.
A full fresh list is requested with hash=0; `limit` is not server-side pagination.
Returned entities are cached. Network/RPC failures propagate rather than looking
like an empty address book. `limit=0` makes no request.

## Add a phone contact

```python
result = await client.add_contact('+989121234567', 'Ali', 'Example')
if result.status == 'imported' and result.user is not None:
    print('Imported user ID:', result.user.id)
elif result.status == 'retry_required':
    print('Server requested a later retry; do not retry in a tight loop.')
else:
    print('No user returned. This can be due to privacy restrictions.')
```

Statuses: `imported`, `retry_required`, `not_imported`. An imported mapping can
exist without an accompanying user object; inspect `result.response.imported`
in that case. `not_imported` is **not proof that a number has no account**.
The complete server response is retained in `result.response`.

Prefer country-coded numbers. Iranian local numbers are normalized using the
library's existing phone parser. Persian and Arabic digits are also accepted.
Phone numbers are sent in the library's digit-only international format.
Names are stripped of surrounding whitespace and the first name must be nonempty.

### Explicit batch import

```python
from nsplusthon import types

response = await client.import_contacts([
    types.InputPhoneContact(101, '+989121234567', 'Ali', ''),
    types.InputPhoneContact(102, '+989121234568', 'Sara', ''),
])
# Match imported.user_id to users using imported.client_id, not list position.
for imported in response.imported:
    print(imported.client_id, imported.user_id)
# response.retry_contacts contains client IDs, not phone numbers.
```

Each call accepts 1–100 items. All input is validated before sending; duplicate
client IDs or normalized numbers are rejected. Original input objects are not
mutated. The response preserves retry IDs, popular invites and user mappings.
Returned entities are cached and the session is saved. Flood/server errors are
raised without automatic RPC-level retries or sleeps in this helper.

## Invite selected contacts to a group or channel

```python
contact = await client.add_contact('+989121234567', 'Ali')
if contact.status == 'imported' and contact.user is not None:
    report = await client.invite_to_group(
        'your_group_or_channel_username', [contact.user], delay=1.0)
    for item in report.results:
        print(item.status)
        if item.error is not None:
            print(type(item.error).__name__)
```

`invite_to_group` supports basic groups, supergroups and broadcast channels.
It uses `messages.AddChatUserRequest` for basic groups (with no history forwarded)
and `channels.InviteToChannelRequest` for channels/supergroups. The caller needs
appropriate permissions; importing a contact does not override their privacy.

Pass one resolvable user or an explicit list/tuple of 1–100 selected users.
Usernames, cached IDs, saved-contact phones and user objects are resolved with
`get_input_entity`. Uncached bare IDs may require first loading the contacts list.
No automatic invitation of the whole address book is performed.

Invitations run sequentially, with a default one-second delay between invite
attempts. Duplicate resolved IDs are skipped. A delay reduces bursts but does
not guarantee avoidance of server limits.

| Status | Meaning |
| --- | --- |
| `invited` | Invitation RPC returned successfully; raw response retained |
| `duplicate` | Same resolved user already appeared in this batch |
| `already_participant` | Server reports user already belongs to target |
| `privacy_restricted` | User's privacy prevents invitation |
| `not_mutual_contact` | Server requires a mutual contact |
| `user_channels_too_much` | User has reached their membership limit |
| `user_kicked` | User cannot be invited because they were kicked |
| `invalid_user` | Input cannot be resolved or is not a user |
| `failed` | Other RPC failure; inspect the original error |
| `unknown` | Server/transport failure during invitation; outcome uncertain |
| `not_attempted` | A previous global failure stopped the batch |

Privacy and the listed user-specific errors allow subsequent selected users to
be attempted. Flood limits, permission failures and other RPC errors stop the
batch, setting `report.stopped=True`. The original exception is in `item.error`
(e.g. `FloodWaitError.seconds` gives the wait). Do not bypass those restrictions.
A failure resolving the target raises before any invitation is sent.

There is no automatic RPC-level retry by the helper. The underlying transport
may replay pending requests during reconnection; exactly-once delivery cannot
be guaranteed. For uncertain outcomes, check membership before retrying.
Cancellation propagates; earlier successful invitations are not rolled back.
Result reprs omit user/error/response payloads, but explicitly logging those
objects can expose personal data.

## Validation and scope

Offline regression tests cover request routing, normalization, input validation,
partial imports, caching, per-user outcomes, deduplication, flood/admin stops,
cancellation and per-request retry/sleep settings. Live Soroush contact import
and member invitations have **not** been tested with a real account.

This feature branch is based on `main` and is separate from login/session PR #14.
It does not include or replace those session fixes.
