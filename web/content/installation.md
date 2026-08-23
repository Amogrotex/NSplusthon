---
hide:
  - navigation
---

# نصب و راه‌اندازی

راهنمای نصب NSplusthon و پیکربندی محیط توسعه.

---

## نصب پایتون

NSplusthon یک کتابخانه پایتون است، بنابراین ابتدا باید پایتون را از [python.org](https://www.python.org/downloads/) دانلود و نصب کنید (**نسخه 3.9 یا بالاتر** لازم است).

!!! note "یادداشت"
    پس از نصب پایتون، pip را به آخرین نسخه ارتقا دهید:

```bash
python3 -m pip install --upgrade pip
```

---

## نصب کتابخانه

```bash
python3 -m pip install --upgrade nsplusthon
```

نصب پیشنهادی با رمزنگاری سریع، پروکسی و پردازش رسانه:

```bash
python3 -m pip install --upgrade "nsplusthon[fast]"
```

---

## نصب نسخه توسعه‌دهنده

آخرین کد روی شاخه `main`:

```bash
python3 -m pip install --upgrade "git+https://github.com/Amogrotex/NSplusthon.git"
```

یا یک تگ مشخص (مثال):

```bash
python3 -m pip install --upgrade "git+https://github.com/Amogrotex/NSplusthon.git@v1.3.0"
```

!!! warning "هشدار"
    نسخه git ممکن است ناپایدار باشد. برای production از نسخه PyPI استفاده کنید.

---

## تأیید نصب

```bash
python3 -c "import nsplusthon; print(nsplusthon.__version__)"
```

نسخه کتابخانه باید در خروجی نمایش داده شود.

!!! warning "نام فایل"
    اسکریپت خود را `nsplusthon.py` نام‌گذاری نکنید؛ با خود پکیج تداخل پیدا می‌کند.

---

## وابستگی‌ها

وابستگی‌های اصلی همراه پکیج نصب می‌شوند: **aiohttp**، **pyaes**، **rsa**.

### اختیاری

| Extra / پکیج | کاربرد |
| --- | --- |
| `cryptg` | رمزنگاری C؛ برای ترافیک زیاد یا فایل‌های بزرگ توصیه می‌شود |
| `python-socks[asyncio]` | پروکسی SOCKS |
| `Pillow` | تغییر اندازه خودکار تصاویر بزرگ |
| `hachoir` | متادیتای رسانه (عنوان، مدت، هنرمند) |
| `isal` | فشرده‌سازی سریع‌تر |

```bash
pip install "nsplusthon[cryptg]"
pip install "nsplusthon[socks]"
pip install "nsplusthon[fast]"
```

---

## نصب پشتیبانی پروکسی

```bash
pip install "nsplusthon[socks]"
```

```python
from nsplusthon import SoroushClient

proxy = {
    "proxy_type": "socks5",
    "addr": "127.0.0.1",
    "port": 1080,
    "rdns": True,
}

client = SoroushClient("session_name", proxy=proxy)
```

API ID و Hash لازم نیست مگر خودتان بخواهید مقدار اختصاصی بدهید.

---

## عیب‌یابی نصب

### خطای ImportError

اگر `ImportError: cannot import name 'SoroushClient'` دیدید:

1. مطمئن شوید نام فایل اسکریپت شما `nsplusthon.py` نیست
2. کتابخانه را دوباره نصب کنید: `pip install --upgrade nsplusthon`

### خطای نصب وابستگی‌ها

```bash
pip install --upgrade setuptools wheel
pip install --upgrade nsplusthon
```

---

## مرحله بعدی

پس از نصب موفقیت‌آمیز، به بخش [شروع سریع](quick-start.md) بروید.
