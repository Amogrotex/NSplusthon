---
hide:
  - navigation
---

<div dir="ltr" lang="en">

# NSplusthon (English)

Async Python client for **Soroush Plus** (سروش پلاس / SPlus).

- Package: [`nsplusthon` on PyPI](https://pypi.org/project/nsplusthon/)
- Source: [github.com/Amogrotex/NSplusthon](https://github.com/Amogrotex/NSplusthon)
- Messenger: [web.splus.ir](https://web.splus.ir)

## Install

Python **3.9+**.

```bash
pip install nsplusthon
pip install "nsplusthon[fast]"
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

More: [Persian docs home](../index.md)

This library is third-party and not affiliated with Soroush Plus.

</div>
