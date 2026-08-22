<p align="center">
  <img src="logo.png" width="180" alt="NSplusthon">
</p>

<h1 align="center">NSplusthon</h1>

<p align="center">
  Async Python client for <a href="https://web.splus.ir">Soroush Plus</a>
  · user accounts and bots
  · no API id or hash
</p>

<p align="center">
  <a href="https://pypi.org/project/nsplusthon/"><img src="https://img.shields.io/pypi/v/nsplusthon.svg" alt="PyPI"></a>
  <a href="https://pypi.org/project/nsplusthon/"><img src="https://img.shields.io/pypi/pyversions/nsplusthon.svg" alt="Python"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-GPL--3.0-blue.svg" alt="License"></a>
</p>

<p dir="rtl" align="center">
کتابخانه پایتون برای پیام‌رسان سروش پلاس. حساب کاربری و ربات، بدون نیاز به API ID.
</p>

**Docs:** [فارسی](https://amogrotex.github.io/NSplusthon/) · [English](https://amogrotex.github.io/NSplusthon/en/)

NSplusthon talks to Soroush Plus over MTProto. The programming model is the one people already know from Telegram clients: an event loop, `StringSession`, and handlers on `NewMessage`. The import is `nsplusthon`. The client class is `SoroushClient`.

Requires Python 3.9 or newer. Do not name your script `nsplusthon.py` or the import will hit your file instead of the package.

## Install

```bash
pip install nsplusthon
```

Faster crypto, SOCKS proxies, and media helpers:

```bash
pip install "nsplusthon[fast]"
```

| Extra | Adds |
| --- | --- |
| `cryptg` | C implementation of the crypto |
| `socks` | SOCKS proxies |
| `fast` | cryptg, socks, Pillow, hachoir, isal |
| `dev` | pytest |

Runtime dependencies: `aiohttp`, `pyaes`, `rsa`.

## Quick start

```python
from nsplusthon import SoroushClient, events
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())

@client.on(events.NewMessage)
async def handler(event):
    await event.reply("سلام")

client.start()
client.run_until_disconnected()
```

Log in as a bot:

```python
client.start(bot_token="12345:abcdef")
```

## Sending and receiving

```python
client.send_message("username", "سلام")
client.send_file("username", "photo.jpg")

msg = client.get_messages("username", limit=1)[0]
msg.download_media()
```

Same client without writing `async` / `await`:

```python
from nsplusthon.sync import SoroushClient
from nsplusthon.sessions import StringSession

with SoroushClient(StringSession()) as client:
    print(client.get_me())
    client.send_message("username", "درود")
```

## Sessions

After the first login, keep the session string and skip the code prompt next time:

```python
session = "1AwA..."

with SoroushClient(StringSession(session)) as client:
    print(client.get_me())
```

Encrypt that string before putting it in an environment variable:

```python
enc = StringSession.encrypt_session(session, "passphrase")
session = StringSession.from_encrypted(enc, "passphrase")
```

`SQLiteSession` and `MemorySession` are also available.

## Command router

```python
from nsplusthon.router import Router

router = Router().use_rate_limit(max_calls=40, period=60)

@router.command("start")
async def cmd_start(event, args, kwargs):
    await event.reply("ok")

client.use_router(router)
```

See the [router docs](https://amogrotex.github.io/NSplusthon/concepts/router/).

## Performance

On CPython 3.13, AES-IGE through libssl, 256 KiB, no `cryptg`, best of nine runs: about 100 MiB/s. `import nsplusthon` is lazy and takes around 15 ms. Repro scripts live in [`benchmarks/`](benchmarks/).

## More

- [Quick start](https://amogrotex.github.io/NSplusthon/quick-start/)
- [Examples](https://amogrotex.github.io/NSplusthon/examples/index/)
- [FAQ](https://amogrotex.github.io/NSplusthon/faq/)
- [Contributing](CONTRIBUTING.md)

GPL-3.0. Third-party; not affiliated with Soroush Plus. Follow their [terms](https://web.splus.ir).

Maintained by [AmoGrotex](https://github.com/Amogrotex).
