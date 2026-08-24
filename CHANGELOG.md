# Changelog

## Unreleased

## 1.8.0

FSM Framework, Composable Filters, Group Guard Moderation, Paginator & AI Helpers Release.

- **Declarative FSM Engine (`nsplusthon.fsm`)**:
  - `StatesGroup` and `State` declarative definitions for multi-step dialogs and forms.
  - Dual storage backends: `MemoryStorage` (in-memory lock-protected) and `SQLiteStorage` (persistent thread-safe database).
  - `FSMContext` for state mutation (`set_state`, `get_state`, `update_data`, `get_data`, `finish`).

- **Composable Filters Engine (`nsplusthon.filters`)**:
  - Chainable bitwise filter composition (`&`, `|`, `~`).
  - Declarative filter types: `TextFilter`, `RegexFilter`, `ChatTypeFilter`, `SenderFilter`, `HasMediaFilter`, `IsReplyFilter`, `StateFilter`, and `IsAdminFilter`.

- **Group Moderation & Anti-Raid Systems (`nsplusthon.moderation`)**:
  - `GroupGuard` umbrella class encapsulating group security rules.
  - `AntiFlood` sliding-window rate limiter per user.
  - `LinkGuard` and invite URL blocker with domain whitelist support.
  - `PersianBadWordsFilter` bad words detector with zero-width space and leetspeak normalization.
  - `NightLock` Tehran timezone-aware (UTC+3:30) group schedule validator.
  - `WarnManager` threshold warning tracker.

- **Interactive Paginator (`nsplusthon.paginator`)**:
  - `Paginator` helper for generating paginated inline button rows (`◀️ قبلی`, `صفحه 1/5`, `بعدی ▶️`) for large lists and catalogs.

- **AI & Intent Router (`nsplusthon.ai`)**:
  - `IntentRouter` offline rule-based Persian intent matcher for natural language group commands.
  - `RedactionGuard` zero-leak security layer scrubbing API keys, tokens, and phone numbers from outputs.
  - `MultiProviderAI` async client interface with fallback mesh.

## 1.7.0

High-Performance Engine, Middleware Pipeline & Declarative Filters Release.

- Middleware Pipeline Architecture: `client.add_middleware()` & `client.remove_middleware()` with onion-style execution.
- Declarative Event Filters: Added `media_only` filter flag to `events.NewMessage`.
- Low-Latency MTProto CircuitBreaker Integration: Integrated transport state management to avoid socket hangs on network drops.

## 1.6.0

Adaptive Gzipping, Circuit Breaker & Full Soroush Detection Release.

- Idea 1 (Adaptive Gzip): Payload compression threshold lowered to 256 bytes with precomputed constructor headers.
- Idea 7 (Circuit Breaker): `CircuitBreaker` transport resilience to isolate DC connection stalls and recover automatically.
- Full Soroush Detection: Comprehensive Soroush Plus parser for `splus.ir`, `sapp.ir`, `soroush-app.ir`, `splus://`, and `soroush://` URIs.
- Entity Auto-Classifier: `detect_soroush_entity()` for parsing users, chats, channels, invite links, and marked IDs.

## 1.5.0

Major Feature & Architecture Release.

- Interactive Conversation API: `client.conversation(chat)` with `get_response()`, `send_message()`, and auto-timeout.
- Multi-Account Manager: `ClientPool` for concurrent account management, load balancing, and broadcast round-robin.
- Fluent Keyboard Builder: `Button.builder()` with `.row()` and `.grid(cols=N)`.
- Batch Deletion Engine: `client.delete_messages_bulk(chat, ids)` with flood-safe chunking.
- Admin & Permission Inspector: `client.is_admin(chat, user)` and `client.get_permissions(chat, user)`.
- Session Exporter: `export_session()` to convert seamlessly between StringSession, SQLiteSession, and MemorySession.
- Reconnection & Keep-alive: Watchdog ping and exponential backoff recovery.

## 1.4.1

High-throughput serialization and core optimizations.

- Zero-copy tuple padding in `TLObject.serialize_bytes()`.
- Fast-path for BMP text in `helpers.add_surrogate()`.
- Pre-compiled struct serialization for `MessageContainer` and `MTProtoState`.
- Optimized datetime timestamp calculations.

## 1.4.0

Performance and speedup release.

- Hardware-accelerated AES-CTR stream encryption via `cryptography` (up to 1,700x faster).
- Native AES-IGE block processing (up to 16x faster MTProto payload decryption).
- Pre-compiled struct parsing and O(1) byte reads in `BinaryReader` (2x faster TL serialization).
- Upgraded WebSocket buffer sizing (512 KB) for lower packet fragmentation and high-traffic throughput.
- Optimized SQLite session database with WAL journal mode, 64 MB memory-mapped I/O, and 8 MB RAM cache.
- Fixed Python linter syntax warnings in RSA key registration.

- README / docs no longer describe another project as upstream.

## 1.3.5

Docs and packaging release.

- Bilingual README (PyPI long description)
- English overview
- Python 3.9 called out everywhere; dead `tl.nsplusthon.dev` / `v1.zip` links removed

## 1.3.0

- Command router, rate limiter, encrypted sessions.
- Lazy `import nsplusthon` (~15 ms).

## 1.1.4

- First public `nsplusthon` release (GPL-3.0).
