# Changelog

## 1.9.0

### Added

- **`nsplusthon.anonchat`** — anonymous 1-on-1 chat: random friend matching
  with anonymous profiles (nickname, age, gender, city, bio, interests,
  avatar, rating).
  - `MatchMaker` scores candidates on shared interests, satisfied gender
    preference, age range and mutual rating, but only after *both* users'
    hard filters pass. `avoid_previous_partners` skips past partners while
    other options exist, then falls back to a rematch rather than leaving
    someone waiting forever.
  - `AnonChatManager` orchestrates search, relay, next/stop, ratings,
    reports and blocking. It performs no I/O: every method returns a result
    object, so the caller decides how to render and send it.
  - `MemoryProfileStore` and `SQLiteProfileStore` backends.
  - Safety: per-chat flood limiting, minimum message spacing, link/invite/
    phone-number blocking, Persian profanity filtering, de-duplicated
    reports with auto-ban, and blocks that prevent future pairing.
  - Bilingual strings (`fa`/`en`) plus `render_profile_card` and
    `inline_keyboard` helpers.
- **`nsplusthon_examples/anon_chat.py`** — a complete bot built on the new
  module: `/start` profile wizard, `/search`, `/next`, `/stop`, `/rate`,
  `/report`, `/block`, `/lang`, `/stats` and inline-button controls.
- `anonchat` added to the package's lazy public API (`from nsplusthon import anonchat`).
- 85 new tests (120 → 205), covering the module directly and driving the
  example bot's real handlers through a fake client. New-code coverage 93%.

### Notes

- Anonymity is a design constraint, not a convention: the module never reads
  `first_name`, `last_name` or `username`, and `render_profile_card` cannot
  emit them. The example re-sends media instead of forwarding it, because a
  forward carries the original sender's identity.
- `SQLiteProfileStore` closes its connections via `contextlib.closing`.
  (`fsm.SQLiteStorage` still relies on `with conn:` for commit only, which
  does not close — unchanged here, but worth noting.)


## 1.8.3

- Fix ``NameError`` in ``TextFilter`` when ``endswith`` is used: the loop
  iterated over the wrong variable (``e.lower()`` instead of ``s.lower()``).
- Fix ``NameError`` in ``MessageMethods.delete_messages_bulk``: ``asyncio``
  was used to pause between chunks but never imported, crashing as soon as
  more than one chunk had to be sent with ``delay > 0``.
- Regression tests for both code paths.

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
