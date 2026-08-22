<div align="center">

<img src="logo.png" width="200" alt="NSplusthon — Python client for Soroush Plus">

<h1>NSplusthon</h1>

<p>
  <strong>Async Python library for the Soroush Plus (سروش پلاس / SPlus) API</strong><br>
  Telethon-style client for user accounts and bots. Fork of SPlusthon.
</p>

<p dir="rtl">
  کتابخانه‌ای مدرن و سریع بر پایه <strong>asyncio</strong> برای تعامل مستقیم
  با API پیام‌رسان <strong>سروش پلاس</strong> — به‌عنوان <strong>کاربر</strong> یا <strong>ربات</strong>.
</p>

<p>

<a href="https://pypi.org/project/nsplusthon/">
  <img src="https://img.shields.io/pypi/v/nsplusthon.svg?style=for-the-badge" alt="PyPI">
</a>

<a href="https://pypi.org/project/nsplusthon/">
  <img src="https://img.shields.io/pypi/pyversions/nsplusthon.svg?style=for-the-badge" alt="Python versions">
</a>

<a href="LICENSE">
  <img src="https://img.shields.io/badge/License-GPL--3.0-lightblue.svg?style=for-the-badge" alt="License">
</a>

<a href="https://pypi.org/project/nsplusthon/">
  <img src="https://img.shields.io/pypi/dm/nsplusthon?label=downloads&style=for-the-badge" alt="Downloads">
</a>

<a href="https://github.com/Amogrotex/NSplusthon/stargazers">
  <img src="https://img.shields.io/github/stars/Amogrotex/NSplusthon?style=for-the-badge" alt="Stars">
</a>

<a href="https://github.com/Amogrotex/NSplusthon/issues">
  <img src="https://img.shields.io/github/issues/Amogrotex/NSplusthon?style=for-the-badge" alt="Issues">
</a>

</p>

<p>

<a href="https://amogrotex.github.io/NSplusthon/"><strong>Documentation</strong></a>
·
<a href="https://amogrotex.github.io/NSplusthon/en/"><strong>English docs</strong></a>
·
<a href="https://pypi.org/project/nsplusthon/"><strong>PyPI</strong></a>
·
<a href="https://github.com/Amogrotex/NSplusthon"><strong>GitHub</strong></a>
·
<a href="https://web.splus.ir"><strong>Soroush Plus</strong></a>

</p>

</div>

---

## What is NSplusthon?

