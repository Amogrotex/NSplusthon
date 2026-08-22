<p align="center">
  <img src="logo.png" width="160" alt="NSplusthon">
</p>

# NSplusthon

Python client for [Soroush Plus](https://web.splus.ir) (سروش پلاس). Same general shape as [Telethon](https://github.com/LonamiWebs/Telethon): asyncio, events, `StringSession`. Works as a user or a bot. You don't need an API id/hash.

Import is `nsplusthon`. The client class is `SoroushClient`.

<p dir="rtl">
کلاینت پایتون برای سروش پلاس. هم حساب کاربری، هم ربات. بدون API ID.
</p>

[docs](https://amogrotex.github.io/NSplusthon/) ·
[en](https://amogrotex.github.io/NSplusthon/en/) ·
[pypi](https://pypi.org/project/nsplusthon/)

```
pip install nsplusthon
# optional: faster crypto + socks + media helpers
pip install "nsplusthon[fast]"
```

Python 3.9+. Don't name your file `nsplusthon.py`.

## example

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

Bot token:

```python
client.start(bot_token="12345:…")
```

## usage

```python
client.send_message("username", "سلام")
client.send_file("username", "photo.jpg")

msg = client.get_messages("username", limit=1)[0]
msg.download_media()
```

If you'd rather not write `async`/`await`:

```python
from nsplusthon.sync import SoroushClient
from nsplusthon.sessions import StringSession

with SoroushClient(StringSession()) as client:
    print(client.get_me())
    client.send_message("username", "درود")
```

Reuse a session string from a previous login:

```python
session = "1AwA..."
with SoroushClient(StringSession(session)) as client:
    print(client.get_me())
```

Encrypt that string if you're stuffing it in an env var:

```python
enc = StringSession.encrypt_session(session, "passphrase")
session = StringSession.from_encrypted(enc, "passphrase")
```

Commands without hand-rolled parsers:

```python
from nsplusthon.router import Router

router = Router().use_rate_limit(max_calls=40, period=60)

@router.command("start")
async def cmd_start(event, args, kwargs):
    await event.reply("ok")

client.use_router(router)
```

## extras

| extra | |
| --- | --- |
| `cryptg` | C crypto |
| `socks` | SOCKS |
| `fast` | cryptg + socks + Pillow + hachoir + isal |
| `dev` | pytest |

Hard deps: `aiohttp`, `pyaes`, `rsa`.

## numbers

AES-IGE through libssl, 256 KiB, no cryptg, best of 9 on a Xeon @ 2.60 GHz / CPython 3.13: about **100 MiB/s**. `import nsplusthon` is lazy and lands around 15 ms. Scripts are in `benchmarks/`.

## docs

- [quick start](https://amogrotex.github.io/NSplusthon/quick-start/)
- [router](https://amogrotex.github.io/NSplusthon/concepts/router/)
- [examples](https://amogrotex.github.io/NSplusthon/examples/index/)
- [faq](https://amogrotex.github.io/NSplusthon/faq/)

PRs: [CONTRIBUTING.md](CONTRIBUTING.md). License is [GPL-3.0](LICENSE). Not affiliated with Soroush Plus; their [terms](https://web.splus.ir) still apply.

Maintained by [AmoGrotex](https://github.com/Amogrotex).
