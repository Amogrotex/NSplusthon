---
hide:
  - navigation
---

<div dir="ltr" lang="en">

# Migrate from SPlusthon

NSplusthon is API-compatible with [SPlusthon](https://github.com/shayanheidari01/SPlusthon) for the common path: `SoroushClient`, events, and sessions. The package name changed.

## 1. Swap the dependency

```bash
pip uninstall splusthon
pip install nsplusthon
```

## 2. Rewrite imports

```python
# before
from splusthon import SoroushClient, events
from splusthon.sessions import StringSession

# after
from nsplusthon import SoroushClient, events
from nsplusthon.sessions import StringSession
```

Replace every `splusthon` / `SPlusthon` import with `nsplusthon` / `NSplusthon`. **Do not rename `SoroushClient`.**

## 3. Sessions

Existing SPlusthon `StringSession` strings and `.session` SQLite files are intended to load in NSplusthon. After the first successful login, keep using the NSplusthon session file.

Optional: encrypt a string session before putting it in an env var:

```python
from nsplusthon.sessions import StringSession

enc = StringSession.encrypt_session(session, "passphrase")
client_session = StringSession.from_encrypted(enc, "passphrase")
```

## 4. New APIs you can adopt later

None of these are required to migrate:

```python
from nsplusthon.router import Router

router = Router().use_rate_limit(max_calls=40, period=60)

@router.command("start")
async def cmd_start(event, args, kwargs):
    await event.reply("ok")

client.use_router(router)
```

## 5. Checklist

- [ ] Python 3.9+
- [ ] Script is **not** named `nsplusthon.py`
- [ ] `pip show nsplusthon` prints a version
- [ ] Login still works with the old session
- [ ] Event handlers still fire

If something breaks, open an issue with the SPlusthon version you came from and a short repro:  
<https://github.com/Amogrotex/NSplusthon/issues>

</div>
