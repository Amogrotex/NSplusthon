# Command Router (چارچوب دستورات)

به‌جای نوشتن زنجیره‌های `if text == "/start"`، دستورات را روی یک `Router` تعریف کنید؛
پارسینگ، فیلتر `@BotName`، آرگومان‌ها، state کاربر، middleware و دستور `/help` خودکار
برای شما فراهم می‌شوند.

---

## نصب و شروع سریع

```python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession
from nsplusthon.router import Router

router = Router()

@router.command('start', description='سلام می‌گوید')
async def cmd_start(event, args, kwargs):
    name = kwargs.get('name', 'دوست')
    await event.reply(f'سلام {name}!')

@router.command('setname', usage='<name>')
async def cmd_setname(event, args):
    router.user_state(event.sender_id)['name'] = args[0]
    await event.reply('ثبت شد')

client = SoroushClient(StringSession())
client.use_router(router)   # یا router.attach(client)
client.start()
client.run_until_disconnected()
```

---

## سینتکس دستورات

| واردی | تفسیر |
|---|---|
| `/start` | نام دستور |
| `/start hello` | `args = ['hello']` |
| `/start --name=world` | `kwargs = {'name': 'world'}` |
| `/start --name world` | `kwargs = {'name': 'world'}` |
| `/start --verbose` | `kwargs = {'verbose': True}` |
| `!start` | پیش‌فرض هر دو پیشوند `/` و `!` پذیرفته است |
| `/start@MyBot` | اگر `name='MyBot'` باشد پذیرفته، وگرنه نادیده گرفته می‌شود |

## امضای callback

callback می‌تواند sync یا async باشد و هر ترکیب از این پارامترها را **به‌صورت نامی** بخواهد:

```python
@router.command('hi')
def only_event(event):            # sync هم می‌شود
    print(event.chat_id)

@router.command('args')
async def with_args(event, args): ...

@router.command('all')
async def everything(event, args, kwargs, ctx, router, command): ...

@router.command('var')
async def variadic(event, *args): ...
```

## Middleware

هر middleware با امضای `async def mw(event, next_handler)` ثبت می‌شود؛
برای ادامه زنجیره `await next_handler()` را صدا بزنید، یا اصلاً صدا نزنید تا
دستور را بلوکه کنید (مدل onion — فاز خروجی middlewareهای بیرونی اجرا می‌شود):

```python
@router.middleware
async def logger(event, next_handler):
    print('دریافت:', event.raw_text)
    await next_handler()
```

## Rate Limit داخلی

برای جلوگیری از `FloodWaitError` (و بدتر از آن، بن شدن) لیمیت‌ساز
per-chat درون‌سازی شده است:

```python
router = Router().use_rate_limit(max_calls=40, period=60)  # ۴۰ پیام در دقیقه
```

برای کنترل دقیق‌تر می‌توانید مستقیماً از `nsplusthon.ratelimit.RateLimiter`
(sliding window، asyncio-safe) استفاده کنید.

## State

```python
user  = router.user_state(event.sender_id)   # دیکشنری مستقل برای هر کاربر
chat  = router.chat_state(event.chat_id)     # دیکشنری مستقل برای هر چت
user['last_seen'] = time.time()
```

State در حافظه است؛ برای ماندگاری خودتان ذخیره کنید.

## دستور /help خودکار

اگر `/help` را تعریف نکنید، Router آن را خودکار می‌سازد و فهرست دستورات را
با توضیح و usage نمایش می‌دهد.
