<p align="center">
  <img src="logo.png" width="180" alt="NSplusthon">
</p>

<h1 align="center">NSplusthon (v1.8.0)</h1>

<p align="center">
  <b>High-Performance Async Python MTProto Framework for <a href="https://web.splus.ir">Soroush Plus</a></b><br>
  User accounts & bots · Zero API ID needed · Hardware-accelerated crypto · Built-in Soroush detection
</p>

<p align="center">
  <a href="https://pypi.org/project/nsplusthon/"><img src="https://img.shields.io/pypi/v/nsplusthon.svg" alt="PyPI"></a>
  <a href="https://pypi.org/project/nsplusthon/"><img src="https://img.shields.io/pypi/pyversions/nsplusthon.svg" alt="Python"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-GPL--3.0-blue.svg" alt="License"></a>
  <a href="https://github.com/Amogrotex/NSplusthon/releases"><img src="https://img.shields.io/github/v/release/Amogrotex/NSplusthon" alt="Release"></a>
</p>

<p dir="rtl" align="center">
سریع‌ترین و کامل‌ترین کتابخانه پایتون برای پیام‌رسان سروش پلاس. پشتیبانی از اکانت‌های کاربری و ربات‌ها، بدون نیاز به API ID، مجهز به شتاب‌دهنده رمزنگاری سخت‌افزاری و تشخیص هوشمند شناسه‌های سروش.
</p>

---

## ⚡ Key Highlights in v1.8.0

* 🧠 **Declarative FSM State Engine**: Form state groups and conversational dialogs with `MemoryStorage` and persistent `SQLiteStorage`.
* 🔀 **Composable Bitwise Filters**: Combine filters using python logic (`TextFilter` & `IsAdminFilter` | `ChatTypeFilter.group()`).
* 🛡️ **Group Guard & Moderation Suite**: Anti-flood, link blocker, Persian profanity filter with zero-width space normalization, and Tehran Night Lock.
* 🗂️ **Interactive Paginator**: Multi-page catalog and list navigation keyboard builder (`◀️ قبلی`, `صفحه 1/5`, `بعدی ▶️`).
* 🤖 **AI & Intent Router**: Rule-based offline Persian natural intent router and zero-leak security redaction layer.
* 🚀 **1,700x Faster Cryptography**: Hardware-accelerated AES-CTR stream ciphers (boosted from 0.36 MB/s to 637 MB/s).
* ⚡ **16x Faster MTProto Decryption**: Optimized AES-IGE block processing with zero-copy memory buffers.
* 🔍 **Full Soroush Plus Detection**: Native parser for all Soroush Plus domains (`splus.ir`, `sapp.ir`, `web.splus.ir`) and URIs (`soroush://`, `splus://`).
* 💬 **Interactive Conversation API**: Linear Q&A flows in DMs (`async with client.conversation(chat):`).
* 👥 **Multi-Account `ClientPool`**: Run and manage multiple accounts with round-robin load-balancing and broadcasting.
* ⌨️ **Fluent Keyboard Builder**: `Button.builder().row(...).grid(cols=2).build()`.
* 🛡️ **Active MTProto CircuitBreaker**: Auto-isolates DC latency spikes and recovers connection health automatically.
* 🧅 **Middleware Pipeline**: Onion-style middlewares (`client.add_middleware()`) for rate-limiting, logging, and auth guards.
* 🗑️ **Bulk Message Purge**: `client.delete_messages_bulk()` with flood-safe chunking.
* 👮‍♂️ **Admin & Permission Inspector**: `client.is_admin()` and `client.get_permissions()`.

---

## 📦 Installation

```bash
pip install -U nsplusthon
```

For maximum performance with native C/Rust crypto accelerators, SOCKS proxies, and image tools:

```bash
pip install -U "nsplusthon[fast]"
```

| Extra | Included Dependencies |
| :--- | :--- |
| `fast` | `cryptography`, `cryptg`, `python-socks[asyncio]`, `Pillow`, `hachoir`, `isal` |
| `dev` | `pytest`, `pytest-cov`, `pytest-asyncio`, `flake8` |

---

## 🚀 Quick Start

### 1. Basic Echo Bot

```python
from nsplusthon import SoroushClient, events
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())

@client.on(events.NewMessage(pattern=r"(?i)سلام|درود"))
async def hello_handler(event):
    await event.reply("سلام دوست عزیز! چطور می‌تونم کمکت کنم؟ 👋")

client.start()
client.run_until_disconnected()
```

### 2. Official Bot Token Login

