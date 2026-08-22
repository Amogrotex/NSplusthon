---
hide:
  - navigation
  - toc
---

<div class="ns-hero" markdown>

<img src="logo.png" alt="NSplusthon">

# NSplusthon

کلاینت async پایتون برای سروش پلاس. حساب کاربری و ربات. بدون API ID.

Async Python client for Soroush Plus. Users and bots. No API id or hash.

<div class="ns-actions" markdown>

[شروع سریع](quick-start.md){ .ns-btn }
[نصب](installation.md){ .ns-btn .ghost }
[English](en/index.md){ .ns-btn .ghost }
[GitHub](https://github.com/Amogrotex/NSplusthon){ .ns-btn .ghost }

</div>

<div class="ns-meta">
<span class="ns-chip">Python 3.9+</span>
<span class="ns-chip">asyncio</span>
<span class="ns-chip">MTProto</span>
<span class="ns-chip">GPL-3.0</span>
</div>

</div>

```bash
pip install nsplusthon
```

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

!!! note "ورود ربات"
    کلاینت اصلی `SoroushClient` است. برای ربات از `start(bot_token=...)` استفاده کنید. اسکریپت را `nsplusthon.py` نام نگذارید.

## بخش‌ها

<div class="grid cards" markdown>

-   :material-rocket-launch:{ .lg .middle } __شروع سریع__

    ---

    اولین کلاینت در چند دقیقه.

    [:octicons-arrow-right-24: شروع](quick-start.md)

-   :material-download:{ .lg .middle } __نصب__

    ---

    PyPI، extras و عیب‌یابی.

    [:octicons-arrow-right-24: نصب](installation.md)

-   :material-translate:{ .lg .middle } __English__

    ---

    Short overview and first bot.

    [:octicons-arrow-right-24: Open](en/index.md)

-   :material-book-open-variant:{ .lg .middle } __مفاهیم__

    ---

    Entity، Session، رویدادها، Router.

    [:octicons-arrow-right-24: مفاهیم](concepts/index.md)

-   :material-code-braces:{ .lg .middle } __مثال‌ها__

    ---

    پیام، فایل، چت و کانال.

    [:octicons-arrow-right-24: مثال‌ها](examples/index.md)

-   :material-api:{ .lg .middle } __مرجع API__

    ---

    متدهای `SoroushClient` و رویدادها.

    [:octicons-arrow-right-24: API](api-reference.md)

-   :material-frequently-asked-questions:{ .lg .middle } __سوالات متداول__

    ---

    نصب، session، FloodWait.

    [:octicons-arrow-right-24: FAQ](faq.md)

-   :material-compare:{ .lg .middle } __مقایسه__

    ---

    NSplusthon و کلاینت‌های دیگر.

    [:octicons-arrow-right-24: مقایسه](compare.md)

</div>

## لینک‌ها

[GitHub](https://github.com/Amogrotex/NSplusthon) ·
[PyPI](https://pypi.org/project/nsplusthon/) ·
[سروش پلاس](https://web.splus.ir)
