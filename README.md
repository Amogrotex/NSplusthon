<p align="center">
  <img src="logo.png" width="160" alt="NSplusthon">
</p>

<h1 align="center">NSplusthon</h1>

<p align="center">
  An asynchronous Python MTProto client library for <a href="https://web.splus.ir">Soroush Plus</a>.
</p>

<p align="center">
  <a href="https://pypi.org/project/nsplusthon/"><img src="https://img.shields.io/pypi/v/nsplusthon.svg" alt="PyPI"></a>
  <a href="https://pypi.org/project/nsplusthon/"><img src="https://img.shields.io/pypi/pyversions/nsplusthon.svg" alt="Python"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-GPL--3.0-blue.svg" alt="License"></a>
</p>

Maintained fork of [SPlusthon](https://github.com/shayanheidari01/SPlusthon), itself derived from [Telethon](https://github.com/LonamiWebs/Telethon). See [NOTICE](NOTICE) and [THIRD_PARTY.md](THIRD_PARTY.md).

---

## Features

- **User Accounts & Bots**: Support for user login and official bot tokens.
- **FSM State Storage**: Finite State Machine with `MemoryStorage` and persistent `SQLiteStorage`.
- **Composable Filters**: Combine event filters using Python logic (`&`, `|`, `~`).
- **Group Moderation**: Built-in flood protection, link checking, profanity filtering, and optional night-lock.
- **Interactive Conversations**: Linear multi-step conversation handler (`async with client.conversation(chat)`).
- **Client Pool**: Manage multiple accounts with client pooling and message broadcasting.
- **Inline Keyboards & Paginator**: Clean keyboard builder and paginated inline menu layout.
- **Soroush Plus Detection**: Link parser and entity classifier for Soroush Plus URLs, URIs, and user IDs.

---

## Installation

```bash
pip install -U nsplusthon
```

Optional dependencies for **fast crypto** (cryptg) and proxy support:

```bash
pip install -U "nsplusthon[fast]"
```

PyPI may lag the git tag (Trusted Publishing — see [PUBLISHING.md](PUBLISHING.md)). Latest:

```bash
pip install -U "nsplusthon[fast] @ git+https://github.com/Amogrotex/NSplusthon.git"
```

---

## Quick Start

### Basic Bot Example

```python
from nsplusthon import SoroushClient, events
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())

@client.on(events.NewMessage(pattern=r"(?i)hello"))
async def hello_handler(event):
    await event.reply("Hello!")

client.start()
client.run_until_disconnected()
```

### Bot Token Login

```python
client.start(bot_token="12345:abcdef")
```

No API ID or API hash is required.

---

## Usage Examples

### Finite State Machine (FSM)

```python
from nsplusthon.fsm import StatesGroup, State, MemoryStorage

class Registration(StatesGroup):
    name = State()
    city = State()

storage = MemoryStorage()
ctx = storage.get_context(user_id=event.sender_id, chat_id=event.chat_id)

await ctx.set_state(Registration.name)
await ctx.update_data(name="Ali")
```

### Group Guard Moderation

```python
from nsplusthon.moderation import GroupGuard

guard = GroupGuard(
    max_flood_messages=5,
    max_mentions=3,
    allowed_domains=["splus.ir"],
    exempt_user_ids={bot_id},
)
result = guard.inspect_message(chat_id=event.chat_id, user_id=event.sender_id, text=event.text)

if result["is_violation"]:
    await event.delete()
```

### Keyboard & Pagination

```python
from nsplusthon import Button
from nsplusthon.paginator import Paginator

paginator = Paginator(items=["Item 1", "Item 2", "Item 3"], page_size=2)
keyboard = paginator.build_keyboard(current_page=1, callback_prefix="page")
```

---

## License

[GPL-3.0](LICENSE). Copyright (C) 2026 AmoGrotex. Upstream Telethon is MIT — see [NOTICE](NOTICE).
