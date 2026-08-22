---
hide:
  - navigation
  - toc
---

<div class="ns-hero" dir="ltr" lang="en" markdown>

<img src="../logo.png" alt="NSplusthon">

# NSplusthon

Async Python client for Soroush Plus. User accounts and bots. No API id or hash.

<div class="ns-actions" markdown>

[Install](../installation.md){ .ns-btn }
[Quick start](../quick-start.md){ .ns-btn .ghost }
[فارسی](../index.md){ .ns-btn .ghost }
[GitHub](https://github.com/Amogrotex/NSplusthon){ .ns-btn .ghost }

</div>

<div class="ns-meta">
<span class="ns-chip">Python 3.9+</span>
<span class="ns-chip">asyncio</span>
<span class="ns-chip">MTProto</span>
<span class="ns-chip">GPL-3.0</span>
</div>

</div>

<div dir="ltr" lang="en" markdown>

```bash
pip install nsplusthon
pip install "nsplusthon[fast]"
```

Do not name your file `nsplusthon.py`.

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

Bot token:

```python
client.start(bot_token="12345:abcdef")
```

Package: [PyPI](https://pypi.org/project/nsplusthon/). Messenger: [web.splus.ir](https://web.splus.ir). Third-party, not affiliated with Soroush Plus.

</div>
