import{j as m,f as ye,p as we,a as ke,n as Be,h as he,s as te,o as ge,z as sn,b as Kn,c as Xn,d as v,v as Vn,e as an,g as Fe,M as zn,r as $n,i as Jn,k as Zn}from"./markdown-gi6I_PF4.js";import{a as et,r as A,u as Re,L as oe,N as un,b as nt,R as tt,d as st,e as at,B as ut}from"./vendor-DpqnefHb.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const c of i)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function t(i){const c={};return i.integrity&&(c.integrity=i.integrity),i.referrerPolicy&&(c.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?c.credentials="include":i.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(i){if(i.ep)return;i.ep=!0;const c=t(i);fetch(i.href,c)}})();var rn,Ue=et;rn=Ue.createRoot,Ue.hydrateRoot;const it=[{title:"خانه",slug:""},{title:"شروع سریع",slug:"quick-start"},{title:"نصب",slug:"installation"},{title:"مفاهیم",slug:"concepts"},{title:"مثال‌ها",slug:"examples"},{title:"مرجع API",slug:"api-reference"}],rt=[{title:"آغاز",items:[{title:"خانه",slug:""},{title:"شروع سریع",slug:"quick-start"},{title:"نصب",slug:"installation"},{title:"مقایسه",slug:"compare"}]},{title:"مفاهیم",items:[{title:"مرور کلی",slug:"concepts"},{title:"Entity",slug:"concepts/entities"},{title:"Session",slug:"concepts/sessions"},{title:"رویدادها",slug:"concepts/events"},{title:"String Sessions",slug:"concepts/string-sessions"},{title:"خطاها",slug:"concepts/errors"},{title:"API کامل",slug:"concepts/full-api"},{title:"Bot API و MTProto",slug:"concepts/botapi-vs-mtproto"},{title:"asyncio",slug:"concepts/asyncio"},{title:"Command Router",slug:"concepts/router"}]},{title:"مثال‌ها",items:[{title:"مرور کلی",slug:"examples"},{title:"کاربران",slug:"examples/users"},{title:"چت‌ها و کانال‌ها",slug:"examples/chats-and-channels"},{title:"کار با پیام‌ها",slug:"examples/working-with-messages"},{title:"هشدار",slug:"examples/word-of-warning"}]},{title:"مرجع",items:[{title:"مرجع API",slug:"api-reference"},{title:"سوالات متداول",slug:"faq"},{title:"English",slug:"en"}]}],on="https://github.com/Amogrotex/NSplusthon",ot="https://pypi.org/project/nsplusthon/",be="nsplusthon-theme";function ct(){if(typeof window>"u")return"light";const e=window.localStorage.getItem(be);return e==="light"||e==="dark"?e:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function lt(){const[e,n]=A.useState(ct);A.useEffect(()=>{document.documentElement.setAttribute("data-theme",e),window.localStorage.setItem(be,e)},[e]),A.useEffect(()=>{if(window.localStorage.getItem(be))return;const a=window.matchMedia("(prefers-color-scheme: dark)"),i=c=>n(c.matches?"dark":"light");return a.addEventListener("change",i),()=>a.removeEventListener("change",i)},[]);const t=A.useCallback(()=>n(a=>a==="dark"?"light":"dark"),[]);return{theme:e,toggle:t}}const F={viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"},cn=e=>m.jsxs("svg",{...F,...e,"aria-hidden":"true",children:[m.jsx("circle",{cx:"11",cy:"11",r:"7"}),m.jsx("path",{d:"m20 20-3.5-3.5"})]}),dt=e=>m.jsxs("svg",{...F,...e,"aria-hidden":"true",children:[m.jsx("circle",{cx:"12",cy:"12",r:"4"}),m.jsx("path",{d:"M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"})]}),ht=e=>m.jsx("svg",{...F,...e,"aria-hidden":"true",children:m.jsx("path",{d:"M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8"})}),mt=e=>m.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",...e,"aria-hidden":"true",children:m.jsx("path",{d:"M12 2C6.5 2 2 6.6 2 12.3c0 4.5 2.9 8.3 6.8 9.7.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.4-3.4-1.4-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.2-4.6-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.2 9.2 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5 4-1.4 6.8-5.2 6.8-9.7C22 6.6 17.5 2 12 2z"})}),ft=e=>m.jsx("svg",{...F,...e,"aria-hidden":"true",children:m.jsx("path",{d:"M3 6h18M3 12h18M3 18h18"})}),Et=e=>m.jsx("svg",{...F,...e,"aria-hidden":"true",children:m.jsx("path",{d:"M6 6l12 12M18 6L6 18"})}),pt=e=>m.jsx("svg",{...F,...e,"aria-hidden":"true",children:m.jsx("path",{d:"M4 5h10M9 3v2c0 4-2 7-5 8M7 10c0 3 3 5 6 6M13 21l4-9 4 9M15.5 17h5"})}),_t=e=>m.jsxs("svg",{...F,...e,"aria-hidden":"true",children:[m.jsx("rect",{x:"9",y:"9",width:"11",height:"11",rx:"2"}),m.jsx("path",{d:"M5 15V5a2 2 0 0 1 2-2h8"})]}),Tt=e=>m.jsx("svg",{...F,...e,"aria-hidden":"true",children:m.jsx("path",{d:"m5 13 4 4L19 7"})});function gt({onOpenSearch:e,onToggleMenu:n}){const{theme:t,toggle:a}=lt(),[i,c]=A.useState(!1),{pathname:d}=Re();A.useEffect(()=>{const f=()=>c(window.scrollY>8);return f(),window.addEventListener("scroll",f,{passive:!0}),()=>window.removeEventListener("scroll",f)},[]);const _=d.startsWith("/en");return m.jsxs("header",{className:"topbar"+(i?" topbar--scrolled":""),children:[m.jsxs("div",{className:"topbar__capsule",children:[m.jsx("button",{className:"chip chip--menu",onClick:n,"aria-label":"فهرست",children:m.jsx(ft,{})}),m.jsxs(oe,{to:"/",className:"brand","aria-label":"NSplusthon",children:[m.jsx("img",{className:"brand__mark",src:"/NSplusthon/logo.png",alt:"",width:34,height:34}),m.jsx("span",{className:"brand__name",children:"NSplusthon"})]}),m.jsx("span",{className:"topbar__spacer"}),m.jsxs("button",{className:"searchbtn",onClick:e,"aria-label":"جستجو",children:[m.jsx(cn,{}),m.jsx("span",{className:"searchbtn__label",children:"جستجو…"}),m.jsx("span",{className:"kbd",children:"Ctrl K"})]}),m.jsx(oe,{to:_?"/":"/en",className:"chip","aria-label":_?"فارسی":"English",title:_?"فارسی":"English",children:m.jsx(pt,{})}),m.jsx("button",{className:"chip",onClick:a,"aria-label":t==="dark"?"حالت روشن":"حالت تاریک",title:t==="dark"?"حالت روشن":"حالت تاریک",children:t==="dark"?m.jsx(dt,{}):m.jsx(ht,{})}),m.jsx("a",{className:"chip",href:on,target:"_blank",rel:"noreferrer noopener","aria-label":"GitHub",children:m.jsx(mt,{})})]}),m.jsx("nav",{className:"navpill","aria-label":"ناوبری اصلی",children:m.jsx("ul",{className:"navpill__list",children:it.map(f=>m.jsx("li",{children:m.jsx(un,{to:"/"+f.slug,end:f.slug==="",className:({isActive:T})=>"navpill__link"+(T?" navpill__link--active":""),children:f.title})},f.slug))})})]})}function bt({open:e,onNavigate:n}){return m.jsx("aside",{className:"sidebar rail glass"+(e?" sidebar--open":""),"aria-label":"فهرست مستندات",children:rt.map(t=>m.jsxs("div",{className:"rail__section",children:[m.jsx("p",{className:"rail__title",children:t.title}),m.jsx("ul",{className:"rail__list",children:t.items.map(a=>m.jsx("li",{children:m.jsx(un,{to:"/"+a.slug,end:!0,onClick:n,className:({isActive:i})=>"rail__link"+(i?" rail__link--active":""),children:a.title})},a.slug))})]},t.title))})}function At({headings:e}){const n=e.filter(i=>i.depth===2||i.depth===3),[t,a]=A.useState("");return A.useEffect(()=>{if(!n.length)return;const i=n.map(d=>document.getElementById(d.id)).filter(d=>!!d);if(!i.length)return;const c=new IntersectionObserver(d=>{const _=d.filter(f=>f.isIntersecting).sort((f,T)=>f.boundingClientRect.top-T.boundingClientRect.top);_[0]&&a(_[0].target.id)},{rootMargin:"-15% 0px -70% 0px",threshold:0});return i.forEach(d=>c.observe(d)),()=>c.disconnect()},[n.map(i=>i.id).join("|")]),n.length<2?m.jsx("aside",{className:"toc rail","aria-hidden":"true"}):m.jsxs("aside",{className:"toc rail glass","aria-label":"فهرست موضوعات",children:[m.jsx("p",{className:"rail__title",children:"در این صفحه"}),m.jsx("nav",{children:n.map(i=>m.jsx("a",{href:`#${i.id}`,className:"toc__link"+(i.depth===3?" toc__link--d3":"")+(t===i.id?" toc__link--active":""),children:i.text},i.id))})]})}function Nt(){return m.jsx("footer",{className:"footer",children:m.jsxs("p",{children:["NSplusthon — کتابخانه پایتون برای سروش پلاس · GPL-3.0 ·"," ",m.jsx("a",{href:on,target:"_blank",rel:"noreferrer noopener",children:"GitHub"})," ·"," ",m.jsx("a",{href:ot,target:"_blank",rel:"noreferrer noopener",children:"PyPI"})]})})}const St=`---
hide:
  - navigation
---

# مرجع API

در این بخش مستندات کامل API کتابخانه NSplusthon آورده شده است.

---

## کلاس SoroushClient

کلاس اصلی کتابخانه برای تعامل با سروش‌پلاس.

### سازنده

\`\`\`python
SoroushClient(session=None, api_id=None, api_hash=None, 
              connection_retries=None, timeout=timedelta(seconds=60), 
              request_retries=None, connection=None, 
              proxy=None, local_addr=None)
\`\`\`

### پارامترها

| پارامتر | نوع | پیش‌فرض | توضیحات |
|---------|-----|---------|---------|
| session | str/Session | None | نام session یا شیء Session |
| api_id | int | None | شناسه API (پیش‌فرض: credentials داخلی NSplusthon) |
| api_hash | str | None | هش API (پیش‌فرض: credentials داخلی NSplusthon) |
| connection_retries | int | None | تعداد تلاش‌های اتصال مجدد |
| timeout | timedelta | 60 ثانیه | زمان انتظار برای درخواست‌ها |
| request_retries | int | None | تعداد تلاش‌های درخواست مجدد |
| connection | class | None | نوع اتصال |
| proxy | dict | None | تنظیمات پروکسی |
| local_addr | tuple | None | آدرس محلی |

---

## متدهای ارسال پیام

### send_message

\`\`\`python
async def send_message(entity, message=None, *, parse_mode=None, 
                       link_preview=None, file=None, force_document=None, 
                       clear_draft=None, background=None, 
                       supports_streaming=None, schedule=None, 
                       noforwards=None, comment_to=None, 
                       reply_to=None, top_msg_id=None)
\`\`\`

**پارامترها:**

- \`entity\`: مقصد پیام (یوزرنیم، شماره تلفن، شناسه چت)
- \`message\`: متن پیام
- \`parse_mode\`: حالت تجزیه (markdown/html)
- \`link_preview\`: نمایش پیش‌نمایش لینک
- \`file\`: فایل برای ارسال
- \`reply_to\`: پاسخ به پیام خاص

**مثال:**

\`\`\`python
await client.send_message('username', 'سلام!')
await client.send_message('me', 'پیام با **بولد**')
await client.send_message('me', 'https://example.com', link_preview=False)
\`\`\`

---

### send_file

\`\`\`python
async def send_file(entity, file, *, caption=None, 
                    force_document=None, thumb=None, 
                    voice_note=None, video_note=None, 
                    attributes=None, supports_streaming=None, 
                    schedule=None, noforwards=None, 
                    reply_to=None, top_msg_id=None, 
                    comment_to=None, parse_mode=(), 
                    buttons=None, silent=None, 
                    background=None, clear_draft=None, 
                    video_start_ts=None, duration=None, 
                    title=None, performer=None, 
                    force_file=None, file_size=None, 
                    chunk_size=None, file_names=None, 
                    workers=1, api_hash=None)
\`\`\`

**پارامترها:**

- \`entity\`: مقصد فایل
- \`file\`: مسیر فایل یا آبجکت file
- \`caption\`: توضیحات فایل

**مثال:**

\`\`\`python
await client.send_file('me', '/path/to/photo.jpg')
await client.send_file('me', '/path/to/file.pdf', caption='فایل مهم')
\`\`\`

---

## متدهای دریافت پیام

### get_messages

\`\`\`python
async def get_messages(entity, limit=None, *, offset_date=None, 
                       offset_id=None, add_offset=None, 
                       search=None, from_user=None, 
                       ids=None, reverse=None, 
                       wait_time=None)
\`\`\`

**پارامترها:**

- \`entity\`: منبع پیام‌ها
- \`limit\`: تعداد پیام‌ها
- \`search\`: عبارت جستجو
- \`ids\`: شناسه‌های پیام‌ها

**مثال:**

\`\`\`python
messages = await client.get_messages('me', limit=10)
messages = await client.get_messages('me', search='کلمه جستجو')
message = await client.get_messages('me', ids=123)
\`\`\`

---

### iter_messages

\`\`\`python
def iter_messages(entity, limit=None, *, offset_date=None, 
                  offset_id=None, add_offset=None, 
                  search=None, from_user=None, 
                  ids=None, reverse=None, 
                  wait_time=None)
\`\`\`

**مثال:**

\`\`\`python
async for message in client.iter_messages('me', limit=10):
    print(f'{message.id}: {message.text}')
\`\`\`

---

## متدهای ویرایش پیام

### edit_message

\`\`\`python
async def edit_message(entity=None, message=None, *, 
                       text=None, parse_mode=None, 
                       link_preview=None, file=None, 
                       video_start_ts=None, 
                       force_document=None, 
                       schedule=None, noforwards=None)
\`\`\`

**مثال:**

\`\`\`python
await client.edit_message('username', message_id, 'متن جدید')
\`\`\`

---

### delete_messages

\`\`\`python
async def delete_messages(entity, messages, *, revoke=None)
\`\`\`

**مثال:**

\`\`\`python
await client.delete_messages('username', [123, 456])
\`\`\`

---

## متدهای کار با Entity

### get_entity

\`\`\`python
async def get_entity(entity)
\`\`\`

**مثال:**

\`\`\`python
user = await client.get_entity('username')
user = await client.get_entity('+989123456789')
user = await client.get_entity(123456)
\`\`\`

---

### get_input_entity

\`\`\`python
async def get_input_entity(entity)
\`\`\`

**مثال:**

\`\`\`python
input_user = await client.get_input_entity('username')
\`\`\`

---

## متدهای رسانه

### download_profile_photo

\`\`\`python
async def download_profile_photo(entity, file=None, *, 
                                  big=None, download_big=None)
\`\`\`

**مثال:**

\`\`\`python
await client.download_profile_photo('me')
await client.download_profile_photo('username')
\`\`\`

---

### upload_file

\`\`\`python
async def upload_file(file, *, file_size=None, 
                      part_size_kb=None, 
                      file_name=None, 
                      use_cache=None)
\`\`\`

**مثال:**

\`\`\`python
file = await client.upload_file('/path/to/file.jpg')
\`\`\`

---

## رویدادها (Events)

### NewMessage

\`\`\`python
@client.on(events.NewMessage)
async def handler(event):
    print(event.raw_text)
\`\`\`

### پارامترهای NewMessage

| پارامتر | نوع | توضیحات |
|---------|-----|---------|
| incoming | bool | پیام‌های ورودی |
| outgoing | bool | پیام‌های خروجی |
| pattern | str | regex برای فیلتر |
| chats | list | چت‌های خاص |
| blacklist_chats | bool | لیست سیاه چت‌ها |

---

### MessageEdited

\`\`\`python
@client.on(events.MessageEdited)
async def handler(event):
    print('پیام ویرایش شد:', event.raw_text)
\`\`\`

---

### MessageDeleted

\`\`\`python
@client.on(events.MessageDeleted)
async def handler(event):
    print('پیام حذف شد:', event.message_id)
\`\`\`

---

### CallbackQuery

\`\`\`python
@client.on(events.CallbackQuery)
async def handler(event):
    print('کلیک روی دکمه:', event.data)
    await event.answer('پاسخ')
\`\`\`

---

### ChatAction

\`\`\`python
@client.on(events.ChatAction)
async def handler(event):
    if event.user_joined:
        print('عضو جدید وارد شد')
    if event.user_left:
        print('عضو خارج شد')
\`\`\`

---

## خطاها

### RPCError

خطای اصلی API سروش‌پلاس.

### FloodWaitError

خطای انتظار اجباری.

\`\`\`python
from nsplusthon.errors import FloodWaitError

try:
    await client.send_message('username', 'سلام!')
except FloodWaitError as e:
    print(f'صبر کنید {e.seconds} ثانیه')
\`\`\`

---

### PeerFloodError

خطای محدودیت ارسال پیام.

\`\`\`python
from nsplusthon.errors import PeerFloodError

try:
    await client.send_message('username', 'سلام!')
except PeerFloodError:
    print('محدودیت ارسال پیام')
\`\`\`

---

## Session

### StringSession

\`\`\`python
from nsplusthon.sessions import StringSession

# ایجاد StringSession
session = StringSession()

# استفاده از StringSession
client = SoroushClient(StringSession(string), api_id, api_hash)

# ذخیره StringSession
string = client.session.save()
\`\`\`

---

## منابع

- [مفاهیم — API کامل](concepts/full-api.md)
- [GitHub NSplusthon](https://github.com/Amogrotex/NSplusthon)
`,Ct=`---
hide:
  - navigation
---

<div dir="ltr" lang="en">

# Other clients

NSplusthon is a Python MTProto client for **Soroush Plus**. It is not Telegram.

| If you want… | Use |
| --- | --- |
| Soroush Plus, Python, Telethon-style API | **NSplusthon** |
| Telegram | Telethon / Pyrogram |

\`spluspy\` is another SPlus library with a different API.

AES-IGE via libssl, 256 KiB, Python 3.13, best of 9: NSplusthon about **100 MiB/s** on the machine in \`benchmarks/aes_ige_bench.py\`.

</div>

---

## مقایسه

NSplusthon کلاینت پایتون برای **سروش پلاس** است، نه تلگرام.

\`\`\`bash
pip install nsplusthon
\`\`\`
`,It=`---
hide:
  - navigation
---

# Mastering asyncio

NSplusthon بر پایه asyncio ساخته شده است. برای استفاده مؤثر از کتابخانه، باید مفاهیم پایه asyncio را درک کنید.

---

## asyncio چیست؟

asyncio یک ماژول استاندارد پایتون است که امکان نوشتن کد ناهمگام (asynchronous) را فراهم می‌کند. این به شما امکان می‌دهد عملیاتی که زمان‌بر هستند (مانند درخواست‌های شبکه) را بدون مسدود کردن اجرای اصلی برنامه انجام دهید.

---

## مفاهیم پایه

### coroutine

یک تابع \`async def\` یک coroutine است:

\`\`\`python
async def my_function():
    print('شروع')
    await some_async_operation()
    print('پایان')
\`\`\`

### await

واژه کلیدی \`await\` منتظر اتمام یک عملیات ناهمگام می‌شود:

\`\`\`python
async def main():
    result = await client.get_me()
    print(result.stringify())
\`\`\`

### event loop

حلقه رویداد (event loop) مسئول اجرای coroutineها است:

\`\`\`python
import asyncio

async def main():
    # کد شما اینجا اجرا می‌شود
    pass

# اجرای حلقه رویداد
asyncio.run(main())
\`\`\`

---

## استفاده از asyncio در NSplusthon

### ساختار پایه

\`\`\`python
import asyncio
from nsplusthon import SoroushClient

async def main():
    client = SoroushClient('anon', api_id, api_hash)
    
    # استفاده از await برای عملیات ناهمگام
    me = await client.get_me()
    print(me.stringify())
    
    # اجرای حلقه رویداد
    await client.run_until_disconnected()

# اجرای حلقه اصلی
asyncio.run(main())
\`\`\`

### استفاده از with block

\`\`\`python
import asyncio
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        me = await client.get_me()
        print(me.stringify())
        
        await client.run_until_disconnected()

asyncio.run(main())
\`\`\`

### استفاده از client.loop

\`\`\`python
from nsplusthon import SoroushClient

client = SoroushClient('anon', api_id, api_hash)

async def main():
    me = await client.get_me()
    print(me.stringify())
    
    await client.run_until_disconnected()

with client:
    client.loop.run_until_complete(main())
\`\`\`

---

## مثال‌های کاربردی

### ارسال پیام‌های متعدد

\`\`\`python
import asyncio
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # ارسال چند پیام
        for i in range(5):
            await client.send_message('me', f'پیام {i+1}')
            await asyncio.sleep(1)  # تاخیر ۱ ثانیه‌ای

asyncio.run(main())
\`\`\`

### دریافت و پردازش پیام‌ها

\`\`\`python
import asyncio
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        async for message in client.iter_messages('me'):
            print(f'پیام {message.id}: {message.text}')
            
            # پردازش همزمان پیام‌ها
            await asyncio.sleep(0.1)

asyncio.run(main())
\`\`\`

### handler‌های رویداد همزمان

\`\`\`python
import asyncio
from nsplusthon import SoroushClient, events

client = SoroushClient('anon', api_id, api_hash)

@client.on(events.NewMessage(pattern=r'(?i)hi|hello'))
async def handler1(event):
    await event.reply('سلام! (از handler 1)')

@client.on(events.NewMessage(pattern=r'(?i)help'))
async def handler2(event):
    await event.reply('کمک! (از handler 2)')

async def main():
    await client.start()
    await client.run_until_disconnected()

asyncio.run(main())
\`\`\`

---

## نکات مهم

### ۱. از await استفاده کنید

تمام متدهایی که با شبکه کار می‌کنند باید با \`await\` فراخوانی شوند:

\`\`\`python
# درست
me = await client.get_me()
await client.send_message('me', 'سلام')

# اشتباه
me = client.get_me()  # خطا!
client.send_message('me', 'سلام')  # خطا!
\`\`\`

### ۲. handler‌ها باید async باشند

handler‌های رویداد باید \`async def\` باشند:

\`\`\`python
# درست
@client.on(events.NewMessage)
async def handler(event):
    await event.reply('پاسخ')

# اشتباه
@client.on(events.NewMessage)
def handler(event):
    event.reply('پاسخ')  # خطا!
\`\`\`

### ۳. از asyncio.sleep استفاده کنید

برای تاخیر در کد ناهمگام از \`asyncio.sleep\` استفاده کنید:

\`\`\`python
import asyncio

# درست
await asyncio.sleep(1)

# اشتباه
import time
time.sleep(1)  # حلقه رویداد را مسدود می‌کند!
\`\`\`

### ۴. از gather برای عملیات همزمان استفاده کنید

\`\`\`python
import asyncio

async def main():
    # اجرای همزمان چندین coroutine
    await asyncio.gather(
        client.send_message('user1', 'سلام ۱'),
        client.send_message('user2', 'سلام ۲'),
        client.send_message('user3', 'سلام ۳')
    )
\`\`\`

---

## عیب‌یابی مشکلات asyncio

### خطای "This event loop is already running"

\`\`\`python
# اشتباه
loop = asyncio.get_event_loop()
loop.run_until_complete(main())

# درست
asyncio.run(main())
\`\`\`

### خطای "Cannot run the event loop while another loop is running"

\`\`\`python
# اشتباه
async def main():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(some_coroutine())

# درست
async def main():
    await some_coroutine()
\`\`\`

### مسدود شدن حلقه رویداد

\`\`\`python
# اشتباه
import time
async def main():
    time.sleep(1)  # حلقه رویداد را مسدود می‌کند!

# درست
import asyncio
async def main():
    await asyncio.sleep(1)  # حلقه رویداد را مسدود نمی‌کند
\`\`\`

---

## منابع آموزشی

- [مستندات رسمی asyncio](https://docs.python.org/3/library/asyncio.html)
- [آموزش asyncio در پایتون](https://realpython.com/async-io-python/)
- [مثال‌های asyncio](https://docs.python.org/3/library/asyncio-task.html)

---

## نتیجه‌گیری

asyncio یک ابزار قدرتمند برای نوشتن کد ناهمگام در پایتون است. با درک مفاهیم پایه مانند coroutine، await و event loop، می‌توانید به طور مؤثر از NSplusthon استفاده کنید.

---

## مرحله بعدی

برای یادگیری بیشتر، بخش [مثال‌ها](../examples/index.md) را مطالعه کنید.
`,yt=`---
hide:
  - navigation
---

# مقایسه Bot API و MTProto

در این بخش تفاوت‌های بین Bot API و MTProto (UserBot) را بررسی می‌کنیم تا بتوانید بهترین روش را برای پروژه خود انتخاب کنید.

---

## Bot API چیست؟

Bot API رسمی سروش‌پلاس برای ساخت ربات است. ربات‌ها حساب‌های خاصی هستند که توسط کاربران دیگر ایجاد و مدیریت می‌شوند.

### مزایای Bot API

- **سادگی**: API ساده و آسان برای استفاده
- **امنیت**: ربات‌ها محدودیت‌های امنیتی دارند
- **پشتیبانی رسمی**: توسط سروش‌پلاس پشتیبانی می‌شود
- **عدم نیاز به احراز هویت کاربر**: فقط به Bot Token نیاز دارد

### معایب Bot API

- **محدودیت‌های پیام**: ربات‌ها نمی‌توانند به کاربران پیام ارسال کنند مگر اینکه کاربر ابتدا به آنها پیام دهد
- **محدودیت در ارسال پیام**: محدودیت در تعداد پیام‌های ارسالی
- **عدم دسترسی به اطلاعات کامل**: ربات‌ها به تمام اطلاعات کاربران دسترسی ندارند
- **محدودیت در امکانات**: بسیاری از امکانات API اصلی در Bot API موجود نیست

---

## MTProto (UserBot) چیست؟

MTProto پروتکل اصلی سروش‌پلاس است. با استفاده از MTProto می‌توانید به عنوان یک کاربر عادی (UserBot) با API سروش‌پلاس تعامل کنید.

### مزایای MTProto

- **امکانات نامحدود**: به تمام API سروش‌پلاس دسترسی دارید
- **ارسال پیام نامحدود**: بدون محدودیت در ارسال پیام
- **دسترسی کامل به اطلاعات**: تمام اطلاعات کاربران و چت‌ها در دسترس است
- **انعطاف‌پذیری بالا**: می‌توانید هر کاری انجام دهید

### معایب MTProto

- **پیچیدگی**: API پیچیده‌تر است
- **احراز هویت**: نیاز به ورود با حساب کاربری دارد (در NSplusthon credentials به‌صورت پیش‌فرض در نظر گرفته شده است)
- **risk امنیتی**: حساب شما ممکن است در صورت استفاده نادرست مسدود شود
- **نیاز به مدیریت session**: باید session و احراز هویت را مدیریت کنید

---

## مقایسه جزئی

| ویژگی | Bot API | MTProto (UserBot) |
|--------|---------|-------------------|
| **نوع حساب** | ربات | کاربر عادی |
| **محدودیت پیام** | محدود | نامحدود |
| **دسترسی به اطلاعات** | محدود | کامل |
| **API** | ساده | پیچیده |
| **نیاز به اجازه کاربر** | بله | خیر |
| **risk امنیتی** | کم | زیاد |
| **پشتیبانی رسمی** | بله | خیر |
| **نیاز به API ID** | خیر | بله |
| **مدیریت Session** | خیر | بله |

---

## چه زمانی از Bot API استفاده کنیم؟

### موارد استفاده مناسب

- **ربات‌های ساده**: ربات‌هایی که فقط به پیام‌های کاربران پاسخ می‌دهند
- **ربات‌های اطلاع‌رسانی**: ربات‌هایی که اطلاعات را به کاربران ارسال می‌کنند
- **ربات‌های خدماتی**: ربات‌هایی که خدمات خاصی ارائه می‌دهند
- **پروژه‌های کوچک**: پروژه‌هایی که نیاز به امکانات پیچیده ندارند

### مثال Bot API

\`\`\`python
from nsplusthon import SoroushClient

# ورود به عنوان ربات
bot = SoroushClient('bot', api_id, api_hash)
await bot.start(bot_token='12345:0123456789abcdef')

@bot.on(events.NewMessage)
async def handler(event):
    if 'سلام' in event.raw_text:
        await event.reply('سلام! من یک ربات هستم.')

await bot.run_until_disconnected()
\`\`\`

---

## چه زمانی از MTProto (UserBot) استفاده کنیم؟

### موارد استفاده مناسب

- **UserBot‌ها**: ربات‌هایی که با حساب کاربری شما کار می‌کنند
- **اسکریپت‌های خودکار**: اسکریپت‌هایی که کارهای تکراری را انجام می‌دهند
- **پروژه‌های پیچیده**: پروژه‌هایی که نیاز به API کامل دارند
- **برنامه‌های شخصی**: برنامه‌هایی که برای استفاده شخصی خود می‌سازید

### مثال MTProto (UserBot)

\`\`\`python
from nsplusthon import SoroushClient

# ورود به عنوان کاربر
client = SoroushClient('user', api_id, api_hash)
await client.start()

@client.on(events.NewMessage)
async def handler(event):
    # پاسخ خودکار به پیام‌ها
    if 'سلام' in event.raw_text:
        await event.reply('سلام! چطور می‌توانم کمک کنم؟')

await client.run_until_disconnected()
\`\`\`

---

## نکات امنیتی مهم

!!! warning "هشدار"
    **هنگام استفاده از UserBot مراقب باشید!**
>
> - هرگز credentialهای خود را به اشتراک نگذارید
> - از اسکریپت‌های ناشناخته استفاده نکنید
> - مطمئن شوید اسکریپت شما قوانین سروش‌پلاس را نقض نمی‌کند
> - حساب شما ممکن است در صورت استفاده نادرست مسدود شود

---

## تصمیم‌گیری

### سوالات کلیدی

1. **آیا به اطلاعات کامل کاربران نیاز دارید؟**
    - بله → MTProto
    - خیر → Bot API

2. **آیا می‌خواهید به کاربران پیام ارسال کنید بدون اینکه آنها ابتدا پیام دهند؟**
    - بله → MTProto
    - خیر → Bot API

3. **آیا پروژه شما پیچیده است؟**
    - بله → MTProto
    - خیر → Bot API

4. **آیا می‌خواهید با حساب کاربری خود کار کنید؟**
    - بله → MTProto
    - خیر → Bot API

---

## نتیجه‌گیری

- **Bot API** برای ربات‌های ساده و پروژه‌های کوچک مناسب است
- **MTProto** برای UserBot‌ها و پروژه‌های پیچیده مناسب است
- هر کدام مزایا و معایب خود را دارند
- انتخاب روش مناسب به نیازهای پروژه شما بستگی دارد

---

## مرحله بعدی

برای یادگیری بیشتر درباره asyncio، بخش [Mastering asyncio](asyncio.md) را مطالعه کنید.
`,Rt=`---
hide:
  - navigation
---

# Entity (موجودیت)

کتابخانه به طور گسترده از مفهوم "Entity" استفاده می‌کند. Entity به هر شیء User، Chat یا Channel اشاره دارد که API ممکن است در پاسخ به متدهای خاصی مانند \`GetUsersRequest\` برگرداند.

---

## Entity چیست؟

بسیاری از متدها و درخواست‌ها برای کار به Entity نیاز دارند. به عنوان مثال، پیام را به یک Entity ارسال می‌کنید، یوزرنیم یک Entity را دریافت می‌کنید و غیره.

چیزهای زیادی به عنوان Entity عمل می‌کنند: یوزرنیم‌ها، شماره تلفن‌ها، لینک‌های چت، لینک‌های دعوت، شناسه‌ها و خود تایپ‌ها. یعنی می‌توانید از هر کدام از اینها استفاده کنید وقتی Entity مورد نیاز است.

!!! note "یادداشت"
    به یاد داشته باشید که شماره تلفن باید در لیست مخاطبین شما باشد قبل از اینکه بتوانید از آن استفاده کنید.

---

## ترتیب استفاده از Entity

از **بهترین به بدترین** استفاده کنید:

### 1. Input Entities

به عنوان مثال، \`event.input_chat\`، \`message.input_sender\` یا کش کردن Entity‌ای که زیاد استفاده می‌کنید:

\`\`\`python
entity = await client.get_input_entity(...)
\`\`\`

### 2. Entities

اگر از قبل Entity را دارید، می‌توانید از آن استفاده کنید:

\`\`\`python
await client.send_message(user, 'سلام!')
\`\`\`

### 3. شناسه‌ها

همیشه Entity را از کش جستجو می‌کند (فایل \`*.session\` Entity‌های مشاهده شده را کش می‌کند).

### 4. یوزرنیم‌ها، شماره تلفن‌ها و لینک‌ها

کش نیز استفاده می‌شود (مگر اینکه \`client.get_entity()\` را فراخوانی کنید)، اما ممکن است درخواست شبکه‌ای ارسال کند اگر یوزرنیم، شماره تلفن یا لینک هنوز پیدا نشده باشد.

---

## دریافت Entity‌ها

با استفاده از Session، کتابخانه به طور خودکار جفت شناسه و hash را به خاطر می‌سپارد:

\`\`\`python
# (این مثال‌ها فرض می‌کنند که داخل یک "async def" هستید)
#
# Dialogs مکالمات باز شما هستند.
# این متد لیستی از Dialog برمی‌گرداند که ویژگی .entity و اطلاعات دیگر دارد.
#
# این بخش مهم است زیرا کش entity را پر می‌کند.
dialogs = await client.get_dialogs()

# تمام اینها کار می‌کنند و یک کار را انجام می‌دهند
username = await client.get_entity('username')
username = await client.get_entity('s.plus/username')
username = await client.get_entity('https://web.splus.ir/username')

# نوع دیگر Entity
channel = await client.get_entity('channel')
contact = await client.get_entity('+989123456789')
friend  = await client.get_entity(friend_id)

# دریافت Entity از طریق شناسه (User، Chat یا Channel)
entity = await client.get_entity(some_id)

# می‌توانید نوع را صریح‌تر مشخص کنید با پیچیدن آن در یک Peer
from nsplusthon.tl.types import PeerUser, PeerChat, PeerChannel

my_user    = await client.get_entity(PeerUser(some_id))
my_chat    = await client.get_entity(PeerChat(some_id))
my_channel = await client.get_entity(PeerChannel(some_id))
\`\`\`

!!! note "یادداشت"
    **نیازی نیست قبل از استفاده، Entity را دریافت کنید!** بگذارید کتابخانه کار خود را انجام دهد. از شماره تلفن از مخاطبین، یوزرنیم، شناسه یا input entity (ترجیحی اما ضروری نیست)، هر چه دارید استفاده کنید.

---

## Entity در مقابل Input Entity

### Peer و InputPeer

روی تایپ‌های عادی، API همچنین از نسخه‌های \`Input*\` استفاده می‌کند. نسخه input یک Entity (مانند \`InputPeerUser\`، \`InputChat\` و غیره) فقط حداقل اطلاعاتی را که از سروش‌پلاس نیاز است برای شناسایی اینکه به چه کسی اشاره می‌کنید، دارد: **شناسه** و **hash** یک \`Peer\`.

شناسه Entity برای تمام کاربران و حساب‌های ربات یکسان است، اما hash **برای هر حساب متفاوت است**، بنابراین سعی نکنید hash access را از یک حساب در حساب دیگر استفاده کنید زیرا **کار نخواهد کرد**.

### Peer‌ها

بعضی اوقات، سروش‌پلاس فقط نیاز دارد نوع Entity را همراه با شناسه‌اش مشخص کند. برای این منظور، نسخه‌های \`Peer\` از Entity‌ها نیز وجود دارند که فقط شناسه دارند. نمی‌توانید hash را از آنها بگیرید زیرا نباید به آن نیاز داشته باشید. کتابخانه احتمالاً قبلاً آن را کش کرده است.

Peers برای شناسایی یک Entity کافی هستند، اما برای ارسال درخواست با آنها کافی نیستند. باید hash آنها را بدانید قبل از اینکه بتوانید "از آنها استفاده کنید" و برای دانستن hash باید Entity را "ملاقات کنید"، چه در مکالمات، شرکت‌کنندگان، پیام‌های فوروارد شده و غیره.

!!! note "یادداشت"
    **می‌توانید از Peers با کتابخانه استفاده کنید.** در پشت صحنه، آنها با نسخه input جایگزین می‌شوند. Peers "به تنهایی کافی نیستند" اما کتابخانه کار بیشتری برای استفاده از نوع مناسب انجام می‌دهد.

---

## Input Entity در مقابل Entity کامل

همانطور که ذکر شد، فراخوانی‌های API نیازی به دانستن تمام اطلاعات Entity ندارند، فقط شناسه و hash آنها. به همین دلیل، متد \`client.get_input_entity()\` موجود است. این متد همیشه از کش استفاده می‌کند و در بیشتر مواقع هیچ درخواست API‌ای ارسال نمی‌کند.

وقتی درخواستی ارسال می‌شود، اگر Entity کامل را ارائه دهید (مثلاً یک \`User\`)، کتابخانه آن را به \`InputPeer\` مورد نیاز به طور خودکار تبدیل می‌کند.

**همیشه** \`client.get_input_entity()\` **را بر** \`client.get_entity()\` **ترجیح دهید!** فراخوانی متد دومی همیشه درخواست API برای دریافت آخرین اطلاعات Entity ارسال می‌کند، اما فراخوانی درخواست‌ها فقط به \`InputPeer\` نیاز دارند، نه اطلاعات کامل. فقط از \`client.get_input_entity()\` استفاده کنید اگر به اطلاعات واقعی مانند یوزرنیم، نام، عنوان و غیره نیاز دارید.

---

## Entity کامل

علاوه بر \`PeerUser\`، \`InputPeerUser\`، \`User\` (و متغیرهای آن برای چت‌ها و کانال‌ها)، مفهوم \`UserFull\` نیز وجود دارد.

این نسخه کامل اطلاعات اضافی مانند مسدود بودن کاربر، تنظیمات نوتیفیکیشن، بیوگرافی یا درباره کاربر و غیره را دارد.

همچنین \`messages.ChatFull\` معادل Entity کامل برای چت‌ها و کانال‌ها است که بخش درباره کانال را نیز دارد.

می‌توانید هر دو را با فراخوانی \`GetFullUser\`، \`GetFullChat\` و \`GetFullChannel\` دریافت کنید.

---

## دسترسی به Entity‌ها

وقتی مستندات می‌گوید "Bases: ChatGetter" به این معنی است که کلاسی که به آن نگاه می‌کنید، *همچنین* می‌تواند به عنوان کلاسی که بر آن استوار است عمل کند. در این مورد، \`ChatGetter\` می‌داند چگونه *چت* را که چیزی به آن تعلق دارد دریافت کند.

\`\`\`python
# Message یک ChatGetter است
message.is_private
message.chat_id
await message.get_chat()
# ...و غیره

# SenderGetter مشابه است
message.user_id
await message.get_input_sender()
message.user
# ...و غیره
\`\`\`

---

## خلاصه

TL;DR؛ اگر به دلیل "Could not find the input entity for" اینجا هستید، باید از خود بپرسید "چگونه این Entity را از طریق برنامه‌های رسمی پیدا کردم؟" حالا همان کار را با کتابخانه انجام دهید:

\`\`\`python
# (این مثال‌ها فرض می‌کنند که داخل یک "async def" هستید)
async with client:
    # آیا یوزرنیم دارد؟ از آن استفاده کنید!
    entity = await client.get_entity(username)
    
    # آیا مکالمه بازی با آنها دارید؟ Dialogs را دریافت کنید.
    await client.get_dialogs()
    
    # آیا عضو گروهی هستند؟ آنها را دریافت کنید.
    await client.get_participants('username')
    
    # آیا Entity فرستنده اصلی پیام فوروارد شده است؟ آن را دریافت کنید.
    await client.get_messages('username', 100)
    
    # اکنون می‌توانید از شناسه استفاده کنید، هر جا!
    await client.send_message(123456, 'سلام!')
    
    entity = await client.get_entity(123456)
    print(entity)
\`\`\`

وقتی کتابخانه Entity را "دیده باشد"، می‌توانید از شناسه **عددی** آن استفاده کنید. نمی‌توانید از Entity‌هایی استفاده کنید که کتابخانه ندیده است. باید کتابخانه آنها را *حداقل یک بار* ببیند و به درستی قطع اتصال کند.
`,Ot=`---
hide:
  - navigation
---

# مدیریت خطاها

NSplusthon دارای سیستم مدیریت خطای قدرتمندی است که به شما امکان می‌دهد خطاهای مختلف API سروش‌پلاس را مدیریت کنید.

---

## خطاهای اصلی

### RPCError

خطاهای اصلی API سروش‌پلاس هستند. این خطاها زمانی رخ می‌دهند که درخواست شما با مشکلی مواجه شود.

\`\`\`python
from nsplusthon.errors import RPCError, FloodWaitError, PeerFloodError

try:
    await client.send_message('username', 'سلام!')
except FloodWaitError as e:
    # صبر کنید تا زمان انتظار تمام شود
    print(f'صبر کنید {e.seconds} ثانیه')
except PeerFloodError:
    # محدودیت تعداد پیام
    print('شما به محدودیت ارسال پیام رسیده‌اید')
except RPCError as e:
    # سایر خطاهای API
    print(f'خطای API: {e}')
\`\`\`

---

## انواع خطاهای رایج

### FloodWaitError

وقتی خیلی سریع درخواست ارسال می‌کنید و باید صبر کنید:

\`\`\`python
from nsplusthon.errors import FloodWaitError

try:
    await client.send_message('username', 'سلام!')
except FloodWaitError as e:
    print(f'صبر کنید {e.seconds} ثانیه')
    # کتابخانه به طور خودکار صبر می‌کند
    # یا می‌توانید دستی صبر کنید
    import asyncio
    await asyncio.sleep(e.seconds)
\`\`\`

### PeerFloodError

وقتی به محدودیت ارسال پیام رسیده‌اید:

\`\`\`python
from nsplusthon.errors import PeerFloodError

try:
    await client.send_message('username', 'سلام!')
except PeerFloodError:
    print('شما به محدودیت ارسال پیام رسیده‌اید. لطفاً صبر کنید.')
\`\`\`

### UserBannedInChannelError

وقتی حساب شما در کانالی مسدود شده است:

\`\`\`python
from nsplusthon.errors import UserBannedInChannelError

try:
    await client.send_message('channel', 'سلام!')
except UserBannedInChannelError:
    print('حساب شما در این کانال مسدود شده است.')
\`\`\`

### ChatWriteForbiddenError

وقتی اجازه نوشتن در چت را ندارید:

\`\`\`python
from nsplusthon.errors import ChatWriteForbiddenError

try:
    await client.send_message('chat', 'سلام!')
except ChatWriteForbiddenError:
    print('شما اجازه نوشتن در این چت را ندارید.')
\`\`\`

### UsernameNotOccupiedError

وقتی یوزرنیم وجود ندارد:

\`\`\`python
from nsplusthon.errors import UsernameNotOccupiedError

try:
    await client.send_message('nonexistent_username', 'سلام!')
except UsernameNotOccupiedError:
    print('یوزرنیم وجود ندارد.')
\`\`\`

### UsernameInvalidError

وقتی یوزرنیم نامعتبر است:

\`\`\`python
from nsplusthon.errors import UsernameInvalidError

try:
    await client.send_message('invalid username!', 'سلام!')
except UsernameInvalidError:
    print('یوزرنیم نامعتبر است.')
\`\`\`

---

## مدیریت خطاهای عمومی

### استفاده از try/except عمومی

\`\`\`python
from nsplusthon.errors import RPCError

async def safe_send_message(client, entity, message):
    try:
        await client.send_message(entity, message)
        return True
    except RPCError as e:
        print(f'خطا در ارسال پیام: {e}')
        return False
    except Exception as e:
        print(f'خطای غیرمنتظره: {e}')
        return False
\`\`\`

### ایجاد decorator برای مدیریت خطا

\`\`\`python
from functools import wraps
from nsplusthon.errors import RPCError

def handle_errors(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        try:
            return await func(*args, **kwargs)
        except RPCError as e:
            print(f'خطای RPC: {e}')
            return None
        except Exception as e:
            print(f'خطای غیرمنتظره: {e}')
            return None
    return wrapper

@handle_errors
async def send_message(client, entity, message):
    await client.send_message(entity, message)
\`\`\`

---

## ثبت handler برای خطاها

### استفاده از on_error

\`\`\`python
from nsplusthon import SoroushClient, events

client = SoroushClient('anon', api_id, api_hash)

@client.on(events.NewMessage)
async def handler(event):
    await event.reply('پاسخ خودکار')

# مدیریت خطاها در handler‌ها
@client.on(events.NewMessage)
async def error_handler(event):
    try:
        # عملیات خطرناک
        await event.reply('پاسخ')
    except Exception as e:
        print(f'خطا در handler: {e}')
\`\`\`

---

## لاگ کردن خطاها

### استفاده از logging

\`\`\`python
import logging
from nsplusthon import SoroushClient, events

# تنظیم logging
logging.basicConfig(
    format='[%(levelname) %(asctime)s] %(name)s: %(message)s',
    level=logging.WARNING
)

client = SoroushClient('anon', api_id, api_hash)

@client.on(events.NewMessage)
async def handler(event):
    try:
        await event.reply('پاسخ')
    except Exception as e:
        logging.error(f'خطا در handler: {e}')
        raise  # خطا را دوباره raise کنید تا لاگ شود
\`\`\`

---

## مثال‌های کاربردی

### ارسال پیام با مدیریت خطا

\`\`\`python
from nsplusthon import SoroushClient, events
from nsplusthon.errors import FloodWaitError, PeerFloodError, RPCError

client = SoroushClient('anon', api_id, api_hash)

async def send_with_retry(client, entity, message, max_retries=3):
    for attempt in range(max_retries):
        try:
            await client.send_message(entity, message)
            return True
        except FloodWaitError as e:
            import asyncio
            await asyncio.sleep(e.seconds)
        except PeerFloodError:
            print('محدودیت ارسال پیام. لطفاً صبر کنید.')
            return False
        except RPCError as e:
            print(f'خطا در تلاش {attempt + 1}: {e}')
            if attempt == max_retries - 1:
                return False
    return False
\`\`\`

### handler با مدیریت خطا

\`\`\`python
@client.on(events.NewMessage(pattern=r'(?i)help'))
async def help_handler(event):
    try:
        await event.respond('راهنمایی: این یک پیام کمکی است.')
    except Exception as e:
        # اگر پاسخ دادن موفق نبود، سکوت کنید
        pass
\`\`\`

---

## نکات مهم

1. **همیشه خطاها را مدیریت کنید**: به خصوص \`FloodWaitError\` و \`PeerFloodError\`
2. **از logging استفاده کنید**: برای عیب‌یابی بهتر
3. **تعداد تلاش‌ها را محدود کنید**: برای جلوگیری از حلقه‌های بی‌نهایت
4. **از decorator برای مدیریت خطا استفاده کنید**: برای کد تمیزتر
5. **خطا را دوباره raise نکنید**: مگر اینکه بخواهید در سطح بالاتر مدیریت شود

---

## مرحله بعدی

برای یادگیری بیشتر درباره API کامل، بخش [API کامل](full-api.md) را مطالعه کنید.
`,Lt=`---
hide:
  - navigation
---

# رویدادها (Events)

رویدادها موضوع مهمی در یک پلتفرم پیام‌رسان مانند سروش‌پلاس هستند. در نهایت، می‌خواهید هنگام رسیدن پیام جدید، عضویت عضو جدید، تایپ کردن و غیره نوتیفیکیشن دریافت کنید. برای این کار می‌توانید از **رویدادها** استفاده کنید.

---

## شروع کار

بیایید با یک مثال برای پاسخ خودکار شروع کنیم:

\`\`\`python
from nsplusthon import SoroushClient, events

client = SoroushClient('anon', api_id, api_hash)

@client.on(events.NewMessage)
async def my_event_handler(event):
    if 'hello' in event.raw_text:
        await event.reply('hi!')

client.start()
client.run_until_disconnected()
\`\`\`

این کد زیاد نیست، اما ممکن است برخی چیزها نامفهوم باشد. بیایید آن را تجزیه کنیم:

### ایجاد کلاینت

\`\`\`python
from nsplusthon import SoroushClient, events

client = SoroushClient('anon', api_id, api_hash)
\`\`\`

ایجاد عادی است (البته نام session، API ID و hash را پاس دهید). چیزی نیست که قبلاً ندانیم.

### decorator رویداد

\`\`\`python
@client.on(events.NewMessage)
\`\`\`

این decorator پایتون خود را به تعریف \`my_event_handler\` متصل می‌کند و به طور اساسی به این معنی است که *در* یک رویداد \`NewMessage\`، تابع callback که قرار است تعریف کنید فراخوانی خواهد شد:

### handler رویداد

\`\`\`python
async def my_event_handler(event):
    if 'hello' in event.raw_text:
        await event.reply('hi!')
\`\`\`

اگر رویداد \`NewMessage\` رخ دهد و \`'hello'\` در متن پیام باشد، ما به رویداد با پیام \`'hi!'\` پاسخ می‌دهیم.

!!! note "یادداشت"
    handler‌های رویداد **باید** \`async def\` باشند. در نهایت، NSplusthon یک کتابخانه ناهمگام بر پایه asyncio است که رویکرد ایمن‌تر و اغلب سریع‌تری نسبت به threads است.
>
> **باید** تمام فراخوانی‌های متدی که از درخواست شبکه استفاده می‌کنند را \`await\` کنید، که بیشتر آنها هستند.

---

## انواع رویدادهای اصلی

### NewMessage

وقتی پیام جدیدی دریافت می‌شود:

\`\`\`python
@client.on(events.NewMessage)
async def handler(event):
    print(event.raw_text)
\`\`\`

### NewMessage با فیلتر

فیلتر کردن پیام‌های خروجی:

\`\`\`python
@client.on(events.NewMessage(outgoing=True))
async def handler(event):
    # فقط پیام‌هایی که شما ارسال کرده‌اید
    print(event.raw_text)
\`\`\`

فیلتر کردن با regex:

\`\`\`python
@client.on(events.NewMessage(pattern=r'\\.save'))
async def handler(event):
    # فقط پیام‌هایی که با ".save" شروع می‌شوند
    if event.is_reply:
        replied = await event.get_reply_message()
        sender = replied.sender
        await client.download_profile_photo(sender)
        await event.respond('عکس شما ذخیره شد {}'.format(sender.username))
\`\`\`

### MessageEdited

وقتی پیامی ویرایش می‌شود:

\`\`\`python
@client.on(events.MessageEdited)
async def handler(event):
    print('پیام ویرایش شد:', event.raw_text)
\`\`\`

### MessageDeleted

وقتی پیامی حذف می‌شود:

\`\`\`python
@client.on(events.MessageDeleted)
async def handler(event):
    print('پیام حذف شد:', event.message_id)
\`\`\`

### CallbackQuery

وقتی روی دکمه اینلاین کلیک می‌شود:

\`\`\`python
@client.on(events.CallbackQuery)
async def handler(event):
    print('کلیک روی دکمه:', event.data)
    await event.answer('شما روی دکمه کلیک کردید!')
\`\`\`

### ChatAction

وقتی عضو جدید وارد چت می‌شود یا خارج می‌شود:

\`\`\`python
@client.on(events.ChatAction)
async def handler(event):
    if event.user_joined:
        print('عضو جدید وارد شد:', event.user_id)
    if event.user_left:
        print('عضو خارج شد:', event.user_id)
\`\`\`

### InlineQuery

وقتی کوئری اینلاین دریافت می‌شود:

\`\`\`python
@client.on(events.InlineQuery)
async def handler(event):
    # پاسخ به کوئری اینلاین
    await event.answer([
        event.builder.article('نتیجه ۱', text='متن نتیجه ۱')
    ])
\`\`\`

### UserUpdate

وقتی اطلاعات کاربر تغییر می‌کند:

\`\`\`python
@client.on(events.UserUpdate)
async def handler(event):
    print('کاربر به روز شد:', event.status)
\`\`\`

---

## مثال‌های بیشتر

### حذف پیام‌های حاوی کلمه خاص

بیایید پیام‌هایی حاوی "heck" را حذف کنیم. اینجا فحش مجاز نیست:

\`\`\`python
@client.on(events.NewMessage(pattern=r'(?i).*heck'))
async def handler(event):
    await event.delete()
\`\`\`

با regex \`r'(?i).*heck'\`، "heck" را به صورت حساس به حرف بزرگ/کوچک در هر جای پیام تطبیق می‌دهیم. Regex بسیار قدرتمند است و می‌توانید در https://regexone.com/ بیشتر یاد بگیرید.

### پاسخ به پیام خاص

\`\`\`python
@client.on(events.NewMessage(pattern=r'(?i)hi|hello'))
async def handler(event):
    await event.respond('سلام! چطور می‌توانم کمک کنم؟')
\`\`\`

### ارسال پیام به کانال خاص

\`\`\`python
@client.on(events.NewMessage(chats='channel_username'))
async def handler(event):
    # فقط پیام‌های کانال خاصی
    print(event.raw_text)
\`\`\`

### فیلتر پیام‌های خروجی و ورودی

\`\`\`python
# فقط پیام‌های خروجی (پیام‌هایی که شما ارسال کرده‌اید)
@client.on(events.NewMessage(outgoing=True))
async def handler_outgoing(event):
    print('شما ارسال کردید:', event.raw_text)

# فقط پیام‌های ورودی (پیام‌هایی که دیگران ارسال کرده‌اید)
@client.on(events.NewMessage(incoming=True))
async def handler_incoming(event):
    print('شما دریافت کردید:', event.raw_text)
\`\`\`

---

## دسترسی به Entity‌ها در رویدادها

وقتی نیاز به کاربر یا چتی دارید که رویداد در آن رخ داده است، **حتماً** از متدهای زیر استفاده کنید:

\`\`\`python
async def handler(event):
    # درست
    chat = await event.get_chat()
    sender = await event.get_sender()
    chat_id = event.chat_id
    sender_id = event.sender_id
    
    # اشتباه - این کار را نکنید
    chat = event.chat
    sender = event.sender
    chat_id = event.chat.id
    sender_id = event.sender.id
\`\`\`

رویدادها مانند پیام‌ها هستند اما تمام اطلاعات پیام را ندارند! وقتی به صورت دستی پیامی را دریافت می‌کنید، تمام اطلاعات لازم را دارد. اما وقتی آپدیتی درباره پیام دریافت می‌کنید، **تمام اطلاعات را ندارد**، بنابراین باید از **متدها** استفاده کنید، نه ویژگی‌ها.

---

## نکات مهم

!!! important "مهم"
    فراموش نکنید که logging را هنگام کار با رویدادها فعال کنید، زیرا خطاها در handler‌های رویداد به طور پیش‌فرض پنهان هستند. لطفاً قطعه کد زیر را در بالای فایل خود اضافه کنید:

\`\`\`python
import logging
logging.basicConfig(format='[%(levelname) %(asctime)s] %(name)s: %(message)s',
                    level=logging.WARNING)
\`\`\`

---

## خلاصه

رویدادها به شما امکان می‌دهند به پیام‌ها و اتفاقات مختلف در سروش‌پلاس پاسخ دهید. با استفاده از decorator‌های \`@client.on()\` می‌توانید handler‌های مختلفی برای انواع رویدادها ثبت کنید.

---

## مرحله بعدی

برای یادگیری بیشتر درباره String Sessions، بخش [String Sessions](string-sessions.md) را مطالعه کنید.
`,Dt=`---
hide:
  - navigation
---

# API کامل

NSplusthon از API کامل سروش‌پلاس پشتیبانی می‌کند. می‌توانید از متدهای پیشرفته برای کنترل دقیق‌تر استفاده کنید.

---

## استفاده از API خام

### ارسال درخواست خام

\`\`\`python
from nsplusthon.tl.functions.messages import SendMessageRequest

await client(SendMessageRequest(
    peer='username',
    message='سلام!',
    random_id=client._get_request_msg_id()
))
\`\`\`

### دریافت اطلاعات کاربر

\`\`\`python
from nsplusthon.tl.functions.users import GetUsersRequest

users = await client(GetUsersRequest(
    id=['username1', 'username2']
))
\`\`\`

### دریافت اطلاعات کانال

\`\`\`python
from nsplusthon.tl.functions.channels import GetFullChannelRequest

full_channel = await client(GetFullChannelRequest('channel_username'))
\`\`\`

---

## متدهای پیشرفته

### ارسال فایل با کنترل کامل

\`\`\`python
from nsplusthon.tl.functions.messages import SendMediaRequest
from nsplusthon.tl.types import InputMediaUploadedDocument

# آپلود فایل
file = await client.upload_file('/path/to/file.jpg')

# ارسال فایل
await client(SendMediaRequest(
    peer='username',
    media=InputMediaUploadedDocument(
        file=file,
        caption='توضیحات فایل'
    ),
    random_id=client._get_request_msg_id()
))
\`\`\`

### ویرایش پیام

\`\`\`python
from nsplusthon.tl.functions.messages import EditMessageRequest

await client(EditMessageRequest(
    peer='username',
    id=message_id,
    message='متن جدید'
))
\`\`\`

### حذف پیام

\`\`\`python
from nsplusthon.tl.functions.messages import DeleteMessagesRequest

await client(DeleteMessagesRequest(
    id=[message_id_1, message_id_2],
    revoke=True
))
\`\`\`

---

## کار با چت‌ها و کانال‌ها

### عضویت در کانال

\`\`\`python
from nsplusthon.tl.functions.channels import JoinChannelRequest

await client(JoinChannelRequest(channel))
\`\`\`

### خروج از کانال

\`\`\`python
from nsplusthon.tl.functions.channels import LeaveChannelRequest

await client(LeaveChannelRequest(input_channel))
\`\`\`

### عضویت با لینک دعوت

\`\`\`python
from nsplusthon.tl.functions.messages import ImportChatInviteRequest

updates = await client(ImportChatInviteRequest('AAAAAEHbEkejzxUjAUCfYg'))
\`\`\`

### اضافه کردن کاربر به چت

\`\`\`python
from nsplusthon.tl.functions.messages import AddChatUserRequest

await client(AddChatUserRequest(
    chat_id,
    user_to_add,
    fwd_limit=10  # اجازه دیدن ۱۰ پیام آخر
))
\`\`\`

### اضافه کردن کاربر به کانال

\`\`\`python
from nsplusthon.tl.functions.channels import InviteToChannelRequest

await client(InviteToChannelRequest(
    channel,
    [users_to_add]
))
\`\`\`

---

## کار با پروفایل

### دریافت اطلاعات کامل کاربر

\`\`\`python
from nsplusthon.tl.functions.users import GetFullUserRequest

full = await client(GetFullUserRequest(user))
bio = full.full_user.about
\`\`\`

### بروزرسانی نام و بیوگرافی

\`\`\`python
from nsplusthon.tl.functions.account import UpdateProfileRequest

await client(UpdateProfileRequest(
    first_name='نام جدید',
    last_name='نام خانوادگی جدید',
    about='بیوگرافی جدید'
))
\`\`\`

### بروزرسانی یوزرنیم

\`\`\`python
from nsplusthon.tl.functions.account import UpdateUsernameRequest

await client(UpdateUsernameRequest('new_username'))
\`\`\`

### بروزرسانی عکس پروفایل

\`\`\`python
from nsplusthon.tl.functions.photos import UploadProfilePhotoRequest

await client(UploadProfilePhotoRequest(
    await client.upload_file('/path/to/photo.jpg')
))
\`\`\`

---

## کار با رسانه‌ها

### دانلود عکس پروفایل

\`\`\`python
# دانلود عکس پروفایل خودتان
await client.download_profile_photo('me')

# دانلود عکس پروفایل کاربر دیگر
await client.download_profile_photo('username')
\`\`\`

### دانلود فایل از پیام

\`\`\`python
async for message in client.iter_messages('username'):
    if message.photo:
        path = await message.download_media()
        print(f'فایل ذخیره شد: {path}')
    if message.document:
        path = await message.download_media()
        print(f'فایل ذخیره شد: {path}')
\`\`\`

### آپلود فایل

\`\`\`python
file = await client.upload_file('/path/to/file.jpg')
\`\`\`

---

## مثال‌های پیشرفته

### جستجوی پیام‌ها

\`\`\`python
from nsplusthon.tl.functions.messages import SearchRequest

messages = await client(SearchRequest(
    peer='username',
    q='کلمه جستجو',
    limit=100
))
\`\`\`

### دریافت شرکت‌کنندگان گروه

\`\`\`python
from nsplusthon.tl.functions.channels import GetParticipantsRequest
from nsplusthon.tl.types import ChannelParticipantsSearch

participants = await client(GetParticipantsRequest(
    channel='username',
    filter=ChannelParticipantsSearch(''),
    limit=100,
    offset=0
))
\`\`\`

### افزایش تعداد بازدید در کانال

\`\`\`python
from nsplusthon.tl.functions.messages import GetMessagesViewsRequest

await client(GetMessagesViewsRequest(
    peer=channel,
    id=msg_ids,
    increment=True
))
\`\`\`

!!! note "یادداشت"
    توجه داشته باشید که این کار فقط **یک یا دو بار در روز** برای هر حساب قابل انجام است.

---

## نکات مهم

1. **از متدهای پیشرفته با احتیاط استفاده کنید**: برخی متدها ممکن است منجر به محدودیت حساب شوند
2. **کد را با متدهای ساده جایگزین کنید**: مگر اینکه به کنترل دقیق نیاز داشته باشید
3. **از مدیریت خطا استفاده کنید**: API خام ممکن است خطاهای بیشتری تولید کند
4. **مرجع متدهای دوستانه را مطالعه کنید**: [مرجع API](../api-reference.md)

---

## مرحله بعدی

برای یادگیری بیشتر درباره مقایسه Bot API و MTProto، بخش [مقایسه Bot API و MTProto](botapi-vs-mtproto.md) را مطالعه کنید.
`,Pt=`---
hide:
  - navigation
---

# مفاهیم پایه

در این بخش مفاهیم اساسی NSplusthon را یاد خواهید گرفت. درک این مفاهیم برای استفاده مؤثر از کتابخانه ضروری است.

---

## فهرست مطالب

<div class="grid cards" markdown>

-   :material-account-group:{ .lg .middle } __Entity (موجودیت)__

    ---

    توضیحات جامع درباره Entity و نحوه استفاده از آن.

    [:octicons-arrow-right-24: یاد بگیرید](entities.md)

-   :material-database:{ .lg .middle } __Session (نشست)__

    ---

    توضیحات درباره Session و نحوه مدیریت آن.

    [:octicons-arrow-right-24: یاد بگیرید](sessions.md)

-   :material-bell-ring:{ .lg .middle } __رویدادها (Events)__

    ---

    سیستم قدرتمند رویدادها برای پاسخ خودکار.

    [:octicons-arrow-right-24: یاد بگیرید](events.md)

-   :material-key:{ .lg .middle } __String Sessions__

    ---

    راهنمای استفاده از String Sessions.

    [:octicons-arrow-right-24: یاد بگیرید](string-sessions.md)

-   :material-alert-circle:{ .lg .middle } __مدیریت خطاها__

    ---

    راهنمای مدیریت خطاها و عیب‌یابی.

    [:octicons-arrow-right-24: یاد بگیرید](errors.md)

-   :material-api:{ .lg .middle } __API کامل__

    ---

    استفاده از API کامل سروش‌پلاس.

    [:octicons-arrow-right-24: یاد بگیرید](full-api.md)

-   :material-compare:{ .lg .middle } __مقایسه Bot API و MTProto__

    ---

    مقایسه روش‌های مختلف توسعه ربات.

    [:octicons-arrow-right-24: یاد بگیرید](botapi-vs-mtproto.md)

-   :material-language-python:{ .lg .middle } __Mastering asyncio__

    ---

    راهنمای جامع asyncio برای استفاده مؤثر.

    [:octicons-arrow-right-24: یاد بگیرید](asyncio.md)

-   :material-console:{ .lg .middle } __Command Router__

    ---

    چارچوب دستورات، \`/help\`، middleware و rate-limit.

    [:octicons-arrow-right-24: یاد بگیرید](router.md)

</div>

---

## مفهوم Entity

**Entity** به هر شیء User، Chat یا Channel اشاره دارد که API در پاسخ به متدهای خاصی مانند \`GetUsersRequest\` برمی‌گرداند.

### چه چیزی به عنوان Entity استفاده می‌شود؟

- **یوزرنیم‌ها**: مانند \`username\`
- **شماره تلفن‌ها**: مانند \`+989123456789\`
- **لینک‌های چت**: مانند \`s.plus/username\`
- **لینک‌های دعوت**: مانند \`s.plus/joinchat/...\`
- **شناسه‌ها**: مانند \`123456\`
- **آبجکت‌های خود**: مانند \`User\`، \`Chat\` یا \`Channel\`

### ترتیب استفاده از Entity

از **بهترین به بدترین** استفاده کنید:

1. **Input Entities**: مانند \`event.input_chat\` یا \`message.input_sender\`
2. **Entities**: مانند \`user\` یا \`channel\` (اگر از قبل دارید)
3. **شناسه‌ها**: از کش session استفاده می‌شود
4. **یوزرنیم‌ها، شماره تلفن‌ها و لینک‌ها**: کش استفاده می‌شود مگر اینکه \`client.get_entity()\` را فراخوانی کنید

---

## مفهوم Session

**Session** بخش مهمی از کتابخانه است که اطلاعات احراز هویت و کش entity را ذخیره می‌کند.

### انواع Session

1. **SQLiteSession**: پیش‌فرض. اطلاعات در فایل SQLite ذخیره می‌شود.
2. **MemorySession**: اطلاعات در حافظه ذخیره می‌شود.
3. **StringSession**: اطلاعات در حافظه ذخیره می‌شود اما می‌تواند به صورت رشته ذخیره شود.

### فایل Session

وقتی \`SoroushClient('anon')\` ایجاد می‌کنید، فایل \`anon.session\` در دایرکتوری جاری ایجاد می‌شود. این فایل شامل:

- آدرس IP سرور و پورت
- کلید احراز هویت
- اطلاعات entity‌های مشاهده شده
- access_hash کاربران و کانال‌ها

---

## مفهوم رویدادها (Events)

**رویدادها** برای دریافت نوتیفیکیشن از پیام‌های جدید، عضویت اعضا، تایپ کردن و غیره استفاده می‌شوند.

### انواع رویدادهای اصلی

- **NewMessage**: پیام جدید دریافت شد
- **MessageEdited**: پیام ویرایش شد
- **MessageDeleted**: پیام حذف شد
- **CallbackQuery**: کلیک روی دکمه اینلاین
- **ChatAction**: عضو جدید وارد شد یا خارج شد
- **InlineQuery**: کوئری اینلاین دریافت شد
- **UserUpdate**: اطلاعات کاربر تغییر کرد

### مثال استفاده از رویداد

\`\`\`python
from nsplusthon import SoroushClient, events

client = SoroushClient('anon', api_id, api_hash)

@client.on(events.NewMessage)
async def my_event_handler(event):
    if 'hello' in event.raw_text:
        await event.reply('hi!')

client.start()
client.run_until_disconnected()
\`\`\`

---

## درک Entity در رویدادها

وقتی نیاز به کاربر یا چتی دارید که رویداد در آن رخ داده است، **حتماً** از متدهای زیر استفاده کنید:

\`\`\`python
async def handler(event):
    # درست
    chat = await event.get_chat()
    sender = await event.get_sender()
    chat_id = event.chat_id
    sender_id = event.sender_id
    
    # اشتباه - این کار را نکنید
    chat = event.chat
    sender = event.sender
    chat_id = event.chat.id
    sender_id = event.sender.id
\`\`\`

رویدادها مانند پیام‌ها هستند اما تمام اطلاعات پیام را ندارند! وقتی به صورت دستی پیامی را دریافت می‌کنید، تمام اطلاعات لازم را دارد. اما وقتی آپدیتی درباره پیام دریافت می‌کنید، **تمام اطلاعات را ندارد**، بنابراین باید از **متدها** استفاده کنید، نه ویژگی‌ها.

---

## API کامل

NSplusthon از API کامل سروش‌پلاس پشتیبانی می‌کند. می‌توانید از متدهای پیشرفته برای کنترل دقیق‌تر استفاده کنید.

### مثال استفاده از API خام

\`\`\`python
from nsplusthon.tl.functions.messages import SendMessageRequest

await client(SendMessageRequest(
    peer='username',
    message='سلام!',
    random_id=client._get_request_msg_id()
))
\`\`\`

---

## مقایسه Bot API و MTProto

| ویژگی | Bot API | MTProto (UserBot) |
|--------|---------|-------------------|
| نوع حساب | ربات | کاربر عادی |
| محدودیت پیام | محدود | نامحدود |
| دسترسی به اطلاعات | محدود | کامل |
| API | ساده | پیچیده |
| نیاز به اجازه کاربر | بله | خیر |

---

## Mastering asyncio

NSplusthon بر پایه asyncio ساخته شده است. برای استفاده مؤثر، باید مفاهیم پایه asyncio را درک کنید.

### مبانی

\`\`\`python
import asyncio
from nsplusthon import SoroushClient

async def main():
    client = SoroushClient('anon', api_id, api_hash)
    
    # استفاده از await برای عملیات ناهمگام
    me = await client.get_me()
    print(me.stringify())
    
    # اجرای حلقه رویداد
    await client.run_until_disconnected()

# اجرای حلقه اصلی
asyncio.run(main())
\`\`\`

### نکات مهم

1. تمام متدهایی که با شبکه کار می‌کنند باید با \`await\` فراخوانی شوند
2. handler‌های رویداد باید \`async def\` باشند
3. از \`client.loop.run_until_complete()\` برای اجرای کد ناهمگام در کد همگام استفاده کنید

---

## مرحله بعدی

برای یادگیری بیشتر، بخش‌های زیر را مطالعه کنید:

- [مثال‌ها](../examples/index.md): مثال‌های عملی و کاربردی
- [مرجع API](../api-reference.md): مستندات کامل API
`,xt=`# Command Router (چارچوب دستورات)

به‌جای نوشتن زنجیره‌های \`if text == "/start"\`، دستورات را روی یک \`Router\` تعریف کنید؛
پارسینگ، فیلتر \`@BotName\`، آرگومان‌ها، state کاربر، middleware و دستور \`/help\` خودکار
برای شما فراهم می‌شوند.

---

## نصب و شروع سریع

\`\`\`python
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
\`\`\`

---

## سینتکس دستورات

| واردی | تفسیر |
|---|---|
| \`/start\` | نام دستور |
| \`/start hello\` | \`args = ['hello']\` |
| \`/start --name=world\` | \`kwargs = {'name': 'world'}\` |
| \`/start --name world\` | \`kwargs = {'name': 'world'}\` |
| \`/start --verbose\` | \`kwargs = {'verbose': True}\` |
| \`!start\` | پیش‌فرض هر دو پیشوند \`/\` و \`!\` پذیرفته است |
| \`/start@MyBot\` | اگر \`name='MyBot'\` باشد پذیرفته، وگرنه نادیده گرفته می‌شود |

## امضای callback

callback می‌تواند sync یا async باشد و هر ترکیب از این پارامترها را **به‌صورت نامی** بخواهد:

\`\`\`python
@router.command('hi')
def only_event(event):            # sync هم می‌شود
    print(event.chat_id)

@router.command('args')
async def with_args(event, args): ...

@router.command('all')
async def everything(event, args, kwargs, ctx, router, command): ...

@router.command('var')
async def variadic(event, *args): ...
\`\`\`

## Middleware

هر middleware با امضای \`async def mw(event, next_handler)\` ثبت می‌شود؛
برای ادامه زنجیره \`await next_handler()\` را صدا بزنید، یا اصلاً صدا نزنید تا
دستور را بلوکه کنید (مدل onion — فاز خروجی middlewareهای بیرونی اجرا می‌شود):

\`\`\`python
@router.middleware
async def logger(event, next_handler):
    print('دریافت:', event.raw_text)
    await next_handler()
\`\`\`

## Rate Limit داخلی

برای جلوگیری از \`FloodWaitError\` (و بدتر از آن، بن شدن) لیمیت‌ساز
per-chat درون‌سازی شده است:

\`\`\`python
router = Router().use_rate_limit(max_calls=40, period=60)  # ۴۰ پیام در دقیقه
\`\`\`

برای کنترل دقیق‌تر می‌توانید مستقیماً از \`nsplusthon.ratelimit.RateLimiter\`
(sliding window، asyncio-safe) استفاده کنید.

## State

\`\`\`python
user  = router.user_state(event.sender_id)   # دیکشنری مستقل برای هر کاربر
chat  = router.chat_state(event.chat_id)     # دیکشنری مستقل برای هر چت
user['last_seen'] = time.time()
\`\`\`

State در حافظه است؛ برای ماندگاری خودتان ذخیره کنید.

## دستور /help خودکار

اگر \`/help\` را تعریف نکنید، Router آن را خودکار می‌سازد و فهرست دستورات را
با توضیح و usage نمایش می‌دهد.
`,Mt=`---
hide:
  - navigation
---

# Session (نشست)

Session‌ها بخش مهمی از کتابخانه هستند که اطلاعات احراز هویت و کش entity را ذخیره می‌کنند.

---

## Session چیست؟

اولین پارامتری که به سازنده \`SoroushClient\` پاس می‌دهید \`session\` است و به طور پیش‌فرض نام session (یا مسیر کامل) است. یعنی اگر \`SoroushClient('anon')\` ایجاد کنید و متصل شوید، فایل \`anon.session\` در دایرکتوری جاری ایجاد می‌شود.

!!! note "یادداشت"
    اگر رشته پاس دهید، فایلی در دایرکتوری کاری جاری خواهد بود، اگرچه می‌توانید مسیرهای مطلق نیز پاس دهید.

فایل session اطلاعات کافی برای ورود بدون ارسال مجدد کد دارد، بنابراین اگر مجبور هستید بیش از یک بار کد را وارد کنید، شاید دایرکتوری کاری را تغییر می‌دهید، فایل را تغییر نام می‌دهید یا حذف می‌کنید، یا از نام‌های تصادفی استفاده می‌کنید.

---

## محتوای فایل Session

فایل‌های دیتابیس با استفاده از \`sqlite3\` شامل اطلاعات لازم برای ارتباط با سرورهای سروش‌پلاس هستند، مانند:

- آدرس IP سرور و پورت
- کلید احراز هویت (برای رمزگذاری پیام‌ها)
- اطلاعات entity‌های مشاهده شده
- access_hash کاربران و کانال‌ها

### کش Entity

این فایل‌ها به طور پیش‌فرض تمام input entity‌هایی که دیده‌اید را ذخیره می‌کنند تا بتوانید فقط با شناسه آنها، اطلاعات کاربر یا کانال را دریافت کنید. سروش‌پلاس \`access_hash\` مورد نیاز برای بازیابی اطلاعات بیشتر را **ارسال نخواهد کرد** اگر فکر کند قبلاً آنها را دیده‌اید. به همین دلیل کتابخانه نیاز دارد این اطلاعات را به صورت آفلاین ذخیره کند.

### غیرفعال کردن ذخیره‌سازی Entity

اگر قصد کار با رویدادها را ندارید، یا نیازی به کش \`access_hash\` مرتبط با شناسه Entity‌ها ندارید، می‌توانید این کار را با تنظیم \`client.session.save_entities = False\` غیرفعال کنید.

---

## انواع Session Storage

اگر نمی‌خواهید از ذخیره‌سازی Session پیش‌فرض SQLite استفاده کنید، می‌توانید از یکی از پیاده‌سازی‌های دیگر یا پیاده‌سازی خود استفاده کنید.

!!! note "یادداشت"
    اگرچه اغلب اینطور نیست، ممکن است SQLite به اندازه کافی کند باشد که قابل توجه باشد، در این صورت می‌توانید از ذخیره‌سازی دیگری استفاده کنید. توجه داشته باشید که این نادر است و بیشتر افراد این مشکل را نخواهند داشت.

### پیاده‌سازی‌های موجود

NSplusthon سه پیاده‌سازی از کلاس انتزاعی \`Session\` دارد:

\`\`\`python
from nsplusthon.sessions import MemorySession, SQLiteSession, StringSession
\`\`\`

1. **MemorySession**: اطلاعات session را در حافظه ذخیره می‌کند.
2. **SQLiteSession**: اطلاعات session را در پایگاه‌داده SQLite روی دیسک ذخیره می‌کند. پیش‌فرض.
3. **StringSession**: اطلاعات session را در حافظه ذخیره می‌کند، اما می‌تواند به صورت رشته ذخیره شود.

### استفاده از StringSession

\`\`\`python
from nsplusthon.sync import SoroushClient
from nsplusthon.sessions import StringSession

with SoroushClient(StringSession(string), api_id, api_hash) as client:
    ...  # استفاده از کلاینت
    
    # ذخیره session به صورت رشته
    string = client.session.save()

# همچنین می‌توانید هر نوع session دیگری را به صورت رشته ذخیره کنید
client = SoroushClient('sqlite-session', api_id, api_hash)
string = StringSession.save(client.session)
\`\`\`

---

## ایجاد Storage سفارشی

ساده‌ترین راه برای ایجاد پیاده‌سازی storage سفارشی خود، استفاده از \`MemorySession\` به عنوان پایه و بررسی نحوه کار \`SQLiteSession\` یا یکی از پیاده‌سازی‌های انجمن است.

فایل‌های پایتون مربوطه را می‌توانید در دایرکتوری \`sessions/\` در مخزن NSplusthon پیدا کنید.

پس از ایجاد پیاده‌سازی خود، می‌توانید آن را به لیست پیاده‌سازی‌های session نگهداری شده توسط انجمن اضافه کنید.

---

## String Sessions

\`StringSession\` راهی راحت برای تعبیه credentialهای ورود مستقیماً در کد شما برای قابلیت حمل بسیار آسان است، زیرا فقط به یک رشته نیاز دارند تا بتوانند بدون درخواست شماره تلفن و کد وارد شوند (یا شروع سریع‌تر اگر از bot token استفاده می‌کنید).

### تولید String Session

ساده‌ترین راه برای تولید StringSession به شرح زیر است:

\`\`\`python
from nsplusthon.sync import SoroushClient
from nsplusthon.sessions import StringSession

with SoroushClient(StringSession(), api_id, api_hash) as client:
    print(client.session.save())
\`\`\`

این کار را به عنوان راهی برای خروجی گرفتن کلید احراز هویت خود (آنچه برای ورود به حساب شما لازم است) در نظر بگیرید. این یک رشته در خروجی استاندارد (احتمالاً ترمینال شما) چاپ می‌کند.

!!! warning "هشدار"
    **این رشته را ایمن نگه دارید!** هر کسی با این رشته می‌تواند از آن برای ورود به حساب شما و هر کاری که می‌خواهد استفاده کند.
>
> این مشابه نشت فایل‌های \`*.session\` آنلاین است، اما نشت یک رشته آسان‌تر از نشت یک فایل است.

### استفاده از String Session

پس از دریافت رشته (که کمی طولانی است)، آن را به نوعی در اسکریپت خود بارگذاری کنید. می‌توانید از یک فایل متنی معمولی و \`open(...).read()\` استفاده کنید یا آن را مستقیماً در یک متغیر ذخیره کنید:

\`\`\`python
string = '1aaNk8EX-YRfwoRsebUkugFvht6DUPi_Q25UOCzOAqzc...'
with SoroushClient(StringSession(string), api_id, api_hash) as client:
    client.loop.run_until_complete(client.send_message('me', 'سلام'))
\`\`\`

این رشته‌ها واقعاً برای استفاده در مکان‌هایی مانند Heroku راحت هستند زیرا سیستم‌فایل موقت آنها فایل‌های خارجی را پس از پایان برنامه حذف می‌کند.

---

## نکات مهم

1. **ایمنی Session**: فایل‌های session حساس هستند و نباید به صورت آنلاین به اشتراک گذاشته شوند.
2. **تغییر نام فایل**: اگر فایل session را تغییر نام دهید یا جابجا کنید، ممکن است مجبور شوید دوباره وارد شوید.
3. **پشتیبان**: همیشه از فایل‌های session خود پشتیبان بگیرید.
4. **StringSession**: برای استقرار در محیط‌های ابری مانند Heroku مناسب است.

---

## مرحله بعدی

برای یادگیری بیشتر درباره رویدادها، بخش [رویدادها (Events)](events.md) را مطالعه کنید.
`,wt=`---
hide:
  - navigation
---

# String Sessions

String Sessions راهی راحت برای تعبیه credentialهای ورود مستقیماً در کد شما هستند. این روش به شما امکان می‌دهد بدون نیاز به ذخیره فایل session روی دیسک، از حساب خود استفاده کنید.

---

## مزایای String Sessions

- **قابلیت حمل بالا**: فقط یک رشته متنی است که می‌توانید آن را در هر جایی ذخیره کنید
- **مناسب برای محیط‌های ابری**: مانند Heroku که فایل‌سیستم موقت دارد
- **امنیت بیشتر**: نیازی به ذخیره فایل حساس روی دیسک نیست
- **سادگی استفاده**: فقط کافی است رشته را در کد خود قرار دهید

---

## تولید String Session

### روش ساده

\`\`\`python
from nsplusthon.sync import SoroushClient
from nsplusthon.sessions import StringSession

with SoroushClient(StringSession(), api_id, api_hash) as client:
    print(client.session.save())
\`\`\`

این کد یک String Session جدید تولید و چاپ می‌کند.

### روش با استفاده از SQLite Session

\`\`\`python
from nsplusthon.sync import SoroushClient
from nsplusthon.sessions import StringSession

# ابتدا با SQLite Session وارد شوید
client = SoroushClient('sqlite-session', api_id, api_hash)

# سپس آن را به String Session تبدیل کنید
string = StringSession.save(client.session)
print(string)
\`\`\`

### روش با SoroushClient معمولی

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())
await client.start()

# دریافت String Session
string_session = client.session.save()
print(string_session)
\`\`\`

---

## استفاده از String Session

### بارگذاری و استفاده

\`\`\`python
string = '1aaNk8EX-YRfwoRsebUkugFvht6DUPi_Q25UOCzOAqzc...'

with SoroushClient(StringSession(string), api_id, api_hash) as client:
    client.loop.run_until_complete(client.send_message('me', 'سلام'))
\`\`\`

### بارگذاری از فایل متنی

\`\`\`python
# ذخیره String Session در فایل متنی
with open('session.txt', 'w') as f:
    f.write(string_session)

# بارگذاری از فایل متنی
with open('session.txt', 'r') as f:
    string = f.read()

with SoroushClient(StringSession(string), api_id, api_hash) as client:
    # استفاده از کلاینت
    pass
\`\`\`

### بارگذاری از متغیر محیطی

\`\`\`python
import os
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

string = os.environ.get('SESSION_STRING')
with SoroushClient(StringSession(string), api_id, api_hash) as client:
    # استفاده از کلاینت
    pass
\`\`\`

---

## مثال کامل

### ایجاد و ذخیره String Session

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

async def create_session():
    client = SoroushClient(StringSession())
    await client.start()
    
    # ذخیره String Session
    string = client.session.save()
    
    # ذخیره در فایل
    with open('my_session.txt', 'w') as f:
        f.write(string)
    
    print('String Session ذخیره شد:')
    print(string)
    
    await client.disconnect()

import asyncio
asyncio.run(create_session())
\`\`\`

### استفاده از String Session ذخیره شده

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

async def use_session():
    # بارگذاری String Session از فایل
    with open('my_session.txt', 'r') as f:
        string = f.read()
    
    # ایجاد کلاینت
    with SoroushClient(StringSession(string), api_id, api_hash) as client:
        # دریافت اطلاعات کاربر
        me = await client.get_me()
        print(f'وارد شدید به عنوان: {me.first_name}')
        
        # ارسال پیام
        await client.send_message('me', 'سلام از String Session!')

import asyncio
asyncio.run(use_session())
\`\`\`

---

## نکات امنیتی

!!! warning "هشدار"
    **String Session را ایمن نگه دارید!** هر کسی با این رشته می‌تواند از آن برای ورود به حساب شما و هر کاری که می‌خواهد استفاده کند.
>
> این مشابه نشت فایل‌های \`*.session\` آنلاین است، اما نشت یک رشته آسان‌تر از نشت یک فایل است.

### نکات امنیتی مهم

1. **هرگز String Session را در کد منبع آنلاین قرار ندهید**
2. **از متغیرهای محیطی برای ذخیره String Session استفاده کنید**
3. **فایل‌های متنی حاوی String Session را git ignore کنید**
4. **از رمزگذاری برای ذخیره String Session استفاده کنید**
5. **دسترسی به فایل‌های حاوی String Session را محدود کنید**

---

## مقایسه با روش‌های دیگر

| روش | مزایا | معایب |
|------|--------|--------|
| **SQLite Session** | پیش‌فرض، پایدار | نیاز به فایل روی دیسک |
| **String Session** | قابلیت حمل بالا | نیاز به مدیریت رشته |
| **Memory Session** | سریع | اطلاعات در حافظه (موقت) |

---

## عیب‌یابی

### خطای String Session نامعتبر

اگر خطایی مانند "Invalid session" دریافت کردید:

1. مطمئن شوید String Session را به درستی کپی کرده‌اید
2. مطمئن شوید از همان API ID و Hash اصلی استفاده می‌کنید
3. String Session را دوباره تولید کنید

### String Session کار نمی‌کند

اگر String Session کار نمی‌کند:

1. مطمئن شوید String Session منقضی نشده است
2. مطمئن شوید حساب شما مسدود نشده است
3. با استفاده از String Session جدید دوباره امتحان کنید

---

## مرحله بعدی

برای یادگیری بیشتر درباره مدیریت خطاها، بخش [مدیریت خطاها](errors.md) را مطالعه کنید.
`,kt=`---
hide:
  - navigation
  - toc
---

<div class="ns-hero" dir="ltr" lang="en" markdown>

<img src="../logo.png" alt="NSplusthon">

# NSplusthon

Async Python client for Soroush Plus. User accounts and bots. No API id or hash.

<div class="ns-actions" markdown>

[Install](../installation.md){ .ns-btn }
[Quick start](../quick-start.md){ .ns-btn .ghost }
[فارسی](../index.md){ .ns-btn .ghost }
[GitHub](https://github.com/Amogrotex/NSplusthon){ .ns-btn .ghost }

</div>

<div class="ns-meta">
<span class="ns-chip">Python 3.9+</span>
<span class="ns-chip">asyncio</span>
<span class="ns-chip">MTProto</span>
<span class="ns-chip">GPL-3.0</span>
</div>

</div>

<div dir="ltr" lang="en" markdown>

\`\`\`bash
pip install nsplusthon
pip install "nsplusthon[fast]"
\`\`\`

Do not name your file \`nsplusthon.py\`.

\`\`\`python
from nsplusthon import SoroushClient, events
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())

@client.on(events.NewMessage)
async def handler(event):
    await event.reply("hello from NSplusthon")

client.start()
client.run_until_disconnected()
\`\`\`

Bot token:

\`\`\`python
client.start(bot_token="12345:abcdef")
\`\`\`

Package: [PyPI](https://pypi.org/project/nsplusthon/). Messenger: [web.splus.ir](https://web.splus.ir). Third-party, not affiliated with Soroush Plus.

</div>
`,Bt=`---
hide:
  - navigation
---

# چت‌ها و کانال‌ها

در این بخش مثال‌هایی برای کار با چت‌ها و کانال‌ها در NSplusthon آورده شده است.

---

## عضویت در کانال عمومی

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.channels import JoinChannelRequest

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت اطلاعات کانال
        channel = await client.get_entity('channel_username')
        
        # عضویت در کانال
        await client(JoinChannelRequest(channel))
        
        print('در کانال عضو شدید')

import asyncio
asyncio.run(main())
\`\`\`

---

## خروج از کانال

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.channels import LeaveChannelRequest

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت اطلاعات کانال
        channel = await client.get_entity('channel_username')
        
        # خروج از کانال
        await client(LeaveChannelRequest(channel))
        
        print('از کانال خارج شدید')

import asyncio
asyncio.run(main())
\`\`\`

---

## عضویت با لینک دعوت

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.messages import ImportChatInviteRequest

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # عضویت با لینک دعوت
        # لینک دعوت را از منوی گروه/کانال سروش پلاس کپی کنید
        # هش: AAAAFAFFszQPyPEZ7wgxLtd
        updates = await client(ImportChatInviteRequest('AAAAAFFszQPyPEZ7wgxLtd'))
        
        print('با لینک دعوت عضو شدید')

import asyncio
asyncio.run(main())
\`\`\`

---

## اضافه کردن کاربر به چت

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.messages import AddChatUserRequest

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت اطلاعات چت و کاربر
        chat = await client.get_entity('chat_username')
        user = await client.get_entity('user_username')
        
        # اضافه کردن کاربر به چت
        await client(AddChatUserRequest(
            chat_id=chat,
            user_id=user,
            fwd_limit=10  # اجازه دیدن ۱۰ پیام آخر
        ))
        
        print('کاربر به چت اضافه شد')

import asyncio
asyncio.run(main())
\`\`\`

---

## اضافه کردن کاربر به کانال

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.channels import InviteToChannelRequest

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت اطلاعات کانال و کاربر
        channel = await client.get_entity('channel_username')
        user = await client.get_entity('user_username')
        
        # اضافه کردن کاربر به کانال
        await client(InviteToChannelRequest(
            channel=channel,
            users=[user]
        ))
        
        print('کاربر به کانال اضافه شد')

import asyncio
asyncio.run(main())
\`\`\`

---

## بررسی لینک دعوت

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.messages import CheckChatInviteRequest

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # بررسی لینک دعوت
        result = await client(CheckChatInviteRequest('hash_from_link'))
        
        print(f'نام چت: {result.chat.title}')
        print(f'تعداد اعضا: {result.participants_count}')

import asyncio
asyncio.run(main())
\`\`\`

---

## افزایش تعداد بازدید در کانال

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.messages import GetMessagesViewsRequest

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت اطلاعات کانال
        channel = await client.get_entity('channel_username')
        
        # دریافت پیام‌های اخیر
        messages = await client.get_messages(channel, limit=10)
        msg_ids = [msg.id for msg in messages]
        
        # افزایش تعداد بازدید
        await client(GetMessagesViewsRequest(
            peer=channel,
            id=msg_ids,
            increment=True
        ))
        
        print('تعداد بازدید افزایش یافت')

import asyncio
asyncio.run(main())
\`\`\`

!!! note "یادداشت"
    توجه داشته باشید که این کار فقط **یک یا دو بار در روز** برای هر حساب قابل انجام است.

---

## دریافت لیست اعضا

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.channels import GetParticipantsRequest
from nsplusthon.tl.types import ChannelParticipantsSearch

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت لیست اعضا
        result = await client(GetParticipantsRequest(
            channel='channel_username',
            filter=ChannelParticipantsSearch(''),
            limit=100,
            offset=0
        ))
        
        for user in result.users:
            print(f'{user.first_name} {user.last_name}: {user.username}')

import asyncio
asyncio.run(main())
\`\`\`

---

## نکات مهم

!!! warning "هشدار"
    - برای اضافه کردن کاربران به چت‌ها و کانال‌ها، فقط برای دوستان یا حساب‌های ربات استفاده کنید
    - سعی نکنید کاربران را به صورت انبوه اضافه کنید، زیرا ممکن است حساب شما به عنوان اسپمر شناسایی شود
    - همیشه از مدیریت خطا استفاده کنید

---

## مرحله بعدی

برای یادگیری بیشتر درباره کار با پیام‌ها، بخش [کار با پیام‌ها](working-with-messages.md) را مطالعه کنید.
`,Ft=`---
hide:
  - navigation
---

# مثال‌ها

در این بخش مثال‌های عملی و کاربردی برای یادگیری بهتر NSplusthon آورده شده است.

---

## فهرست مطالب

<div class="grid cards" markdown>

-   :material-account:{ .lg .middle } __کاربران__

    ---

    مثال‌هایی برای کار با کاربران در NSplusthon.

    [:octicons-arrow-right-24: ببینید](users.md)

-   :material-chat:{ .lg .middle } __چت‌ها و کانال‌ها__

    ---

    مثال‌هایی برای کار با چت‌ها و کانال‌ها.

    [:octicons-arrow-right-24: ببینید](chats-and-channels.md)

-   :material-message:{ .lg .middle } __کار با پیام‌ها__

    ---

    مثال‌هایی برای کار با پیام‌ها.

    [:octicons-arrow-right-24: ببینید](working-with-messages.md)

-   :material-alert:{ .lg .middle } __هشدار مهم__

    ---

    نکات مهم و هشدارها هنگام استفاده از NSplusthon.

    [:octicons-arrow-right-24: ببینید](word-of-warning.md)

</div>

---

## مثال‌های ساده

### ارسال پیام ساده

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        await client.send_message('me', 'سلام، خودم!')
        
        # ارسال با قالب‌بندی
        await client.send_message('me', 'این پیام **بولد** است.')
        
        # ارسال با پیش‌نمایش لینک غیرفعال
        await client.send_message('me', 'https://example.com', link_preview=False)

import asyncio
asyncio.run(main())
\`\`\`

### دریافت پیام‌ها

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت آخرین پیام‌ها
        messages = await client.get_messages('me', limit=10)
        
        for message in messages:
            print(f'{message.id}: {message.text}')

import asyncio
asyncio.run(main())
\`\`\`

### ارسال فایل

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # ارسال عکس
        await client.send_file('me', '/path/to/photo.jpg')
        
        # ارسال فایل با عنوان
        await client.send_file('me', '/path/to/file.pdf', caption='فایل مهم')

import asyncio
asyncio.run(main())
\`\`\`

---

## مثال‌های رویدادی

### پاسخ خودکار به پیام‌ها

\`\`\`python
from nsplusthon import SoroushClient, events

client = SoroushClient('anon', api_id, api_hash)

@client.on(events.NewMessage(pattern=r'(?i)hi|hello'))
async def handler(event):
    await event.reply('سلام! چطور می‌توانم کمک کنم؟')

@client.on(events.NewMessage(pattern=r'(?i)help'))
async def help_handler(event):
    await event.respond('این یک پیام کمکی است.')

client.start()
client.run_until_disconnected()
\`\`\`

### پاسخ به پیام خاص

\`\`\`python
from nsplusthon import SoroushClient, events

client = SoroushClient('anon', api_id, api_hash)

@client.on(events.NewMessage(outgoing=True, pattern=r'\\.save'))
async def handler(event):
    if event.is_reply:
        replied = await event.get_reply_message()
        sender = replied.sender
        await client.download_profile_photo(sender)
        await event.respond(f'عکس شما ذخیره شد {sender.username}')

client.start()
client.run_until_disconnected()
\`\`\`

---

## مثال‌های پیشرفته

### مدیریت خطا

\`\`\`python
from nsplusthon import SoroushClient, events
from nsplusthon.errors import FloodWaitError, RPCError

client = SoroushClient('anon', api_id, api_hash)

async def safe_send(client, entity, message):
    try:
        await client.send_message(entity, message)
        return True
    except FloodWaitError as e:
        import asyncio
        await asyncio.sleep(e.seconds)
        return True
    except RPCError as e:
        print(f'خطا: {e}')
        return False

@client.on(events.NewMessage)
async def handler(event):
    await safe_send(client, 'me', 'پاسخ خودکار')

client.start()
client.run_until_disconnected()
\`\`\`

### کار با چندین کلاینت

\`\`\`python
import asyncio
from nsplusthon import SoroushClient

async def run_client(name, api_id, api_hash):
    client = SoroushClient(name, api_id, api_hash)
    await client.start()
    print(f'کلاینت {name} شروع شد')
    await client.run_until_disconnected()

async def main():
    await asyncio.gather(
        run_client('client1', api_id1, api_hash1),
        run_client('client2', api_id2, api_hash2)
    )

asyncio.run(main())
\`\`\`

---

## نکات مهم

!!! note "یادداشت"
    NSplusthon credentials پیش‌فرض دارد؛ بیشتر مثال‌ها بدون API ID و Hash جداگانه اجرا می‌شوند.

---

## مرحله بعدی

برای یادگیری بیشتر، بخش‌های زیر را مطالعه کنید:

- [مرجع API](../api-reference.md): مستندات کامل API
- [سوالات متداول](../faq.md): پاسخ به سوالات رایج
`,Ut=`---
hide:
  - navigation
---

# کاربران

در این بخش مثال‌هایی برای کار با کاربران در NSplusthon آورده شده است.

---

## دریافت اطلاعات کامل کاربر

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.users import GetFullUserRequest

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت اطلاعات کامل کاربر
        full = await client(GetFullUserRequest('username'))
        
        # دریافت بیوگرافی
        bio = full.full_user.about
        print(f'بیوگرافی: {bio}')
        
        # دریافت سایر اطلاعات
        user = full.users[0]
        print(f'نام: {user.first_name}')
        print(f'یوزرنیم: {user.username}')

import asyncio
asyncio.run(main())
\`\`\`

---

## بروزرسانی نام و بیوگرافی

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.account import UpdateProfileRequest

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # بروزرسانی نام و بیوگرافی
        await client(UpdateProfileRequest(
            first_name='نام جدید',
            last_name='نام خانوادگی جدید',
            about='بیوگرافی جدید من'
        ))
        
        print('پروفایل بروزرسانی شد')

import asyncio
asyncio.run(main())
\`\`\`

---

## بروزرسانی یوزرنیم

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.account import UpdateUsernameRequest

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # بروزرسانی یوزرنیم
        await client(UpdateUsernameRequest('new_username'))
        
        print('یوزرنیم بروزرسانی شد')

import asyncio
asyncio.run(main())
\`\`\`

---

## بروزرسانی عکس پروفایل

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.tl.functions.photos import UploadProfilePhotoRequest

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # آپلود عکس جدید
        file = await client.upload_file('/path/to/photo.jpg')
        
        # بروزرسانی عکس پروفایل
        await client(UploadProfilePhotoRequest(file))
        
        print('عکس پروفایل بروزرسانی شد')

import asyncio
asyncio.run(main())
\`\`\`

---

## دانلود عکس پروفایل

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دانلود عکس پروفایل خودتان
        await client.download_profile_photo('me')
        
        # دانلود عکس پروفایل کاربر دیگر
        await client.download_profile_photo('username')
        
        print('عکس پروفایل دانلود شد')

import asyncio
asyncio.run(main())
\`\`\`

---

## دریافت لیست مخاطبین

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت مخاطبین
        contacts = await client.get_contacts()
        
        for contact in contacts:
            print(f'{contact.first_name} {contact.last_name}: {contact.username}')

import asyncio
asyncio.run(main())
\`\`\`

---

## جستجوی کاربران

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # جستجوی کاربر با یوزرنیم
        user = await client.get_entity('username')
        print(f'نام کاربر: {user.first_name}')
        
        # جستجوی کاربر با شماره تلفن
        user = await client.get_entity('+989123456789')
        print(f'نام کاربر: {user.first_name}')

import asyncio
asyncio.run(main())
\`\`\`

---

## بررسی وضعیت کاربر

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت اطلاعات کاربر
        user = await client.get_entity('username')
        
        # بررسی وضعیت‌های مختلف
        print(f'آیا آنلاین است: {user.status}')
        print(f'آیا محدود شده: {user.restricted}')
        print(f'آیا مسدود شده: {user.deleted}')

import asyncio
asyncio.run(main())
\`\`\`

---

## نکات مهم

!!! note "یادداشت"
    - برای دریافت اطلاعات کامل کاربر از \`GetFullUserRequest\` استفاده کنید
    - برای بروزرسانی پروفایل از \`UpdateProfileRequest\` استفاده کنید
    - برای دانلود عکس پروفایل از \`download_profile_photo\` استفاده کنید
    - همیشه از مدیریت خطا استفاده کنید

---

## مرحله بعدی

برای یادگیری بیشتر درباره کار با چت‌ها و کانال‌ها، بخش [چت‌ها و کانال‌ها](chats-and-channels.md) را مطالعه کنید.
`,Ht=`---
hide:
  - navigation
---

# هشدار مهم

هنگام استفاده از NSplusthon، مهم است که از قوانین و محدودیت‌های سروش‌پلاس آگاه باشید تا حساب شما مسدود نشود.

---

## قوانین مهم سروش‌پلاس

### ۱. عدم ارسال اسپم

- **هرگز** پیام‌های تبلیغاتی یا اسپم ارسال نکنید
- **هرگز** به صورت انبوه پیام ارسال نکنید
- **هرگز** بدون اجازه کاربران به آنها پیام ندهید

### ۲. رعایت حریم خصوصی

- **هرگز** اطلاعات شخصی کاربران را بدون اجازه جمع‌آوری نکنید
- **هرگز** اطلاعات خصوصی را به اشتراک نگذارید
- **هرگز** بدون اجازه وارد چت‌های خصوصی نشوید

### ۳. عدم نقض قوانین

- **هرگز** از NSplusthon برای اهداف غیرقانونی استفاده نکنید
- **هرگز** قوانین سروش‌پلاس را نقض نکنید
- **هرگز** حساب‌های دیگران را هک نکنید

---

## محدودیت‌های فنی

### محدودیت ارسال پیام

- **FloodWaitError**: اگر خیلی سریع پیام ارسال کنید، باید صبر کنید
- **PeerFloodError**: اگر به محدودیت ارسال پیام رسیدید، باید صبر کنید

### محدودیت درخواست‌ها

- **تعداد درخواست در ثانیه**: محدودیت در تعداد درخواست‌های API
- **تعداد درخواست در روز**: محدودیت در تعداد کل درخواست‌ها

### محدودیت حساب

- **مسدود شدن حساب**: اگر قوانین را رعایت نکنید، حساب شما ممکن است مسدود شود
- **محدود شدن حساب**: اگر محدودیت‌ها را رعایت نکنید، حساب شما ممکن است محدود شود

---

## نکات امنیتی

### ۱. حفاظت از credentialها

\`\`\`python
# اشتباه - هرگز credentialها را در کد آشکار نکنید
api_id = 12345
api_hash = '0123456789abcdef'

# درست - از متغیرهای محیطی استفاده کنید
import os
api_id = int(os.environ.get('API_ID'))
api_hash = os.environ.get('API_HASH')
\`\`\`

### ۲. حفاظت از Session

\`\`\`python
# اشتباه - هرگز Session را آنلاین به اشتراک نگذارید
session_string = '1aaNk8EX-YRfwoRsebUkugFvht6DUPi_Q25UOCzOAqzc...'

# درست - از رمزگذاری استفاده کنید
import os
session_string = os.environ.get('SESSION_STRING')
\`\`\`

### ۳. محدود کردن دسترسی

\`\`\`python
# اشتباه - هرگز دسترسی کامل ندهید
client = SoroushClient('session', api_id, api_hash)
await client.start()

# درست - فقط دسترسی‌های لازم را بدهید
# (این مثال فقط یک مفهوم است، NSplusthon به طور خودکار دسترسی‌ها را مدیریت می‌کند)
\`\`\`

---

## بهترین شیوه‌ها

### ۱. استفاده از مدیریت خطا

\`\`\`python
from nsplusthon.errors import FloodWaitError, PeerFloodError, RPCError

async def safe_send(client, entity, message):
    try:
        await client.send_message(entity, message)
        return True
    except FloodWaitError as e:
        import asyncio
        await asyncio.sleep(e.seconds)
        return True
    except PeerFloodError:
        print('محدودیت ارسال پیام. لطفاً صبر کنید.')
        return False
    except RPCError as e:
        print(f'خطا: {e}')
        return False
\`\`\`

### ۲. استفاده از لاگینگ

\`\`\`python
import logging
from nsplusthon import SoroushClient, events

logging.basicConfig(
    format='[%(levelname) %(asctime)s] %(name)s: %(message)s',
    level=logging.WARNING
)

client = SoroushClient('anon', api_id, api_hash)

@client.on(events.NewMessage)
async def handler(event):
    logging.info(f'پیام جدید: {event.raw_text}')
\`\`\`

### ۳. محدود کردن تعداد درخواست‌ها

\`\`\`python
import asyncio

async def rate_limited_send(client, entities, message, delay=1):
    for entity in entities:
        await client.send_message(entity, message)
        await asyncio.sleep(delay)  # تاخیر بین درخواست‌ها
\`\`\`

### ۴. استفاده از String Session برای محیط‌های ابری

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

# برای محیط‌های ابری مانند Heroku
import os
session_string = os.environ.get('SESSION_STRING')
client = SoroushClient(StringSession(session_string), api_id, api_hash)
\`\`\`

---

## عیب‌یابی مشکلات رایج

### حساب مسدود شده

اگر حساب شما مسدود شده است:

1. با پشتیبانی سروش‌پلاس تماس بگیرید
2. دلیل مسدود شدن را بررسی کنید
3. از اشتباهات قبلی درس بگیرید

### FloodWaitError

اگر FloodWaitError دریافت کردید:

1. مدت زمان انتظار را رعایت کنید
2. سرعت ارسال پیام‌ها را کاهش دهید
3. از تاخیر بین درخواست‌ها استفاده کنید

### PeerFloodError

اگر PeerFloodError دریافت کردید:

1. مدت زمان انتظار را رعایت کنید
2. تعداد پیام‌های ارسالی را کاهش دهید
3. از ارسال انبوه پیام خودداری کنید

---

## منابع مفید

- [قوانین سروش‌پلاس](https://web.splus.ir/terms)
- [API مستندات سروش‌پلاس](https://core.splus.ir/)
- [GitHub NSplusthon](https://github.com/Amogrotex/NSplusthon)

---

## نتیجه‌گیری

با رعایت قوانین و نکات امنیتی، می‌توانید از NSplusthon به طور ایمن و مؤثر استفاده کنید. همیشه از بهترین شیوه‌ها پیروی کنید و مراقب حساب خود باشید.
`,vt=`---
hide:
  - navigation
---

# کار با پیام‌ها

در این بخش مثال‌هایی برای کار با پیام‌ها در NSplusthon آورده شده است.

---

## ارسال پیام متنی

### ارسال به خودتان

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # ارسال به خودتان
        await client.send_message('me', 'سلام، خودم!')
        
        # ارسال با قالب‌بندی
        await client.send_message('me', 'این پیام **بولد**، \`کد\` و __ایتالیک__ است.')

import asyncio
asyncio.run(main())
\`\`\`

### ارسال به یوزرنیم

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # ارسال به یوزرنیم
        await client.send_message('username', 'سلام از NSplusthon!')

import asyncio
asyncio.run(main())
\`\`\`

### ارسال به شماره تلفن

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # ارسال به شماره تلفن (باید در لیست مخاطبین باشد)
        await client.send_message('+989123456789', 'سلام دوست من!')

import asyncio
asyncio.run(main())
\`\`\`

### ارسال به شناسه چت

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # ارسال به شناسه چت
        await client.send_message(-100123456, 'سلام گروه!')

import asyncio
asyncio.run(main())
\`\`\`

---

## ارسال فایل

### ارسال عکس

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # ارسال عکس
        await client.send_file('me', '/path/to/photo.jpg')
        
        # ارسال عکس با توضیحات
        await client.send_file('me', '/path/to/photo.jpg', caption='این یک عکس است.')

import asyncio
asyncio.run(main())
\`\`\`

### ارسال فایل

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # ارسال فایل
        await client.send_file('me', '/path/to/file.pdf')
        
        # ارسال فایل با عنوان
        await client.send_file('me', '/path/to/file.pdf', caption='فایل مهم')

import asyncio
asyncio.run(main())
\`\`\`

### ارسال ویدیو

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # ارسال ویدیو
        await client.send_file('me', '/path/to/video.mp4')
        
        # ارسال ویدیو با توضیحات
        await client.send_file('me', '/path/to/video.mp4', caption='ویدیوی آموزشی')

import asyncio
asyncio.run(main())
\`\`\`

---

## دریافت پیام‌ها

### دریافت آخرین پیام‌ها

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت آخرین ۱۰ پیام
        messages = await client.get_messages('me', limit=10)
        
        for message in messages:
            print(f'{message.id}: {message.text}')

import asyncio
asyncio.run(main())
\`\`\`

### دریافت پیام‌های خاص

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت پیام با شناسه
        message = await client.get_messages('me', ids=123)
        print(f'پیام: {message.text}')
        
        # دریافت چند پیام با شناسه‌ها
        messages = await client.get_messages('me', ids=[123, 456, 789])
        for message in messages:
            print(f'{message.id}: {message.text}')

import asyncio
asyncio.run(main())
\`\`\`

### جستجوی پیام‌ها

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # جستجوی پیام‌ها
        messages = await client.get_messages('me', search='کلمه جستجو')
        
        for message in messages:
            print(f'{message.id}: {message.text}')

import asyncio
asyncio.run(main())
\`\`\`

---

## ویرایش و حذف پیام‌ها

### ویرایش پیام

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # ارسال پیام
        message = await client.send_message('me', 'پیام اصلی')
        
        # ویرایش پیام
        await client.edit_message(message, 'پیام ویرایش شده')

import asyncio
asyncio.run(main())
\`\`\`

### حذف پیام

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # ارسال پیام
        message = await client.send_message('me', 'پیام برای حذف')
        
        # حذف پیام
        await client.delete_messages([message.id])
        
        # حذف پیام با شناسه
        await client.delete_messages([123, 456])

import asyncio
asyncio.run(main())
\`\`\`

---

## پاسخ به پیام‌ها

### پاسخ مستقیم

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت پیام
        message = await client.get_messages('me', ids=123)
        
        # پاسخ به پیام
        await message.reply('این یک پاسخ است!')

import asyncio
asyncio.run(main())
\`\`\`

### پاسخ با استفاده از event

\`\`\`python
from nsplusthon import SoroushClient, events

client = SoroushClient('anon', api_id, api_hash)

@client.on(events.NewMessage)
async def handler(event):
    # پاسخ به پیام
    await event.reply('پاسخ خودکار!')
    
    # ارسال پیام بدون reply
    await event.respond('این یک پیام جداگانه است.')

client.start()
client.run_until_disconnected()
\`\`\`

---

## دانلود رسانه‌ها

### دانلود عکس

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت پیام‌ها
        messages = await client.get_messages('me', limit=10)
        
        for message in messages:
            if message.photo:
                # دانلود عکس
                path = await message.download_media()
                print(f'عکس ذخیره شد: {path}')

import asyncio
asyncio.run(main())
\`\`\`

### دانلود فایل

\`\`\`python
from nsplusthon import SoroushClient

async def main():
    with SoroushClient('anon', api_id, api_hash) as client:
        # دریافت پیام‌ها
        messages = await client.get_messages('me', limit=10)
        
        for message in messages:
            if message.document:
                # دانلود فایل
                path = await message.download_media()
                print(f'فایل ذخیره شد: {path}')

import asyncio
asyncio.run(main())
\`\`\`

---

## نکات مهم

!!! note "یادداشت"
    - برای ارسال فایل از \`send_file\` استفاده کنید
    - برای دانلود رسانه‌ها از \`download_media\` استفاده کنید
    - برای ویرایش پیام از \`edit_message\` استفاده کنید
    - برای حذف پیام از \`delete_messages\` استفاده کنید

---

## مرحله بعدی

برای یادگیری بیشتر، بخش [هشدار مهم](word-of-warning.md) را مطالعه کنید.
`,Yt=`---
hide:
  - navigation
---

# سوالات متداول

پاسخ به سوالات رایج کاربران NSplusthon.

---

## سوالات نصب و راه‌اندازی

### چگونه NSplusthon را نصب کنم؟

\`\`\`bash
pip install nsplusthon
\`\`\`

### چگونه نسخه توسعه‌دهنده را نصب کنم؟

\`\`\`bash
pip install --upgrade "git+https://github.com/Amogrotex/NSplusthon.git"
\`\`\`

### چگونه نصب را تأیید کنم؟

\`\`\`bash
python3 -c "import nsplusthon; print(nsplusthon.__version__)"
\`\`\`

### وابستگی‌های اختیاری چیست؟

- **cryptg**: افزایش سرعت رمزگذاری
- **Pillow**: تغییر اندازه خودکار تصاویر
- **aiohttp**: وابستگی اصلی (همراه پکیج نصب می‌شود)
- **hachoir**: استخراج متادیتا از فایل‌ها

---

## سوالات احراز هویت

### آیا می‌توانم بدون API ID از NSplusthon استفاده کنم؟

بله، NSplusthon API credentials پیش‌فرض برای سروش‌پلاس دارد و نیازی به دریافت کلید جداگانه نیست:

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())
client.start()
\`\`\`

### چگونه با ربات وارد شوم؟

\`\`\`python
from nsplusthon.sync import SoroushClient

bot = SoroushClient("bot").start(bot_token="12345:your_bot_token")
\`\`\`

---

## سوالات پیام‌رسانی

### چگونه پیام ارسال کنم？

\`\`\`python
await client.send_message('username', 'سلام!')
await client.send_message('me', 'سلام، خودم!')
await client.send_message('+989123456789', 'سلام دوست من!')
\`\`\`

### چگونه فایل ارسال کنم？

\`\`\`python
await client.send_file('me', '/path/to/file.jpg')
await client.send_file('me', '/path/to/file.pdf', caption='توضیحات')
\`\`\`

### چگونه پیام دریافت کنم？

\`\`\`python
messages = await client.get_messages('me', limit=10)
for message in messages:
    print(message.text)
\`\`\`

### چگونه به پیام پاسخ دهم？

\`\`\`python
message = await client.get_messages('me', ids=123)
await message.reply('این یک پاسخ است!')
\`\`\`

---

## سوالات رویدادها

### چگونه به پیام‌های جدید پاسخ دهم؟

\`\`\`python
from nsplusthon import SoroushClient, events

client = SoroushClient('anon', api_id, api_hash)

@client.on(events.NewMessage)
async def handler(event):
    if 'سلام' in event.raw_text:
        await event.reply('سلام! چطور می‌توانم کمک کنم؟')

client.start()
client.run_until_disconnected()
\`\`\`

### چگونه فقط به پیام‌های خاصی پاسخ دهم؟

\`\`\`python
@client.on(events.NewMessage(pattern=r'(?i)hi|hello'))
async def handler(event):
    await event.reply('سلام!')

@client.on(events.NewMessage(outgoing=True))
async def handler_outgoing(event):
    print('پیام خروجی:', event.raw_text)
\`\`\`

---

## سوالات Session

### Session چیست؟

Session فایلی است که اطلاعات احراز هویت و کش entity را ذخیره می‌کند.

### StringSession چیست؟

StringSession نوعی Session است که اطلاعات را به صورت رشته ذخیره می‌کند:

\`\`\`python
from nsplusthon.sessions import StringSession

session = StringSession()
string = session.save()
\`\`\`

### چگونه Session را ذخیره کنم؟

\`\`\`python
# ذخیره به صورت فایل
client = SoroushClient('session_name', api_id, api_hash)

# ذخیره به صورت رشته
string = client.session.save()
\`\`\`

---

## سوالات خطایابی

### خطای FloodWaitError چیست؟

خطایی است که وقتی خیلی سریع درخواست ارسال می‌کنید رخ می‌دهد. باید صبر کنید:

\`\`\`python
from nsplusthon.errors import FloodWaitError

try:
    await client.send_message('username', 'سلام!')
except FloodWaitError as e:
    print(f'صبر کنید {e.seconds} ثانیه')
\`\`\`

### خطای PeerFloodError چیست؟

خطایی است که وقتی به محدودیت ارسال پیام رسیدید رخ می‌دهد:

\`\`\`python
from nsplusthon.errors import PeerFloodError

try:
    await client.send_message('username', 'سلام!')
except PeerFloodError:
    print('محدودیت ارسال پیام. لطفاً صبر کنید.')
\`\`\`

### چگونه خطاها را مدیریت کنم？

\`\`\`python
from nsplusthon.errors import RPCError, FloodWaitError, PeerFloodError

async def safe_send(client, entity, message):
    try:
        await client.send_message(entity, message)
        return True
    except FloodWaitError as e:
        import asyncio
        await asyncio.sleep(e.seconds)
        return True
    except PeerFloodError:
        print('محدودیت ارسال پیام')
        return False
    except RPCError as e:
        print(f'خطا: {e}')
        return False
\`\`\`

---

## سوالات پیشرفته

### چگونه از پروکسی استفاده کنم؟

\`\`\`python
proxy = {
    'proxy_type': 'socks5',
    'addr': '1.1.1.1',
    'port': 5555,
    'username': 'foo',
    'password': 'bar',
    'rdns': True
}

client = SoroushClient('anon', api_id, api_hash, proxy=proxy)
\`\`\`

### چگونه از MTProto Proxy استفاده کنم؟

\`\`\`python
from nsplusthon import SoroushClient, connection

client = SoroushClient(
    'anon', api_id, api_hash,
    connection=connection.ConnectionTcpMTProxyRandomizedIntermediate,
    proxy=('mtproxy.example.com', 2002, 'secret')
)
\`\`\`

### چگونه چندین کلاینت را همزمان اجرا کنم？

\`\`\`python
import asyncio
from nsplusthon import SoroushClient

async def run_client(name, api_id, api_hash):
    client = SoroushClient(name, api_id, api_hash)
    await client.start()
    await client.run_until_disconnected()

async def main():
    await asyncio.gather(
        run_client('client1', api_id1, api_hash1),
        run_client('client2', api_id2, api_hash2)
    )

asyncio.run(main())
\`\`\`

---

## سوالات امنیتی

### چگونه credentialهای خود را ایمن نگه دارم؟

1. از متغیرهای محیطی استفاده کنید
2. credentialها را در کد آشکار نکنید
3. فایل‌های session را آنلاین به اشتراک نگذارید
4. از رمزگذاری استفاده کنید

### آیا NSplusthon امن است؟

NSplusthon یک کتابخانه شخص ثالث است. مراقب باشید:

- از منابع معتبر دانلود کنید
- credentialهای خود را با کسی به اشتراک نگذارید
- قوانین سروش‌پلاس را رعایت کنید

---

## سوالات توسعه

### چگونه باگ گزارش کنم؟

به [GitHub Issues](https://github.com/Amogrotex/NSplusthon/issues/) بروید و باگ جدید ایجاد کنید.

### چگونه مشارکت کنم؟

1. مخزن را fork کنید
2. تغییرات خود را ایجاد کنید
3. Pull Request ارسال کنید

### چگونه مستندات را مطالعه کنم؟

- [مرجع API](api-reference.md)
- [English overview](en/index.md)
- [GitHub NSplusthon](https://github.com/Amogrotex/NSplusthon)

---

## سوالات دیگر

### NSplusthon چیست؟

NSplusthon یک کتابخانه پایتون asyncio است که برای تعامل با API سروش‌پلاس طراحی شده است.

### NSplusthon از چه نسخه پایتونی پشتیبانی می‌کند؟

پایتون **3.9** یا بالاتر.

### آیا NSplusthon رایگان است؟

بله، NSplusthon کاملاً رایگان و متن‌باز است.

### چگونه از NSplusthon استفاده کنم؟

مستندات را مطالعه کنید و مثال‌ها را دنبال کنید.
`,qt=`---
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

\`\`\`bash
pip install nsplusthon
\`\`\`

\`\`\`python
from nsplusthon import SoroushClient, events
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())

@client.on(events.NewMessage)
async def handler(event):
    await event.reply("سلام")

client.start()
client.run_until_disconnected()
\`\`\`

!!! note "ورود ربات"
    کلاینت اصلی \`SoroushClient\` است. برای ربات از \`start(bot_token=...)\` استفاده کنید. اسکریپت را \`nsplusthon.py\` نام نگذارید.

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

    متدهای \`SoroushClient\` و رویدادها.

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
`,Gt=`---
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

\`\`\`bash
python3 -m pip install --upgrade pip
\`\`\`

---

## نصب کتابخانه

\`\`\`bash
python3 -m pip install --upgrade nsplusthon
\`\`\`

نصب پیشنهادی با رمزنگاری سریع، پروکسی و پردازش رسانه:

\`\`\`bash
python3 -m pip install --upgrade "nsplusthon[fast]"
\`\`\`

---

## نصب نسخه توسعه‌دهنده

آخرین کد روی شاخه \`main\`:

\`\`\`bash
python3 -m pip install --upgrade "git+https://github.com/Amogrotex/NSplusthon.git"
\`\`\`

یا یک تگ مشخص (مثال):

\`\`\`bash
python3 -m pip install --upgrade "git+https://github.com/Amogrotex/NSplusthon.git@v1.3.0"
\`\`\`

!!! warning "هشدار"
    نسخه git ممکن است ناپایدار باشد. برای production از نسخه PyPI استفاده کنید.

---

## تأیید نصب

\`\`\`bash
python3 -c "import nsplusthon; print(nsplusthon.__version__)"
\`\`\`

نسخه کتابخانه باید در خروجی نمایش داده شود.

!!! warning "نام فایل"
    اسکریپت خود را \`nsplusthon.py\` نام‌گذاری نکنید؛ با خود پکیج تداخل پیدا می‌کند.

---

## وابستگی‌ها

وابستگی‌های اصلی همراه پکیج نصب می‌شوند: **aiohttp**، **pyaes**، **rsa**.

### اختیاری

| Extra / پکیج | کاربرد |
| --- | --- |
| \`cryptg\` | رمزنگاری C؛ برای ترافیک زیاد یا فایل‌های بزرگ توصیه می‌شود |
| \`python-socks[asyncio]\` | پروکسی SOCKS |
| \`Pillow\` | تغییر اندازه خودکار تصاویر بزرگ |
| \`hachoir\` | متادیتای رسانه (عنوان، مدت، هنرمند) |
| \`isal\` | فشرده‌سازی سریع‌تر |

\`\`\`bash
pip install "nsplusthon[cryptg]"
pip install "nsplusthon[socks]"
pip install "nsplusthon[fast]"
\`\`\`

---

## نصب پشتیبانی پروکسی

\`\`\`bash
pip install "nsplusthon[socks]"
\`\`\`

\`\`\`python
from nsplusthon import SoroushClient

proxy = {
    "proxy_type": "socks5",
    "addr": "127.0.0.1",
    "port": 1080,
    "rdns": True,
}

client = SoroushClient("session_name", proxy=proxy)
\`\`\`

API ID و Hash لازم نیست مگر خودتان بخواهید مقدار اختصاصی بدهید.

---

## عیب‌یابی نصب

### خطای ImportError

اگر \`ImportError: cannot import name 'SoroushClient'\` دیدید:

1. مطمئن شوید نام فایل اسکریپت شما \`nsplusthon.py\` نیست
2. کتابخانه را دوباره نصب کنید: \`pip install --upgrade nsplusthon\`

### خطای نصب وابستگی‌ها

\`\`\`bash
pip install --upgrade setuptools wheel
pip install --upgrade nsplusthon
\`\`\`

---

## مرحله بعدی

پس از نصب موفقیت‌آمیز، به بخش [شروع سریع](quick-start.md) بروید.
`,Qt=`---
hide:
  - navigation
---

# شروع سریع

راهنمای سریع برای شروع کار با NSplusthon. در این بخش یاد می‌گیرید چگونه اولین کلاینت خود را ایجاد کرده و عملیات اساسی را انجام دهید.

---

## ایجاد کلاینت

### روش ساده (بدون API ID و Hash)

NSplusthon دارای API credentials پیش‌فرض برای سروش‌پلاس است، بنابراین می‌توانید بدون دریافت کلیدهای خود، کلاینت ایجاد کنید:

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

# بدون نیاز به api_id یا api_hash
client = SoroushClient(StringSession())
client.start()
\`\`\`

ورود با توکن ربات:

\`\`\`python
client.start(bot_token="12345:abcdef")
\`\`\`

### روش با API ID و Hash دلخواه

اختیاری است — NSplusthon بدون آن‌ها کار می‌کند. فقط اگر credentials اختصاصی دارید پاس بدهید:

\`\`\`python
from nsplusthon import SoroushClient

# اولین پارامتر نام فایل session است (.session در پوشه جاری ساخته می‌شود)
with SoroushClient("anon", api_id=YOUR_API_ID, api_hash=YOUR_API_HASH) as client:
    client.loop.run_until_complete(client.send_message("me", "سلام، خودم!"))
\`\`\`

!!! important "مهم"
    از نام‌گذاری فایل اسکریپت خود به نام \`nsplusthon.py\` خودداری کنید! پایتون سعی می‌کند کلاینت را از آن فایل import کند و با خطا مواجه می‌شود.

---

## ارسال پیام

### ارسال به خودتان

\`\`\`python
await client.send_message('me', 'سلام، خودم!')
\`\`\`

### ارسال به یک چت با شناسه

\`\`\`python
await client.send_message(-100123456, 'سلام، گروه!')
\`\`\`

### ارسال به مخاطبین

\`\`\`python
await client.send_message('+989123456789', 'سلام، دوست من!')
\`\`\`

### ارسال به یوزرنیم

\`\`\`python
await client.send_message('username', 'تست NSplusthon!')
\`\`\`

### ارسال با قالب‌بندی

\`\`\`python
message = await client.send_message(
    'me',
    'این پیام دارای **بولد**، \`کد\`، __ایتالیک__ و '
    'یک [وبسایت زیبا](https://example.com) است!',
    link_preview=False
)

# چاپ متن خام پیام
print(message.raw_text)
\`\`\`

---

## دریافت اطلاعات کاربر

\`\`\`python
# دریافت اطلاعات خودتان
me = await client.get_me()

# نمایش اطلاعات به صورت رشته
print(me.stringify())

# دسترسی به ویژگی‌ها
username = me.username
print(username)
print(me.phone)
\`\`\`

---

## چاپ مکالمات

\`\`\`python
async for dialog in client.iter_dialogs():
    print(dialog.name, 'دارای شناسه', dialog.id)
\`\`\`

---

## پاسخ به پیام‌ها

\`\`\`python
# اگر یک شیء پیام دارید، می‌توانید مستقیماً پاسخ دهید
await message.reply('عالی!')
\`\`\`

---

## ارسال فایل

\`\`\`python
await client.send_file('me', '/home/me/Pictures/holidays.jpg')
\`\`\`

---

## چاپ تاریخچه پیام‌ها

\`\`\`python
async for message in client.iter_messages('me'):
    print(message.id, message.text)
    
    # دانلود رسانه از پیام‌ها
    if message.photo:
        path = await message.download_media()
        print('فایل در مسیر ذخیره شد', path)
\`\`\`

---

## مثال کامل

در اینجا یک مثال کامل برای شروع سریع آورده شده است:

\`\`\`python
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession

client = SoroushClient(StringSession())

async def main():
    # دریافت اطلاعات خودتان
    me = await client.get_me()
    print(me.stringify())
    
    # نام کاربری
    username = me.username
    print(username)
    print(me.phone)
    
    # چاپ تمام مکالمات
    async for dialog in client.iter_dialogs():
        print(dialog.name, 'دارای شناسه', dialog.id)
    
    # ارسال پیام به خودتان
    await client.send_message('me', 'سلام، خودم!')
    
    # ارسال پیام به یک چت
    await client.send_message(-100123456, 'سلام، گروه!')
    
    # ارسال پیام به مخاطب
    await client.send_message('+989123456789', 'سلام، دوست من!')
    
    # ارسال پیام به یوزرنیم
    await client.send_message('username', 'تست NSplusthon!')
    
    # ارسال با قالب‌بندی
    message = await client.send_message(
        'me',
        'این پیام دارای **بولد**، \`کد\`، __ایتالیک__ و '
        'یک [وبسایت زیبا](https://example.com) است!',
        link_preview=False
    )
    
    print(message.raw_text)
    await message.reply('عالی!')
    
    # ارسال فایل
    await client.send_file('me', '/home/me/Pictures/holidays.jpg')
    
    # چاپ تاریخچه پیام‌ها
    async for message in client.iter_messages('me'):
        print(message.id, message.text)
        
        if message.photo:
            path = await message.download_media()
            print('فایل در مسیر ذخیره شد', path)

with client:
    client.loop.run_until_complete(main())
\`\`\`

---

## نکات مهم

!!! tip "نکته"
    NSplusthon یک کتابخانه ناهمگام (async) است و باید با asyncio کار کنید. به طور کلی، تمام کد خود را در داخل یک تابع \`async def\` بنویسید:

\`\`\`python
client = ...

async def do_something(me):
    ...

async def main():
    # بیشتر کد شما باید اینجا باشد
    me = await client.get_me()
    await do_something(me)

with client:
    client.loop.run_until_complete(main())
\`\`\`

---

## مرحله بعدی

پس از آشنایی با مبانی، به بخش [مفاهیم پایه](concepts/index.md) بروید تا مفاهیم مهم مانند Entity، Session و رویدادها را بهتر درک کنید.
`,Wt={note:"یادداشت",warning:"هشدار",important:"مهم",tip:"نکته",info:"اطلاعات",danger:"خطر",example:"مثال",question:"پرسش"},jt=/:(?:material|octicons|fontawesome|simple)-[a-z0-9-]+:/g,Kt=/\s*\{\s*[.#][^}\n]*\}/g,Xt=/\[([^\]]+)\]\(([^)\s]+)\)\{\s*([^}]*?)\s*\}/g;function Vt(e){return e.replace(Xt,(n,t,a,i)=>{const c=i.split(/\s+/).filter(d=>d.startsWith(".")).map(d=>d.slice(1));return c.length?`<a href="${a}" class="${c.join(" ")}">${t}</a>`:n})}function zt(e){const n=e.split(`
`),t=[];let a=0;for(;a<n.length;){const i=/^!!!\s+([a-z]+)(?:\s+"([^"]*)")?\s*$/.exec(n[a]);if(!i){t.push(n[a]),a++;continue}const c=i[1].toLowerCase(),d=i[2]??Wt[c]??c;a++;const _=[];for(;a<n.length&&(/^(\s{4}|\t)/.test(n[a])||n[a].trim()==="");){if(n[a].trim()===""){const f=n[a+1];if(f!==void 0&&f.trim()!==""&&!/^(\s{4}|\t)/.test(f))break;_.push("")}else _.push(n[a].replace(/^(\s{4}|\t)/,""));a++}t.push(`<div class="adm adm--${c}">`,`<p class="adm__title">${d}</p>`,"",..._,"","</div>","")}return t.join(`
`)}function $t(e){return Vt(zt(e)).replace(jt,"").replace(Kt,"")}const Jt=Object.assign({"../../content/api-reference.md":St,"../../content/compare.md":Ct,"../../content/concepts/asyncio.md":It,"../../content/concepts/botapi-vs-mtproto.md":yt,"../../content/concepts/entities.md":Rt,"../../content/concepts/errors.md":Ot,"../../content/concepts/events.md":Lt,"../../content/concepts/full-api.md":Dt,"../../content/concepts/index.md":Pt,"../../content/concepts/router.md":xt,"../../content/concepts/sessions.md":Mt,"../../content/concepts/string-sessions.md":wt,"../../content/en/index.md":kt,"../../content/examples/chats-and-channels.md":Bt,"../../content/examples/index.md":Ft,"../../content/examples/users.md":Ut,"../../content/examples/word-of-warning.md":Ht,"../../content/examples/working-with-messages.md":vt,"../../content/faq.md":Yt,"../../content/index.md":qt,"../../content/installation.md":Gt,"../../content/quick-start.md":Qt});function Zt(e){return e.trim().toLowerCase().replace(/[\u0000-\u001f]/g,"").replace(/[\s\u200c]+/g,"-").replace(/[!-/:-@[-`{-~]/g,"").replace(/^-+|-+$/g,"")}const es=/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;function ns(e){const n=e.match(es);if(!n)return{meta:{hide:[]},body:e};const t={hide:[]};for(const a of n[1].split(/\r?\n/)){const i=/^-\s+(\w+)/.exec(a.trim());if(i){t.hide.push(i[1]);continue}const c=/^(\w[\w-]*):\s*(.+)$/.exec(a.trim());c&&(c[1]==="title"||c[1]==="description")&&(t[c[1]]=c[2].replace(/^["']|["']$/g,"").trim())}return{meta:t,body:e.slice(n[0].length).replace(/^\s*\n/,"")}}function ts(e){return e.replace(/```[\s\S]*?```/g," ").replace(/`[^`]*`/g," ").replace(/!?\[([^\]]*)\]\([^)]*\)/g,"$1").replace(/<[^>]+>/g," ").replace(/[#>*_~|-]/g," ").replace(/\s+/g," ").trim()}function ss(e){const n=[],t=e.replace(/```[\s\S]*?```/g,""),a=/^(#{1,3})\s+(.+?)\s*#*$/gm;let i;for(;i=a.exec(t);){const c=i[2].replace(/[`*_]/g,"").trim();n.push({id:Zt(c),text:c,depth:i[1].length})}return n}function as(e){const n=e.replace(/```[\s\S]*?```/g,"").match(/^#\s+(.+)$/m);return n?n[1].replace(/[`*_]/g,"").trim():null}function us(e){const n=e.replace("../../content/","").replace(/\.md$/,"");return n==="index"?"":n.replace(/\/index$/,"")}const ln=Object.entries(Jt).map(([e,n])=>{const t=us(e),{meta:a,body:i}=ns(n),c=$t(i);return{slug:t,title:a.title??as(c)??(t||"NSplusthon"),body:c,searchText:ts(c).toLowerCase(),headings:ss(c),lang:t==="en"||t.startsWith("en/")?"en":"fa",fullBleed:a.hide.includes("navigation")&&a.hide.includes("toc"),hideToc:a.hide.includes("toc")}}).sort((e,n)=>e.slug.localeCompare(n.slug)),is=new Map(ln.map(e=>[e.slug,e]));function rs(e){return is.get(e.replace(/^\/+|\/+$/g,""))}function os(e,n=8){const t=e.trim().toLowerCase();if(t.length<2)return[];const a=[];for(const i of ln){const c=i.title.toLowerCase().includes(t),d=i.searchText.indexOf(t);if(!c&&d===-1)continue;const _=Math.max(0,d-45),f=d===-1?i.searchText.slice(0,110):(_>0?"…":"")+i.searchText.slice(_,d+90);a.push({hit:{doc:i,excerpt:f},score:(c?1e3:0)-(d===-1?0:d/100)})}return a.sort((i,c)=>c.score-i.score).slice(0,n).map(i=>i.hit)}function cs({open:e,onClose:n}){const[t,a]=A.useState(""),[i,c]=A.useState(0),d=A.useRef(null),_=nt(),f=A.useMemo(()=>os(t),[t]);if(A.useEffect(()=>{e&&(a(""),c(0),requestAnimationFrame(()=>{var b;return(b=d.current)==null?void 0:b.focus()}))},[e]),A.useEffect(()=>c(0),[t]),A.useEffect(()=>{if(!e)return;const b=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=b}},[e]),!e)return null;const T=b=>{_("/"+b),n()},y=b=>{if(b.key==="Escape")return n();b.key==="ArrowDown"&&(b.preventDefault(),c(D=>Math.min(D+1,f.length-1))),b.key==="ArrowUp"&&(b.preventDefault(),c(D=>Math.max(D-1,0))),b.key==="Enter"&&f[i]&&(b.preventDefault(),T(f[i].doc.slug))};return m.jsxs("div",{className:"dialog",role:"dialog","aria-modal":"true","aria-label":"جستجو",onKeyDown:y,children:[m.jsx("button",{className:"dialog__scrim",onClick:n,"aria-label":"بستن",tabIndex:-1}),m.jsxs("div",{className:"dialog__panel glass",children:[m.jsxs("div",{className:"dialog__field",children:[m.jsx(cn,{}),m.jsx("input",{ref:d,className:"dialog__input",value:t,onChange:b=>a(b.target.value),placeholder:"جستجو در مستندات…","aria-label":"عبارت جستجو",autoComplete:"off",spellCheck:!1}),m.jsx("button",{className:"chip",onClick:n,"aria-label":"بستن",children:m.jsx(Et,{})})]}),m.jsxs("div",{className:"dialog__results",children:[t.trim().length<2&&m.jsx("p",{className:"dialog__hint",children:"حداقل دو حرف بنویسید. با کلیدهای بالا و پایین حرکت کنید."}),t.trim().length>=2&&f.length===0&&m.jsx("p",{className:"dialog__hint",children:"چیزی پیدا نشد."}),f.map((b,D)=>m.jsxs("button",{className:"dialog__hit"+(D===i?" dialog__hit--active":""),onClick:()=>T(b.doc.slug),onMouseEnter:()=>c(D),children:[m.jsx("span",{className:"dialog__hitTitle",children:b.doc.title}),m.jsx("span",{className:"dialog__hitExcerpt",children:b.excerpt})]},b.doc.slug))]})]})]})}const He=/[#.]/g;function ls(e,n){const t=e||"",a={};let i=0,c,d;for(;i<t.length;){He.lastIndex=i;const _=He.exec(t),f=t.slice(i,_?_.index:t.length);f&&(c?c==="#"?a.id=f:Array.isArray(a.className)?a.className.push(f):a.className=[f]:d=f,i+=f.length),_&&(c=_[0],i++)}return{type:"element",tagName:d||n||"div",properties:a,children:[]}}function dn(e,n,t){const a=t?fs(t):void 0;function i(c,d,..._){let f;if(c==null){f={type:"root",children:[]};const T=d;_.unshift(T)}else{f=ls(c,n);const T=f.tagName.toLowerCase(),y=a?a.get(T):void 0;if(f.tagName=y||T,ds(d))_.unshift(d);else for(const[b,D]of Object.entries(d))hs(e,f.properties,b,D)}for(const T of _)Ae(f.children,T);return f.type==="element"&&f.tagName==="template"&&(f.content={type:"root",children:f.children},f.children=[]),f}return i}function ds(e){if(e===null||typeof e!="object"||Array.isArray(e))return!0;if(typeof e.type!="string")return!1;const n=e,t=Object.keys(e);for(const a of t){const i=n[a];if(i&&typeof i=="object"){if(!Array.isArray(i))return!0;const c=i;for(const d of c)if(typeof d!="number"&&typeof d!="string")return!0}}return!!("children"in e&&Array.isArray(e.children))}function hs(e,n,t,a){const i=ye(e,t);let c;if(a!=null){if(typeof a=="number"){if(Number.isNaN(a))return;c=a}else typeof a=="boolean"?c=a:typeof a=="string"?i.spaceSeparated?c=we(a):i.commaSeparated?c=ke(a):i.commaOrSpaceSeparated?c=we(ke(a).join(" ")):c=ve(i,i.property,a):Array.isArray(a)?c=[...a]:c=i.property==="style"?ms(a):String(a);if(Array.isArray(c)){const d=[];for(const _ of c)d.push(ve(i,i.property,_));c=d}i.property==="className"&&Array.isArray(n.className)&&(c=n.className.concat(c)),n[i.property]=c}}function Ae(e,n){if(n!=null)if(typeof n=="number"||typeof n=="string")e.push({type:"text",value:String(n)});else if(Array.isArray(n))for(const t of n)Ae(e,t);else if(typeof n=="object"&&"type"in n)n.type==="root"?Ae(e,n.children):e.push(n);else throw new Error("Expected node, nodes, or string, got `"+n+"`")}function ve(e,n,t){if(typeof t=="string"){if(e.number&&t&&!Number.isNaN(Number(t)))return Number(t);if((e.boolean||e.overloadedBoolean)&&(t===""||Be(t)===Be(n)))return!0}return t}function ms(e){const n=[];for(const[t,a]of Object.entries(e))n.push([t,a].join(": "));return n.join("; ")}function fs(e){const n=new Map;for(const t of e)n.set(t.toLowerCase(),t);return n}const Es=["altGlyph","altGlyphDef","altGlyphItem","animateColor","animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","glyphRef","linearGradient","radialGradient","solidColor","textArea","textPath"],ps=dn(he,"div"),_s=dn(te,"g",Es);function Ts(e){const n=String(e),t=[];return{toOffset:i,toPoint:a};function a(c){if(typeof c=="number"&&c>-1&&c<=n.length){let d=0;for(;;){let _=t[d];if(_===void 0){const f=Ye(n,t[d-1]);_=f===-1?n.length+1:f+1,t[d]=_}if(_>c)return{line:d+1,column:c-(d>0?t[d-1]:0)+1,offset:c};d++}}}function i(c){if(c&&typeof c.line=="number"&&typeof c.column=="number"&&!Number.isNaN(c.line)&&!Number.isNaN(c.column)){for(;t.length<c.line;){const _=t[t.length-1],f=Ye(n,_),T=f===-1?n.length+1:f+1;if(_===T)break;t.push(T)}const d=(c.line>1?t[c.line-2]:0)+c.column-1;if(d<t[c.line-1])return d}}}function Ye(e,n){const t=e.indexOf("\r",n),a=e.indexOf(`
`,n);return a===-1?t:t===-1||t+1===a?a:t<a?t:a}const U={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"},hn={}.hasOwnProperty,gs=Object.prototype;function bs(e,n){const t=n||{};return Oe({file:t.file||void 0,location:!1,schema:t.space==="svg"?te:he,verbose:t.verbose||!1},e)}function Oe(e,n){let t;switch(n.nodeName){case"#comment":{const a=n;return t={type:"comment",value:a.data},ie(e,a,t),t}case"#document":case"#document-fragment":{const a=n,i="mode"in a?a.mode==="quirks"||a.mode==="limited-quirks":!1;if(t={type:"root",children:mn(e,n.childNodes),data:{quirksMode:i}},e.file&&e.location){const c=String(e.file),d=Ts(c),_=d.toPoint(0),f=d.toPoint(c.length);t.position={start:_,end:f}}return t}case"#documentType":{const a=n;return t={type:"doctype"},ie(e,a,t),t}case"#text":{const a=n;return t={type:"text",value:a.value},ie(e,a,t),t}default:return t=As(e,n),t}}function mn(e,n){let t=-1;const a=[];for(;++t<n.length;){const i=Oe(e,n[t]);a.push(i)}return a}function As(e,n){const t=e.schema;e.schema=n.namespaceURI===U.svg?te:he;let a=-1;const i={};for(;++a<n.attrs.length;){const _=n.attrs[a],f=(_.prefix?_.prefix+":":"")+_.name;hn.call(gs,f)||(i[f]=_.value)}const d=(e.schema.space==="svg"?_s:ps)(n.tagName,i,mn(e,n.childNodes));if(ie(e,n,d),d.tagName==="template"){const _=n,f=_.sourceCodeLocation,T=f&&f.startTag&&q(f.startTag),y=f&&f.endTag&&q(f.endTag),b=Oe(e,_.content);T&&y&&e.file&&(b.position={start:T.end,end:y.start}),d.content=b}return e.schema=t,d}function ie(e,n,t){if("sourceCodeLocation"in n&&n.sourceCodeLocation&&e.file){const a=Ns(e,t,n.sourceCodeLocation);a&&(e.location=!0,t.position=a)}}function Ns(e,n,t){const a=q(t);if(n.type==="element"){const i=n.children[n.children.length-1];if(a&&!t.endTag&&i&&i.position&&i.position.end&&(a.end=Object.assign({},i.position.end)),e.verbose){const c={};let d;if(t.attrs)for(d in t.attrs)hn.call(t.attrs,d)&&(c[ye(e.schema,d).property]=q(t.attrs[d]));ge(t.startTag);const _=q(t.startTag),f=t.endTag?q(t.endTag):void 0,T={opening:_};f&&(T.closing=f),T.properties=c,n.data={position:T}}}return a}function q(e){const n=qe({line:e.startLine,column:e.startCol,offset:e.startOffset}),t=qe({line:e.endLine,column:e.endCol,offset:e.endOffset});return n||t?{start:n,end:t}:void 0}function qe(e){return e.line&&e.column?e:void 0}const Ss={},Cs={}.hasOwnProperty,fn=sn("type",{handlers:{root:ys,element:Ps,text:Ls,comment:Ds,doctype:Os}});function Is(e,n){const a=(n||Ss).space;return fn(e,a==="svg"?te:he)}function ys(e,n){const t={nodeName:"#document",mode:(e.data||{}).quirksMode?"quirks":"no-quirks",childNodes:[]};return t.childNodes=Le(e.children,t,n),Q(e,t),t}function Rs(e,n){const t={nodeName:"#document-fragment",childNodes:[]};return t.childNodes=Le(e.children,t,n),Q(e,t),t}function Os(e){const n={nodeName:"#documentType",name:"html",publicId:"",systemId:"",parentNode:null};return Q(e,n),n}function Ls(e){const n={nodeName:"#text",value:e.value,parentNode:null};return Q(e,n),n}function Ds(e){const n={nodeName:"#comment",data:e.value,parentNode:null};return Q(e,n),n}function Ps(e,n){const t=n;let a=t;e.type==="element"&&e.tagName.toLowerCase()==="svg"&&t.space==="html"&&(a=te);const i=[];let c;if(e.properties){for(c in e.properties)if(c!=="children"&&Cs.call(e.properties,c)){const f=xs(a,c,e.properties[c]);f&&i.push(f)}}const d=a.space,_={nodeName:e.tagName,tagName:e.tagName,attrs:i,namespaceURI:U[d],childNodes:[],parentNode:null};return _.childNodes=Le(e.children,_,a),Q(e,_),e.tagName==="template"&&e.content&&(_.content=Rs(e.content,a)),_}function xs(e,n,t){const a=ye(e,n);if(t===!1||t===null||t===void 0||typeof t=="number"&&Number.isNaN(t)||!t&&a.boolean)return;Array.isArray(t)&&(t=a.commaSeparated?Kn(t):Xn(t));const i={name:a.attribute,value:t===!0?"":String(t)};if(a.space&&a.space!=="html"&&a.space!=="svg"){const c=i.name.indexOf(":");c<0?i.prefix="":(i.name=i.name.slice(c+1),i.prefix=a.attribute.slice(0,c)),i.namespace=U[a.space]}return i}function Le(e,n,t){let a=-1;const i=[];if(e)for(;++a<e.length;){const c=fn(e[a],t);c.parentNode=n,i.push(c)}return i}function Q(e,n){const t=e.position;t&&t.start&&t.end&&(ge(typeof t.start.offset=="number"),ge(typeof t.end.offset=="number"),n.sourceCodeLocation={startLine:t.start.line,startCol:t.start.column,startOffset:t.start.offset,endLine:t.end.line,endCol:t.end.column,endOffset:t.end.offset})}const Ms=["area","base","basefont","bgsound","br","col","command","embed","frame","hr","image","img","input","keygen","link","meta","param","source","track","wbr"],ws=new Set([65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111]),N="�";var u;(function(e){e[e.EOF=-1]="EOF",e[e.NULL=0]="NULL",e[e.TABULATION=9]="TABULATION",e[e.CARRIAGE_RETURN=13]="CARRIAGE_RETURN",e[e.LINE_FEED=10]="LINE_FEED",e[e.FORM_FEED=12]="FORM_FEED",e[e.SPACE=32]="SPACE",e[e.EXCLAMATION_MARK=33]="EXCLAMATION_MARK",e[e.QUOTATION_MARK=34]="QUOTATION_MARK",e[e.AMPERSAND=38]="AMPERSAND",e[e.APOSTROPHE=39]="APOSTROPHE",e[e.HYPHEN_MINUS=45]="HYPHEN_MINUS",e[e.SOLIDUS=47]="SOLIDUS",e[e.DIGIT_0=48]="DIGIT_0",e[e.DIGIT_9=57]="DIGIT_9",e[e.SEMICOLON=59]="SEMICOLON",e[e.LESS_THAN_SIGN=60]="LESS_THAN_SIGN",e[e.EQUALS_SIGN=61]="EQUALS_SIGN",e[e.GREATER_THAN_SIGN=62]="GREATER_THAN_SIGN",e[e.QUESTION_MARK=63]="QUESTION_MARK",e[e.LATIN_CAPITAL_A=65]="LATIN_CAPITAL_A",e[e.LATIN_CAPITAL_Z=90]="LATIN_CAPITAL_Z",e[e.RIGHT_SQUARE_BRACKET=93]="RIGHT_SQUARE_BRACKET",e[e.GRAVE_ACCENT=96]="GRAVE_ACCENT",e[e.LATIN_SMALL_A=97]="LATIN_SMALL_A",e[e.LATIN_SMALL_Z=122]="LATIN_SMALL_Z"})(u||(u={}));const O={DASH_DASH:"--",CDATA_START:"[CDATA[",DOCTYPE:"doctype",SCRIPT:"script",PUBLIC:"public",SYSTEM:"system"};function En(e){return e>=55296&&e<=57343}function ks(e){return e>=56320&&e<=57343}function Bs(e,n){return(e-55296)*1024+9216+n}function pn(e){return e!==32&&e!==10&&e!==13&&e!==9&&e!==12&&e>=1&&e<=31||e>=127&&e<=159}function _n(e){return e>=64976&&e<=65007||ws.has(e)}var h;(function(e){e.controlCharacterInInputStream="control-character-in-input-stream",e.noncharacterInInputStream="noncharacter-in-input-stream",e.surrogateInInputStream="surrogate-in-input-stream",e.nonVoidHtmlElementStartTagWithTrailingSolidus="non-void-html-element-start-tag-with-trailing-solidus",e.endTagWithAttributes="end-tag-with-attributes",e.endTagWithTrailingSolidus="end-tag-with-trailing-solidus",e.unexpectedSolidusInTag="unexpected-solidus-in-tag",e.unexpectedNullCharacter="unexpected-null-character",e.unexpectedQuestionMarkInsteadOfTagName="unexpected-question-mark-instead-of-tag-name",e.invalidFirstCharacterOfTagName="invalid-first-character-of-tag-name",e.unexpectedEqualsSignBeforeAttributeName="unexpected-equals-sign-before-attribute-name",e.missingEndTagName="missing-end-tag-name",e.unexpectedCharacterInAttributeName="unexpected-character-in-attribute-name",e.unknownNamedCharacterReference="unknown-named-character-reference",e.missingSemicolonAfterCharacterReference="missing-semicolon-after-character-reference",e.unexpectedCharacterAfterDoctypeSystemIdentifier="unexpected-character-after-doctype-system-identifier",e.unexpectedCharacterInUnquotedAttributeValue="unexpected-character-in-unquoted-attribute-value",e.eofBeforeTagName="eof-before-tag-name",e.eofInTag="eof-in-tag",e.missingAttributeValue="missing-attribute-value",e.missingWhitespaceBetweenAttributes="missing-whitespace-between-attributes",e.missingWhitespaceAfterDoctypePublicKeyword="missing-whitespace-after-doctype-public-keyword",e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers="missing-whitespace-between-doctype-public-and-system-identifiers",e.missingWhitespaceAfterDoctypeSystemKeyword="missing-whitespace-after-doctype-system-keyword",e.missingQuoteBeforeDoctypePublicIdentifier="missing-quote-before-doctype-public-identifier",e.missingQuoteBeforeDoctypeSystemIdentifier="missing-quote-before-doctype-system-identifier",e.missingDoctypePublicIdentifier="missing-doctype-public-identifier",e.missingDoctypeSystemIdentifier="missing-doctype-system-identifier",e.abruptDoctypePublicIdentifier="abrupt-doctype-public-identifier",e.abruptDoctypeSystemIdentifier="abrupt-doctype-system-identifier",e.cdataInHtmlContent="cdata-in-html-content",e.incorrectlyOpenedComment="incorrectly-opened-comment",e.eofInScriptHtmlCommentLikeText="eof-in-script-html-comment-like-text",e.eofInDoctype="eof-in-doctype",e.nestedComment="nested-comment",e.abruptClosingOfEmptyComment="abrupt-closing-of-empty-comment",e.eofInComment="eof-in-comment",e.incorrectlyClosedComment="incorrectly-closed-comment",e.eofInCdata="eof-in-cdata",e.absenceOfDigitsInNumericCharacterReference="absence-of-digits-in-numeric-character-reference",e.nullCharacterReference="null-character-reference",e.surrogateCharacterReference="surrogate-character-reference",e.characterReferenceOutsideUnicodeRange="character-reference-outside-unicode-range",e.controlCharacterReference="control-character-reference",e.noncharacterCharacterReference="noncharacter-character-reference",e.missingWhitespaceBeforeDoctypeName="missing-whitespace-before-doctype-name",e.missingDoctypeName="missing-doctype-name",e.invalidCharacterSequenceAfterDoctypeName="invalid-character-sequence-after-doctype-name",e.duplicateAttribute="duplicate-attribute",e.nonConformingDoctype="non-conforming-doctype",e.missingDoctype="missing-doctype",e.misplacedDoctype="misplaced-doctype",e.endTagWithoutMatchingOpenElement="end-tag-without-matching-open-element",e.closingOfElementWithOpenChildElements="closing-of-element-with-open-child-elements",e.disallowedContentInNoscriptInHead="disallowed-content-in-noscript-in-head",e.openElementsLeftAfterEof="open-elements-left-after-eof",e.abandonedHeadElementChild="abandoned-head-element-child",e.misplacedStartTagForHeadElement="misplaced-start-tag-for-head-element",e.nestedNoscriptInHead="nested-noscript-in-head",e.eofInElementThatCanContainOnlyText="eof-in-element-that-can-contain-only-text"})(h||(h={}));const Fs=65536;class Us{constructor(n){this.handler=n,this.html="",this.pos=-1,this.lastGapPos=-2,this.gapStack=[],this.skipNextNewLine=!1,this.lastChunkWritten=!1,this.endOfChunkHit=!1,this.bufferWaterline=Fs,this.isEol=!1,this.lineStartPos=0,this.droppedBufferSize=0,this.line=1,this.lastErrOffset=-1}get col(){return this.pos-this.lineStartPos+ +(this.lastGapPos!==this.pos)}get offset(){return this.droppedBufferSize+this.pos}getError(n,t){const{line:a,col:i,offset:c}=this,d=i+t,_=c+t;return{code:n,startLine:a,endLine:a,startCol:d,endCol:d,startOffset:_,endOffset:_}}_err(n){this.handler.onParseError&&this.lastErrOffset!==this.offset&&(this.lastErrOffset=this.offset,this.handler.onParseError(this.getError(n,0)))}_addGap(){this.gapStack.push(this.lastGapPos),this.lastGapPos=this.pos}_processSurrogate(n){if(this.pos!==this.html.length-1){const t=this.html.charCodeAt(this.pos+1);if(ks(t))return this.pos++,this._addGap(),Bs(n,t)}else if(!this.lastChunkWritten)return this.endOfChunkHit=!0,u.EOF;return this._err(h.surrogateInInputStream),n}willDropParsedChunk(){return this.pos>this.bufferWaterline}dropParsedChunk(){this.willDropParsedChunk()&&(this.html=this.html.substring(this.pos),this.lineStartPos-=this.pos,this.droppedBufferSize+=this.pos,this.pos=0,this.lastGapPos=-2,this.gapStack.length=0)}write(n,t){this.html.length>0?this.html+=n:this.html=n,this.endOfChunkHit=!1,this.lastChunkWritten=t}insertHtmlAtCurrentPos(n){this.html=this.html.substring(0,this.pos+1)+n+this.html.substring(this.pos+1),this.endOfChunkHit=!1}startsWith(n,t){if(this.pos+n.length>this.html.length)return this.endOfChunkHit=!this.lastChunkWritten,!1;if(t)return this.html.startsWith(n,this.pos);for(let a=0;a<n.length;a++)if((this.html.charCodeAt(this.pos+a)|32)!==n.charCodeAt(a))return!1;return!0}peek(n){const t=this.pos+n;if(t>=this.html.length)return this.endOfChunkHit=!this.lastChunkWritten,u.EOF;const a=this.html.charCodeAt(t);return a===u.CARRIAGE_RETURN?u.LINE_FEED:a}advance(){if(this.pos++,this.isEol&&(this.isEol=!1,this.line++,this.lineStartPos=this.pos),this.pos>=this.html.length)return this.endOfChunkHit=!this.lastChunkWritten,u.EOF;let n=this.html.charCodeAt(this.pos);return n===u.CARRIAGE_RETURN?(this.isEol=!0,this.skipNextNewLine=!0,u.LINE_FEED):n===u.LINE_FEED&&(this.isEol=!0,this.skipNextNewLine)?(this.line--,this.skipNextNewLine=!1,this._addGap(),this.advance()):(this.skipNextNewLine=!1,En(n)&&(n=this._processSurrogate(n)),this.handler.onParseError===null||n>31&&n<127||n===u.LINE_FEED||n===u.CARRIAGE_RETURN||n>159&&n<64976||this._checkForProblematicCharacters(n),n)}_checkForProblematicCharacters(n){pn(n)?this._err(h.controlCharacterInInputStream):_n(n)&&this._err(h.noncharacterInInputStream)}retreat(n){for(this.pos-=n;this.pos<this.lastGapPos;)this.lastGapPos=this.gapStack.pop(),this.pos--;this.isEol=!1}}var g;(function(e){e[e.CHARACTER=0]="CHARACTER",e[e.NULL_CHARACTER=1]="NULL_CHARACTER",e[e.WHITESPACE_CHARACTER=2]="WHITESPACE_CHARACTER",e[e.START_TAG=3]="START_TAG",e[e.END_TAG=4]="END_TAG",e[e.COMMENT=5]="COMMENT",e[e.DOCTYPE=6]="DOCTYPE",e[e.EOF=7]="EOF",e[e.HIBERNATION=8]="HIBERNATION"})(g||(g={}));function Tn(e,n){for(let t=e.attrs.length-1;t>=0;t--)if(e.attrs[t].name===n)return e.attrs[t].value;return null}const Hs=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),vs=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]);function Ys(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=vs.get(e))!==null&&n!==void 0?n:e}var I;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(I||(I={}));const qs=32;var B;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(B||(B={}));function Ne(e){return e>=I.ZERO&&e<=I.NINE}function Gs(e){return e>=I.UPPER_A&&e<=I.UPPER_F||e>=I.LOWER_A&&e<=I.LOWER_F}function Qs(e){return e>=I.UPPER_A&&e<=I.UPPER_Z||e>=I.LOWER_A&&e<=I.LOWER_Z||Ne(e)}function Ws(e){return e===I.EQUALS||Qs(e)}var C;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(C||(C={}));var M;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(M||(M={}));class js{constructor(n,t,a){this.decodeTree=n,this.emitCodePoint=t,this.errors=a,this.state=C.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=M.Strict}startEntity(n){this.decodeMode=n,this.state=C.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,t){switch(this.state){case C.EntityStart:return n.charCodeAt(t)===I.NUM?(this.state=C.NumericStart,this.consumed+=1,this.stateNumericStart(n,t+1)):(this.state=C.NamedEntity,this.stateNamedEntity(n,t));case C.NumericStart:return this.stateNumericStart(n,t);case C.NumericDecimal:return this.stateNumericDecimal(n,t);case C.NumericHex:return this.stateNumericHex(n,t);case C.NamedEntity:return this.stateNamedEntity(n,t)}}stateNumericStart(n,t){return t>=n.length?-1:(n.charCodeAt(t)|qs)===I.LOWER_X?(this.state=C.NumericHex,this.consumed+=1,this.stateNumericHex(n,t+1)):(this.state=C.NumericDecimal,this.stateNumericDecimal(n,t))}addToNumericResult(n,t,a,i){if(t!==a){const c=a-t;this.result=this.result*Math.pow(i,c)+Number.parseInt(n.substr(t,c),i),this.consumed+=c}}stateNumericHex(n,t){const a=t;for(;t<n.length;){const i=n.charCodeAt(t);if(Ne(i)||Gs(i))t+=1;else return this.addToNumericResult(n,a,t,16),this.emitNumericEntity(i,3)}return this.addToNumericResult(n,a,t,16),-1}stateNumericDecimal(n,t){const a=t;for(;t<n.length;){const i=n.charCodeAt(t);if(Ne(i))t+=1;else return this.addToNumericResult(n,a,t,10),this.emitNumericEntity(i,2)}return this.addToNumericResult(n,a,t,10),-1}emitNumericEntity(n,t){var a;if(this.consumed<=t)return(a=this.errors)===null||a===void 0||a.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===I.SEMI)this.consumed+=1;else if(this.decodeMode===M.Strict)return 0;return this.emitCodePoint(Ys(this.result),this.consumed),this.errors&&(n!==I.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,t){const{decodeTree:a}=this;let i=a[this.treeIndex],c=(i&B.VALUE_LENGTH)>>14;for(;t<n.length;t++,this.excess++){const d=n.charCodeAt(t);if(this.treeIndex=Ks(a,i,this.treeIndex+Math.max(1,c),d),this.treeIndex<0)return this.result===0||this.decodeMode===M.Attribute&&(c===0||Ws(d))?0:this.emitNotTerminatedNamedEntity();if(i=a[this.treeIndex],c=(i&B.VALUE_LENGTH)>>14,c!==0){if(d===I.SEMI)return this.emitNamedEntityData(this.treeIndex,c,this.consumed+this.excess);this.decodeMode!==M.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;const{result:t,decodeTree:a}=this,i=(a[t]&B.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,i,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,t,a){const{decodeTree:i}=this;return this.emitCodePoint(t===1?i[n]&~B.VALUE_LENGTH:i[n+1],a),t===3&&this.emitCodePoint(i[n+2],a),a}end(){var n;switch(this.state){case C.NamedEntity:return this.result!==0&&(this.decodeMode!==M.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case C.NumericDecimal:return this.emitNumericEntity(0,2);case C.NumericHex:return this.emitNumericEntity(0,3);case C.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case C.EntityStart:return 0}}}function Ks(e,n,t,a){const i=(n&B.BRANCH_LENGTH)>>7,c=n&B.JUMP_TABLE;if(i===0)return c!==0&&a===c?t:-1;if(c){const f=a-c;return f<0||f>=i?-1:e[t+f]-1}let d=t,_=d+i-1;for(;d<=_;){const f=d+_>>>1,T=e[f];if(T<a)d=f+1;else if(T>a)_=f-1;else return e[f+i]}return-1}var E;(function(e){e.HTML="http://www.w3.org/1999/xhtml",e.MATHML="http://www.w3.org/1998/Math/MathML",e.SVG="http://www.w3.org/2000/svg",e.XLINK="http://www.w3.org/1999/xlink",e.XML="http://www.w3.org/XML/1998/namespace",e.XMLNS="http://www.w3.org/2000/xmlns/"})(E||(E={}));var H;(function(e){e.TYPE="type",e.ACTION="action",e.ENCODING="encoding",e.PROMPT="prompt",e.NAME="name",e.COLOR="color",e.FACE="face",e.SIZE="size"})(H||(H={}));var L;(function(e){e.NO_QUIRKS="no-quirks",e.QUIRKS="quirks",e.LIMITED_QUIRKS="limited-quirks"})(L||(L={}));var l;(function(e){e.A="a",e.ADDRESS="address",e.ANNOTATION_XML="annotation-xml",e.APPLET="applet",e.AREA="area",e.ARTICLE="article",e.ASIDE="aside",e.B="b",e.BASE="base",e.BASEFONT="basefont",e.BGSOUND="bgsound",e.BIG="big",e.BLOCKQUOTE="blockquote",e.BODY="body",e.BR="br",e.BUTTON="button",e.CAPTION="caption",e.CENTER="center",e.CODE="code",e.COL="col",e.COLGROUP="colgroup",e.DD="dd",e.DESC="desc",e.DETAILS="details",e.DIALOG="dialog",e.DIR="dir",e.DIV="div",e.DL="dl",e.DT="dt",e.EM="em",e.EMBED="embed",e.FIELDSET="fieldset",e.FIGCAPTION="figcaption",e.FIGURE="figure",e.FONT="font",e.FOOTER="footer",e.FOREIGN_OBJECT="foreignObject",e.FORM="form",e.FRAME="frame",e.FRAMESET="frameset",e.H1="h1",e.H2="h2",e.H3="h3",e.H4="h4",e.H5="h5",e.H6="h6",e.HEAD="head",e.HEADER="header",e.HGROUP="hgroup",e.HR="hr",e.HTML="html",e.I="i",e.IMG="img",e.IMAGE="image",e.INPUT="input",e.IFRAME="iframe",e.KEYGEN="keygen",e.LABEL="label",e.LI="li",e.LINK="link",e.LISTING="listing",e.MAIN="main",e.MALIGNMARK="malignmark",e.MARQUEE="marquee",e.MATH="math",e.MENU="menu",e.META="meta",e.MGLYPH="mglyph",e.MI="mi",e.MO="mo",e.MN="mn",e.MS="ms",e.MTEXT="mtext",e.NAV="nav",e.NOBR="nobr",e.NOFRAMES="noframes",e.NOEMBED="noembed",e.NOSCRIPT="noscript",e.OBJECT="object",e.OL="ol",e.OPTGROUP="optgroup",e.OPTION="option",e.P="p",e.PARAM="param",e.PLAINTEXT="plaintext",e.PRE="pre",e.RB="rb",e.RP="rp",e.RT="rt",e.RTC="rtc",e.RUBY="ruby",e.S="s",e.SCRIPT="script",e.SEARCH="search",e.SECTION="section",e.SELECT="select",e.SOURCE="source",e.SMALL="small",e.SPAN="span",e.STRIKE="strike",e.STRONG="strong",e.STYLE="style",e.SUB="sub",e.SUMMARY="summary",e.SUP="sup",e.TABLE="table",e.TBODY="tbody",e.TEMPLATE="template",e.TEXTAREA="textarea",e.TFOOT="tfoot",e.TD="td",e.TH="th",e.THEAD="thead",e.TITLE="title",e.TR="tr",e.TRACK="track",e.TT="tt",e.U="u",e.UL="ul",e.SVG="svg",e.VAR="var",e.WBR="wbr",e.XMP="xmp"})(l||(l={}));var s;(function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.A=1]="A",e[e.ADDRESS=2]="ADDRESS",e[e.ANNOTATION_XML=3]="ANNOTATION_XML",e[e.APPLET=4]="APPLET",e[e.AREA=5]="AREA",e[e.ARTICLE=6]="ARTICLE",e[e.ASIDE=7]="ASIDE",e[e.B=8]="B",e[e.BASE=9]="BASE",e[e.BASEFONT=10]="BASEFONT",e[e.BGSOUND=11]="BGSOUND",e[e.BIG=12]="BIG",e[e.BLOCKQUOTE=13]="BLOCKQUOTE",e[e.BODY=14]="BODY",e[e.BR=15]="BR",e[e.BUTTON=16]="BUTTON",e[e.CAPTION=17]="CAPTION",e[e.CENTER=18]="CENTER",e[e.CODE=19]="CODE",e[e.COL=20]="COL",e[e.COLGROUP=21]="COLGROUP",e[e.DD=22]="DD",e[e.DESC=23]="DESC",e[e.DETAILS=24]="DETAILS",e[e.DIALOG=25]="DIALOG",e[e.DIR=26]="DIR",e[e.DIV=27]="DIV",e[e.DL=28]="DL",e[e.DT=29]="DT",e[e.EM=30]="EM",e[e.EMBED=31]="EMBED",e[e.FIELDSET=32]="FIELDSET",e[e.FIGCAPTION=33]="FIGCAPTION",e[e.FIGURE=34]="FIGURE",e[e.FONT=35]="FONT",e[e.FOOTER=36]="FOOTER",e[e.FOREIGN_OBJECT=37]="FOREIGN_OBJECT",e[e.FORM=38]="FORM",e[e.FRAME=39]="FRAME",e[e.FRAMESET=40]="FRAMESET",e[e.H1=41]="H1",e[e.H2=42]="H2",e[e.H3=43]="H3",e[e.H4=44]="H4",e[e.H5=45]="H5",e[e.H6=46]="H6",e[e.HEAD=47]="HEAD",e[e.HEADER=48]="HEADER",e[e.HGROUP=49]="HGROUP",e[e.HR=50]="HR",e[e.HTML=51]="HTML",e[e.I=52]="I",e[e.IMG=53]="IMG",e[e.IMAGE=54]="IMAGE",e[e.INPUT=55]="INPUT",e[e.IFRAME=56]="IFRAME",e[e.KEYGEN=57]="KEYGEN",e[e.LABEL=58]="LABEL",e[e.LI=59]="LI",e[e.LINK=60]="LINK",e[e.LISTING=61]="LISTING",e[e.MAIN=62]="MAIN",e[e.MALIGNMARK=63]="MALIGNMARK",e[e.MARQUEE=64]="MARQUEE",e[e.MATH=65]="MATH",e[e.MENU=66]="MENU",e[e.META=67]="META",e[e.MGLYPH=68]="MGLYPH",e[e.MI=69]="MI",e[e.MO=70]="MO",e[e.MN=71]="MN",e[e.MS=72]="MS",e[e.MTEXT=73]="MTEXT",e[e.NAV=74]="NAV",e[e.NOBR=75]="NOBR",e[e.NOFRAMES=76]="NOFRAMES",e[e.NOEMBED=77]="NOEMBED",e[e.NOSCRIPT=78]="NOSCRIPT",e[e.OBJECT=79]="OBJECT",e[e.OL=80]="OL",e[e.OPTGROUP=81]="OPTGROUP",e[e.OPTION=82]="OPTION",e[e.P=83]="P",e[e.PARAM=84]="PARAM",e[e.PLAINTEXT=85]="PLAINTEXT",e[e.PRE=86]="PRE",e[e.RB=87]="RB",e[e.RP=88]="RP",e[e.RT=89]="RT",e[e.RTC=90]="RTC",e[e.RUBY=91]="RUBY",e[e.S=92]="S",e[e.SCRIPT=93]="SCRIPT",e[e.SEARCH=94]="SEARCH",e[e.SECTION=95]="SECTION",e[e.SELECT=96]="SELECT",e[e.SOURCE=97]="SOURCE",e[e.SMALL=98]="SMALL",e[e.SPAN=99]="SPAN",e[e.STRIKE=100]="STRIKE",e[e.STRONG=101]="STRONG",e[e.STYLE=102]="STYLE",e[e.SUB=103]="SUB",e[e.SUMMARY=104]="SUMMARY",e[e.SUP=105]="SUP",e[e.TABLE=106]="TABLE",e[e.TBODY=107]="TBODY",e[e.TEMPLATE=108]="TEMPLATE",e[e.TEXTAREA=109]="TEXTAREA",e[e.TFOOT=110]="TFOOT",e[e.TD=111]="TD",e[e.TH=112]="TH",e[e.THEAD=113]="THEAD",e[e.TITLE=114]="TITLE",e[e.TR=115]="TR",e[e.TRACK=116]="TRACK",e[e.TT=117]="TT",e[e.U=118]="U",e[e.UL=119]="UL",e[e.SVG=120]="SVG",e[e.VAR=121]="VAR",e[e.WBR=122]="WBR",e[e.XMP=123]="XMP"})(s||(s={}));const Xs=new Map([[l.A,s.A],[l.ADDRESS,s.ADDRESS],[l.ANNOTATION_XML,s.ANNOTATION_XML],[l.APPLET,s.APPLET],[l.AREA,s.AREA],[l.ARTICLE,s.ARTICLE],[l.ASIDE,s.ASIDE],[l.B,s.B],[l.BASE,s.BASE],[l.BASEFONT,s.BASEFONT],[l.BGSOUND,s.BGSOUND],[l.BIG,s.BIG],[l.BLOCKQUOTE,s.BLOCKQUOTE],[l.BODY,s.BODY],[l.BR,s.BR],[l.BUTTON,s.BUTTON],[l.CAPTION,s.CAPTION],[l.CENTER,s.CENTER],[l.CODE,s.CODE],[l.COL,s.COL],[l.COLGROUP,s.COLGROUP],[l.DD,s.DD],[l.DESC,s.DESC],[l.DETAILS,s.DETAILS],[l.DIALOG,s.DIALOG],[l.DIR,s.DIR],[l.DIV,s.DIV],[l.DL,s.DL],[l.DT,s.DT],[l.EM,s.EM],[l.EMBED,s.EMBED],[l.FIELDSET,s.FIELDSET],[l.FIGCAPTION,s.FIGCAPTION],[l.FIGURE,s.FIGURE],[l.FONT,s.FONT],[l.FOOTER,s.FOOTER],[l.FOREIGN_OBJECT,s.FOREIGN_OBJECT],[l.FORM,s.FORM],[l.FRAME,s.FRAME],[l.FRAMESET,s.FRAMESET],[l.H1,s.H1],[l.H2,s.H2],[l.H3,s.H3],[l.H4,s.H4],[l.H5,s.H5],[l.H6,s.H6],[l.HEAD,s.HEAD],[l.HEADER,s.HEADER],[l.HGROUP,s.HGROUP],[l.HR,s.HR],[l.HTML,s.HTML],[l.I,s.I],[l.IMG,s.IMG],[l.IMAGE,s.IMAGE],[l.INPUT,s.INPUT],[l.IFRAME,s.IFRAME],[l.KEYGEN,s.KEYGEN],[l.LABEL,s.LABEL],[l.LI,s.LI],[l.LINK,s.LINK],[l.LISTING,s.LISTING],[l.MAIN,s.MAIN],[l.MALIGNMARK,s.MALIGNMARK],[l.MARQUEE,s.MARQUEE],[l.MATH,s.MATH],[l.MENU,s.MENU],[l.META,s.META],[l.MGLYPH,s.MGLYPH],[l.MI,s.MI],[l.MO,s.MO],[l.MN,s.MN],[l.MS,s.MS],[l.MTEXT,s.MTEXT],[l.NAV,s.NAV],[l.NOBR,s.NOBR],[l.NOFRAMES,s.NOFRAMES],[l.NOEMBED,s.NOEMBED],[l.NOSCRIPT,s.NOSCRIPT],[l.OBJECT,s.OBJECT],[l.OL,s.OL],[l.OPTGROUP,s.OPTGROUP],[l.OPTION,s.OPTION],[l.P,s.P],[l.PARAM,s.PARAM],[l.PLAINTEXT,s.PLAINTEXT],[l.PRE,s.PRE],[l.RB,s.RB],[l.RP,s.RP],[l.RT,s.RT],[l.RTC,s.RTC],[l.RUBY,s.RUBY],[l.S,s.S],[l.SCRIPT,s.SCRIPT],[l.SEARCH,s.SEARCH],[l.SECTION,s.SECTION],[l.SELECT,s.SELECT],[l.SOURCE,s.SOURCE],[l.SMALL,s.SMALL],[l.SPAN,s.SPAN],[l.STRIKE,s.STRIKE],[l.STRONG,s.STRONG],[l.STYLE,s.STYLE],[l.SUB,s.SUB],[l.SUMMARY,s.SUMMARY],[l.SUP,s.SUP],[l.TABLE,s.TABLE],[l.TBODY,s.TBODY],[l.TEMPLATE,s.TEMPLATE],[l.TEXTAREA,s.TEXTAREA],[l.TFOOT,s.TFOOT],[l.TD,s.TD],[l.TH,s.TH],[l.THEAD,s.THEAD],[l.TITLE,s.TITLE],[l.TR,s.TR],[l.TRACK,s.TRACK],[l.TT,s.TT],[l.U,s.U],[l.UL,s.UL],[l.SVG,s.SVG],[l.VAR,s.VAR],[l.WBR,s.WBR],[l.XMP,s.XMP]]);function W(e){var n;return(n=Xs.get(e))!==null&&n!==void 0?n:s.UNKNOWN}const p=s,Vs={[E.HTML]:new Set([p.ADDRESS,p.APPLET,p.AREA,p.ARTICLE,p.ASIDE,p.BASE,p.BASEFONT,p.BGSOUND,p.BLOCKQUOTE,p.BODY,p.BR,p.BUTTON,p.CAPTION,p.CENTER,p.COL,p.COLGROUP,p.DD,p.DETAILS,p.DIR,p.DIV,p.DL,p.DT,p.EMBED,p.FIELDSET,p.FIGCAPTION,p.FIGURE,p.FOOTER,p.FORM,p.FRAME,p.FRAMESET,p.H1,p.H2,p.H3,p.H4,p.H5,p.H6,p.HEAD,p.HEADER,p.HGROUP,p.HR,p.HTML,p.IFRAME,p.IMG,p.INPUT,p.LI,p.LINK,p.LISTING,p.MAIN,p.MARQUEE,p.MENU,p.META,p.NAV,p.NOEMBED,p.NOFRAMES,p.NOSCRIPT,p.OBJECT,p.OL,p.P,p.PARAM,p.PLAINTEXT,p.PRE,p.SCRIPT,p.SECTION,p.SELECT,p.SOURCE,p.STYLE,p.SUMMARY,p.TABLE,p.TBODY,p.TD,p.TEMPLATE,p.TEXTAREA,p.TFOOT,p.TH,p.THEAD,p.TITLE,p.TR,p.TRACK,p.UL,p.WBR,p.XMP]),[E.MATHML]:new Set([p.MI,p.MO,p.MN,p.MS,p.MTEXT,p.ANNOTATION_XML]),[E.SVG]:new Set([p.TITLE,p.FOREIGN_OBJECT,p.DESC]),[E.XLINK]:new Set,[E.XML]:new Set,[E.XMLNS]:new Set},Se=new Set([p.H1,p.H2,p.H3,p.H4,p.H5,p.H6]);l.STYLE,l.SCRIPT,l.XMP,l.IFRAME,l.NOEMBED,l.NOFRAMES,l.PLAINTEXT;var r;(function(e){e[e.DATA=0]="DATA",e[e.RCDATA=1]="RCDATA",e[e.RAWTEXT=2]="RAWTEXT",e[e.SCRIPT_DATA=3]="SCRIPT_DATA",e[e.PLAINTEXT=4]="PLAINTEXT",e[e.TAG_OPEN=5]="TAG_OPEN",e[e.END_TAG_OPEN=6]="END_TAG_OPEN",e[e.TAG_NAME=7]="TAG_NAME",e[e.RCDATA_LESS_THAN_SIGN=8]="RCDATA_LESS_THAN_SIGN",e[e.RCDATA_END_TAG_OPEN=9]="RCDATA_END_TAG_OPEN",e[e.RCDATA_END_TAG_NAME=10]="RCDATA_END_TAG_NAME",e[e.RAWTEXT_LESS_THAN_SIGN=11]="RAWTEXT_LESS_THAN_SIGN",e[e.RAWTEXT_END_TAG_OPEN=12]="RAWTEXT_END_TAG_OPEN",e[e.RAWTEXT_END_TAG_NAME=13]="RAWTEXT_END_TAG_NAME",e[e.SCRIPT_DATA_LESS_THAN_SIGN=14]="SCRIPT_DATA_LESS_THAN_SIGN",e[e.SCRIPT_DATA_END_TAG_OPEN=15]="SCRIPT_DATA_END_TAG_OPEN",e[e.SCRIPT_DATA_END_TAG_NAME=16]="SCRIPT_DATA_END_TAG_NAME",e[e.SCRIPT_DATA_ESCAPE_START=17]="SCRIPT_DATA_ESCAPE_START",e[e.SCRIPT_DATA_ESCAPE_START_DASH=18]="SCRIPT_DATA_ESCAPE_START_DASH",e[e.SCRIPT_DATA_ESCAPED=19]="SCRIPT_DATA_ESCAPED",e[e.SCRIPT_DATA_ESCAPED_DASH=20]="SCRIPT_DATA_ESCAPED_DASH",e[e.SCRIPT_DATA_ESCAPED_DASH_DASH=21]="SCRIPT_DATA_ESCAPED_DASH_DASH",e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN=22]="SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN",e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN=23]="SCRIPT_DATA_ESCAPED_END_TAG_OPEN",e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME=24]="SCRIPT_DATA_ESCAPED_END_TAG_NAME",e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START=25]="SCRIPT_DATA_DOUBLE_ESCAPE_START",e[e.SCRIPT_DATA_DOUBLE_ESCAPED=26]="SCRIPT_DATA_DOUBLE_ESCAPED",e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH=27]="SCRIPT_DATA_DOUBLE_ESCAPED_DASH",e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH=28]="SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH",e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN=29]="SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN",e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END=30]="SCRIPT_DATA_DOUBLE_ESCAPE_END",e[e.BEFORE_ATTRIBUTE_NAME=31]="BEFORE_ATTRIBUTE_NAME",e[e.ATTRIBUTE_NAME=32]="ATTRIBUTE_NAME",e[e.AFTER_ATTRIBUTE_NAME=33]="AFTER_ATTRIBUTE_NAME",e[e.BEFORE_ATTRIBUTE_VALUE=34]="BEFORE_ATTRIBUTE_VALUE",e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED=35]="ATTRIBUTE_VALUE_DOUBLE_QUOTED",e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED=36]="ATTRIBUTE_VALUE_SINGLE_QUOTED",e[e.ATTRIBUTE_VALUE_UNQUOTED=37]="ATTRIBUTE_VALUE_UNQUOTED",e[e.AFTER_ATTRIBUTE_VALUE_QUOTED=38]="AFTER_ATTRIBUTE_VALUE_QUOTED",e[e.SELF_CLOSING_START_TAG=39]="SELF_CLOSING_START_TAG",e[e.BOGUS_COMMENT=40]="BOGUS_COMMENT",e[e.MARKUP_DECLARATION_OPEN=41]="MARKUP_DECLARATION_OPEN",e[e.COMMENT_START=42]="COMMENT_START",e[e.COMMENT_START_DASH=43]="COMMENT_START_DASH",e[e.COMMENT=44]="COMMENT",e[e.COMMENT_LESS_THAN_SIGN=45]="COMMENT_LESS_THAN_SIGN",e[e.COMMENT_LESS_THAN_SIGN_BANG=46]="COMMENT_LESS_THAN_SIGN_BANG",e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH=47]="COMMENT_LESS_THAN_SIGN_BANG_DASH",e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH=48]="COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH",e[e.COMMENT_END_DASH=49]="COMMENT_END_DASH",e[e.COMMENT_END=50]="COMMENT_END",e[e.COMMENT_END_BANG=51]="COMMENT_END_BANG",e[e.DOCTYPE=52]="DOCTYPE",e[e.BEFORE_DOCTYPE_NAME=53]="BEFORE_DOCTYPE_NAME",e[e.DOCTYPE_NAME=54]="DOCTYPE_NAME",e[e.AFTER_DOCTYPE_NAME=55]="AFTER_DOCTYPE_NAME",e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD=56]="AFTER_DOCTYPE_PUBLIC_KEYWORD",e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER=57]="BEFORE_DOCTYPE_PUBLIC_IDENTIFIER",e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED=58]="DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED",e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED=59]="DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED",e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER=60]="AFTER_DOCTYPE_PUBLIC_IDENTIFIER",e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS=61]="BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS",e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD=62]="AFTER_DOCTYPE_SYSTEM_KEYWORD",e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER=63]="BEFORE_DOCTYPE_SYSTEM_IDENTIFIER",e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED=64]="DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED",e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED=65]="DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED",e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER=66]="AFTER_DOCTYPE_SYSTEM_IDENTIFIER",e[e.BOGUS_DOCTYPE=67]="BOGUS_DOCTYPE",e[e.CDATA_SECTION=68]="CDATA_SECTION",e[e.CDATA_SECTION_BRACKET=69]="CDATA_SECTION_BRACKET",e[e.CDATA_SECTION_END=70]="CDATA_SECTION_END",e[e.CHARACTER_REFERENCE=71]="CHARACTER_REFERENCE",e[e.AMBIGUOUS_AMPERSAND=72]="AMBIGUOUS_AMPERSAND"})(r||(r={}));const S={DATA:r.DATA,RCDATA:r.RCDATA,RAWTEXT:r.RAWTEXT,SCRIPT_DATA:r.SCRIPT_DATA,PLAINTEXT:r.PLAINTEXT,CDATA_SECTION:r.CDATA_SECTION};function zs(e){return e>=u.DIGIT_0&&e<=u.DIGIT_9}function V(e){return e>=u.LATIN_CAPITAL_A&&e<=u.LATIN_CAPITAL_Z}function $s(e){return e>=u.LATIN_SMALL_A&&e<=u.LATIN_SMALL_Z}function w(e){return $s(e)||V(e)}function Ge(e){return w(e)||zs(e)}function ue(e){return e+32}function gn(e){return e===u.SPACE||e===u.LINE_FEED||e===u.TABULATION||e===u.FORM_FEED}function Qe(e){return gn(e)||e===u.SOLIDUS||e===u.GREATER_THAN_SIGN}function Js(e){return e===u.NULL?h.nullCharacterReference:e>1114111?h.characterReferenceOutsideUnicodeRange:En(e)?h.surrogateCharacterReference:_n(e)?h.noncharacterCharacterReference:pn(e)||e===u.CARRIAGE_RETURN?h.controlCharacterReference:null}class Zs{constructor(n,t){this.options=n,this.handler=t,this.paused=!1,this.inLoop=!1,this.inForeignNode=!1,this.lastStartTagName="",this.active=!1,this.state=r.DATA,this.returnState=r.DATA,this.entityStartPos=0,this.consumedAfterSnapshot=-1,this.currentCharacterToken=null,this.currentToken=null,this.currentAttr={name:"",value:""},this.preprocessor=new Us(t),this.currentLocation=this.getCurrentLocation(-1),this.entityDecoder=new js(Hs,(a,i)=>{this.preprocessor.pos=this.entityStartPos+i-1,this._flushCodePointConsumedAsCharacterReference(a)},t.onParseError?{missingSemicolonAfterCharacterReference:()=>{this._err(h.missingSemicolonAfterCharacterReference,1)},absenceOfDigitsInNumericCharacterReference:a=>{this._err(h.absenceOfDigitsInNumericCharacterReference,this.entityStartPos-this.preprocessor.pos+a)},validateNumericCharacterReference:a=>{const i=Js(a);i&&this._err(i,1)}}:void 0)}_err(n,t=0){var a,i;(i=(a=this.handler).onParseError)===null||i===void 0||i.call(a,this.preprocessor.getError(n,t))}getCurrentLocation(n){return this.options.sourceCodeLocationInfo?{startLine:this.preprocessor.line,startCol:this.preprocessor.col-n,startOffset:this.preprocessor.offset-n,endLine:-1,endCol:-1,endOffset:-1}:null}_runParsingLoop(){if(!this.inLoop){for(this.inLoop=!0;this.active&&!this.paused;){this.consumedAfterSnapshot=0;const n=this._consume();this._ensureHibernation()||this._callState(n)}this.inLoop=!1}}pause(){this.paused=!0}resume(n){if(!this.paused)throw new Error("Parser was already resumed");this.paused=!1,!this.inLoop&&(this._runParsingLoop(),this.paused||n==null||n())}write(n,t,a){this.active=!0,this.preprocessor.write(n,t),this._runParsingLoop(),this.paused||a==null||a()}insertHtmlAtCurrentPos(n){this.active=!0,this.preprocessor.insertHtmlAtCurrentPos(n),this._runParsingLoop()}_ensureHibernation(){return this.preprocessor.endOfChunkHit?(this.preprocessor.retreat(this.consumedAfterSnapshot),this.consumedAfterSnapshot=0,this.active=!1,!0):!1}_consume(){return this.consumedAfterSnapshot++,this.preprocessor.advance()}_advanceBy(n){this.consumedAfterSnapshot+=n;for(let t=0;t<n;t++)this.preprocessor.advance()}_consumeSequenceIfMatch(n,t){return this.preprocessor.startsWith(n,t)?(this._advanceBy(n.length-1),!0):!1}_createStartTagToken(){this.currentToken={type:g.START_TAG,tagName:"",tagID:s.UNKNOWN,selfClosing:!1,ackSelfClosing:!1,attrs:[],location:this.getCurrentLocation(1)}}_createEndTagToken(){this.currentToken={type:g.END_TAG,tagName:"",tagID:s.UNKNOWN,selfClosing:!1,ackSelfClosing:!1,attrs:[],location:this.getCurrentLocation(2)}}_createCommentToken(n){this.currentToken={type:g.COMMENT,data:"",location:this.getCurrentLocation(n)}}_createDoctypeToken(n){this.currentToken={type:g.DOCTYPE,name:n,forceQuirks:!1,publicId:null,systemId:null,location:this.currentLocation}}_createCharacterToken(n,t){this.currentCharacterToken={type:n,chars:t,location:this.currentLocation}}_createAttr(n){this.currentAttr={name:n,value:""},this.currentLocation=this.getCurrentLocation(0)}_leaveAttrName(){var n,t;const a=this.currentToken;if(Tn(a,this.currentAttr.name)===null){if(a.attrs.push(this.currentAttr),a.location&&this.currentLocation){const i=(n=(t=a.location).attrs)!==null&&n!==void 0?n:t.attrs=Object.create(null);i[this.currentAttr.name]=this.currentLocation,this._leaveAttrValue()}}else this._err(h.duplicateAttribute)}_leaveAttrValue(){this.currentLocation&&(this.currentLocation.endLine=this.preprocessor.line,this.currentLocation.endCol=this.preprocessor.col,this.currentLocation.endOffset=this.preprocessor.offset)}prepareToken(n){this._emitCurrentCharacterToken(n.location),this.currentToken=null,n.location&&(n.location.endLine=this.preprocessor.line,n.location.endCol=this.preprocessor.col+1,n.location.endOffset=this.preprocessor.offset+1),this.currentLocation=this.getCurrentLocation(-1)}emitCurrentTagToken(){const n=this.currentToken;this.prepareToken(n),n.tagID=W(n.tagName),n.type===g.START_TAG?(this.lastStartTagName=n.tagName,this.handler.onStartTag(n)):(n.attrs.length>0&&this._err(h.endTagWithAttributes),n.selfClosing&&this._err(h.endTagWithTrailingSolidus),this.handler.onEndTag(n)),this.preprocessor.dropParsedChunk()}emitCurrentComment(n){this.prepareToken(n),this.handler.onComment(n),this.preprocessor.dropParsedChunk()}emitCurrentDoctype(n){this.prepareToken(n),this.handler.onDoctype(n),this.preprocessor.dropParsedChunk()}_emitCurrentCharacterToken(n){if(this.currentCharacterToken){switch(n&&this.currentCharacterToken.location&&(this.currentCharacterToken.location.endLine=n.startLine,this.currentCharacterToken.location.endCol=n.startCol,this.currentCharacterToken.location.endOffset=n.startOffset),this.currentCharacterToken.type){case g.CHARACTER:{this.handler.onCharacter(this.currentCharacterToken);break}case g.NULL_CHARACTER:{this.handler.onNullCharacter(this.currentCharacterToken);break}case g.WHITESPACE_CHARACTER:{this.handler.onWhitespaceCharacter(this.currentCharacterToken);break}}this.currentCharacterToken=null}}_emitEOFToken(){const n=this.getCurrentLocation(0);n&&(n.endLine=n.startLine,n.endCol=n.startCol,n.endOffset=n.startOffset),this._emitCurrentCharacterToken(n),this.handler.onEof({type:g.EOF,location:n}),this.active=!1}_appendCharToCurrentCharacterToken(n,t){if(this.currentCharacterToken)if(this.currentCharacterToken.type===n){this.currentCharacterToken.chars+=t;return}else this.currentLocation=this.getCurrentLocation(0),this._emitCurrentCharacterToken(this.currentLocation),this.preprocessor.dropParsedChunk();this._createCharacterToken(n,t)}_emitCodePoint(n){const t=gn(n)?g.WHITESPACE_CHARACTER:n===u.NULL?g.NULL_CHARACTER:g.CHARACTER;this._appendCharToCurrentCharacterToken(t,String.fromCodePoint(n))}_emitChars(n){this._appendCharToCurrentCharacterToken(g.CHARACTER,n)}_startCharacterReference(){this.returnState=this.state,this.state=r.CHARACTER_REFERENCE,this.entityStartPos=this.preprocessor.pos,this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute()?M.Attribute:M.Legacy)}_isCharacterReferenceInAttribute(){return this.returnState===r.ATTRIBUTE_VALUE_DOUBLE_QUOTED||this.returnState===r.ATTRIBUTE_VALUE_SINGLE_QUOTED||this.returnState===r.ATTRIBUTE_VALUE_UNQUOTED}_flushCodePointConsumedAsCharacterReference(n){this._isCharacterReferenceInAttribute()?this.currentAttr.value+=String.fromCodePoint(n):this._emitCodePoint(n)}_callState(n){switch(this.state){case r.DATA:{this._stateData(n);break}case r.RCDATA:{this._stateRcdata(n);break}case r.RAWTEXT:{this._stateRawtext(n);break}case r.SCRIPT_DATA:{this._stateScriptData(n);break}case r.PLAINTEXT:{this._statePlaintext(n);break}case r.TAG_OPEN:{this._stateTagOpen(n);break}case r.END_TAG_OPEN:{this._stateEndTagOpen(n);break}case r.TAG_NAME:{this._stateTagName(n);break}case r.RCDATA_LESS_THAN_SIGN:{this._stateRcdataLessThanSign(n);break}case r.RCDATA_END_TAG_OPEN:{this._stateRcdataEndTagOpen(n);break}case r.RCDATA_END_TAG_NAME:{this._stateRcdataEndTagName(n);break}case r.RAWTEXT_LESS_THAN_SIGN:{this._stateRawtextLessThanSign(n);break}case r.RAWTEXT_END_TAG_OPEN:{this._stateRawtextEndTagOpen(n);break}case r.RAWTEXT_END_TAG_NAME:{this._stateRawtextEndTagName(n);break}case r.SCRIPT_DATA_LESS_THAN_SIGN:{this._stateScriptDataLessThanSign(n);break}case r.SCRIPT_DATA_END_TAG_OPEN:{this._stateScriptDataEndTagOpen(n);break}case r.SCRIPT_DATA_END_TAG_NAME:{this._stateScriptDataEndTagName(n);break}case r.SCRIPT_DATA_ESCAPE_START:{this._stateScriptDataEscapeStart(n);break}case r.SCRIPT_DATA_ESCAPE_START_DASH:{this._stateScriptDataEscapeStartDash(n);break}case r.SCRIPT_DATA_ESCAPED:{this._stateScriptDataEscaped(n);break}case r.SCRIPT_DATA_ESCAPED_DASH:{this._stateScriptDataEscapedDash(n);break}case r.SCRIPT_DATA_ESCAPED_DASH_DASH:{this._stateScriptDataEscapedDashDash(n);break}case r.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:{this._stateScriptDataEscapedLessThanSign(n);break}case r.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:{this._stateScriptDataEscapedEndTagOpen(n);break}case r.SCRIPT_DATA_ESCAPED_END_TAG_NAME:{this._stateScriptDataEscapedEndTagName(n);break}case r.SCRIPT_DATA_DOUBLE_ESCAPE_START:{this._stateScriptDataDoubleEscapeStart(n);break}case r.SCRIPT_DATA_DOUBLE_ESCAPED:{this._stateScriptDataDoubleEscaped(n);break}case r.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:{this._stateScriptDataDoubleEscapedDash(n);break}case r.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:{this._stateScriptDataDoubleEscapedDashDash(n);break}case r.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:{this._stateScriptDataDoubleEscapedLessThanSign(n);break}case r.SCRIPT_DATA_DOUBLE_ESCAPE_END:{this._stateScriptDataDoubleEscapeEnd(n);break}case r.BEFORE_ATTRIBUTE_NAME:{this._stateBeforeAttributeName(n);break}case r.ATTRIBUTE_NAME:{this._stateAttributeName(n);break}case r.AFTER_ATTRIBUTE_NAME:{this._stateAfterAttributeName(n);break}case r.BEFORE_ATTRIBUTE_VALUE:{this._stateBeforeAttributeValue(n);break}case r.ATTRIBUTE_VALUE_DOUBLE_QUOTED:{this._stateAttributeValueDoubleQuoted(n);break}case r.ATTRIBUTE_VALUE_SINGLE_QUOTED:{this._stateAttributeValueSingleQuoted(n);break}case r.ATTRIBUTE_VALUE_UNQUOTED:{this._stateAttributeValueUnquoted(n);break}case r.AFTER_ATTRIBUTE_VALUE_QUOTED:{this._stateAfterAttributeValueQuoted(n);break}case r.SELF_CLOSING_START_TAG:{this._stateSelfClosingStartTag(n);break}case r.BOGUS_COMMENT:{this._stateBogusComment(n);break}case r.MARKUP_DECLARATION_OPEN:{this._stateMarkupDeclarationOpen(n);break}case r.COMMENT_START:{this._stateCommentStart(n);break}case r.COMMENT_START_DASH:{this._stateCommentStartDash(n);break}case r.COMMENT:{this._stateComment(n);break}case r.COMMENT_LESS_THAN_SIGN:{this._stateCommentLessThanSign(n);break}case r.COMMENT_LESS_THAN_SIGN_BANG:{this._stateCommentLessThanSignBang(n);break}case r.COMMENT_LESS_THAN_SIGN_BANG_DASH:{this._stateCommentLessThanSignBangDash(n);break}case r.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:{this._stateCommentLessThanSignBangDashDash(n);break}case r.COMMENT_END_DASH:{this._stateCommentEndDash(n);break}case r.COMMENT_END:{this._stateCommentEnd(n);break}case r.COMMENT_END_BANG:{this._stateCommentEndBang(n);break}case r.DOCTYPE:{this._stateDoctype(n);break}case r.BEFORE_DOCTYPE_NAME:{this._stateBeforeDoctypeName(n);break}case r.DOCTYPE_NAME:{this._stateDoctypeName(n);break}case r.AFTER_DOCTYPE_NAME:{this._stateAfterDoctypeName(n);break}case r.AFTER_DOCTYPE_PUBLIC_KEYWORD:{this._stateAfterDoctypePublicKeyword(n);break}case r.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:{this._stateBeforeDoctypePublicIdentifier(n);break}case r.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:{this._stateDoctypePublicIdentifierDoubleQuoted(n);break}case r.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:{this._stateDoctypePublicIdentifierSingleQuoted(n);break}case r.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:{this._stateAfterDoctypePublicIdentifier(n);break}case r.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:{this._stateBetweenDoctypePublicAndSystemIdentifiers(n);break}case r.AFTER_DOCTYPE_SYSTEM_KEYWORD:{this._stateAfterDoctypeSystemKeyword(n);break}case r.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:{this._stateBeforeDoctypeSystemIdentifier(n);break}case r.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:{this._stateDoctypeSystemIdentifierDoubleQuoted(n);break}case r.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:{this._stateDoctypeSystemIdentifierSingleQuoted(n);break}case r.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:{this._stateAfterDoctypeSystemIdentifier(n);break}case r.BOGUS_DOCTYPE:{this._stateBogusDoctype(n);break}case r.CDATA_SECTION:{this._stateCdataSection(n);break}case r.CDATA_SECTION_BRACKET:{this._stateCdataSectionBracket(n);break}case r.CDATA_SECTION_END:{this._stateCdataSectionEnd(n);break}case r.CHARACTER_REFERENCE:{this._stateCharacterReference();break}case r.AMBIGUOUS_AMPERSAND:{this._stateAmbiguousAmpersand(n);break}default:throw new Error("Unknown state")}}_stateData(n){switch(n){case u.LESS_THAN_SIGN:{this.state=r.TAG_OPEN;break}case u.AMPERSAND:{this._startCharacterReference();break}case u.NULL:{this._err(h.unexpectedNullCharacter),this._emitCodePoint(n);break}case u.EOF:{this._emitEOFToken();break}default:this._emitCodePoint(n)}}_stateRcdata(n){switch(n){case u.AMPERSAND:{this._startCharacterReference();break}case u.LESS_THAN_SIGN:{this.state=r.RCDATA_LESS_THAN_SIGN;break}case u.NULL:{this._err(h.unexpectedNullCharacter),this._emitChars(N);break}case u.EOF:{this._emitEOFToken();break}default:this._emitCodePoint(n)}}_stateRawtext(n){switch(n){case u.LESS_THAN_SIGN:{this.state=r.RAWTEXT_LESS_THAN_SIGN;break}case u.NULL:{this._err(h.unexpectedNullCharacter),this._emitChars(N);break}case u.EOF:{this._emitEOFToken();break}default:this._emitCodePoint(n)}}_stateScriptData(n){switch(n){case u.LESS_THAN_SIGN:{this.state=r.SCRIPT_DATA_LESS_THAN_SIGN;break}case u.NULL:{this._err(h.unexpectedNullCharacter),this._emitChars(N);break}case u.EOF:{this._emitEOFToken();break}default:this._emitCodePoint(n)}}_statePlaintext(n){switch(n){case u.NULL:{this._err(h.unexpectedNullCharacter),this._emitChars(N);break}case u.EOF:{this._emitEOFToken();break}default:this._emitCodePoint(n)}}_stateTagOpen(n){if(w(n))this._createStartTagToken(),this.state=r.TAG_NAME,this._stateTagName(n);else switch(n){case u.EXCLAMATION_MARK:{this.state=r.MARKUP_DECLARATION_OPEN;break}case u.SOLIDUS:{this.state=r.END_TAG_OPEN;break}case u.QUESTION_MARK:{this._err(h.unexpectedQuestionMarkInsteadOfTagName),this._createCommentToken(1),this.state=r.BOGUS_COMMENT,this._stateBogusComment(n);break}case u.EOF:{this._err(h.eofBeforeTagName),this._emitChars("<"),this._emitEOFToken();break}default:this._err(h.invalidFirstCharacterOfTagName),this._emitChars("<"),this.state=r.DATA,this._stateData(n)}}_stateEndTagOpen(n){if(w(n))this._createEndTagToken(),this.state=r.TAG_NAME,this._stateTagName(n);else switch(n){case u.GREATER_THAN_SIGN:{this._err(h.missingEndTagName),this.state=r.DATA;break}case u.EOF:{this._err(h.eofBeforeTagName),this._emitChars("</"),this._emitEOFToken();break}default:this._err(h.invalidFirstCharacterOfTagName),this._createCommentToken(2),this.state=r.BOGUS_COMMENT,this._stateBogusComment(n)}}_stateTagName(n){const t=this.currentToken;switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:{this.state=r.BEFORE_ATTRIBUTE_NAME;break}case u.SOLIDUS:{this.state=r.SELF_CLOSING_START_TAG;break}case u.GREATER_THAN_SIGN:{this.state=r.DATA,this.emitCurrentTagToken();break}case u.NULL:{this._err(h.unexpectedNullCharacter),t.tagName+=N;break}case u.EOF:{this._err(h.eofInTag),this._emitEOFToken();break}default:t.tagName+=String.fromCodePoint(V(n)?ue(n):n)}}_stateRcdataLessThanSign(n){n===u.SOLIDUS?this.state=r.RCDATA_END_TAG_OPEN:(this._emitChars("<"),this.state=r.RCDATA,this._stateRcdata(n))}_stateRcdataEndTagOpen(n){w(n)?(this.state=r.RCDATA_END_TAG_NAME,this._stateRcdataEndTagName(n)):(this._emitChars("</"),this.state=r.RCDATA,this._stateRcdata(n))}handleSpecialEndTag(n){if(!this.preprocessor.startsWith(this.lastStartTagName,!1))return!this._ensureHibernation();this._createEndTagToken();const t=this.currentToken;switch(t.tagName=this.lastStartTagName,this.preprocessor.peek(this.lastStartTagName.length)){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:return this._advanceBy(this.lastStartTagName.length),this.state=r.BEFORE_ATTRIBUTE_NAME,!1;case u.SOLIDUS:return this._advanceBy(this.lastStartTagName.length),this.state=r.SELF_CLOSING_START_TAG,!1;case u.GREATER_THAN_SIGN:return this._advanceBy(this.lastStartTagName.length),this.emitCurrentTagToken(),this.state=r.DATA,!1;default:return!this._ensureHibernation()}}_stateRcdataEndTagName(n){this.handleSpecialEndTag(n)&&(this._emitChars("</"),this.state=r.RCDATA,this._stateRcdata(n))}_stateRawtextLessThanSign(n){n===u.SOLIDUS?this.state=r.RAWTEXT_END_TAG_OPEN:(this._emitChars("<"),this.state=r.RAWTEXT,this._stateRawtext(n))}_stateRawtextEndTagOpen(n){w(n)?(this.state=r.RAWTEXT_END_TAG_NAME,this._stateRawtextEndTagName(n)):(this._emitChars("</"),this.state=r.RAWTEXT,this._stateRawtext(n))}_stateRawtextEndTagName(n){this.handleSpecialEndTag(n)&&(this._emitChars("</"),this.state=r.RAWTEXT,this._stateRawtext(n))}_stateScriptDataLessThanSign(n){switch(n){case u.SOLIDUS:{this.state=r.SCRIPT_DATA_END_TAG_OPEN;break}case u.EXCLAMATION_MARK:{this.state=r.SCRIPT_DATA_ESCAPE_START,this._emitChars("<!");break}default:this._emitChars("<"),this.state=r.SCRIPT_DATA,this._stateScriptData(n)}}_stateScriptDataEndTagOpen(n){w(n)?(this.state=r.SCRIPT_DATA_END_TAG_NAME,this._stateScriptDataEndTagName(n)):(this._emitChars("</"),this.state=r.SCRIPT_DATA,this._stateScriptData(n))}_stateScriptDataEndTagName(n){this.handleSpecialEndTag(n)&&(this._emitChars("</"),this.state=r.SCRIPT_DATA,this._stateScriptData(n))}_stateScriptDataEscapeStart(n){n===u.HYPHEN_MINUS?(this.state=r.SCRIPT_DATA_ESCAPE_START_DASH,this._emitChars("-")):(this.state=r.SCRIPT_DATA,this._stateScriptData(n))}_stateScriptDataEscapeStartDash(n){n===u.HYPHEN_MINUS?(this.state=r.SCRIPT_DATA_ESCAPED_DASH_DASH,this._emitChars("-")):(this.state=r.SCRIPT_DATA,this._stateScriptData(n))}_stateScriptDataEscaped(n){switch(n){case u.HYPHEN_MINUS:{this.state=r.SCRIPT_DATA_ESCAPED_DASH,this._emitChars("-");break}case u.LESS_THAN_SIGN:{this.state=r.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;break}case u.NULL:{this._err(h.unexpectedNullCharacter),this._emitChars(N);break}case u.EOF:{this._err(h.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break}default:this._emitCodePoint(n)}}_stateScriptDataEscapedDash(n){switch(n){case u.HYPHEN_MINUS:{this.state=r.SCRIPT_DATA_ESCAPED_DASH_DASH,this._emitChars("-");break}case u.LESS_THAN_SIGN:{this.state=r.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;break}case u.NULL:{this._err(h.unexpectedNullCharacter),this.state=r.SCRIPT_DATA_ESCAPED,this._emitChars(N);break}case u.EOF:{this._err(h.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break}default:this.state=r.SCRIPT_DATA_ESCAPED,this._emitCodePoint(n)}}_stateScriptDataEscapedDashDash(n){switch(n){case u.HYPHEN_MINUS:{this._emitChars("-");break}case u.LESS_THAN_SIGN:{this.state=r.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;break}case u.GREATER_THAN_SIGN:{this.state=r.SCRIPT_DATA,this._emitChars(">");break}case u.NULL:{this._err(h.unexpectedNullCharacter),this.state=r.SCRIPT_DATA_ESCAPED,this._emitChars(N);break}case u.EOF:{this._err(h.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break}default:this.state=r.SCRIPT_DATA_ESCAPED,this._emitCodePoint(n)}}_stateScriptDataEscapedLessThanSign(n){n===u.SOLIDUS?this.state=r.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:w(n)?(this._emitChars("<"),this.state=r.SCRIPT_DATA_DOUBLE_ESCAPE_START,this._stateScriptDataDoubleEscapeStart(n)):(this._emitChars("<"),this.state=r.SCRIPT_DATA_ESCAPED,this._stateScriptDataEscaped(n))}_stateScriptDataEscapedEndTagOpen(n){w(n)?(this.state=r.SCRIPT_DATA_ESCAPED_END_TAG_NAME,this._stateScriptDataEscapedEndTagName(n)):(this._emitChars("</"),this.state=r.SCRIPT_DATA_ESCAPED,this._stateScriptDataEscaped(n))}_stateScriptDataEscapedEndTagName(n){this.handleSpecialEndTag(n)&&(this._emitChars("</"),this.state=r.SCRIPT_DATA_ESCAPED,this._stateScriptDataEscaped(n))}_stateScriptDataDoubleEscapeStart(n){if(this.preprocessor.startsWith(O.SCRIPT,!1)&&Qe(this.preprocessor.peek(O.SCRIPT.length))){this._emitCodePoint(n);for(let t=0;t<O.SCRIPT.length;t++)this._emitCodePoint(this._consume());this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED}else this._ensureHibernation()||(this.state=r.SCRIPT_DATA_ESCAPED,this._stateScriptDataEscaped(n))}_stateScriptDataDoubleEscaped(n){switch(n){case u.HYPHEN_MINUS:{this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED_DASH,this._emitChars("-");break}case u.LESS_THAN_SIGN:{this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN,this._emitChars("<");break}case u.NULL:{this._err(h.unexpectedNullCharacter),this._emitChars(N);break}case u.EOF:{this._err(h.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break}default:this._emitCodePoint(n)}}_stateScriptDataDoubleEscapedDash(n){switch(n){case u.HYPHEN_MINUS:{this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH,this._emitChars("-");break}case u.LESS_THAN_SIGN:{this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN,this._emitChars("<");break}case u.NULL:{this._err(h.unexpectedNullCharacter),this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED,this._emitChars(N);break}case u.EOF:{this._err(h.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break}default:this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED,this._emitCodePoint(n)}}_stateScriptDataDoubleEscapedDashDash(n){switch(n){case u.HYPHEN_MINUS:{this._emitChars("-");break}case u.LESS_THAN_SIGN:{this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN,this._emitChars("<");break}case u.GREATER_THAN_SIGN:{this.state=r.SCRIPT_DATA,this._emitChars(">");break}case u.NULL:{this._err(h.unexpectedNullCharacter),this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED,this._emitChars(N);break}case u.EOF:{this._err(h.eofInScriptHtmlCommentLikeText),this._emitEOFToken();break}default:this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED,this._emitCodePoint(n)}}_stateScriptDataDoubleEscapedLessThanSign(n){n===u.SOLIDUS?(this.state=r.SCRIPT_DATA_DOUBLE_ESCAPE_END,this._emitChars("/")):(this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED,this._stateScriptDataDoubleEscaped(n))}_stateScriptDataDoubleEscapeEnd(n){if(this.preprocessor.startsWith(O.SCRIPT,!1)&&Qe(this.preprocessor.peek(O.SCRIPT.length))){this._emitCodePoint(n);for(let t=0;t<O.SCRIPT.length;t++)this._emitCodePoint(this._consume());this.state=r.SCRIPT_DATA_ESCAPED}else this._ensureHibernation()||(this.state=r.SCRIPT_DATA_DOUBLE_ESCAPED,this._stateScriptDataDoubleEscaped(n))}_stateBeforeAttributeName(n){switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:break;case u.SOLIDUS:case u.GREATER_THAN_SIGN:case u.EOF:{this.state=r.AFTER_ATTRIBUTE_NAME,this._stateAfterAttributeName(n);break}case u.EQUALS_SIGN:{this._err(h.unexpectedEqualsSignBeforeAttributeName),this._createAttr("="),this.state=r.ATTRIBUTE_NAME;break}default:this._createAttr(""),this.state=r.ATTRIBUTE_NAME,this._stateAttributeName(n)}}_stateAttributeName(n){switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:case u.SOLIDUS:case u.GREATER_THAN_SIGN:case u.EOF:{this._leaveAttrName(),this.state=r.AFTER_ATTRIBUTE_NAME,this._stateAfterAttributeName(n);break}case u.EQUALS_SIGN:{this._leaveAttrName(),this.state=r.BEFORE_ATTRIBUTE_VALUE;break}case u.QUOTATION_MARK:case u.APOSTROPHE:case u.LESS_THAN_SIGN:{this._err(h.unexpectedCharacterInAttributeName),this.currentAttr.name+=String.fromCodePoint(n);break}case u.NULL:{this._err(h.unexpectedNullCharacter),this.currentAttr.name+=N;break}default:this.currentAttr.name+=String.fromCodePoint(V(n)?ue(n):n)}}_stateAfterAttributeName(n){switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:break;case u.SOLIDUS:{this.state=r.SELF_CLOSING_START_TAG;break}case u.EQUALS_SIGN:{this.state=r.BEFORE_ATTRIBUTE_VALUE;break}case u.GREATER_THAN_SIGN:{this.state=r.DATA,this.emitCurrentTagToken();break}case u.EOF:{this._err(h.eofInTag),this._emitEOFToken();break}default:this._createAttr(""),this.state=r.ATTRIBUTE_NAME,this._stateAttributeName(n)}}_stateBeforeAttributeValue(n){switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:break;case u.QUOTATION_MARK:{this.state=r.ATTRIBUTE_VALUE_DOUBLE_QUOTED;break}case u.APOSTROPHE:{this.state=r.ATTRIBUTE_VALUE_SINGLE_QUOTED;break}case u.GREATER_THAN_SIGN:{this._err(h.missingAttributeValue),this.state=r.DATA,this.emitCurrentTagToken();break}default:this.state=r.ATTRIBUTE_VALUE_UNQUOTED,this._stateAttributeValueUnquoted(n)}}_stateAttributeValueDoubleQuoted(n){switch(n){case u.QUOTATION_MARK:{this.state=r.AFTER_ATTRIBUTE_VALUE_QUOTED;break}case u.AMPERSAND:{this._startCharacterReference();break}case u.NULL:{this._err(h.unexpectedNullCharacter),this.currentAttr.value+=N;break}case u.EOF:{this._err(h.eofInTag),this._emitEOFToken();break}default:this.currentAttr.value+=String.fromCodePoint(n)}}_stateAttributeValueSingleQuoted(n){switch(n){case u.APOSTROPHE:{this.state=r.AFTER_ATTRIBUTE_VALUE_QUOTED;break}case u.AMPERSAND:{this._startCharacterReference();break}case u.NULL:{this._err(h.unexpectedNullCharacter),this.currentAttr.value+=N;break}case u.EOF:{this._err(h.eofInTag),this._emitEOFToken();break}default:this.currentAttr.value+=String.fromCodePoint(n)}}_stateAttributeValueUnquoted(n){switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:{this._leaveAttrValue(),this.state=r.BEFORE_ATTRIBUTE_NAME;break}case u.AMPERSAND:{this._startCharacterReference();break}case u.GREATER_THAN_SIGN:{this._leaveAttrValue(),this.state=r.DATA,this.emitCurrentTagToken();break}case u.NULL:{this._err(h.unexpectedNullCharacter),this.currentAttr.value+=N;break}case u.QUOTATION_MARK:case u.APOSTROPHE:case u.LESS_THAN_SIGN:case u.EQUALS_SIGN:case u.GRAVE_ACCENT:{this._err(h.unexpectedCharacterInUnquotedAttributeValue),this.currentAttr.value+=String.fromCodePoint(n);break}case u.EOF:{this._err(h.eofInTag),this._emitEOFToken();break}default:this.currentAttr.value+=String.fromCodePoint(n)}}_stateAfterAttributeValueQuoted(n){switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:{this._leaveAttrValue(),this.state=r.BEFORE_ATTRIBUTE_NAME;break}case u.SOLIDUS:{this._leaveAttrValue(),this.state=r.SELF_CLOSING_START_TAG;break}case u.GREATER_THAN_SIGN:{this._leaveAttrValue(),this.state=r.DATA,this.emitCurrentTagToken();break}case u.EOF:{this._err(h.eofInTag),this._emitEOFToken();break}default:this._err(h.missingWhitespaceBetweenAttributes),this.state=r.BEFORE_ATTRIBUTE_NAME,this._stateBeforeAttributeName(n)}}_stateSelfClosingStartTag(n){switch(n){case u.GREATER_THAN_SIGN:{const t=this.currentToken;t.selfClosing=!0,this.state=r.DATA,this.emitCurrentTagToken();break}case u.EOF:{this._err(h.eofInTag),this._emitEOFToken();break}default:this._err(h.unexpectedSolidusInTag),this.state=r.BEFORE_ATTRIBUTE_NAME,this._stateBeforeAttributeName(n)}}_stateBogusComment(n){const t=this.currentToken;switch(n){case u.GREATER_THAN_SIGN:{this.state=r.DATA,this.emitCurrentComment(t);break}case u.EOF:{this.emitCurrentComment(t),this._emitEOFToken();break}case u.NULL:{this._err(h.unexpectedNullCharacter),t.data+=N;break}default:t.data+=String.fromCodePoint(n)}}_stateMarkupDeclarationOpen(n){this._consumeSequenceIfMatch(O.DASH_DASH,!0)?(this._createCommentToken(O.DASH_DASH.length+1),this.state=r.COMMENT_START):this._consumeSequenceIfMatch(O.DOCTYPE,!1)?(this.currentLocation=this.getCurrentLocation(O.DOCTYPE.length+1),this.state=r.DOCTYPE):this._consumeSequenceIfMatch(O.CDATA_START,!0)?this.inForeignNode?this.state=r.CDATA_SECTION:(this._err(h.cdataInHtmlContent),this._createCommentToken(O.CDATA_START.length+1),this.currentToken.data="[CDATA[",this.state=r.BOGUS_COMMENT):this._ensureHibernation()||(this._err(h.incorrectlyOpenedComment),this._createCommentToken(2),this.state=r.BOGUS_COMMENT,this._stateBogusComment(n))}_stateCommentStart(n){switch(n){case u.HYPHEN_MINUS:{this.state=r.COMMENT_START_DASH;break}case u.GREATER_THAN_SIGN:{this._err(h.abruptClosingOfEmptyComment),this.state=r.DATA;const t=this.currentToken;this.emitCurrentComment(t);break}default:this.state=r.COMMENT,this._stateComment(n)}}_stateCommentStartDash(n){const t=this.currentToken;switch(n){case u.HYPHEN_MINUS:{this.state=r.COMMENT_END;break}case u.GREATER_THAN_SIGN:{this._err(h.abruptClosingOfEmptyComment),this.state=r.DATA,this.emitCurrentComment(t);break}case u.EOF:{this._err(h.eofInComment),this.emitCurrentComment(t),this._emitEOFToken();break}default:t.data+="-",this.state=r.COMMENT,this._stateComment(n)}}_stateComment(n){const t=this.currentToken;switch(n){case u.HYPHEN_MINUS:{this.state=r.COMMENT_END_DASH;break}case u.LESS_THAN_SIGN:{t.data+="<",this.state=r.COMMENT_LESS_THAN_SIGN;break}case u.NULL:{this._err(h.unexpectedNullCharacter),t.data+=N;break}case u.EOF:{this._err(h.eofInComment),this.emitCurrentComment(t),this._emitEOFToken();break}default:t.data+=String.fromCodePoint(n)}}_stateCommentLessThanSign(n){const t=this.currentToken;switch(n){case u.EXCLAMATION_MARK:{t.data+="!",this.state=r.COMMENT_LESS_THAN_SIGN_BANG;break}case u.LESS_THAN_SIGN:{t.data+="<";break}default:this.state=r.COMMENT,this._stateComment(n)}}_stateCommentLessThanSignBang(n){n===u.HYPHEN_MINUS?this.state=r.COMMENT_LESS_THAN_SIGN_BANG_DASH:(this.state=r.COMMENT,this._stateComment(n))}_stateCommentLessThanSignBangDash(n){n===u.HYPHEN_MINUS?this.state=r.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:(this.state=r.COMMENT_END_DASH,this._stateCommentEndDash(n))}_stateCommentLessThanSignBangDashDash(n){n!==u.GREATER_THAN_SIGN&&n!==u.EOF&&this._err(h.nestedComment),this.state=r.COMMENT_END,this._stateCommentEnd(n)}_stateCommentEndDash(n){const t=this.currentToken;switch(n){case u.HYPHEN_MINUS:{this.state=r.COMMENT_END;break}case u.EOF:{this._err(h.eofInComment),this.emitCurrentComment(t),this._emitEOFToken();break}default:t.data+="-",this.state=r.COMMENT,this._stateComment(n)}}_stateCommentEnd(n){const t=this.currentToken;switch(n){case u.GREATER_THAN_SIGN:{this.state=r.DATA,this.emitCurrentComment(t);break}case u.EXCLAMATION_MARK:{this.state=r.COMMENT_END_BANG;break}case u.HYPHEN_MINUS:{t.data+="-";break}case u.EOF:{this._err(h.eofInComment),this.emitCurrentComment(t),this._emitEOFToken();break}default:t.data+="--",this.state=r.COMMENT,this._stateComment(n)}}_stateCommentEndBang(n){const t=this.currentToken;switch(n){case u.HYPHEN_MINUS:{t.data+="--!",this.state=r.COMMENT_END_DASH;break}case u.GREATER_THAN_SIGN:{this._err(h.incorrectlyClosedComment),this.state=r.DATA,this.emitCurrentComment(t);break}case u.EOF:{this._err(h.eofInComment),this.emitCurrentComment(t),this._emitEOFToken();break}default:t.data+="--!",this.state=r.COMMENT,this._stateComment(n)}}_stateDoctype(n){switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:{this.state=r.BEFORE_DOCTYPE_NAME;break}case u.GREATER_THAN_SIGN:{this.state=r.BEFORE_DOCTYPE_NAME,this._stateBeforeDoctypeName(n);break}case u.EOF:{this._err(h.eofInDoctype),this._createDoctypeToken(null);const t=this.currentToken;t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:this._err(h.missingWhitespaceBeforeDoctypeName),this.state=r.BEFORE_DOCTYPE_NAME,this._stateBeforeDoctypeName(n)}}_stateBeforeDoctypeName(n){if(V(n))this._createDoctypeToken(String.fromCharCode(ue(n))),this.state=r.DOCTYPE_NAME;else switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:break;case u.NULL:{this._err(h.unexpectedNullCharacter),this._createDoctypeToken(N),this.state=r.DOCTYPE_NAME;break}case u.GREATER_THAN_SIGN:{this._err(h.missingDoctypeName),this._createDoctypeToken(null);const t=this.currentToken;t.forceQuirks=!0,this.emitCurrentDoctype(t),this.state=r.DATA;break}case u.EOF:{this._err(h.eofInDoctype),this._createDoctypeToken(null);const t=this.currentToken;t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:this._createDoctypeToken(String.fromCodePoint(n)),this.state=r.DOCTYPE_NAME}}_stateDoctypeName(n){const t=this.currentToken;switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:{this.state=r.AFTER_DOCTYPE_NAME;break}case u.GREATER_THAN_SIGN:{this.state=r.DATA,this.emitCurrentDoctype(t);break}case u.NULL:{this._err(h.unexpectedNullCharacter),t.name+=N;break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:t.name+=String.fromCodePoint(V(n)?ue(n):n)}}_stateAfterDoctypeName(n){const t=this.currentToken;switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:break;case u.GREATER_THAN_SIGN:{this.state=r.DATA,this.emitCurrentDoctype(t);break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:this._consumeSequenceIfMatch(O.PUBLIC,!1)?this.state=r.AFTER_DOCTYPE_PUBLIC_KEYWORD:this._consumeSequenceIfMatch(O.SYSTEM,!1)?this.state=r.AFTER_DOCTYPE_SYSTEM_KEYWORD:this._ensureHibernation()||(this._err(h.invalidCharacterSequenceAfterDoctypeName),t.forceQuirks=!0,this.state=r.BOGUS_DOCTYPE,this._stateBogusDoctype(n))}}_stateAfterDoctypePublicKeyword(n){const t=this.currentToken;switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:{this.state=r.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;break}case u.QUOTATION_MARK:{this._err(h.missingWhitespaceAfterDoctypePublicKeyword),t.publicId="",this.state=r.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;break}case u.APOSTROPHE:{this._err(h.missingWhitespaceAfterDoctypePublicKeyword),t.publicId="",this.state=r.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;break}case u.GREATER_THAN_SIGN:{this._err(h.missingDoctypePublicIdentifier),t.forceQuirks=!0,this.state=r.DATA,this.emitCurrentDoctype(t);break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:this._err(h.missingQuoteBeforeDoctypePublicIdentifier),t.forceQuirks=!0,this.state=r.BOGUS_DOCTYPE,this._stateBogusDoctype(n)}}_stateBeforeDoctypePublicIdentifier(n){const t=this.currentToken;switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:break;case u.QUOTATION_MARK:{t.publicId="",this.state=r.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;break}case u.APOSTROPHE:{t.publicId="",this.state=r.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;break}case u.GREATER_THAN_SIGN:{this._err(h.missingDoctypePublicIdentifier),t.forceQuirks=!0,this.state=r.DATA,this.emitCurrentDoctype(t);break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:this._err(h.missingQuoteBeforeDoctypePublicIdentifier),t.forceQuirks=!0,this.state=r.BOGUS_DOCTYPE,this._stateBogusDoctype(n)}}_stateDoctypePublicIdentifierDoubleQuoted(n){const t=this.currentToken;switch(n){case u.QUOTATION_MARK:{this.state=r.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;break}case u.NULL:{this._err(h.unexpectedNullCharacter),t.publicId+=N;break}case u.GREATER_THAN_SIGN:{this._err(h.abruptDoctypePublicIdentifier),t.forceQuirks=!0,this.emitCurrentDoctype(t),this.state=r.DATA;break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:t.publicId+=String.fromCodePoint(n)}}_stateDoctypePublicIdentifierSingleQuoted(n){const t=this.currentToken;switch(n){case u.APOSTROPHE:{this.state=r.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;break}case u.NULL:{this._err(h.unexpectedNullCharacter),t.publicId+=N;break}case u.GREATER_THAN_SIGN:{this._err(h.abruptDoctypePublicIdentifier),t.forceQuirks=!0,this.emitCurrentDoctype(t),this.state=r.DATA;break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:t.publicId+=String.fromCodePoint(n)}}_stateAfterDoctypePublicIdentifier(n){const t=this.currentToken;switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:{this.state=r.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;break}case u.GREATER_THAN_SIGN:{this.state=r.DATA,this.emitCurrentDoctype(t);break}case u.QUOTATION_MARK:{this._err(h.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers),t.systemId="",this.state=r.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;break}case u.APOSTROPHE:{this._err(h.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers),t.systemId="",this.state=r.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:this._err(h.missingQuoteBeforeDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=r.BOGUS_DOCTYPE,this._stateBogusDoctype(n)}}_stateBetweenDoctypePublicAndSystemIdentifiers(n){const t=this.currentToken;switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:break;case u.GREATER_THAN_SIGN:{this.emitCurrentDoctype(t),this.state=r.DATA;break}case u.QUOTATION_MARK:{t.systemId="",this.state=r.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;break}case u.APOSTROPHE:{t.systemId="",this.state=r.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:this._err(h.missingQuoteBeforeDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=r.BOGUS_DOCTYPE,this._stateBogusDoctype(n)}}_stateAfterDoctypeSystemKeyword(n){const t=this.currentToken;switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:{this.state=r.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;break}case u.QUOTATION_MARK:{this._err(h.missingWhitespaceAfterDoctypeSystemKeyword),t.systemId="",this.state=r.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;break}case u.APOSTROPHE:{this._err(h.missingWhitespaceAfterDoctypeSystemKeyword),t.systemId="",this.state=r.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;break}case u.GREATER_THAN_SIGN:{this._err(h.missingDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=r.DATA,this.emitCurrentDoctype(t);break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:this._err(h.missingQuoteBeforeDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=r.BOGUS_DOCTYPE,this._stateBogusDoctype(n)}}_stateBeforeDoctypeSystemIdentifier(n){const t=this.currentToken;switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:break;case u.QUOTATION_MARK:{t.systemId="",this.state=r.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;break}case u.APOSTROPHE:{t.systemId="",this.state=r.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;break}case u.GREATER_THAN_SIGN:{this._err(h.missingDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=r.DATA,this.emitCurrentDoctype(t);break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:this._err(h.missingQuoteBeforeDoctypeSystemIdentifier),t.forceQuirks=!0,this.state=r.BOGUS_DOCTYPE,this._stateBogusDoctype(n)}}_stateDoctypeSystemIdentifierDoubleQuoted(n){const t=this.currentToken;switch(n){case u.QUOTATION_MARK:{this.state=r.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;break}case u.NULL:{this._err(h.unexpectedNullCharacter),t.systemId+=N;break}case u.GREATER_THAN_SIGN:{this._err(h.abruptDoctypeSystemIdentifier),t.forceQuirks=!0,this.emitCurrentDoctype(t),this.state=r.DATA;break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:t.systemId+=String.fromCodePoint(n)}}_stateDoctypeSystemIdentifierSingleQuoted(n){const t=this.currentToken;switch(n){case u.APOSTROPHE:{this.state=r.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;break}case u.NULL:{this._err(h.unexpectedNullCharacter),t.systemId+=N;break}case u.GREATER_THAN_SIGN:{this._err(h.abruptDoctypeSystemIdentifier),t.forceQuirks=!0,this.emitCurrentDoctype(t),this.state=r.DATA;break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:t.systemId+=String.fromCodePoint(n)}}_stateAfterDoctypeSystemIdentifier(n){const t=this.currentToken;switch(n){case u.SPACE:case u.LINE_FEED:case u.TABULATION:case u.FORM_FEED:break;case u.GREATER_THAN_SIGN:{this.emitCurrentDoctype(t),this.state=r.DATA;break}case u.EOF:{this._err(h.eofInDoctype),t.forceQuirks=!0,this.emitCurrentDoctype(t),this._emitEOFToken();break}default:this._err(h.unexpectedCharacterAfterDoctypeSystemIdentifier),this.state=r.BOGUS_DOCTYPE,this._stateBogusDoctype(n)}}_stateBogusDoctype(n){const t=this.currentToken;switch(n){case u.GREATER_THAN_SIGN:{this.emitCurrentDoctype(t),this.state=r.DATA;break}case u.NULL:{this._err(h.unexpectedNullCharacter);break}case u.EOF:{this.emitCurrentDoctype(t),this._emitEOFToken();break}}}_stateCdataSection(n){switch(n){case u.RIGHT_SQUARE_BRACKET:{this.state=r.CDATA_SECTION_BRACKET;break}case u.EOF:{this._err(h.eofInCdata),this._emitEOFToken();break}default:this._emitCodePoint(n)}}_stateCdataSectionBracket(n){n===u.RIGHT_SQUARE_BRACKET?this.state=r.CDATA_SECTION_END:(this._emitChars("]"),this.state=r.CDATA_SECTION,this._stateCdataSection(n))}_stateCdataSectionEnd(n){switch(n){case u.GREATER_THAN_SIGN:{this.state=r.DATA;break}case u.RIGHT_SQUARE_BRACKET:{this._emitChars("]");break}default:this._emitChars("]]"),this.state=r.CDATA_SECTION,this._stateCdataSection(n)}}_stateCharacterReference(){let n=this.entityDecoder.write(this.preprocessor.html,this.preprocessor.pos);if(n<0)if(this.preprocessor.lastChunkWritten)n=this.entityDecoder.end();else{this.active=!1,this.preprocessor.pos=this.preprocessor.html.length-1,this.consumedAfterSnapshot=0,this.preprocessor.endOfChunkHit=!0;return}n===0?(this.preprocessor.pos=this.entityStartPos,this._flushCodePointConsumedAsCharacterReference(u.AMPERSAND),this.state=!this._isCharacterReferenceInAttribute()&&Ge(this.preprocessor.peek(1))?r.AMBIGUOUS_AMPERSAND:this.returnState):this.state=this.returnState}_stateAmbiguousAmpersand(n){Ge(n)?this._flushCodePointConsumedAsCharacterReference(n):(n===u.SEMICOLON&&this._err(h.unknownNamedCharacterReference),this.state=this.returnState,this._callState(n))}}const bn=new Set([s.DD,s.DT,s.LI,s.OPTGROUP,s.OPTION,s.P,s.RB,s.RP,s.RT,s.RTC]),We=new Set([...bn,s.CAPTION,s.COLGROUP,s.TBODY,s.TD,s.TFOOT,s.TH,s.THEAD,s.TR]),ce=new Set([s.APPLET,s.CAPTION,s.HTML,s.MARQUEE,s.OBJECT,s.TABLE,s.TD,s.TEMPLATE,s.TH]),ea=new Set([...ce,s.OL,s.UL]),na=new Set([...ce,s.BUTTON]),je=new Set([s.ANNOTATION_XML,s.MI,s.MN,s.MO,s.MS,s.MTEXT]),Ke=new Set([s.DESC,s.FOREIGN_OBJECT,s.TITLE]),ta=new Set([s.TR,s.TEMPLATE,s.HTML]),sa=new Set([s.TBODY,s.TFOOT,s.THEAD,s.TEMPLATE,s.HTML]),aa=new Set([s.TABLE,s.TEMPLATE,s.HTML]),ua=new Set([s.TD,s.TH]);class ia{get currentTmplContentOrNode(){return this._isInTemplate()?this.treeAdapter.getTemplateContent(this.current):this.current}constructor(n,t,a){this.treeAdapter=t,this.handler=a,this.items=[],this.tagIDs=[],this.stackTop=-1,this.tmplCount=0,this.currentTagId=s.UNKNOWN,this.current=n}_indexOf(n){return this.items.lastIndexOf(n,this.stackTop)}_isInTemplate(){return this.currentTagId===s.TEMPLATE&&this.treeAdapter.getNamespaceURI(this.current)===E.HTML}_updateCurrentElement(){this.current=this.items[this.stackTop],this.currentTagId=this.tagIDs[this.stackTop]}push(n,t){this.stackTop++,this.items[this.stackTop]=n,this.current=n,this.tagIDs[this.stackTop]=t,this.currentTagId=t,this._isInTemplate()&&this.tmplCount++,this.handler.onItemPush(n,t,!0)}pop(){const n=this.current;this.tmplCount>0&&this._isInTemplate()&&this.tmplCount--,this.stackTop--,this._updateCurrentElement(),this.handler.onItemPop(n,!0)}replace(n,t){const a=this._indexOf(n);this.items[a]=t,a===this.stackTop&&(this.current=t)}insertAfter(n,t,a){const i=this._indexOf(n)+1;this.items.splice(i,0,t),this.tagIDs.splice(i,0,a),this.stackTop++,i===this.stackTop&&this._updateCurrentElement(),this.current&&this.currentTagId!==void 0&&this.handler.onItemPush(this.current,this.currentTagId,i===this.stackTop)}popUntilTagNamePopped(n){let t=this.stackTop+1;do t=this.tagIDs.lastIndexOf(n,t-1);while(t>0&&this.treeAdapter.getNamespaceURI(this.items[t])!==E.HTML);this.shortenToLength(Math.max(t,0))}shortenToLength(n){for(;this.stackTop>=n;){const t=this.current;this.tmplCount>0&&this._isInTemplate()&&(this.tmplCount-=1),this.stackTop--,this._updateCurrentElement(),this.handler.onItemPop(t,this.stackTop<n)}}popUntilElementPopped(n){const t=this._indexOf(n);this.shortenToLength(Math.max(t,0))}popUntilPopped(n,t){const a=this._indexOfTagNames(n,t);this.shortenToLength(Math.max(a,0))}popUntilNumberedHeaderPopped(){this.popUntilPopped(Se,E.HTML)}popUntilTableCellPopped(){this.popUntilPopped(ua,E.HTML)}popAllUpToHtmlElement(){this.tmplCount=0,this.shortenToLength(1)}_indexOfTagNames(n,t){for(let a=this.stackTop;a>=0;a--)if(n.has(this.tagIDs[a])&&this.treeAdapter.getNamespaceURI(this.items[a])===t)return a;return-1}clearBackTo(n,t){const a=this._indexOfTagNames(n,t);this.shortenToLength(a+1)}clearBackToTableContext(){this.clearBackTo(aa,E.HTML)}clearBackToTableBodyContext(){this.clearBackTo(sa,E.HTML)}clearBackToTableRowContext(){this.clearBackTo(ta,E.HTML)}remove(n){const t=this._indexOf(n);t>=0&&(t===this.stackTop?this.pop():(this.items.splice(t,1),this.tagIDs.splice(t,1),this.stackTop--,this._updateCurrentElement(),this.handler.onItemPop(n,!1)))}tryPeekProperlyNestedBodyElement(){return this.stackTop>=1&&this.tagIDs[1]===s.BODY?this.items[1]:null}contains(n){return this._indexOf(n)>-1}getCommonAncestor(n){const t=this._indexOf(n)-1;return t>=0?this.items[t]:null}isRootHtmlElementCurrent(){return this.stackTop===0&&this.tagIDs[0]===s.HTML}hasInDynamicScope(n,t){for(let a=this.stackTop;a>=0;a--){const i=this.tagIDs[a];switch(this.treeAdapter.getNamespaceURI(this.items[a])){case E.HTML:{if(i===n)return!0;if(t.has(i))return!1;break}case E.SVG:{if(Ke.has(i))return!1;break}case E.MATHML:{if(je.has(i))return!1;break}}}return!0}hasInScope(n){return this.hasInDynamicScope(n,ce)}hasInListItemScope(n){return this.hasInDynamicScope(n,ea)}hasInButtonScope(n){return this.hasInDynamicScope(n,na)}hasNumberedHeaderInScope(){for(let n=this.stackTop;n>=0;n--){const t=this.tagIDs[n];switch(this.treeAdapter.getNamespaceURI(this.items[n])){case E.HTML:{if(Se.has(t))return!0;if(ce.has(t))return!1;break}case E.SVG:{if(Ke.has(t))return!1;break}case E.MATHML:{if(je.has(t))return!1;break}}}return!0}hasInTableScope(n){for(let t=this.stackTop;t>=0;t--)if(this.treeAdapter.getNamespaceURI(this.items[t])===E.HTML)switch(this.tagIDs[t]){case n:return!0;case s.TABLE:case s.HTML:return!1}return!0}hasTableBodyContextInTableScope(){for(let n=this.stackTop;n>=0;n--)if(this.treeAdapter.getNamespaceURI(this.items[n])===E.HTML)switch(this.tagIDs[n]){case s.TBODY:case s.THEAD:case s.TFOOT:return!0;case s.TABLE:case s.HTML:return!1}return!0}hasInSelectScope(n){for(let t=this.stackTop;t>=0;t--)if(this.treeAdapter.getNamespaceURI(this.items[t])===E.HTML)switch(this.tagIDs[t]){case n:return!0;case s.OPTION:case s.OPTGROUP:break;default:return!1}return!0}generateImpliedEndTags(){for(;this.currentTagId!==void 0&&bn.has(this.currentTagId);)this.pop()}generateImpliedEndTagsThoroughly(){for(;this.currentTagId!==void 0&&We.has(this.currentTagId);)this.pop()}generateImpliedEndTagsWithExclusion(n){for(;this.currentTagId!==void 0&&this.currentTagId!==n&&We.has(this.currentTagId);)this.pop()}}const _e=3;var x;(function(e){e[e.Marker=0]="Marker",e[e.Element=1]="Element"})(x||(x={}));const Xe={type:x.Marker};class ra{constructor(n){this.treeAdapter=n,this.entries=[],this.bookmark=null}_getNoahArkConditionCandidates(n,t){const a=[],i=t.length,c=this.treeAdapter.getTagName(n),d=this.treeAdapter.getNamespaceURI(n);for(let _=0;_<this.entries.length;_++){const f=this.entries[_];if(f.type===x.Marker)break;const{element:T}=f;if(this.treeAdapter.getTagName(T)===c&&this.treeAdapter.getNamespaceURI(T)===d){const y=this.treeAdapter.getAttrList(T);y.length===i&&a.push({idx:_,attrs:y})}}return a}_ensureNoahArkCondition(n){if(this.entries.length<_e)return;const t=this.treeAdapter.getAttrList(n),a=this._getNoahArkConditionCandidates(n,t);if(a.length<_e)return;const i=new Map(t.map(d=>[d.name,d.value]));let c=0;for(let d=0;d<a.length;d++){const _=a[d];_.attrs.every(f=>i.get(f.name)===f.value)&&(c+=1,c>=_e&&this.entries.splice(_.idx,1))}}insertMarker(){this.entries.unshift(Xe)}pushElement(n,t){this._ensureNoahArkCondition(n),this.entries.unshift({type:x.Element,element:n,token:t})}insertElementAfterBookmark(n,t){const a=this.entries.indexOf(this.bookmark);this.entries.splice(a,0,{type:x.Element,element:n,token:t})}removeEntry(n){const t=this.entries.indexOf(n);t!==-1&&this.entries.splice(t,1)}clearToLastMarker(){const n=this.entries.indexOf(Xe);n===-1?this.entries.length=0:this.entries.splice(0,n+1)}getElementEntryInScopeWithTagName(n){const t=this.entries.find(a=>a.type===x.Marker||this.treeAdapter.getTagName(a.element)===n);return t&&t.type===x.Element?t:null}getElementEntry(n){return this.entries.find(t=>t.type===x.Element&&t.element===n)}}const k={createDocument(){return{nodeName:"#document",mode:L.NO_QUIRKS,childNodes:[]}},createDocumentFragment(){return{nodeName:"#document-fragment",childNodes:[]}},createElement(e,n,t){return{nodeName:e,tagName:e,attrs:t,namespaceURI:n,childNodes:[],parentNode:null}},createCommentNode(e){return{nodeName:"#comment",data:e,parentNode:null}},createTextNode(e){return{nodeName:"#text",value:e,parentNode:null}},appendChild(e,n){e.childNodes.push(n),n.parentNode=e},insertBefore(e,n,t){const a=e.childNodes.indexOf(t);e.childNodes.splice(a,0,n),n.parentNode=e},setTemplateContent(e,n){e.content=n},getTemplateContent(e){return e.content},setDocumentType(e,n,t,a){const i=e.childNodes.find(c=>c.nodeName==="#documentType");if(i)i.name=n,i.publicId=t,i.systemId=a;else{const c={nodeName:"#documentType",name:n,publicId:t,systemId:a,parentNode:null};k.appendChild(e,c)}},setDocumentMode(e,n){e.mode=n},getDocumentMode(e){return e.mode},detachNode(e){if(e.parentNode){const n=e.parentNode.childNodes.indexOf(e);e.parentNode.childNodes.splice(n,1),e.parentNode=null}},insertText(e,n){if(e.childNodes.length>0){const t=e.childNodes[e.childNodes.length-1];if(k.isTextNode(t)){t.value+=n;return}}k.appendChild(e,k.createTextNode(n))},insertTextBefore(e,n,t){const a=e.childNodes[e.childNodes.indexOf(t)-1];a&&k.isTextNode(a)?a.value+=n:k.insertBefore(e,k.createTextNode(n),t)},adoptAttributes(e,n){const t=new Set(e.attrs.map(a=>a.name));for(let a=0;a<n.length;a++)t.has(n[a].name)||e.attrs.push(n[a])},getFirstChild(e){return e.childNodes[0]},getChildNodes(e){return e.childNodes},getParentNode(e){return e.parentNode},getAttrList(e){return e.attrs},getTagName(e){return e.tagName},getNamespaceURI(e){return e.namespaceURI},getTextNodeContent(e){return e.value},getCommentNodeContent(e){return e.data},getDocumentTypeNodeName(e){return e.name},getDocumentTypeNodePublicId(e){return e.publicId},getDocumentTypeNodeSystemId(e){return e.systemId},isTextNode(e){return e.nodeName==="#text"},isCommentNode(e){return e.nodeName==="#comment"},isDocumentTypeNode(e){return e.nodeName==="#documentType"},isElementNode(e){return Object.prototype.hasOwnProperty.call(e,"tagName")},setNodeSourceCodeLocation(e,n){e.sourceCodeLocation=n},getNodeSourceCodeLocation(e){return e.sourceCodeLocation},updateNodeSourceCodeLocation(e,n){e.sourceCodeLocation={...e.sourceCodeLocation,...n}}},An="html",oa="about:legacy-compat",ca="http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",Nn=["+//silmaril//dtd html pro v0r11 19970101//","-//as//dtd html 3.0 aswedit + extensions//","-//advasoft ltd//dtd html 3.0 aswedit + extensions//","-//ietf//dtd html 2.0 level 1//","-//ietf//dtd html 2.0 level 2//","-//ietf//dtd html 2.0 strict level 1//","-//ietf//dtd html 2.0 strict level 2//","-//ietf//dtd html 2.0 strict//","-//ietf//dtd html 2.0//","-//ietf//dtd html 2.1e//","-//ietf//dtd html 3.0//","-//ietf//dtd html 3.2 final//","-//ietf//dtd html 3.2//","-//ietf//dtd html 3//","-//ietf//dtd html level 0//","-//ietf//dtd html level 1//","-//ietf//dtd html level 2//","-//ietf//dtd html level 3//","-//ietf//dtd html strict level 0//","-//ietf//dtd html strict level 1//","-//ietf//dtd html strict level 2//","-//ietf//dtd html strict level 3//","-//ietf//dtd html strict//","-//ietf//dtd html//","-//metrius//dtd metrius presentational//","-//microsoft//dtd internet explorer 2.0 html strict//","-//microsoft//dtd internet explorer 2.0 html//","-//microsoft//dtd internet explorer 2.0 tables//","-//microsoft//dtd internet explorer 3.0 html strict//","-//microsoft//dtd internet explorer 3.0 html//","-//microsoft//dtd internet explorer 3.0 tables//","-//netscape comm. corp.//dtd html//","-//netscape comm. corp.//dtd strict html//","-//o'reilly and associates//dtd html 2.0//","-//o'reilly and associates//dtd html extended 1.0//","-//o'reilly and associates//dtd html extended relaxed 1.0//","-//sq//dtd html 2.0 hotmetal + extensions//","-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//","-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//","-//spyglass//dtd html 2.0 extended//","-//sun microsystems corp.//dtd hotjava html//","-//sun microsystems corp.//dtd hotjava strict html//","-//w3c//dtd html 3 1995-03-24//","-//w3c//dtd html 3.2 draft//","-//w3c//dtd html 3.2 final//","-//w3c//dtd html 3.2//","-//w3c//dtd html 3.2s draft//","-//w3c//dtd html 4.0 frameset//","-//w3c//dtd html 4.0 transitional//","-//w3c//dtd html experimental 19960712//","-//w3c//dtd html experimental 970421//","-//w3c//dtd w3 html//","-//w3o//dtd w3 html 3.0//","-//webtechs//dtd mozilla html 2.0//","-//webtechs//dtd mozilla html//"],la=[...Nn,"-//w3c//dtd html 4.01 frameset//","-//w3c//dtd html 4.01 transitional//"],da=new Set(["-//w3o//dtd w3 html strict 3.0//en//","-/w3c/dtd html 4.0 transitional/en","html"]),Sn=["-//w3c//dtd xhtml 1.0 frameset//","-//w3c//dtd xhtml 1.0 transitional//"],ha=[...Sn,"-//w3c//dtd html 4.01 frameset//","-//w3c//dtd html 4.01 transitional//"];function Ve(e,n){return n.some(t=>e.startsWith(t))}function ma(e){return e.name===An&&e.publicId===null&&(e.systemId===null||e.systemId===oa)}function fa(e){if(e.name!==An)return L.QUIRKS;const{systemId:n}=e;if(n&&n.toLowerCase()===ca)return L.QUIRKS;let{publicId:t}=e;if(t!==null){if(t=t.toLowerCase(),da.has(t))return L.QUIRKS;let a=n===null?la:Nn;if(Ve(t,a))return L.QUIRKS;if(a=n===null?Sn:ha,Ve(t,a))return L.LIMITED_QUIRKS}return L.NO_QUIRKS}const ze={TEXT_HTML:"text/html",APPLICATION_XML:"application/xhtml+xml"},Ea="definitionurl",pa="definitionURL",_a=new Map(["attributeName","attributeType","baseFrequency","baseProfile","calcMode","clipPathUnits","diffuseConstant","edgeMode","filterUnits","glyphRef","gradientTransform","gradientUnits","kernelMatrix","kernelUnitLength","keyPoints","keySplines","keyTimes","lengthAdjust","limitingConeAngle","markerHeight","markerUnits","markerWidth","maskContentUnits","maskUnits","numOctaves","pathLength","patternContentUnits","patternTransform","patternUnits","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","refX","refY","repeatCount","repeatDur","requiredExtensions","requiredFeatures","specularConstant","specularExponent","spreadMethod","startOffset","stdDeviation","stitchTiles","surfaceScale","systemLanguage","tableValues","targetX","targetY","textLength","viewBox","viewTarget","xChannelSelector","yChannelSelector","zoomAndPan"].map(e=>[e.toLowerCase(),e])),Ta=new Map([["xlink:actuate",{prefix:"xlink",name:"actuate",namespace:E.XLINK}],["xlink:arcrole",{prefix:"xlink",name:"arcrole",namespace:E.XLINK}],["xlink:href",{prefix:"xlink",name:"href",namespace:E.XLINK}],["xlink:role",{prefix:"xlink",name:"role",namespace:E.XLINK}],["xlink:show",{prefix:"xlink",name:"show",namespace:E.XLINK}],["xlink:title",{prefix:"xlink",name:"title",namespace:E.XLINK}],["xlink:type",{prefix:"xlink",name:"type",namespace:E.XLINK}],["xml:lang",{prefix:"xml",name:"lang",namespace:E.XML}],["xml:space",{prefix:"xml",name:"space",namespace:E.XML}],["xmlns",{prefix:"",name:"xmlns",namespace:E.XMLNS}],["xmlns:xlink",{prefix:"xmlns",name:"xlink",namespace:E.XMLNS}]]),ga=new Map(["altGlyph","altGlyphDef","altGlyphItem","animateColor","animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","glyphRef","linearGradient","radialGradient","textPath"].map(e=>[e.toLowerCase(),e])),ba=new Set([s.B,s.BIG,s.BLOCKQUOTE,s.BODY,s.BR,s.CENTER,s.CODE,s.DD,s.DIV,s.DL,s.DT,s.EM,s.EMBED,s.H1,s.H2,s.H3,s.H4,s.H5,s.H6,s.HEAD,s.HR,s.I,s.IMG,s.LI,s.LISTING,s.MENU,s.META,s.NOBR,s.OL,s.P,s.PRE,s.RUBY,s.S,s.SMALL,s.SPAN,s.STRONG,s.STRIKE,s.SUB,s.SUP,s.TABLE,s.TT,s.U,s.UL,s.VAR]);function Aa(e){const n=e.tagID;return n===s.FONT&&e.attrs.some(({name:a})=>a===H.COLOR||a===H.SIZE||a===H.FACE)||ba.has(n)}function Cn(e){for(let n=0;n<e.attrs.length;n++)if(e.attrs[n].name===Ea){e.attrs[n].name=pa;break}}function In(e){for(let n=0;n<e.attrs.length;n++){const t=_a.get(e.attrs[n].name);t!=null&&(e.attrs[n].name=t)}}function De(e){for(let n=0;n<e.attrs.length;n++){const t=Ta.get(e.attrs[n].name);t&&(e.attrs[n].prefix=t.prefix,e.attrs[n].name=t.name,e.attrs[n].namespace=t.namespace)}}function Na(e){const n=ga.get(e.tagName);n!=null&&(e.tagName=n,e.tagID=W(e.tagName))}function Sa(e,n){return n===E.MATHML&&(e===s.MI||e===s.MO||e===s.MN||e===s.MS||e===s.MTEXT)}function Ca(e,n,t){if(n===E.MATHML&&e===s.ANNOTATION_XML){for(let a=0;a<t.length;a++)if(t[a].name===H.ENCODING){const i=t[a].value.toLowerCase();return i===ze.TEXT_HTML||i===ze.APPLICATION_XML}}return n===E.SVG&&(e===s.FOREIGN_OBJECT||e===s.DESC||e===s.TITLE)}function Ia(e,n,t,a){return(!a||a===E.HTML)&&Ca(e,n,t)||(!a||a===E.MATHML)&&Sa(e,n)}const ya="hidden",Ra=8,Oa=3;var o;(function(e){e[e.INITIAL=0]="INITIAL",e[e.BEFORE_HTML=1]="BEFORE_HTML",e[e.BEFORE_HEAD=2]="BEFORE_HEAD",e[e.IN_HEAD=3]="IN_HEAD",e[e.IN_HEAD_NO_SCRIPT=4]="IN_HEAD_NO_SCRIPT",e[e.AFTER_HEAD=5]="AFTER_HEAD",e[e.IN_BODY=6]="IN_BODY",e[e.TEXT=7]="TEXT",e[e.IN_TABLE=8]="IN_TABLE",e[e.IN_TABLE_TEXT=9]="IN_TABLE_TEXT",e[e.IN_CAPTION=10]="IN_CAPTION",e[e.IN_COLUMN_GROUP=11]="IN_COLUMN_GROUP",e[e.IN_TABLE_BODY=12]="IN_TABLE_BODY",e[e.IN_ROW=13]="IN_ROW",e[e.IN_CELL=14]="IN_CELL",e[e.IN_SELECT=15]="IN_SELECT",e[e.IN_SELECT_IN_TABLE=16]="IN_SELECT_IN_TABLE",e[e.IN_TEMPLATE=17]="IN_TEMPLATE",e[e.AFTER_BODY=18]="AFTER_BODY",e[e.IN_FRAMESET=19]="IN_FRAMESET",e[e.AFTER_FRAMESET=20]="AFTER_FRAMESET",e[e.AFTER_AFTER_BODY=21]="AFTER_AFTER_BODY",e[e.AFTER_AFTER_FRAMESET=22]="AFTER_AFTER_FRAMESET"})(o||(o={}));const La={startLine:-1,startCol:-1,startOffset:-1,endLine:-1,endCol:-1,endOffset:-1},yn=new Set([s.TABLE,s.TBODY,s.TFOOT,s.THEAD,s.TR]),$e={scriptingEnabled:!0,sourceCodeLocationInfo:!1,treeAdapter:k,onParseError:null};class Je{constructor(n,t,a=null,i=null){this.fragmentContext=a,this.scriptHandler=i,this.currentToken=null,this.stopped=!1,this.insertionMode=o.INITIAL,this.originalInsertionMode=o.INITIAL,this.headElement=null,this.formElement=null,this.currentNotInHTML=!1,this.tmplInsertionModeStack=[],this.pendingCharacterTokens=[],this.hasNonWhitespacePendingCharacterToken=!1,this.framesetOk=!0,this.skipNextNewLine=!1,this.fosterParentingEnabled=!1,this.options={...$e,...n},this.treeAdapter=this.options.treeAdapter,this.onParseError=this.options.onParseError,this.onParseError&&(this.options.sourceCodeLocationInfo=!0),this.document=t??this.treeAdapter.createDocument(),this.tokenizer=new Zs(this.options,this),this.activeFormattingElements=new ra(this.treeAdapter),this.fragmentContextID=a?W(this.treeAdapter.getTagName(a)):s.UNKNOWN,this._setContextModes(a??this.document,this.fragmentContextID),this.openElements=new ia(this.document,this.treeAdapter,this)}static parse(n,t){const a=new this(t);return a.tokenizer.write(n,!0),a.document}static getFragmentParser(n,t){const a={...$e,...t};n??(n=a.treeAdapter.createElement(l.TEMPLATE,E.HTML,[]));const i=a.treeAdapter.createElement("documentmock",E.HTML,[]),c=new this(a,i,n);return c.fragmentContextID===s.TEMPLATE&&c.tmplInsertionModeStack.unshift(o.IN_TEMPLATE),c._initTokenizerForFragmentParsing(),c._insertFakeRootElement(),c._resetInsertionMode(),c._findFormInFragmentContext(),c}getFragment(){const n=this.treeAdapter.getFirstChild(this.document),t=this.treeAdapter.createDocumentFragment();return this._adoptNodes(n,t),t}_err(n,t,a){var i;if(!this.onParseError)return;const c=(i=n.location)!==null&&i!==void 0?i:La,d={code:t,startLine:c.startLine,startCol:c.startCol,startOffset:c.startOffset,endLine:a?c.startLine:c.endLine,endCol:a?c.startCol:c.endCol,endOffset:a?c.startOffset:c.endOffset};this.onParseError(d)}onItemPush(n,t,a){var i,c;(c=(i=this.treeAdapter).onItemPush)===null||c===void 0||c.call(i,n),a&&this.openElements.stackTop>0&&this._setContextModes(n,t)}onItemPop(n,t){var a,i;if(this.options.sourceCodeLocationInfo&&this._setEndLocation(n,this.currentToken),(i=(a=this.treeAdapter).onItemPop)===null||i===void 0||i.call(a,n,this.openElements.current),t){let c,d;this.openElements.stackTop===0&&this.fragmentContext?(c=this.fragmentContext,d=this.fragmentContextID):{current:c,currentTagId:d}=this.openElements,this._setContextModes(c,d)}}_setContextModes(n,t){const a=n===this.document||n&&this.treeAdapter.getNamespaceURI(n)===E.HTML;this.currentNotInHTML=!a,this.tokenizer.inForeignNode=!a&&n!==void 0&&t!==void 0&&!this._isIntegrationPoint(t,n)}_switchToTextParsing(n,t){this._insertElement(n,E.HTML),this.tokenizer.state=t,this.originalInsertionMode=this.insertionMode,this.insertionMode=o.TEXT}switchToPlaintextParsing(){this.insertionMode=o.TEXT,this.originalInsertionMode=o.IN_BODY,this.tokenizer.state=S.PLAINTEXT}_getAdjustedCurrentElement(){return this.openElements.stackTop===0&&this.fragmentContext?this.fragmentContext:this.openElements.current}_findFormInFragmentContext(){let n=this.fragmentContext;for(;n;){if(this.treeAdapter.getTagName(n)===l.FORM){this.formElement=n;break}n=this.treeAdapter.getParentNode(n)}}_initTokenizerForFragmentParsing(){if(!(!this.fragmentContext||this.treeAdapter.getNamespaceURI(this.fragmentContext)!==E.HTML))switch(this.fragmentContextID){case s.TITLE:case s.TEXTAREA:{this.tokenizer.state=S.RCDATA;break}case s.STYLE:case s.XMP:case s.IFRAME:case s.NOEMBED:case s.NOFRAMES:case s.NOSCRIPT:{this.tokenizer.state=S.RAWTEXT;break}case s.SCRIPT:{this.tokenizer.state=S.SCRIPT_DATA;break}case s.PLAINTEXT:{this.tokenizer.state=S.PLAINTEXT;break}}}_setDocumentType(n){const t=n.name||"",a=n.publicId||"",i=n.systemId||"";if(this.treeAdapter.setDocumentType(this.document,t,a,i),n.location){const d=this.treeAdapter.getChildNodes(this.document).find(_=>this.treeAdapter.isDocumentTypeNode(_));d&&this.treeAdapter.setNodeSourceCodeLocation(d,n.location)}}_attachElementToTree(n,t){if(this.options.sourceCodeLocationInfo){const a=t&&{...t,startTag:t};this.treeAdapter.setNodeSourceCodeLocation(n,a)}if(this._shouldFosterParentOnInsertion())this._fosterParentElement(n);else{const a=this.openElements.currentTmplContentOrNode;this.treeAdapter.appendChild(a??this.document,n)}}_appendElement(n,t){const a=this.treeAdapter.createElement(n.tagName,t,n.attrs);this._attachElementToTree(a,n.location)}_insertElement(n,t){const a=this.treeAdapter.createElement(n.tagName,t,n.attrs);this._attachElementToTree(a,n.location),this.openElements.push(a,n.tagID)}_insertFakeElement(n,t){const a=this.treeAdapter.createElement(n,E.HTML,[]);this._attachElementToTree(a,null),this.openElements.push(a,t)}_insertTemplate(n){const t=this.treeAdapter.createElement(n.tagName,E.HTML,n.attrs),a=this.treeAdapter.createDocumentFragment();this.treeAdapter.setTemplateContent(t,a),this._attachElementToTree(t,n.location),this.openElements.push(t,n.tagID),this.options.sourceCodeLocationInfo&&this.treeAdapter.setNodeSourceCodeLocation(a,null)}_insertFakeRootElement(){const n=this.treeAdapter.createElement(l.HTML,E.HTML,[]);this.options.sourceCodeLocationInfo&&this.treeAdapter.setNodeSourceCodeLocation(n,null),this.treeAdapter.appendChild(this.openElements.current,n),this.openElements.push(n,s.HTML)}_appendCommentNode(n,t){const a=this.treeAdapter.createCommentNode(n.data);this.treeAdapter.appendChild(t,a),this.options.sourceCodeLocationInfo&&this.treeAdapter.setNodeSourceCodeLocation(a,n.location)}_insertCharacters(n){let t,a;if(this._shouldFosterParentOnInsertion()?({parent:t,beforeElement:a}=this._findFosterParentingLocation(),a?this.treeAdapter.insertTextBefore(t,n.chars,a):this.treeAdapter.insertText(t,n.chars)):(t=this.openElements.currentTmplContentOrNode,this.treeAdapter.insertText(t,n.chars)),!n.location)return;const i=this.treeAdapter.getChildNodes(t),c=a?i.lastIndexOf(a):i.length,d=i[c-1];if(this.treeAdapter.getNodeSourceCodeLocation(d)){const{endLine:f,endCol:T,endOffset:y}=n.location;this.treeAdapter.updateNodeSourceCodeLocation(d,{endLine:f,endCol:T,endOffset:y})}else this.options.sourceCodeLocationInfo&&this.treeAdapter.setNodeSourceCodeLocation(d,n.location)}_adoptNodes(n,t){for(let a=this.treeAdapter.getFirstChild(n);a;a=this.treeAdapter.getFirstChild(n))this.treeAdapter.detachNode(a),this.treeAdapter.appendChild(t,a)}_setEndLocation(n,t){if(this.treeAdapter.getNodeSourceCodeLocation(n)&&t.location){const a=t.location,i=this.treeAdapter.getTagName(n),c=t.type===g.END_TAG&&i===t.tagName?{endTag:{...a},endLine:a.endLine,endCol:a.endCol,endOffset:a.endOffset}:{endLine:a.startLine,endCol:a.startCol,endOffset:a.startOffset};this.treeAdapter.updateNodeSourceCodeLocation(n,c)}}shouldProcessStartTagTokenInForeignContent(n){if(!this.currentNotInHTML)return!1;let t,a;return this.openElements.stackTop===0&&this.fragmentContext?(t=this.fragmentContext,a=this.fragmentContextID):{current:t,currentTagId:a}=this.openElements,n.tagID===s.SVG&&this.treeAdapter.getTagName(t)===l.ANNOTATION_XML&&this.treeAdapter.getNamespaceURI(t)===E.MATHML?!1:this.tokenizer.inForeignNode||(n.tagID===s.MGLYPH||n.tagID===s.MALIGNMARK)&&a!==void 0&&!this._isIntegrationPoint(a,t,E.HTML)}_processToken(n){switch(n.type){case g.CHARACTER:{this.onCharacter(n);break}case g.NULL_CHARACTER:{this.onNullCharacter(n);break}case g.COMMENT:{this.onComment(n);break}case g.DOCTYPE:{this.onDoctype(n);break}case g.START_TAG:{this._processStartTag(n);break}case g.END_TAG:{this.onEndTag(n);break}case g.EOF:{this.onEof(n);break}case g.WHITESPACE_CHARACTER:{this.onWhitespaceCharacter(n);break}}}_isIntegrationPoint(n,t,a){const i=this.treeAdapter.getNamespaceURI(t),c=this.treeAdapter.getAttrList(t);return Ia(n,i,c,a)}_reconstructActiveFormattingElements(){const n=this.activeFormattingElements.entries.length;if(n){const t=this.activeFormattingElements.entries.findIndex(i=>i.type===x.Marker||this.openElements.contains(i.element)),a=t===-1?n-1:t-1;for(let i=a;i>=0;i--){const c=this.activeFormattingElements.entries[i];this._insertElement(c.token,this.treeAdapter.getNamespaceURI(c.element)),c.element=this.openElements.current}}}_closeTableCell(){this.openElements.generateImpliedEndTags(),this.openElements.popUntilTableCellPopped(),this.activeFormattingElements.clearToLastMarker(),this.insertionMode=o.IN_ROW}_closePElement(){this.openElements.generateImpliedEndTagsWithExclusion(s.P),this.openElements.popUntilTagNamePopped(s.P)}_resetInsertionMode(){for(let n=this.openElements.stackTop;n>=0;n--)switch(n===0&&this.fragmentContext?this.fragmentContextID:this.openElements.tagIDs[n]){case s.TR:{this.insertionMode=o.IN_ROW;return}case s.TBODY:case s.THEAD:case s.TFOOT:{this.insertionMode=o.IN_TABLE_BODY;return}case s.CAPTION:{this.insertionMode=o.IN_CAPTION;return}case s.COLGROUP:{this.insertionMode=o.IN_COLUMN_GROUP;return}case s.TABLE:{this.insertionMode=o.IN_TABLE;return}case s.BODY:{this.insertionMode=o.IN_BODY;return}case s.FRAMESET:{this.insertionMode=o.IN_FRAMESET;return}case s.SELECT:{this._resetInsertionModeForSelect(n);return}case s.TEMPLATE:{this.insertionMode=this.tmplInsertionModeStack[0];return}case s.HTML:{this.insertionMode=this.headElement?o.AFTER_HEAD:o.BEFORE_HEAD;return}case s.TD:case s.TH:{if(n>0){this.insertionMode=o.IN_CELL;return}break}case s.HEAD:{if(n>0){this.insertionMode=o.IN_HEAD;return}break}}this.insertionMode=o.IN_BODY}_resetInsertionModeForSelect(n){if(n>0)for(let t=n-1;t>0;t--){const a=this.openElements.tagIDs[t];if(a===s.TEMPLATE)break;if(a===s.TABLE){this.insertionMode=o.IN_SELECT_IN_TABLE;return}}this.insertionMode=o.IN_SELECT}_isElementCausesFosterParenting(n){return yn.has(n)}_shouldFosterParentOnInsertion(){return this.fosterParentingEnabled&&this.openElements.currentTagId!==void 0&&this._isElementCausesFosterParenting(this.openElements.currentTagId)}_findFosterParentingLocation(){for(let n=this.openElements.stackTop;n>=0;n--){const t=this.openElements.items[n];switch(this.openElements.tagIDs[n]){case s.TEMPLATE:{if(this.treeAdapter.getNamespaceURI(t)===E.HTML)return{parent:this.treeAdapter.getTemplateContent(t),beforeElement:null};break}case s.TABLE:{const a=this.treeAdapter.getParentNode(t);return a?{parent:a,beforeElement:t}:{parent:this.openElements.items[n-1],beforeElement:null}}}}return{parent:this.openElements.items[0],beforeElement:null}}_fosterParentElement(n){const t=this._findFosterParentingLocation();t.beforeElement?this.treeAdapter.insertBefore(t.parent,n,t.beforeElement):this.treeAdapter.appendChild(t.parent,n)}_isSpecialElement(n,t){const a=this.treeAdapter.getNamespaceURI(n);return Vs[a].has(t)}onCharacter(n){if(this.skipNextNewLine=!1,this.tokenizer.inForeignNode){ui(this,n);return}switch(this.insertionMode){case o.INITIAL:{K(this,n);break}case o.BEFORE_HTML:{z(this,n);break}case o.BEFORE_HEAD:{$(this,n);break}case o.IN_HEAD:{J(this,n);break}case o.IN_HEAD_NO_SCRIPT:{Z(this,n);break}case o.AFTER_HEAD:{ee(this,n);break}case o.IN_BODY:case o.IN_CAPTION:case o.IN_CELL:case o.IN_TEMPLATE:{On(this,n);break}case o.TEXT:case o.IN_SELECT:case o.IN_SELECT_IN_TABLE:{this._insertCharacters(n);break}case o.IN_TABLE:case o.IN_TABLE_BODY:case o.IN_ROW:{Te(this,n);break}case o.IN_TABLE_TEXT:{wn(this,n);break}case o.IN_COLUMN_GROUP:{le(this,n);break}case o.AFTER_BODY:{de(this,n);break}case o.AFTER_AFTER_BODY:{re(this,n);break}}}onNullCharacter(n){if(this.skipNextNewLine=!1,this.tokenizer.inForeignNode){ai(this,n);return}switch(this.insertionMode){case o.INITIAL:{K(this,n);break}case o.BEFORE_HTML:{z(this,n);break}case o.BEFORE_HEAD:{$(this,n);break}case o.IN_HEAD:{J(this,n);break}case o.IN_HEAD_NO_SCRIPT:{Z(this,n);break}case o.AFTER_HEAD:{ee(this,n);break}case o.TEXT:{this._insertCharacters(n);break}case o.IN_TABLE:case o.IN_TABLE_BODY:case o.IN_ROW:{Te(this,n);break}case o.IN_COLUMN_GROUP:{le(this,n);break}case o.AFTER_BODY:{de(this,n);break}case o.AFTER_AFTER_BODY:{re(this,n);break}}}onComment(n){if(this.skipNextNewLine=!1,this.currentNotInHTML){Ce(this,n);return}switch(this.insertionMode){case o.INITIAL:case o.BEFORE_HTML:case o.BEFORE_HEAD:case o.IN_HEAD:case o.IN_HEAD_NO_SCRIPT:case o.AFTER_HEAD:case o.IN_BODY:case o.IN_TABLE:case o.IN_CAPTION:case o.IN_COLUMN_GROUP:case o.IN_TABLE_BODY:case o.IN_ROW:case o.IN_CELL:case o.IN_SELECT:case o.IN_SELECT_IN_TABLE:case o.IN_TEMPLATE:case o.IN_FRAMESET:case o.AFTER_FRAMESET:{Ce(this,n);break}case o.IN_TABLE_TEXT:{X(this,n);break}case o.AFTER_BODY:{Ba(this,n);break}case o.AFTER_AFTER_BODY:case o.AFTER_AFTER_FRAMESET:{Fa(this,n);break}}}onDoctype(n){switch(this.skipNextNewLine=!1,this.insertionMode){case o.INITIAL:{Ua(this,n);break}case o.BEFORE_HEAD:case o.IN_HEAD:case o.IN_HEAD_NO_SCRIPT:case o.AFTER_HEAD:{this._err(n,h.misplacedDoctype);break}case o.IN_TABLE_TEXT:{X(this,n);break}}}onStartTag(n){this.skipNextNewLine=!1,this.currentToken=n,this._processStartTag(n),n.selfClosing&&!n.ackSelfClosing&&this._err(n,h.nonVoidHtmlElementStartTagWithTrailingSolidus)}_processStartTag(n){this.shouldProcessStartTagTokenInForeignContent(n)?ii(this,n):this._startTagOutsideForeignContent(n)}_startTagOutsideForeignContent(n){switch(this.insertionMode){case o.INITIAL:{K(this,n);break}case o.BEFORE_HTML:{Ha(this,n);break}case o.BEFORE_HEAD:{Ya(this,n);break}case o.IN_HEAD:{P(this,n);break}case o.IN_HEAD_NO_SCRIPT:{Qa(this,n);break}case o.AFTER_HEAD:{ja(this,n);break}case o.IN_BODY:{R(this,n);break}case o.IN_TABLE:{G(this,n);break}case o.IN_TABLE_TEXT:{X(this,n);break}case o.IN_CAPTION:{qu(this,n);break}case o.IN_COLUMN_GROUP:{Me(this,n);break}case o.IN_TABLE_BODY:{Ee(this,n);break}case o.IN_ROW:{pe(this,n);break}case o.IN_CELL:{Wu(this,n);break}case o.IN_SELECT:{Fn(this,n);break}case o.IN_SELECT_IN_TABLE:{Ku(this,n);break}case o.IN_TEMPLATE:{Vu(this,n);break}case o.AFTER_BODY:{$u(this,n);break}case o.IN_FRAMESET:{Ju(this,n);break}case o.AFTER_FRAMESET:{ei(this,n);break}case o.AFTER_AFTER_BODY:{ti(this,n);break}case o.AFTER_AFTER_FRAMESET:{si(this,n);break}}}onEndTag(n){this.skipNextNewLine=!1,this.currentToken=n,this.currentNotInHTML?ri(this,n):this._endTagOutsideForeignContent(n)}_endTagOutsideForeignContent(n){switch(this.insertionMode){case o.INITIAL:{K(this,n);break}case o.BEFORE_HTML:{va(this,n);break}case o.BEFORE_HEAD:{qa(this,n);break}case o.IN_HEAD:{Ga(this,n);break}case o.IN_HEAD_NO_SCRIPT:{Wa(this,n);break}case o.AFTER_HEAD:{Ka(this,n);break}case o.IN_BODY:{fe(this,n);break}case o.TEXT:{xu(this,n);break}case o.IN_TABLE:{ne(this,n);break}case o.IN_TABLE_TEXT:{X(this,n);break}case o.IN_CAPTION:{Gu(this,n);break}case o.IN_COLUMN_GROUP:{Qu(this,n);break}case o.IN_TABLE_BODY:{Ie(this,n);break}case o.IN_ROW:{Bn(this,n);break}case o.IN_CELL:{ju(this,n);break}case o.IN_SELECT:{Un(this,n);break}case o.IN_SELECT_IN_TABLE:{Xu(this,n);break}case o.IN_TEMPLATE:{zu(this,n);break}case o.AFTER_BODY:{vn(this,n);break}case o.IN_FRAMESET:{Zu(this,n);break}case o.AFTER_FRAMESET:{ni(this,n);break}case o.AFTER_AFTER_BODY:{re(this,n);break}}}onEof(n){switch(this.insertionMode){case o.INITIAL:{K(this,n);break}case o.BEFORE_HTML:{z(this,n);break}case o.BEFORE_HEAD:{$(this,n);break}case o.IN_HEAD:{J(this,n);break}case o.IN_HEAD_NO_SCRIPT:{Z(this,n);break}case o.AFTER_HEAD:{ee(this,n);break}case o.IN_BODY:case o.IN_TABLE:case o.IN_CAPTION:case o.IN_COLUMN_GROUP:case o.IN_TABLE_BODY:case o.IN_ROW:case o.IN_CELL:case o.IN_SELECT:case o.IN_SELECT_IN_TABLE:{xn(this,n);break}case o.TEXT:{Mu(this,n);break}case o.IN_TABLE_TEXT:{X(this,n);break}case o.IN_TEMPLATE:{Hn(this,n);break}case o.AFTER_BODY:case o.IN_FRAMESET:case o.AFTER_FRAMESET:case o.AFTER_AFTER_BODY:case o.AFTER_AFTER_FRAMESET:{xe(this,n);break}}}onWhitespaceCharacter(n){if(this.skipNextNewLine&&(this.skipNextNewLine=!1,n.chars.charCodeAt(0)===u.LINE_FEED)){if(n.chars.length===1)return;n.chars=n.chars.substr(1)}if(this.tokenizer.inForeignNode){this._insertCharacters(n);return}switch(this.insertionMode){case o.IN_HEAD:case o.IN_HEAD_NO_SCRIPT:case o.AFTER_HEAD:case o.TEXT:case o.IN_COLUMN_GROUP:case o.IN_SELECT:case o.IN_SELECT_IN_TABLE:case o.IN_FRAMESET:case o.AFTER_FRAMESET:{this._insertCharacters(n);break}case o.IN_BODY:case o.IN_CAPTION:case o.IN_CELL:case o.IN_TEMPLATE:case o.AFTER_BODY:case o.AFTER_AFTER_BODY:case o.AFTER_AFTER_FRAMESET:{Rn(this,n);break}case o.IN_TABLE:case o.IN_TABLE_BODY:case o.IN_ROW:{Te(this,n);break}case o.IN_TABLE_TEXT:{Mn(this,n);break}}}}function Da(e,n){let t=e.activeFormattingElements.getElementEntryInScopeWithTagName(n.tagName);return t?e.openElements.contains(t.element)?e.openElements.hasInScope(n.tagID)||(t=null):(e.activeFormattingElements.removeEntry(t),t=null):Pn(e,n),t}function Pa(e,n){let t=null,a=e.openElements.stackTop;for(;a>=0;a--){const i=e.openElements.items[a];if(i===n.element)break;e._isSpecialElement(i,e.openElements.tagIDs[a])&&(t=i)}return t||(e.openElements.shortenToLength(Math.max(a,0)),e.activeFormattingElements.removeEntry(n)),t}function xa(e,n,t){let a=n,i=e.openElements.getCommonAncestor(n);for(let c=0,d=i;d!==t;c++,d=i){i=e.openElements.getCommonAncestor(d);const _=e.activeFormattingElements.getElementEntry(d),f=_&&c>=Oa;!_||f?(f&&e.activeFormattingElements.removeEntry(_),e.openElements.remove(d)):(d=Ma(e,_),a===n&&(e.activeFormattingElements.bookmark=_),e.treeAdapter.detachNode(a),e.treeAdapter.appendChild(d,a),a=d)}return a}function Ma(e,n){const t=e.treeAdapter.getNamespaceURI(n.element),a=e.treeAdapter.createElement(n.token.tagName,t,n.token.attrs);return e.openElements.replace(n.element,a),n.element=a,a}function wa(e,n,t){const a=e.treeAdapter.getTagName(n),i=W(a);if(e._isElementCausesFosterParenting(i))e._fosterParentElement(t);else{const c=e.treeAdapter.getNamespaceURI(n);i===s.TEMPLATE&&c===E.HTML&&(n=e.treeAdapter.getTemplateContent(n)),e.treeAdapter.appendChild(n,t)}}function ka(e,n,t){const a=e.treeAdapter.getNamespaceURI(t.element),{token:i}=t,c=e.treeAdapter.createElement(i.tagName,a,i.attrs);e._adoptNodes(n,c),e.treeAdapter.appendChild(n,c),e.activeFormattingElements.insertElementAfterBookmark(c,i),e.activeFormattingElements.removeEntry(t),e.openElements.remove(t.element),e.openElements.insertAfter(n,c,i.tagID)}function Pe(e,n){for(let t=0;t<Ra;t++){const a=Da(e,n);if(!a)break;const i=Pa(e,a);if(!i)break;e.activeFormattingElements.bookmark=a;const c=xa(e,i,a.element),d=e.openElements.getCommonAncestor(a.element);e.treeAdapter.detachNode(c),d&&wa(e,d,c),ka(e,i,a)}}function Ce(e,n){e._appendCommentNode(n,e.openElements.currentTmplContentOrNode)}function Ba(e,n){e._appendCommentNode(n,e.openElements.items[0])}function Fa(e,n){e._appendCommentNode(n,e.document)}function xe(e,n){if(e.stopped=!0,n.location){const t=e.fragmentContext?0:2;for(let a=e.openElements.stackTop;a>=t;a--)e._setEndLocation(e.openElements.items[a],n);if(!e.fragmentContext&&e.openElements.stackTop>=0){const a=e.openElements.items[0],i=e.treeAdapter.getNodeSourceCodeLocation(a);if(i&&!i.endTag&&(e._setEndLocation(a,n),e.openElements.stackTop>=1)){const c=e.openElements.items[1],d=e.treeAdapter.getNodeSourceCodeLocation(c);d&&!d.endTag&&e._setEndLocation(c,n)}}}}function Ua(e,n){e._setDocumentType(n);const t=n.forceQuirks?L.QUIRKS:fa(n);ma(n)||e._err(n,h.nonConformingDoctype),e.treeAdapter.setDocumentMode(e.document,t),e.insertionMode=o.BEFORE_HTML}function K(e,n){e._err(n,h.missingDoctype,!0),e.treeAdapter.setDocumentMode(e.document,L.QUIRKS),e.insertionMode=o.BEFORE_HTML,e._processToken(n)}function Ha(e,n){n.tagID===s.HTML?(e._insertElement(n,E.HTML),e.insertionMode=o.BEFORE_HEAD):z(e,n)}function va(e,n){const t=n.tagID;(t===s.HTML||t===s.HEAD||t===s.BODY||t===s.BR)&&z(e,n)}function z(e,n){e._insertFakeRootElement(),e.insertionMode=o.BEFORE_HEAD,e._processToken(n)}function Ya(e,n){switch(n.tagID){case s.HTML:{R(e,n);break}case s.HEAD:{e._insertElement(n,E.HTML),e.headElement=e.openElements.current,e.insertionMode=o.IN_HEAD;break}default:$(e,n)}}function qa(e,n){const t=n.tagID;t===s.HEAD||t===s.BODY||t===s.HTML||t===s.BR?$(e,n):e._err(n,h.endTagWithoutMatchingOpenElement)}function $(e,n){e._insertFakeElement(l.HEAD,s.HEAD),e.headElement=e.openElements.current,e.insertionMode=o.IN_HEAD,e._processToken(n)}function P(e,n){switch(n.tagID){case s.HTML:{R(e,n);break}case s.BASE:case s.BASEFONT:case s.BGSOUND:case s.LINK:case s.META:{e._appendElement(n,E.HTML),n.ackSelfClosing=!0;break}case s.TITLE:{e._switchToTextParsing(n,S.RCDATA);break}case s.NOSCRIPT:{e.options.scriptingEnabled?e._switchToTextParsing(n,S.RAWTEXT):(e._insertElement(n,E.HTML),e.insertionMode=o.IN_HEAD_NO_SCRIPT);break}case s.NOFRAMES:case s.STYLE:{e._switchToTextParsing(n,S.RAWTEXT);break}case s.SCRIPT:{e._switchToTextParsing(n,S.SCRIPT_DATA);break}case s.TEMPLATE:{e._insertTemplate(n),e.activeFormattingElements.insertMarker(),e.framesetOk=!1,e.insertionMode=o.IN_TEMPLATE,e.tmplInsertionModeStack.unshift(o.IN_TEMPLATE);break}case s.HEAD:{e._err(n,h.misplacedStartTagForHeadElement);break}default:J(e,n)}}function Ga(e,n){switch(n.tagID){case s.HEAD:{e.openElements.pop(),e.insertionMode=o.AFTER_HEAD;break}case s.BODY:case s.BR:case s.HTML:{J(e,n);break}case s.TEMPLATE:{Y(e,n);break}default:e._err(n,h.endTagWithoutMatchingOpenElement)}}function Y(e,n){e.openElements.tmplCount>0?(e.openElements.generateImpliedEndTagsThoroughly(),e.openElements.currentTagId!==s.TEMPLATE&&e._err(n,h.closingOfElementWithOpenChildElements),e.openElements.popUntilTagNamePopped(s.TEMPLATE),e.activeFormattingElements.clearToLastMarker(),e.tmplInsertionModeStack.shift(),e._resetInsertionMode()):e._err(n,h.endTagWithoutMatchingOpenElement)}function J(e,n){e.openElements.pop(),e.insertionMode=o.AFTER_HEAD,e._processToken(n)}function Qa(e,n){switch(n.tagID){case s.HTML:{R(e,n);break}case s.BASEFONT:case s.BGSOUND:case s.HEAD:case s.LINK:case s.META:case s.NOFRAMES:case s.STYLE:{P(e,n);break}case s.NOSCRIPT:{e._err(n,h.nestedNoscriptInHead);break}default:Z(e,n)}}function Wa(e,n){switch(n.tagID){case s.NOSCRIPT:{e.openElements.pop(),e.insertionMode=o.IN_HEAD;break}case s.BR:{Z(e,n);break}default:e._err(n,h.endTagWithoutMatchingOpenElement)}}function Z(e,n){const t=n.type===g.EOF?h.openElementsLeftAfterEof:h.disallowedContentInNoscriptInHead;e._err(n,t),e.openElements.pop(),e.insertionMode=o.IN_HEAD,e._processToken(n)}function ja(e,n){switch(n.tagID){case s.HTML:{R(e,n);break}case s.BODY:{e._insertElement(n,E.HTML),e.framesetOk=!1,e.insertionMode=o.IN_BODY;break}case s.FRAMESET:{e._insertElement(n,E.HTML),e.insertionMode=o.IN_FRAMESET;break}case s.BASE:case s.BASEFONT:case s.BGSOUND:case s.LINK:case s.META:case s.NOFRAMES:case s.SCRIPT:case s.STYLE:case s.TEMPLATE:case s.TITLE:{e._err(n,h.abandonedHeadElementChild),e.openElements.push(e.headElement,s.HEAD),P(e,n),e.openElements.remove(e.headElement);break}case s.HEAD:{e._err(n,h.misplacedStartTagForHeadElement);break}default:ee(e,n)}}function Ka(e,n){switch(n.tagID){case s.BODY:case s.HTML:case s.BR:{ee(e,n);break}case s.TEMPLATE:{Y(e,n);break}default:e._err(n,h.endTagWithoutMatchingOpenElement)}}function ee(e,n){e._insertFakeElement(l.BODY,s.BODY),e.insertionMode=o.IN_BODY,me(e,n)}function me(e,n){switch(n.type){case g.CHARACTER:{On(e,n);break}case g.WHITESPACE_CHARACTER:{Rn(e,n);break}case g.COMMENT:{Ce(e,n);break}case g.START_TAG:{R(e,n);break}case g.END_TAG:{fe(e,n);break}case g.EOF:{xn(e,n);break}}}function Rn(e,n){e._reconstructActiveFormattingElements(),e._insertCharacters(n)}function On(e,n){e._reconstructActiveFormattingElements(),e._insertCharacters(n),e.framesetOk=!1}function Xa(e,n){e.openElements.tmplCount===0&&e.treeAdapter.adoptAttributes(e.openElements.items[0],n.attrs)}function Va(e,n){const t=e.openElements.tryPeekProperlyNestedBodyElement();t&&e.openElements.tmplCount===0&&(e.framesetOk=!1,e.treeAdapter.adoptAttributes(t,n.attrs))}function za(e,n){const t=e.openElements.tryPeekProperlyNestedBodyElement();e.framesetOk&&t&&(e.treeAdapter.detachNode(t),e.openElements.popAllUpToHtmlElement(),e._insertElement(n,E.HTML),e.insertionMode=o.IN_FRAMESET)}function $a(e,n){e.openElements.hasInButtonScope(s.P)&&e._closePElement(),e._insertElement(n,E.HTML)}function Ja(e,n){e.openElements.hasInButtonScope(s.P)&&e._closePElement(),e.openElements.currentTagId!==void 0&&Se.has(e.openElements.currentTagId)&&e.openElements.pop(),e._insertElement(n,E.HTML)}function Za(e,n){e.openElements.hasInButtonScope(s.P)&&e._closePElement(),e._insertElement(n,E.HTML),e.skipNextNewLine=!0,e.framesetOk=!1}function eu(e,n){const t=e.openElements.tmplCount>0;(!e.formElement||t)&&(e.openElements.hasInButtonScope(s.P)&&e._closePElement(),e._insertElement(n,E.HTML),t||(e.formElement=e.openElements.current))}function nu(e,n){e.framesetOk=!1;const t=n.tagID;for(let a=e.openElements.stackTop;a>=0;a--){const i=e.openElements.tagIDs[a];if(t===s.LI&&i===s.LI||(t===s.DD||t===s.DT)&&(i===s.DD||i===s.DT)){e.openElements.generateImpliedEndTagsWithExclusion(i),e.openElements.popUntilTagNamePopped(i);break}if(i!==s.ADDRESS&&i!==s.DIV&&i!==s.P&&e._isSpecialElement(e.openElements.items[a],i))break}e.openElements.hasInButtonScope(s.P)&&e._closePElement(),e._insertElement(n,E.HTML)}function tu(e,n){e.openElements.hasInButtonScope(s.P)&&e._closePElement(),e._insertElement(n,E.HTML),e.tokenizer.state=S.PLAINTEXT}function su(e,n){e.openElements.hasInScope(s.BUTTON)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(s.BUTTON)),e._reconstructActiveFormattingElements(),e._insertElement(n,E.HTML),e.framesetOk=!1}function au(e,n){const t=e.activeFormattingElements.getElementEntryInScopeWithTagName(l.A);t&&(Pe(e,n),e.openElements.remove(t.element),e.activeFormattingElements.removeEntry(t)),e._reconstructActiveFormattingElements(),e._insertElement(n,E.HTML),e.activeFormattingElements.pushElement(e.openElements.current,n)}function uu(e,n){e._reconstructActiveFormattingElements(),e._insertElement(n,E.HTML),e.activeFormattingElements.pushElement(e.openElements.current,n)}function iu(e,n){e._reconstructActiveFormattingElements(),e.openElements.hasInScope(s.NOBR)&&(Pe(e,n),e._reconstructActiveFormattingElements()),e._insertElement(n,E.HTML),e.activeFormattingElements.pushElement(e.openElements.current,n)}function ru(e,n){e._reconstructActiveFormattingElements(),e._insertElement(n,E.HTML),e.activeFormattingElements.insertMarker(),e.framesetOk=!1}function ou(e,n){e.treeAdapter.getDocumentMode(e.document)!==L.QUIRKS&&e.openElements.hasInButtonScope(s.P)&&e._closePElement(),e._insertElement(n,E.HTML),e.framesetOk=!1,e.insertionMode=o.IN_TABLE}function Ln(e,n){e._reconstructActiveFormattingElements(),e._appendElement(n,E.HTML),e.framesetOk=!1,n.ackSelfClosing=!0}function Dn(e){const n=Tn(e,H.TYPE);return n!=null&&n.toLowerCase()===ya}function cu(e,n){e._reconstructActiveFormattingElements(),e._appendElement(n,E.HTML),Dn(n)||(e.framesetOk=!1),n.ackSelfClosing=!0}function lu(e,n){e._appendElement(n,E.HTML),n.ackSelfClosing=!0}function du(e,n){e.openElements.hasInButtonScope(s.P)&&e._closePElement(),e._appendElement(n,E.HTML),e.framesetOk=!1,n.ackSelfClosing=!0}function hu(e,n){n.tagName=l.IMG,n.tagID=s.IMG,Ln(e,n)}function mu(e,n){e._insertElement(n,E.HTML),e.skipNextNewLine=!0,e.tokenizer.state=S.RCDATA,e.originalInsertionMode=e.insertionMode,e.framesetOk=!1,e.insertionMode=o.TEXT}function fu(e,n){e.openElements.hasInButtonScope(s.P)&&e._closePElement(),e._reconstructActiveFormattingElements(),e.framesetOk=!1,e._switchToTextParsing(n,S.RAWTEXT)}function Eu(e,n){e.framesetOk=!1,e._switchToTextParsing(n,S.RAWTEXT)}function Ze(e,n){e._switchToTextParsing(n,S.RAWTEXT)}function pu(e,n){e._reconstructActiveFormattingElements(),e._insertElement(n,E.HTML),e.framesetOk=!1,e.insertionMode=e.insertionMode===o.IN_TABLE||e.insertionMode===o.IN_CAPTION||e.insertionMode===o.IN_TABLE_BODY||e.insertionMode===o.IN_ROW||e.insertionMode===o.IN_CELL?o.IN_SELECT_IN_TABLE:o.IN_SELECT}function _u(e,n){e.openElements.currentTagId===s.OPTION&&e.openElements.pop(),e._reconstructActiveFormattingElements(),e._insertElement(n,E.HTML)}function Tu(e,n){e.openElements.hasInScope(s.RUBY)&&e.openElements.generateImpliedEndTags(),e._insertElement(n,E.HTML)}function gu(e,n){e.openElements.hasInScope(s.RUBY)&&e.openElements.generateImpliedEndTagsWithExclusion(s.RTC),e._insertElement(n,E.HTML)}function bu(e,n){e._reconstructActiveFormattingElements(),Cn(n),De(n),n.selfClosing?e._appendElement(n,E.MATHML):e._insertElement(n,E.MATHML),n.ackSelfClosing=!0}function Au(e,n){e._reconstructActiveFormattingElements(),In(n),De(n),n.selfClosing?e._appendElement(n,E.SVG):e._insertElement(n,E.SVG),n.ackSelfClosing=!0}function en(e,n){e._reconstructActiveFormattingElements(),e._insertElement(n,E.HTML)}function R(e,n){switch(n.tagID){case s.I:case s.S:case s.B:case s.U:case s.EM:case s.TT:case s.BIG:case s.CODE:case s.FONT:case s.SMALL:case s.STRIKE:case s.STRONG:{uu(e,n);break}case s.A:{au(e,n);break}case s.H1:case s.H2:case s.H3:case s.H4:case s.H5:case s.H6:{Ja(e,n);break}case s.P:case s.DL:case s.OL:case s.UL:case s.DIV:case s.DIR:case s.NAV:case s.MAIN:case s.MENU:case s.ASIDE:case s.CENTER:case s.FIGURE:case s.FOOTER:case s.HEADER:case s.HGROUP:case s.DIALOG:case s.DETAILS:case s.ADDRESS:case s.ARTICLE:case s.SEARCH:case s.SECTION:case s.SUMMARY:case s.FIELDSET:case s.BLOCKQUOTE:case s.FIGCAPTION:{$a(e,n);break}case s.LI:case s.DD:case s.DT:{nu(e,n);break}case s.BR:case s.IMG:case s.WBR:case s.AREA:case s.EMBED:case s.KEYGEN:{Ln(e,n);break}case s.HR:{du(e,n);break}case s.RB:case s.RTC:{Tu(e,n);break}case s.RT:case s.RP:{gu(e,n);break}case s.PRE:case s.LISTING:{Za(e,n);break}case s.XMP:{fu(e,n);break}case s.SVG:{Au(e,n);break}case s.HTML:{Xa(e,n);break}case s.BASE:case s.LINK:case s.META:case s.STYLE:case s.TITLE:case s.SCRIPT:case s.BGSOUND:case s.BASEFONT:case s.TEMPLATE:{P(e,n);break}case s.BODY:{Va(e,n);break}case s.FORM:{eu(e,n);break}case s.NOBR:{iu(e,n);break}case s.MATH:{bu(e,n);break}case s.TABLE:{ou(e,n);break}case s.INPUT:{cu(e,n);break}case s.PARAM:case s.TRACK:case s.SOURCE:{lu(e,n);break}case s.IMAGE:{hu(e,n);break}case s.BUTTON:{su(e,n);break}case s.APPLET:case s.OBJECT:case s.MARQUEE:{ru(e,n);break}case s.IFRAME:{Eu(e,n);break}case s.SELECT:{pu(e,n);break}case s.OPTION:case s.OPTGROUP:{_u(e,n);break}case s.NOEMBED:case s.NOFRAMES:{Ze(e,n);break}case s.FRAMESET:{za(e,n);break}case s.TEXTAREA:{mu(e,n);break}case s.NOSCRIPT:{e.options.scriptingEnabled?Ze(e,n):en(e,n);break}case s.PLAINTEXT:{tu(e,n);break}case s.COL:case s.TH:case s.TD:case s.TR:case s.HEAD:case s.FRAME:case s.TBODY:case s.TFOOT:case s.THEAD:case s.CAPTION:case s.COLGROUP:break;default:en(e,n)}}function Nu(e,n){if(e.openElements.hasInScope(s.BODY)&&(e.insertionMode=o.AFTER_BODY,e.options.sourceCodeLocationInfo)){const t=e.openElements.tryPeekProperlyNestedBodyElement();t&&e._setEndLocation(t,n)}}function Su(e,n){e.openElements.hasInScope(s.BODY)&&(e.insertionMode=o.AFTER_BODY,vn(e,n))}function Cu(e,n){const t=n.tagID;e.openElements.hasInScope(t)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(t))}function Iu(e){const n=e.openElements.tmplCount>0,{formElement:t}=e;n||(e.formElement=null),(t||n)&&e.openElements.hasInScope(s.FORM)&&(e.openElements.generateImpliedEndTags(),n?e.openElements.popUntilTagNamePopped(s.FORM):t&&e.openElements.remove(t))}function yu(e){e.openElements.hasInButtonScope(s.P)||e._insertFakeElement(l.P,s.P),e._closePElement()}function Ru(e){e.openElements.hasInListItemScope(s.LI)&&(e.openElements.generateImpliedEndTagsWithExclusion(s.LI),e.openElements.popUntilTagNamePopped(s.LI))}function Ou(e,n){const t=n.tagID;e.openElements.hasInScope(t)&&(e.openElements.generateImpliedEndTagsWithExclusion(t),e.openElements.popUntilTagNamePopped(t))}function Lu(e){e.openElements.hasNumberedHeaderInScope()&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilNumberedHeaderPopped())}function Du(e,n){const t=n.tagID;e.openElements.hasInScope(t)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(t),e.activeFormattingElements.clearToLastMarker())}function Pu(e){e._reconstructActiveFormattingElements(),e._insertFakeElement(l.BR,s.BR),e.openElements.pop(),e.framesetOk=!1}function Pn(e,n){const t=n.tagName,a=n.tagID;for(let i=e.openElements.stackTop;i>0;i--){const c=e.openElements.items[i],d=e.openElements.tagIDs[i];if(a===d&&(a!==s.UNKNOWN||e.treeAdapter.getTagName(c)===t)){e.openElements.generateImpliedEndTagsWithExclusion(a),e.openElements.stackTop>=i&&e.openElements.shortenToLength(i);break}if(e._isSpecialElement(c,d))break}}function fe(e,n){switch(n.tagID){case s.A:case s.B:case s.I:case s.S:case s.U:case s.EM:case s.TT:case s.BIG:case s.CODE:case s.FONT:case s.NOBR:case s.SMALL:case s.STRIKE:case s.STRONG:{Pe(e,n);break}case s.P:{yu(e);break}case s.DL:case s.UL:case s.OL:case s.DIR:case s.DIV:case s.NAV:case s.PRE:case s.MAIN:case s.MENU:case s.ASIDE:case s.BUTTON:case s.CENTER:case s.FIGURE:case s.FOOTER:case s.HEADER:case s.HGROUP:case s.DIALOG:case s.ADDRESS:case s.ARTICLE:case s.DETAILS:case s.SEARCH:case s.SECTION:case s.SUMMARY:case s.LISTING:case s.FIELDSET:case s.BLOCKQUOTE:case s.FIGCAPTION:{Cu(e,n);break}case s.LI:{Ru(e);break}case s.DD:case s.DT:{Ou(e,n);break}case s.H1:case s.H2:case s.H3:case s.H4:case s.H5:case s.H6:{Lu(e);break}case s.BR:{Pu(e);break}case s.BODY:{Nu(e,n);break}case s.HTML:{Su(e,n);break}case s.FORM:{Iu(e);break}case s.APPLET:case s.OBJECT:case s.MARQUEE:{Du(e,n);break}case s.TEMPLATE:{Y(e,n);break}default:Pn(e,n)}}function xn(e,n){e.tmplInsertionModeStack.length>0?Hn(e,n):xe(e,n)}function xu(e,n){var t;n.tagID===s.SCRIPT&&((t=e.scriptHandler)===null||t===void 0||t.call(e,e.openElements.current)),e.openElements.pop(),e.insertionMode=e.originalInsertionMode}function Mu(e,n){e._err(n,h.eofInElementThatCanContainOnlyText),e.openElements.pop(),e.insertionMode=e.originalInsertionMode,e.onEof(n)}function Te(e,n){if(e.openElements.currentTagId!==void 0&&yn.has(e.openElements.currentTagId))switch(e.pendingCharacterTokens.length=0,e.hasNonWhitespacePendingCharacterToken=!1,e.originalInsertionMode=e.insertionMode,e.insertionMode=o.IN_TABLE_TEXT,n.type){case g.CHARACTER:{wn(e,n);break}case g.WHITESPACE_CHARACTER:{Mn(e,n);break}}else se(e,n)}function wu(e,n){e.openElements.clearBackToTableContext(),e.activeFormattingElements.insertMarker(),e._insertElement(n,E.HTML),e.insertionMode=o.IN_CAPTION}function ku(e,n){e.openElements.clearBackToTableContext(),e._insertElement(n,E.HTML),e.insertionMode=o.IN_COLUMN_GROUP}function Bu(e,n){e.openElements.clearBackToTableContext(),e._insertFakeElement(l.COLGROUP,s.COLGROUP),e.insertionMode=o.IN_COLUMN_GROUP,Me(e,n)}function Fu(e,n){e.openElements.clearBackToTableContext(),e._insertElement(n,E.HTML),e.insertionMode=o.IN_TABLE_BODY}function Uu(e,n){e.openElements.clearBackToTableContext(),e._insertFakeElement(l.TBODY,s.TBODY),e.insertionMode=o.IN_TABLE_BODY,Ee(e,n)}function Hu(e,n){e.openElements.hasInTableScope(s.TABLE)&&(e.openElements.popUntilTagNamePopped(s.TABLE),e._resetInsertionMode(),e._processStartTag(n))}function vu(e,n){Dn(n)?e._appendElement(n,E.HTML):se(e,n),n.ackSelfClosing=!0}function Yu(e,n){!e.formElement&&e.openElements.tmplCount===0&&(e._insertElement(n,E.HTML),e.formElement=e.openElements.current,e.openElements.pop())}function G(e,n){switch(n.tagID){case s.TD:case s.TH:case s.TR:{Uu(e,n);break}case s.STYLE:case s.SCRIPT:case s.TEMPLATE:{P(e,n);break}case s.COL:{Bu(e,n);break}case s.FORM:{Yu(e,n);break}case s.TABLE:{Hu(e,n);break}case s.TBODY:case s.TFOOT:case s.THEAD:{Fu(e,n);break}case s.INPUT:{vu(e,n);break}case s.CAPTION:{wu(e,n);break}case s.COLGROUP:{ku(e,n);break}default:se(e,n)}}function ne(e,n){switch(n.tagID){case s.TABLE:{e.openElements.hasInTableScope(s.TABLE)&&(e.openElements.popUntilTagNamePopped(s.TABLE),e._resetInsertionMode());break}case s.TEMPLATE:{Y(e,n);break}case s.BODY:case s.CAPTION:case s.COL:case s.COLGROUP:case s.HTML:case s.TBODY:case s.TD:case s.TFOOT:case s.TH:case s.THEAD:case s.TR:break;default:se(e,n)}}function se(e,n){const t=e.fosterParentingEnabled;e.fosterParentingEnabled=!0,me(e,n),e.fosterParentingEnabled=t}function Mn(e,n){e.pendingCharacterTokens.push(n)}function wn(e,n){e.pendingCharacterTokens.push(n),e.hasNonWhitespacePendingCharacterToken=!0}function X(e,n){let t=0;if(e.hasNonWhitespacePendingCharacterToken)for(;t<e.pendingCharacterTokens.length;t++)se(e,e.pendingCharacterTokens[t]);else for(;t<e.pendingCharacterTokens.length;t++)e._insertCharacters(e.pendingCharacterTokens[t]);e.insertionMode=e.originalInsertionMode,e._processToken(n)}const kn=new Set([s.CAPTION,s.COL,s.COLGROUP,s.TBODY,s.TD,s.TFOOT,s.TH,s.THEAD,s.TR]);function qu(e,n){const t=n.tagID;kn.has(t)?e.openElements.hasInTableScope(s.CAPTION)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(s.CAPTION),e.activeFormattingElements.clearToLastMarker(),e.insertionMode=o.IN_TABLE,G(e,n)):R(e,n)}function Gu(e,n){const t=n.tagID;switch(t){case s.CAPTION:case s.TABLE:{e.openElements.hasInTableScope(s.CAPTION)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(s.CAPTION),e.activeFormattingElements.clearToLastMarker(),e.insertionMode=o.IN_TABLE,t===s.TABLE&&ne(e,n));break}case s.BODY:case s.COL:case s.COLGROUP:case s.HTML:case s.TBODY:case s.TD:case s.TFOOT:case s.TH:case s.THEAD:case s.TR:break;default:fe(e,n)}}function Me(e,n){switch(n.tagID){case s.HTML:{R(e,n);break}case s.COL:{e._appendElement(n,E.HTML),n.ackSelfClosing=!0;break}case s.TEMPLATE:{P(e,n);break}default:le(e,n)}}function Qu(e,n){switch(n.tagID){case s.COLGROUP:{e.openElements.currentTagId===s.COLGROUP&&(e.openElements.pop(),e.insertionMode=o.IN_TABLE);break}case s.TEMPLATE:{Y(e,n);break}case s.COL:break;default:le(e,n)}}function le(e,n){e.openElements.currentTagId===s.COLGROUP&&(e.openElements.pop(),e.insertionMode=o.IN_TABLE,e._processToken(n))}function Ee(e,n){switch(n.tagID){case s.TR:{e.openElements.clearBackToTableBodyContext(),e._insertElement(n,E.HTML),e.insertionMode=o.IN_ROW;break}case s.TH:case s.TD:{e.openElements.clearBackToTableBodyContext(),e._insertFakeElement(l.TR,s.TR),e.insertionMode=o.IN_ROW,pe(e,n);break}case s.CAPTION:case s.COL:case s.COLGROUP:case s.TBODY:case s.TFOOT:case s.THEAD:{e.openElements.hasTableBodyContextInTableScope()&&(e.openElements.clearBackToTableBodyContext(),e.openElements.pop(),e.insertionMode=o.IN_TABLE,G(e,n));break}default:G(e,n)}}function Ie(e,n){const t=n.tagID;switch(n.tagID){case s.TBODY:case s.TFOOT:case s.THEAD:{e.openElements.hasInTableScope(t)&&(e.openElements.clearBackToTableBodyContext(),e.openElements.pop(),e.insertionMode=o.IN_TABLE);break}case s.TABLE:{e.openElements.hasTableBodyContextInTableScope()&&(e.openElements.clearBackToTableBodyContext(),e.openElements.pop(),e.insertionMode=o.IN_TABLE,ne(e,n));break}case s.BODY:case s.CAPTION:case s.COL:case s.COLGROUP:case s.HTML:case s.TD:case s.TH:case s.TR:break;default:ne(e,n)}}function pe(e,n){switch(n.tagID){case s.TH:case s.TD:{e.openElements.clearBackToTableRowContext(),e._insertElement(n,E.HTML),e.insertionMode=o.IN_CELL,e.activeFormattingElements.insertMarker();break}case s.CAPTION:case s.COL:case s.COLGROUP:case s.TBODY:case s.TFOOT:case s.THEAD:case s.TR:{e.openElements.hasInTableScope(s.TR)&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode=o.IN_TABLE_BODY,Ee(e,n));break}default:G(e,n)}}function Bn(e,n){switch(n.tagID){case s.TR:{e.openElements.hasInTableScope(s.TR)&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode=o.IN_TABLE_BODY);break}case s.TABLE:{e.openElements.hasInTableScope(s.TR)&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode=o.IN_TABLE_BODY,Ie(e,n));break}case s.TBODY:case s.TFOOT:case s.THEAD:{(e.openElements.hasInTableScope(n.tagID)||e.openElements.hasInTableScope(s.TR))&&(e.openElements.clearBackToTableRowContext(),e.openElements.pop(),e.insertionMode=o.IN_TABLE_BODY,Ie(e,n));break}case s.BODY:case s.CAPTION:case s.COL:case s.COLGROUP:case s.HTML:case s.TD:case s.TH:break;default:ne(e,n)}}function Wu(e,n){const t=n.tagID;kn.has(t)?(e.openElements.hasInTableScope(s.TD)||e.openElements.hasInTableScope(s.TH))&&(e._closeTableCell(),pe(e,n)):R(e,n)}function ju(e,n){const t=n.tagID;switch(t){case s.TD:case s.TH:{e.openElements.hasInTableScope(t)&&(e.openElements.generateImpliedEndTags(),e.openElements.popUntilTagNamePopped(t),e.activeFormattingElements.clearToLastMarker(),e.insertionMode=o.IN_ROW);break}case s.TABLE:case s.TBODY:case s.TFOOT:case s.THEAD:case s.TR:{e.openElements.hasInTableScope(t)&&(e._closeTableCell(),Bn(e,n));break}case s.BODY:case s.CAPTION:case s.COL:case s.COLGROUP:case s.HTML:break;default:fe(e,n)}}function Fn(e,n){switch(n.tagID){case s.HTML:{R(e,n);break}case s.OPTION:{e.openElements.currentTagId===s.OPTION&&e.openElements.pop(),e._insertElement(n,E.HTML);break}case s.OPTGROUP:{e.openElements.currentTagId===s.OPTION&&e.openElements.pop(),e.openElements.currentTagId===s.OPTGROUP&&e.openElements.pop(),e._insertElement(n,E.HTML);break}case s.HR:{e.openElements.currentTagId===s.OPTION&&e.openElements.pop(),e.openElements.currentTagId===s.OPTGROUP&&e.openElements.pop(),e._appendElement(n,E.HTML),n.ackSelfClosing=!0;break}case s.INPUT:case s.KEYGEN:case s.TEXTAREA:case s.SELECT:{e.openElements.hasInSelectScope(s.SELECT)&&(e.openElements.popUntilTagNamePopped(s.SELECT),e._resetInsertionMode(),n.tagID!==s.SELECT&&e._processStartTag(n));break}case s.SCRIPT:case s.TEMPLATE:{P(e,n);break}}}function Un(e,n){switch(n.tagID){case s.OPTGROUP:{e.openElements.stackTop>0&&e.openElements.currentTagId===s.OPTION&&e.openElements.tagIDs[e.openElements.stackTop-1]===s.OPTGROUP&&e.openElements.pop(),e.openElements.currentTagId===s.OPTGROUP&&e.openElements.pop();break}case s.OPTION:{e.openElements.currentTagId===s.OPTION&&e.openElements.pop();break}case s.SELECT:{e.openElements.hasInSelectScope(s.SELECT)&&(e.openElements.popUntilTagNamePopped(s.SELECT),e._resetInsertionMode());break}case s.TEMPLATE:{Y(e,n);break}}}function Ku(e,n){const t=n.tagID;t===s.CAPTION||t===s.TABLE||t===s.TBODY||t===s.TFOOT||t===s.THEAD||t===s.TR||t===s.TD||t===s.TH?(e.openElements.popUntilTagNamePopped(s.SELECT),e._resetInsertionMode(),e._processStartTag(n)):Fn(e,n)}function Xu(e,n){const t=n.tagID;t===s.CAPTION||t===s.TABLE||t===s.TBODY||t===s.TFOOT||t===s.THEAD||t===s.TR||t===s.TD||t===s.TH?e.openElements.hasInTableScope(t)&&(e.openElements.popUntilTagNamePopped(s.SELECT),e._resetInsertionMode(),e.onEndTag(n)):Un(e,n)}function Vu(e,n){switch(n.tagID){case s.BASE:case s.BASEFONT:case s.BGSOUND:case s.LINK:case s.META:case s.NOFRAMES:case s.SCRIPT:case s.STYLE:case s.TEMPLATE:case s.TITLE:{P(e,n);break}case s.CAPTION:case s.COLGROUP:case s.TBODY:case s.TFOOT:case s.THEAD:{e.tmplInsertionModeStack[0]=o.IN_TABLE,e.insertionMode=o.IN_TABLE,G(e,n);break}case s.COL:{e.tmplInsertionModeStack[0]=o.IN_COLUMN_GROUP,e.insertionMode=o.IN_COLUMN_GROUP,Me(e,n);break}case s.TR:{e.tmplInsertionModeStack[0]=o.IN_TABLE_BODY,e.insertionMode=o.IN_TABLE_BODY,Ee(e,n);break}case s.TD:case s.TH:{e.tmplInsertionModeStack[0]=o.IN_ROW,e.insertionMode=o.IN_ROW,pe(e,n);break}default:e.tmplInsertionModeStack[0]=o.IN_BODY,e.insertionMode=o.IN_BODY,R(e,n)}}function zu(e,n){n.tagID===s.TEMPLATE&&Y(e,n)}function Hn(e,n){e.openElements.tmplCount>0?(e.openElements.popUntilTagNamePopped(s.TEMPLATE),e.activeFormattingElements.clearToLastMarker(),e.tmplInsertionModeStack.shift(),e._resetInsertionMode(),e.onEof(n)):xe(e,n)}function $u(e,n){n.tagID===s.HTML?R(e,n):de(e,n)}function vn(e,n){var t;if(n.tagID===s.HTML){if(e.fragmentContext||(e.insertionMode=o.AFTER_AFTER_BODY),e.options.sourceCodeLocationInfo&&e.openElements.tagIDs[0]===s.HTML){e._setEndLocation(e.openElements.items[0],n);const a=e.openElements.items[1];a&&!(!((t=e.treeAdapter.getNodeSourceCodeLocation(a))===null||t===void 0)&&t.endTag)&&e._setEndLocation(a,n)}}else de(e,n)}function de(e,n){e.insertionMode=o.IN_BODY,me(e,n)}function Ju(e,n){switch(n.tagID){case s.HTML:{R(e,n);break}case s.FRAMESET:{e._insertElement(n,E.HTML);break}case s.FRAME:{e._appendElement(n,E.HTML),n.ackSelfClosing=!0;break}case s.NOFRAMES:{P(e,n);break}}}function Zu(e,n){n.tagID===s.FRAMESET&&!e.openElements.isRootHtmlElementCurrent()&&(e.openElements.pop(),!e.fragmentContext&&e.openElements.currentTagId!==s.FRAMESET&&(e.insertionMode=o.AFTER_FRAMESET))}function ei(e,n){switch(n.tagID){case s.HTML:{R(e,n);break}case s.NOFRAMES:{P(e,n);break}}}function ni(e,n){n.tagID===s.HTML&&(e.insertionMode=o.AFTER_AFTER_FRAMESET)}function ti(e,n){n.tagID===s.HTML?R(e,n):re(e,n)}function re(e,n){e.insertionMode=o.IN_BODY,me(e,n)}function si(e,n){switch(n.tagID){case s.HTML:{R(e,n);break}case s.NOFRAMES:{P(e,n);break}}}function ai(e,n){n.chars=N,e._insertCharacters(n)}function ui(e,n){e._insertCharacters(n),e.framesetOk=!1}function Yn(e){for(;e.treeAdapter.getNamespaceURI(e.openElements.current)!==E.HTML&&e.openElements.currentTagId!==void 0&&!e._isIntegrationPoint(e.openElements.currentTagId,e.openElements.current);)e.openElements.pop()}function ii(e,n){if(Aa(n))Yn(e),e._startTagOutsideForeignContent(n);else{const t=e._getAdjustedCurrentElement(),a=e.treeAdapter.getNamespaceURI(t);a===E.MATHML?Cn(n):a===E.SVG&&(Na(n),In(n)),De(n),n.selfClosing?e._appendElement(n,a):e._insertElement(n,a),n.ackSelfClosing=!0}}function ri(e,n){if(n.tagID===s.P||n.tagID===s.BR){Yn(e),e._endTagOutsideForeignContent(n);return}for(let t=e.openElements.stackTop;t>0;t--){const a=e.openElements.items[t];if(e.treeAdapter.getNamespaceURI(a)===E.HTML){e._endTagOutsideForeignContent(n);break}const i=e.treeAdapter.getTagName(a);if(i.toLowerCase()===n.tagName){n.tagName=i,e.openElements.shortenToLength(t);break}}}l.AREA,l.BASE,l.BASEFONT,l.BGSOUND,l.BR,l.COL,l.EMBED,l.FRAME,l.HR,l.IMG,l.INPUT,l.KEYGEN,l.LINK,l.META,l.PARAM,l.SOURCE,l.TRACK,l.WBR;const oi=/<(\/?)(iframe|noembed|noframes|plaintext|script|style|textarea|title|xmp)(?=[\t\n\f\r />])/gi,ci=new Set(["mdxFlowExpression","mdxJsxFlowElement","mdxJsxTextElement","mdxTextExpression","mdxjsEsm"]),nn={sourceCodeLocationInfo:!0,scriptingEnabled:!1};function qn(e,n){const t=gi(e),a=sn("type",{handlers:{root:li,element:di,text:hi,comment:Qn,doctype:mi,raw:Ei},unknown:pi}),i={parser:t?new Je(nn):Je.getFragmentParser(void 0,nn),handle(_){a(_,i)},stitches:!1,options:n||{}};a(e,i),j(i,v());const c=t?i.parser.document:i.parser.getFragment(),d=bs(c,{file:i.options.file});return i.stitches&&Vn(d,"comment",function(_,f,T){const y=_;if(y.value.stitch&&T&&f!==void 0){const b=T.children;return b[f]=y.value.stitch,f}}),d.type==="root"&&d.children.length===1&&d.children[0].type===e.type?d.children[0]:d}function Gn(e,n){let t=-1;if(e)for(;++t<e.length;)n.handle(e[t])}function li(e,n){Gn(e.children,n)}function di(e,n){_i(e,n),Gn(e.children,n),Ti(e,n)}function hi(e,n){n.parser.tokenizer.state>4&&(n.parser.tokenizer.state=0);const t={type:g.CHARACTER,chars:e.value,location:ae(e)};j(n,v(e)),n.parser.currentToken=t,n.parser._processToken(n.parser.currentToken)}function mi(e,n){const t={type:g.DOCTYPE,name:"html",forceQuirks:!1,publicId:"",systemId:"",location:ae(e)};j(n,v(e)),n.parser.currentToken=t,n.parser._processToken(n.parser.currentToken)}function fi(e,n){n.stitches=!0;const t=bi(e);if("children"in e&&"children"in t){const a=qn({type:"root",children:e.children},n.options);t.children=a.children}Qn({type:"comment",value:{stitch:t}},n)}function Qn(e,n){const t=e.value,a={type:g.COMMENT,data:t,location:ae(e)};j(n,v(e)),n.parser.currentToken=a,n.parser._processToken(n.parser.currentToken)}function Ei(e,n){if(n.parser.tokenizer.preprocessor.html="",n.parser.tokenizer.preprocessor.pos=-1,n.parser.tokenizer.preprocessor.lastGapPos=-2,n.parser.tokenizer.preprocessor.gapStack=[],n.parser.tokenizer.preprocessor.skipNextNewLine=!1,n.parser.tokenizer.preprocessor.lastChunkWritten=!1,n.parser.tokenizer.preprocessor.endOfChunkHit=!1,n.parser.tokenizer.preprocessor.isEol=!1,Wn(n,v(e)),n.parser.tokenizer.write(n.options.tagfilter?e.value.replace(oi,"&lt;$1$2"):e.value,!1),n.parser.tokenizer._runParsingLoop(),n.parser.tokenizer.state===72||n.parser.tokenizer.state===78){n.parser.tokenizer.preprocessor.lastChunkWritten=!0;const t=n.parser.tokenizer._consume();n.parser.tokenizer._callState(t)}}function pi(e,n){const t=e;if(n.options.passThrough&&n.options.passThrough.includes(t.type))fi(t,n);else{let a="";throw ci.has(t.type)&&(a=". It looks like you are using MDX nodes with `hast-util-raw` (or `rehype-raw`). If you use this because you are using remark or rehype plugins that inject `'html'` nodes, then please raise an issue with that plugin, as its a bad and slow idea. If you use this because you are using markdown syntax, then you have to configure this utility (or plugin) to pass through these nodes (see `passThrough` in docs), but you can also migrate to use the MDX syntax"),new Error("Cannot compile `"+t.type+"` node"+a)}}function j(e,n){Wn(e,n);const t=e.parser.tokenizer.currentCharacterToken;t&&t.location&&(t.location.endLine=e.parser.tokenizer.preprocessor.line,t.location.endCol=e.parser.tokenizer.preprocessor.col+1,t.location.endOffset=e.parser.tokenizer.preprocessor.offset+1,e.parser.currentToken=t,e.parser._processToken(e.parser.currentToken)),e.parser.tokenizer.paused=!1,e.parser.tokenizer.inLoop=!1,e.parser.tokenizer.active=!1,e.parser.tokenizer.returnState=S.DATA,e.parser.tokenizer.charRefCode=-1,e.parser.tokenizer.consumedAfterSnapshot=-1,e.parser.tokenizer.currentLocation=null,e.parser.tokenizer.currentCharacterToken=null,e.parser.tokenizer.currentToken=null,e.parser.tokenizer.currentAttr={name:"",value:""}}function Wn(e,n){if(n&&n.offset!==void 0){const t={startLine:n.line,startCol:n.column,startOffset:n.offset,endLine:-1,endCol:-1,endOffset:-1};e.parser.tokenizer.preprocessor.lineStartPos=-n.column+1,e.parser.tokenizer.preprocessor.droppedBufferSize=n.offset,e.parser.tokenizer.preprocessor.line=n.line,e.parser.tokenizer.currentLocation=t}}function _i(e,n){const t=e.tagName.toLowerCase();if(n.parser.tokenizer.state===S.PLAINTEXT)return;j(n,v(e));const a=n.parser.openElements.current;let i="namespaceURI"in a?a.namespaceURI:U.html;i===U.html&&t==="svg"&&(i=U.svg);const c=Is({...e,children:[]},{space:i===U.svg?"svg":"html"}),d={type:g.START_TAG,tagName:t,tagID:W(t),selfClosing:!1,ackSelfClosing:!1,attrs:"attrs"in c?c.attrs:[],location:ae(e)};n.parser.currentToken=d,n.parser._processToken(n.parser.currentToken),n.parser.tokenizer.lastStartTagName=t}function Ti(e,n){const t=e.tagName.toLowerCase();if(!n.parser.tokenizer.inForeignNode&&Ms.includes(t)||n.parser.tokenizer.state===S.PLAINTEXT)return;j(n,an(e));const a={type:g.END_TAG,tagName:t,tagID:W(t),selfClosing:!1,ackSelfClosing:!1,attrs:[],location:ae(e)};n.parser.currentToken=a,n.parser._processToken(n.parser.currentToken),t===n.parser.tokenizer.lastStartTagName&&(n.parser.tokenizer.state===S.RCDATA||n.parser.tokenizer.state===S.RAWTEXT||n.parser.tokenizer.state===S.SCRIPT_DATA)&&(n.parser.tokenizer.state=S.DATA)}function gi(e){const n=e.type==="root"?e.children[0]:e;return!!(n&&(n.type==="doctype"||n.type==="element"&&n.tagName.toLowerCase()==="html"))}function ae(e){const n=v(e)||{line:void 0,column:void 0,offset:void 0},t=an(e)||{line:void 0,column:void 0,offset:void 0};return{startLine:n.line,startCol:n.column,startOffset:n.offset,endLine:t.line,endCol:t.column,endOffset:t.offset}}function bi(e){return"children"in e?Fe({...e,children:[]}):Fe(e)}function Ai(e){return function(n,t){return qn(n,{...e,file:t})}}function Ni({language:e,children:n}){const t=A.useRef(null),[a,i]=A.useState(!1),c=A.useCallback(async()=>{var _;const d=((_=t.current)==null?void 0:_.innerText)??"";try{await navigator.clipboard.writeText(d)}catch{const f=document.createElement("textarea");f.value=d,f.style.position="fixed",f.style.opacity="0",document.body.appendChild(f),f.select(),document.execCommand("copy"),f.remove()}i(!0),window.setTimeout(()=>i(!1),1600)},[]);return m.jsxs("div",{className:"codeblock",children:[m.jsxs("div",{className:"codeblock__bar",children:[m.jsx("span",{className:"codeblock__lang",children:e||"text"}),m.jsxs("button",{type:"button",className:"codeblock__copy",onClick:c,"aria-label":a?"کپی شد":"کپی کد",children:[a?m.jsx(Tt,{}):m.jsx(_t,{}),a?"کپی شد":"کپی"]})]}),m.jsx("pre",{ref:t,children:n})]})}function Si(e){return/^[a-z]+:|^\/\//i.test(e)||e.startsWith("#")?null:"/"+e.replace(/\.md$/,"").replace(/\/index$/,"").replace(/^\.\//,"").replace(/^\/+/,"")}function Ci({source:e}){const n=A.useMemo(()=>({a({href:t,children:a,...i}){const c=t??"",d=Si(c);if(d)return m.jsx(oe,{to:d,...i,children:a});const _=/^https?:/i.test(c);return m.jsx("a",{href:c,...i,..._?{target:"_blank",rel:"noreferrer noopener"}:{},children:a})},code({className:t,children:a,...i}){return m.jsx("code",{className:t,...i,children:a})},pre({children:t}){var d,_;const a=t,i=((d=a==null?void 0:a.props)==null?void 0:d.className)??"",c=((_=/language-(\w+)/.exec(i))==null?void 0:_[1])??"";return m.jsx(Ni,{language:c,children:t})},img({src:t,alt:a,...i}){const c=typeof t=="string"?t:"",d=/^(https?:|data:|\/)/i.test(c)?c:"/NSplusthon/"+c.replace(/^(?:\.{1,2}\/)+/,"");return m.jsx("img",{src:d,alt:a??"",loading:"lazy",...i})},table({children:t}){return m.jsx("div",{style:{overflowX:"auto"},children:m.jsx("table",{children:t})})}}),[]);return m.jsx("div",{className:"prose",children:m.jsx(zn,{remarkPlugins:[Zn],rehypePlugins:[Ai,$n,[Jn,{detect:!0,ignoreMissing:!0}]],components:n,children:e})})}const tn="NSplusthon";function Ii({onLayout:e}){const t=(at()["*"]??"").replace(/^\/+|\/+$/g,""),a=rs(t);A.useEffect(()=>{e(!!(a!=null&&a.fullBleed))},[a,e]),A.useEffect(()=>{document.title=a?`${a.title} · ${tn}`:`صفحه پیدا نشد · ${tn}`,document.documentElement.lang=(a==null?void 0:a.lang)??"fa",document.documentElement.dir=(a==null?void 0:a.lang)==="en"?"ltr":"rtl"},[a]);const{hash:i}=Re();return A.useEffect(()=>{if(!i){window.scrollTo({top:0,behavior:"auto"});return}const c=decodeURIComponent(i.slice(1));requestAnimationFrame(()=>{var d;(d=document.getElementById(c))==null||d.scrollIntoView({block:"start"})})},[i,t]),a?m.jsxs(m.Fragment,{children:[m.jsx("main",{className:"article glass fadein",id:"main",children:m.jsx(Ci,{source:a.body})},a.slug),!a.hideToc&&m.jsx(At,{headings:a.headings})]}):m.jsx("main",{className:"article glass fadein",id:"main",children:m.jsxs("div",{className:"prose",children:[m.jsx("h1",{children:"۴۰۴"}),m.jsx("p",{children:"این صفحه وجود ندارد."}),m.jsx("p",{children:m.jsx(oe,{to:"/",children:"بازگشت به خانه"})})]})})}function yi(){const[e,n]=A.useState(!1),[t,a]=A.useState(!1),[i,c]=A.useState(!1),{pathname:d}=Re(),_=A.useCallback(()=>a(!1),[]);return A.useEffect(()=>a(!1),[d]),A.useEffect(()=>{const f=T=>{var D;const y=(D=T.target)==null?void 0:D.tagName,b=y==="INPUT"||y==="TEXTAREA";(T.ctrlKey||T.metaKey)&&T.key.toLowerCase()==="k"||T.key==="/"&&!b?(T.preventDefault(),n(!0)):T.key==="Escape"&&n(!1)};return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[]),m.jsxs("div",{className:"shell",children:[m.jsx("a",{className:"skip-link",href:"#main",children:"پرش به محتوا"}),m.jsx(gt,{onOpenSearch:()=>n(!0),onToggleMenu:()=>a(f=>!f)}),m.jsxs("div",{className:"layout"+(i?" layout--wide":""),children:[!i&&m.jsx(bt,{open:t,onNavigate:_}),m.jsx(tt,{children:m.jsx(st,{path:"*",element:m.jsx(Ii,{onLayout:c})})})]}),m.jsx(Nt,{}),m.jsx(cs,{open:e,onClose:()=>n(!1)})]})}const jn="/NSplusthon/".replace(/\/$/,"");{const{pathname:e,search:n,hash:t}=window.location;e.length>jn.length+1&&e.endsWith("/")&&window.history.replaceState(null,"",e.slice(0,-1)+n+t)}rn(document.getElementById("root")).render(m.jsx(A.StrictMode,{children:m.jsx(ut,{basename:jn,children:m.jsx(yi,{})})}));
