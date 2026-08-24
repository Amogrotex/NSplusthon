# Changelog

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