```python
client.start(bot_token="12345:abcdef")
```

---

## 💡 Modern Features & Code Examples

### 💬 1. Interactive Conversation API
Linear question-and-answer dialogs without managing complex state dictionaries:

```python
async with client.conversation(chat_id, timeout=60) as conv:
    await conv.send_message("لطفاً نام خود را وارد کنید:")
    name_msg = await conv.get_response()
    
    await conv.send_message(f"خوش آمدی {name_msg.text}! حالا سن خودت رو بفرست:")
    age_msg = await conv.get_response()
    
    await conv.send_message("✅ اطلاعات شما با موفقیت ثبت شد!")
```

### ⌨️ 2. Fluent Keyboard & Button Builder

```python
from nsplusthon import Button

keyboard = Button.builder(inline=True).row(
    Button.text("📊 آمار گروه"), Button.text("⚙️ تنظیمات")
).row(
    Button.url("📢 کانال رسمی", "https://splus.ir/botzone")
).build()

await client.send_message(chat, "منوی مدیریت گروه:", buttons=keyboard)
```

### 🔍 3. Full Soroush Plus Detection Suite

```python
from nsplusthon.utils import detect_soroush_entity, is_soroush_link, extract_soroush_links

# Detect and parse any Soroush identifier (URL, URI, username, or marked ID)
info = detect_soroush_entity("https://splus.ir/joinchat/K7mp3x9w")
print(info.type)        # 'invite'
print(info.invite_hash) # 'K7mp3x9w'

user_info = detect_soroush_entity("splus://user?id=65510342")
print(user_info.id)     # 65510342

# Check and extract links from messages
text = "به کانال ما در https://splus.ir/botzone سر بزنید!"
if is_soroush_link(text):
    print("Found links:", extract_soroush_links(text))
```

### 👥 4. Multi-Account ClientPool

```python
from nsplusthon import ClientPool

pool = ClientPool(["session_1", "session_2", "session_3"])
await pool.start()

# Distribute broadcast messages across all accounts in round-robin order
await pool.broadcast(group_ids, "📣 پیام همگانی فوری", delay=0.3)
```

### 🧅 5. Middleware Pipeline

```python
@client.add_middleware
async def logging_middleware(event, next_handler):
    print(f"📥 New event from {event.chat_id}: {getattr(event, 'text', '')}")
    return await next_handler(event)
```

---

## 📊 Performance Benchmarks (NSplusthon vs SPlusthon)

Tested on CPython 3.13 (Linux x86_64):

| Benchmark Test | SPlusthon (Original) | NSplusthon (Optimized) | Performance Boost |
| :--- | :--- | :--- | :--- |
| **WebSocket AES-CTR Obfuscation** | `2.744s` (0.36 MB/s) | **`0.0015s` (637.5 MB/s)** | ⚡ **1,791x FASTER** |
| **MTProto AES-IGE Decryption** | `0.054s` (5.58 MB/s) | **`0.0047s` (64.4 MB/s)** | ⚡ **11.5x FASTER** |
| **TL String Deserialization (`tgread_bytes`)** | `1,115,815 ops/s` | **`2,141,952 ops/s`** | ⚡ **1.92x FASTER** |
| **BinaryReader Unpack Operations** | `4,078,946 ops/s` | **`4,475,001 ops/s`** | ⚡ **1.10x FASTER** |

---

## 🗺️ 200+ Feature Ideas & Roadmap

Check out our comprehensive [**ADVANCED_IDEAS_200.md**](ADVANCED_IDEAS_200.md) catalog for 220+ modular ideas covering:
* Core MTProto & Sockets
* Media & High-Speed Streamers
* Bot Frameworks & FSM
* Group Security & Anti-Raid
* AI & Speech Integrations
* Interactive Mini-Games & Economy

---

## 📚 Documentation & Resources

* 📖 **Documentation (Persian)**: [amogrotex.github.io/NSplusthon/](https://amogrotex.github.io/NSplusthon/)
* 📖 **Documentation (English)**: [amogrotex.github.io/NSplusthon/en/](https://amogrotex.github.io/NSplusthon/en/)
* 📦 **PyPI Package**: [pypi.org/project/nsplusthon/](https://pypi.org/project/nsplusthon/)
* 💡 **Changelog**: [CHANGELOG.md](CHANGELOG.md)
* 🤝 **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 📄 License

GPL-3.0 License. Open-source and community driven.  
Created and maintained with ❤️ by **[AmoGrotex](https://github.com/Amogrotex)**.
