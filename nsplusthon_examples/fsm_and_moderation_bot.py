"""
NSplusthon v1.8.0 Example: Interactive FSM Form, Composable Filters, Group Guard, and Paginator Menu.
"""

import asyncio
from nsplusthon import SoroushClient, Button, events
from nsplusthon.fsm import StatesGroup, State, MemoryStorage
from nsplusthon.filters import TextFilter, ChatTypeFilter
from nsplusthon.moderation import GroupGuard
from nsplusthon.paginator import Paginator


# 1. Define FSM State Group
class UserRegistration(StatesGroup):
    waiting_for_fullname = State()
    waiting_for_city = State()


# 2. Instantiate Storage and Group Guard
fsm_storage = MemoryStorage()
group_guard = GroupGuard(
    max_flood_messages=5,
    allowed_domains=["splus.ir/botzone"],
    max_mentions=3,
)

client = SoroushClient("fsm_demo_session")


@client.on(events.NewMessage)
async def moderation_middleware(event):
    """Filter all incoming group messages using GroupGuard."""
    if event.is_group:
        check = group_guard.inspect_message(
            chat_id=event.chat_id,
            user_id=event.sender_id,
            text=event.text,
        )
        if check["is_violation"]:
            reason = check["reason"]
            await event.delete()
            await event.respond(f"⚠️ پیام شما به دلیل {reason} حذف شد. (اخطار {check['warn_count']}/3)")


@client.on(events.NewMessage(pattern=r"/register"))
async def start_registration(event):
    """Start interactive multi-step FSM registration."""
    ctx = fsm_storage.get_context(user_id=event.sender_id, chat_id=event.chat_id)
    await ctx.set_state(UserRegistration.waiting_for_fullname)
    await event.reply("📝 به ثبت نام خوش آمدید! لطفاً نام و نام خانوادگی خود را بفرستید:")


@client.on(events.NewMessage)
async def process_registration(event):
    ctx = fsm_storage.get_context(user_id=event.sender_id, chat_id=event.chat_id)
    current_state = await ctx.get_state()

    if current_state == UserRegistration.waiting_for_fullname.name:
        await ctx.update_data(fullname=event.text)
        await ctx.set_state(UserRegistration.waiting_for_city)
        await event.reply("✅ نام ثبت شد. حالا نام شهر خود را بفرستید:")

    elif current_state == UserRegistration.waiting_for_city.name:
        data = await ctx.get_data()
        fullname = data.get("fullname", "ناشناس")
        city = event.text

        await ctx.finish()
        await event.reply(f"🎉 ثبت‌نام تکمیل شد!\n👤 نام: {fullname}\n🏙️ شهر: {city}")


@client.on(events.NewMessage(pattern=r"/catalog"))
async def show_catalog(event):
    """Display paginated catalog menu."""
    items = [f"📦 محصول شماره {i}" for i in range(1, 21)]
    paginator = Paginator(items, page_size=4)

    def item_btn(item, idx):
        return Button.inline(f"{item}", data=f"item:{idx}")

    keyboard = paginator.build_keyboard(current_page=1, item_button_factory=item_btn)
    await event.reply("🗂 کاتالوگ محصولات:", buttons=keyboard)


if __name__ == "__main__":
    print("NSplusthon v1.8.0 FSM & Moderation Bot starting...")
    client.start()
    client.run_until_disconnected()
