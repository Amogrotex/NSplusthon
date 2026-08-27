# Changelog

## 1.8.3

- Fix bot-token login: `auth.importBotAuthorization` was missing from the
  generated TL schema, so `sign_in(bot_token=...)` /
  `client.start(bot_token=...)` always raised `AttributeError`.
  `ImportBotAuthorizationRequest` is now generated and registered.
- Wire the 1.8.2 reconnect filter into `_reconnect()`: stale
  `PingRequest` / `GetUsersRequest` are now actually dropped before being
  re-enqueued on the fresh connection (the filter existed but was never
  called, so the reconnect storm could still occur).
- WebSocket: disable WebSocket-level ping frames (`heartbeat=0`). They
  contradicted the 1.8.2 note that Soroush closes connections that
  receive them; MTProto `PingRequest` is the keepalive.
- WebSocket periodic reset (1800 s) now goes through the owning
  `MTProtoSender`'s reconnect machinery instead of swapping the transport
  directly, which could race with the sender's loops and spawn two
  concurrent handshakes on the same connection. A single failed reset no
  longer kills the reset loop for good.
- Add a periodic keepalive loop (30 s) to `MTProtoSender` so idle
  connections (no outgoing RPCs, no incoming updates) are no longer
  recycled by the 90 s receive watchdog; an unanswered ping after a full
  interval now triggers a reconnect.
- `get_me()` no longer swallows `asyncio.CancelledError`.
- Bot-token/session mismatch warning no longer mis-parses colon-less
  tokens.

## 1.8.2

- Stop the WebSocket reconnect storm during phone sign-in: do not send
  ``GetUsersRequest`` / ``get_me`` until the account is authorized
  (Soroush returns 500 and closes the socket).
- On reconnect, drop stale ``PingRequest`` / ``GetUsersRequest`` instead
  of replaying them; reset the keepalive ping id so the next ping does
  not immediately reconnect again.
- ``get_me`` no longer retries a 500 (one attempt, then ``None``).
- aiohttp session no longer uses a ``total=`` timeout (that killed a
  live WebSocket after ``connect_timeout`` seconds). Disabled WebSocket
  ping frames — Soroush closes on them; MTProto ping is the keepalive.

## 1.8.1

- FSM ``SQLiteStorage.update_data`` is now a single ``BEGIN IMMEDIATE``
  transaction (no get-then-set race).
- ``AntiFlood`` / ``WarnManager`` / ``RateLimiter`` evict idle keys so
  long-running bots do not leak memory.
- ``LinkGuard`` matches parsed hostnames (and optional path prefixes),
  not raw substrings.
- ``GroupGuard`` night lock is opt-in and supports ``exempt_user_ids`` /
  ``is_admin``.
- ``filters`` public surface is now ``__all__``; ``IsAdminFilter`` no
  longer swallows every exception.
- OpenSSL AES-IGE reuses the key schedule across packets.
- License file is plain GPL-3.0 (GitHub can detect it). Added ``NOTICE``
  and ``THIRD_PARTY.md`` for Telethon / SPlusthon attribution.
- Renamed ``telegrambaseclient.py`` → ``plusbaseclient.py`` (shim kept).
- Docs / examples no longer ask for Telegram ``TG_API_ID`` / ``t.me``.
- CI no longer dies if an optional extra is imported at collection time.
- Documented PyPI Trusted Publishing (``PUBLISHING.md``). Dependabot on.

## 1.8.0

- Added FSM module (`nsplusthon.fsm`) with `StatesGroup`, `State`, `MemoryStorage`, and `SQLiteStorage`.
- Added composable event filters (`nsplusthon.filters`) with operator support (`&`, `|`, `~`).
- Added group moderation helpers (`nsplusthon.moderation`) including `GroupGuard`, `AntiFlood`, `LinkGuard`, `PersianBadWordsFilter`, `NightLock`, and `WarnManager`.
- Added pagination helper (`nsplusthon.paginator.Paginator`) for inline keyboard menus.
- Added AI helper suite (`nsplusthon.ai`) including `IntentRouter`, `RedactionGuard`, and `MultiProviderAI`.
- Modularized unit tests into dedicated test modules.

## 1.7.0

- Added middleware pipeline architecture (`client.add_middleware()`).
- Added `media_only` filter flag to `events.NewMessage`.
- Transport circuit breaker integration.

## 1.6.0

- Lowered payload compression threshold to 256 bytes.
- Added Soroush Plus domain parser and `detect_soroush_entity()`.

## 1.5.0

- Added interactive conversation API (`client.conversation()`).
- Added multi-account `ClientPool`.
- Added fluent keyboard builder (`Button.builder()`).
- Added bulk message deletion.

## 1.4.0

- Cryptography acceleration updates and WebSocket buffer optimization.
- SQLite session database optimizations.

## 1.3.0

- Added command router, rate limiter, and encrypted sessions.
