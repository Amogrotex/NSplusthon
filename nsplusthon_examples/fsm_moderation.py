"""Example usage of FSM, filters, group moderation, and pagination in NSplusthon."""

from nsplusthon import SoroushClient, Button, events
from nsplusthon.fsm import StatesGroup, State, MemoryStorage
from nsplusthon.moderation import GroupGuard
from nsplusthon.paginator import Paginator


class UserRegistration(StatesGroup):
    waiting_for_fullname = State()
    waiting_for_city = State()


fsm_storage = MemoryStorage()
group_guard = GroupGuard(
    max_flood_messages=5,
    allowed_domains=["splus.ir"],
    max_mentions=3,
)

client = SoroushClient("demo_session")


@client.on(events.NewMessage)
async def moderation_middleware(event):
    if event.is_group:
        check = group_guard.inspect_message(
            chat_id=event.chat_id,
            user_id=event.sender_id,
            text=event.text,
        )
        if check["is_violation"]:
            await event.delete()


@client.on(events.NewMessage(pattern=r"/register"))
async def start_registration(event):
    ctx = fsm_storage.get_context(user_id=event.sender_id, chat_id=event.chat_id)
    await ctx.set_state(UserRegistration.waiting_for_fullname)
    await event.reply("Please enter your full name:")


@client.on(events.NewMessage)
async def process_registration(event):
    ctx = fsm_storage.get_context(user_id=event.sender_id, chat_id=event.chat_id)
    current_state = await ctx.get_state()

    if current_state == UserRegistration.waiting_for_fullname.name:
        await ctx.update_data(fullname=event.text)
        await ctx.set_state(UserRegistration.waiting_for_city)
        await event.reply("Please enter your city:")

    elif current_state == UserRegistration.waiting_for_city.name:
        data = await ctx.get_data()
        fullname = data.get("fullname", "")
        city = event.text

        await ctx.finish()
        await event.reply(f"Registration complete for {fullname} from {city}.")


@client.on(events.NewMessage(pattern=r"/catalog"))
async def show_catalog(event):
    items = [f"Item {i}" for i in range(1, 21)]
    paginator = Paginator(items, page_size=4)

    def item_btn(item, idx):
        return Button.inline(item, data=f"item:{idx}")

    keyboard = paginator.build_keyboard(current_page=1, item_button_factory=item_btn)
    await event.reply("Catalog:", buttons=keyboard)


if __name__ == "__main__":
    client.start()
    client.run_until_disconnected()
