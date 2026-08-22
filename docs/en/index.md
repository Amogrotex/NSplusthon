---
hide:
  - navigation
---

<div dir="ltr" lang="en">

# NSplusthon (English)

**NSplusthon** is an asynchronous Python library for the **Soroush Plus** messenger API (سروش پلاس, also known as **SPlus**).

It is the Telethon equivalent for Soroush Plus: one `SoroushClient` that can log in as a **user** or a **bot**, send messages and files, download media, and react to events.

- Package: [`nsplusthon` on PyPI](https://pypi.org/project/nsplusthon/)
- Source: [github.com/Amogrotex/NSplusthon](https://github.com/Amogrotex/NSplusthon)
- Messenger: [web.splus.ir](https://web.splus.ir)
- Related libraries: [SPlusthon](https://github.com/shayanheidari01/SPlusthon) (upstream fork), [Telethon](https://github.com/LonamiWebs/Telethon) (Telegram)

## Install

Python **3.9+**.

```bash
pip install nsplusthon
pip install "nsplusthon[fast]"   # cryptg + SOCKS + media extras
```

Do not name your file `nsplusthon.py`.

## First bot

```python
from nsplusthon import SoroushClient, events
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())

@client.on(events.NewMessage)
async def handler(event):
    await event.reply("hello from NSplusthon")

client.start()
client.run_until_disconnected()
```

No `api_id` / `api_hash`. For a bot token:

```python
client.start(bot_token="12345:abcdef")
```

## When to use it

| You want… | Use |
| --- | --- |
| Soroush Plus userbot or bot in Python | **NSplusthon** |
| Older SPlus client you already depend on | [SPlusthon](migration.md) — then migrate |
| Telegram | Telethon / Pyrogram, not this package |

More: [library comparison](../compare.md) · [SPlusthon migration](../migration.md) · [Persian docs home](../index.md)

## Features in short

- MTProto + Soroush TL schema (layer 182)
- WebSocket transport and DC routing
- Sync wrapper (`nsplusthon.sync`)
- Command router, rate limiter, encrypted `StringSession`
- Typed (`py.typed`)

This library is third-party and not affiliated with Soroush Plus. Follow their terms.

</div>
