<div align="center">

<img src="logo.png" width="200" alt="NSplusthon Logo">

<h1>NSplusthon</h1>

<p>
  <strong>Asynchronous Python library for the Soroush Plus API</strong>
</p>

<p>
  Built on <strong>Telethon</strong> and fully adapted for the
  <strong>Soroush Plus</strong> protocol.
</p>

<p>

<a href="https://pypi.org/project/nsplusthon/">
  <img src="https://img.shields.io/pypi/v/nsplusthon.svg?style=for-the-badge" alt="PyPI">
</a>

<a href="https://pypi.org/project/nsplusthon/">
  <img src="https://img.shields.io/pypi/pyversions/nsplusthon.svg?style=for-the-badge" alt="Python">
</a>

<a href="LICENSE">
  <img src="https://img.shields.io/github/license/Amogrotex/NSplusthon?style=for-the-badge" alt="License">
</a>

<a href="https://github.com/Amogrotex/NSplusthon/stargazers">
  <img src="https://img.shields.io/github/stars/Amogrotex/NSplusthon?style=for-the-badge" alt="Stars">
</a>

<a href="https://github.com/Amogrotex/NSplusthon/issues">
  <img src="https://img.shields.io/github/issues/Amogrotex/NSplusthon?style=for-the-badge" alt="Issues">
</a>

<a href="https://github.com/Amogrotex/NSplusthon/actions">
  <img src="https://img.shields.io/github/actions/workflow/status/Amogrotex/NSplusthon/tests.yml?style=for-the-badge" alt="Build">
</a>

</p>

<p>

<a href="https://Amogrotex.github.io/NSplusthon/"><strong>Documentation</strong></a>
•
<a href="https://pypi.org/project/nsplusthon/"><strong>PyPI</strong></a>
•
<a href="https://github.com/Amogrotex/NSplusthon"><strong>GitHub</strong></a>
•
<a href="https://web.splus.ir"><strong>Soroush Plus</strong></a>

</p>

</div>

---

کتابخانه NSplusthon یک کتابخانه مدرن و قدرتمند برای **Python 3** است که بر پایه
**asyncio** توسعه یافته و امکان تعامل مستقیم با **API پیام‌رسان سروش پلاس**
را به‌عنوان **کاربر** یا **ربات** فراهم می‌کند.

این پروژه بر پایه **Telethon** توسعه یافته و برای معماری اختصاصی سروش پلاس
بازطراحی شده است. کتابخانه از **TL Schema (Layer 182)**،
**RSA Encryption**، **DC Routing** و **WebSocket Transport**
پشتیبانی می‌کند و تجربه‌ای سریع، پایدار و نزدیک به کلاینت رسمی ارائه می‌دهد.

> **Note:** لطفاً هنگام استفاده از این کتابخانه، قوانین و شرایط استفاده سروش پلاس را
> رعایت کنید. مسئولیت استفاده از این پروژه بر عهده کاربر است.

## ویژگی‌ها

- پشتیبانی کامل از حساب کاربری و ربات
- مبتنی بر asyncio با کارایی بالا
- امکان استفاده به‌صورت Sync و Async
- پشتیبانی کامل از TL Schema اختصاصی سروش
- مدیریت Session و StringSession
- پشتیبانی از WebSocket
- پشتیبانی از DC Routing
- رمزنگاری RSA و AES
- بدون نیاز به API ID و API Hash
- API مشابه Telethon برای مهاجرت آسان

## نصب

از PyPI:

```bash
pip install nsplusthon
```

یا آخرین نسخه توسعه:

```bash
pip install git+https://github.com/Amogrotex/NSplusthon.git
```

## شروع سریع

```python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())

client.start()
```

## نمونه

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

ارسال پیام

```python
client.send_message(
    "username",
    "سلام از NSplusthon ❤️"
)
```

ارسال فایل

```python
client.send_file(
    "username",
    "/path/image.jpg"
)
```

دانلود رسانه

```python
message = client.get_messages("username", limit=1)[0]
message.download_media()
```

## Session ذخیره‌شده

```python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

session = "1AwA..."

with SoroushClient(StringSession(session)) as client:
    print(client.get_me())
```

## وابستگی‌ها

- aiohttp
- pyaes
- rsa

اختیاری:

- cryptg (افزایش سرعت رمزنگاری)

## مستندات

مستندات کامل پروژه:

https://Amogrotex.github.io/NSplusthon/

## مجوز

این پروژه تحت مجوز **GNU GPL v3** منتشر شده است.

---

<div align="center">

**NSplusthon** is maintained by [AmoGrotex](https://github.com/Amogrotex)

Forked from **SPlusthon** by [Shayan Heidari](https://github.com/shayanheidari01) —
which is itself based on [Telethon](https://github.com/LonamiWebs/Telethon).

</div>
