---
hide:
  - navigation
---

<div dir="ltr" lang="en">

# NSplusthon

**NSplusthon** is an asyncio Python library for the **Soroush Plus** (سروش پلاس / **SPlus**) messenger API. Write **userbots** and **bots** with a Telethon-style client. No API ID or API hash required.

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

[English overview](en/index.md) · [Install](installation.md)

</div>

---

# مستندات NSplusthon

**NSplusthon** یک کتابخانه پایتون مبتنی بر **asyncio** برای تعامل با API پیام‌رسان **سروش پلاس** است. می‌توانید هم با **حساب کاربری** و هم با **ربات** کار کنید.

!!! note "یادداشت"
    این مستندات هم **UserBot** و هم **ربات** را پوشش می‌دهد. کلاینت اصلی `SoroushClient` است. برای ورود ربات از `start(bot_token=...)` استفاده کنید.

---

## چرا NSplusthon؟

- **سادگی**: API شبیه Telethon برای سروش‌پلاس
- **کارایی**: مسیر AES-IGE روی libssl حدود ۱۰۰ MiB/s؛ ایمپورت lazy حدود ۱۵ms
- **امکانات**: ارسال پیام و فایل، رویدادها، Command Router، rate-limit، session رمزنگاری‌شده
- **بدون API ID / Hash**: credentials پیش‌فرض داخل کتابخانه است
- **امنیت**: `StringSession` قابل رمزنگاری با passphrase

---

## بخش‌های اصلی مستندات

<div class="grid cards" markdown>

-   :material-rocket-launch:{ .lg .middle } __شروع سریع__

    ---

    راهنمای سریع برای شروع کار با NSplusthon در کمتر از ۵ دقیقه.

    [:octicons-arrow-right-24: شروع کنید](quick-start.md)

-   :material-cog:{ .lg .middle } __نصب و راه‌اندازی__

    ---

    راهنمای نصب کتابخانه و وابستگی‌های اختیاری.

    [:octicons-arrow-right-24: نصب کنید](installation.md)

-   :material-translate:{ .lg .middle } __English overview__

    ---

    What NSplusthon is and a first bot.

    [:octicons-arrow-right-24: Read in English](en/index.md)

-   :material-compare:{ .lg .middle } __مقایسه کتابخانه‌ها__

    ---

    NSplusthon در برابر کلاینت‌های دیگر.

    [:octicons-arrow-right-24: مقایسه](compare.md)

-   :material-book-open-variant:{ .lg .middle } __مفاهیم پایه__

    ---

    Entity، Session، رویدادها و Command Router.

    [:octicons-arrow-right-24: یاد بگیرید](concepts/index.md)

-   :material-code-braces:{ .lg .middle } __مثال‌ها__

    ---

    مثال‌های عملی و کاربردی برای یادگیری بهتر.

    [:octicons-arrow-right-24: ببینید](examples/index.md)

-   :material-api:{ .lg .middle } __مرجع API__

    ---

    متدهای اصلی `SoroushClient` و رویدادها.

    [:octicons-arrow-right-24: بررسی کنید](api-reference.md)

-   :material-frequently-asked-questions:{ .lg .middle } __سوالات متداول__

    ---

    پاسخ به سوالات رایج کاربران.

    [:octicons-arrow-right-24: بخوانید](faq.md)

</div>

---

## نمای کلی کتابخانه

```python
from nsplusthon import SoroushClient, events
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())

@client.on(events.NewMessage(pattern="(?i)سلام"))
async def handler(event):
    await event.reply("سلام! خوش آمدید.")

client.start()
client.run_until_disconnected()
```

---

## پیش‌نیازها

- پایتون **3.9** یا بالاتر
- pip (آخرین نسخه)
- آشنایی مقدماتی با asyncio در پایتون

---

## لینک‌های مفید

- [GitHub](https://github.com/Amogrotex/NSplusthon)
- [PyPI](https://pypi.org/project/nsplusthon/)
- [سروش‌پلاس](https://web.splus.ir)
- [مرجع API همین سایت](api-reference.md)
- [English](en/index.md)
