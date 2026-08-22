---
hide:
  - navigation
---

<div dir="ltr" lang="en">

# Compare Soroush Plus Python libraries

People searching for **Soroush Plus**, **SPlus**, **SPlusthon**, **spluspy**, or a **Telethon for سروش پلاس** usually want one of these:

| Library | Role | Client style |
| --- | --- | --- |
| **[NSplusthon](https://github.com/Amogrotex/NSplusthon)** | Maintained fork of SPlusthon | `SoroushClient` (Telethon-like) |
| **[SPlusthon](https://github.com/shayanheidari01/SPlusthon)** | Original Telethon port | `SoroushClient` |
| **spluspy** | Alternate SPlus client | different API |
| **[Telethon](https://github.com/LonamiWebs/Telethon)** | Telegram, not Soroush | `TelegramClient` |

## NSplusthon vs SPlusthon

NSplusthon started as a rebranded import of SPlusthon and then added:

- ~18× faster AES-IGE on the OpenSSL path
- lazy `import nsplusthon` (~15 ms vs ~340 ms)
- command router + sliding-window rate limiter
- passphrase-encrypted `StringSession`
- `py.typed` for type checkers

The public client is still `SoroushClient`. Changing `import splusthon` → `import nsplusthon` is the usual migration. See [Migrate from SPlusthon](migration.md).

## NSplusthon vs Telethon

Same programming model (events, sessions, `send_message`, raw TL requests). Different network: **Soroush Plus MTProto**, not Telegram. You cannot point NSplusthon at `my.telegram.org`.

## Benchmarks

AES-IGE via libssl, 256 KiB, Python 3.13, best of 9 runs:

| Library | Time | Throughput |
| --- | ---: | ---: |
| NSplusthon | 2.50 ms | 100.1 MiB/s |
| SPlusthon | 44.86 ms | 5.6 MiB/s |
| spluspy | 42.47 ms | 5.9 MiB/s |

Repro: [`benchmarks/aes_ige_bench.py`](https://github.com/Amogrotex/NSplusthon/blob/main/benchmarks/aes_ige_bench.py)

</div>

---

## مقایسه به فارسی

اگر دنبال کتابخانه پایتون برای **سروش پلاس** هستید:

- **NSplusthon** — نسخه نگهداری‌شده و سریع‌تر SPlusthon، با Router و session رمزنگاری‌شده
- **SPlusthon** — پروژه بالادستی؛ API تقریباً یکسان است
- **Telethon** — فقط تلگرام است، نه سروش

نصب:

```bash
pip install nsplusthon
```