**NSplusthon** is an [asyncio](https://docs.python.org/3/library/asyncio.html) Python 3.9+ library that talks to **Soroush Plus** (سروش پلاس, also called **SPlus**) over MTProto — the same idea as [Telethon](https://github.com/LonamiWebs/Telethon) for Telegram.

Use it to write **userbots** and **bots**: send messages and files, download media, handle events, and route commands. No API ID or API hash is required.

It is a maintained fork of [SPlusthon](https://github.com/shayanheidari01/SPlusthon) with a faster AES-IGE path, a command router, rate limiting, and encrypted sessions. The import is `nsplusthon`; the client class is still `SoroushClient`.

```bash
pip install nsplusthon
```

```python
from nsplusthon import SoroushClient, events
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())

@client.on(events.NewMessage)
async def handler(event):
    await event.reply("سلام 👋")

client.start()
client.run_until_disconnected()
```

> Do **not** name your script `nsplusthon.py` — it will shadow the package.

---

## Why NSplusthon instead of SPlusthon / spluspy?

| | **NSplusthon** | SPlusthon | spluspy |
| --- | :---: | :---: | :---: |
| Telethon-style `SoroushClient` | yes | yes | no |
| AES-IGE (libssl, 256 KiB) | **~100 MiB/s** | ~5.6 MiB/s | ~5.9 MiB/s |
| `import` time (lazy) | **~15 ms** | ~340 ms | — |
| Command router + rate limit | yes | no | no |
| Encrypted `StringSession` | yes | no | no |
| Typed (`py.typed`) | yes | — | — |

Full write-up: [Compare](https://amogrotex.github.io/NSplusthon/compare/) · [Migrate from SPlusthon](https://amogrotex.github.io/NSplusthon/migration/)

---

## Features

- User accounts **and** bots
- High-performance **asyncio** client
- **Command router**: `/help`, middleware, per-user state, rate limits
- Sliding-window **RateLimiter** (avoid FloodWait / bans)
- Passphrase-encrypted sessions (AES-IGE + PBKDF2)
- Lazy import (PEP 562): `import nsplusthon` in ~15 ms
- Sync **and** async APIs
- Soroush **TL schema** (layer 182)
- `StringSession` / `MemorySession` / `SQLiteSession`
- WebSocket transport and DC routing
- RSA + AES
- **No API ID / API hash**
- Telethon-like API so Telegram bots are easy to port
- Typed package for Pyright / Pylance / mypy

<p dir="rtl">

- پشتیبانی کامل از **حساب کاربری** و **ربات**
- 🎛️ **Command Router** با `/help` خودکار، middleware و rate-limit
- 🔐 Session رمزنگاری‌شده با passphrase
- 🪜 API مشابه Telethon برای مهاجرت آسان
- 🗝️ بدون نیاز به API ID و API Hash

</p>

---

## Install

Requires **Python 3.9+**.

```bash
pip install nsplusthon
```

Faster crypto, SOCKS proxies, and media helpers:

```bash
pip install "nsplusthon[fast]"
```

Latest git snapshot:

```bash
pip install "git+https://github.com/Amogrotex/NSplusthon.git"
```

| Extra | What you get |
| --- | --- |
| `cryptg` | Faster C crypto (recommended) |
| `socks` | SOCKS proxies |
| `fast` | `cryptg` + `socks` + Pillow + hachoir + isal |
| `dev` | pytest stack |

Core dependencies: `aiohttp`, `pyaes`, `rsa`.

---

## Quick start

```python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())
client.start()
```

Send a message, a file, or download media:

```python
client.send_message("username", "سلام از NSplusthon")
client.send_file("username", "/path/image.jpg")

message = client.get_messages("username", limit=1)[0]
message.download_media()
```

### Sync API

```python
from nsplusthon.sync import SoroushClient
from nsplusthon.sessions import StringSession

with SoroushClient(StringSession()) as client:
    print(client.get_me())
    client.send_message("username", "درود!")
```

### Saved / encrypted session

```python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

session = "1AwA..."  # string from the first login

with SoroushClient(StringSession(session)) as client:
    print(client.get_me())

enc = StringSession.encrypt_session(session, "passphrase")
later = StringSession.from_encrypted(enc, "passphrase")
```

### Command router

```python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession
from nsplusthon.router import Router

router = Router().use_rate_limit(max_calls=40, period=60)

@router.command("start", description="Says hello")
async def cmd_start(event, args, kwargs):
    name = kwargs.get("name", "دوست")
    await event.reply(f"سلام {name}!")

client = SoroushClient(StringSession())
client.use_router(router)
client.start()
```

---

## Documentation

Persian (default): [amogrotex.github.io/NSplusthon](https://amogrotex.github.io/NSplusthon/)

- [Quick start](https://amogrotex.github.io/NSplusthon/quick-start/)
- [English overview](https://amogrotex.github.io/NSplusthon/en/)
- [Compare libraries](https://amogrotex.github.io/NSplusthon/compare/)
- [Migrate from SPlusthon](https://amogrotex.github.io/NSplusthon/migration/)
- [Command router](https://amogrotex.github.io/NSplusthon/concepts/router/)
- [Examples](https://amogrotex.github.io/NSplusthon/examples/index/)
- [FAQ](https://amogrotex.github.io/NSplusthon/faq/)

---

## Performance

AES-IGE via **libssl** (no cryptg), 256 KiB, Intel Xeon @ 2.60 GHz, Python 3.13.14, best of 9. Bit-identical to the C reference.

| Library | Encrypt time | Throughput |
| --- | :---: | :---: |
| **NSplusthon** | **2.50 ms** | **100.1 MiB/s** |
| SPlusthon | 44.86 ms | 5.6 MiB/s |
| spluspy | 42.47 ms | 5.9 MiB/s |

Micro-benchmarks (`benchmarks/microbench.py`) on Python 3.13:

| Operation | Time |
| --- | --- |
| `import nsplusthon` (lazy) | **~15 ms** (was ~340 ms) |
| TL pack (`SendMessageRequest`) | 2.4 µs |
| `StringSession` restore | 5.6 µs |
| Router parse + resolve | 2.3 µs |

Scripts: [`benchmarks/aes_ige_bench.py`](benchmarks/aes_ige_bench.py) · [`benchmarks/microbench.py`](benchmarks/microbench.py)

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Please open an issue first, work on a branch, and run `python -m compileall nsplusthon` before the PR.

## License

[GNU GPL v3](LICENSE).

This is a **third-party** library and is not affiliated with Soroush Plus.
Follow the [Soroush Plus terms](https://web.splus.ir). You are responsible for how you use it.

---

<div align="center">

**NSplusthon** is maintained by [AmoGrotex](https://github.com/Amogrotex).

Forked from **SPlusthon** by [Shayan Heidari](https://github.com/shayanheidari01),
which is based on [Telethon](https://github.com/LonamiWebs/Telethon) by Lonami.

</div>
