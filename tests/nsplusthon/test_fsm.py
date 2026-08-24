import pytest
from nsplusthon import SoroushClient
from nsplusthon.sessions import StringSession
from nsplusthon.fsm import StatesGroup, State, MemoryStorage, SQLiteStorage


class Registration(StatesGroup):
    step_name = State()
    step_age = State()


@pytest.mark.asyncio
async def test_fsm_memory_storage():
    storage = MemoryStorage()
    ctx = storage.get_context(user_id=123, chat_id=456)

    assert await ctx.get_state() is None
    await ctx.set_state(Registration.step_name)
    assert await ctx.get_state() == "Registration:step_name"

    await ctx.update_data(name="Ali", age=25)
    data = await ctx.get_data()
    assert data == {"name": "Ali", "age": 25}

    await ctx.finish()
    assert await ctx.get_state() is None
    assert await ctx.get_data() == {}


@pytest.mark.asyncio
async def test_fsm_sqlite_storage(tmp_path):
    class Quiz(StatesGroup):
        q1 = State()
        q2 = State()

    db_file = str(tmp_path / "test_fsm.db")
    storage = SQLiteStorage(db_file)
    ctx = storage.get_context(user_id=99, chat_id=11)

    await ctx.set_state(Quiz.q1)
    assert await ctx.get_state() == "Quiz:q1"

    await ctx.update_data(score=10)
    data = await ctx.get_data()
    assert data["score"] == 10

    await ctx.clear()
    assert await ctx.get_state() is None
    assert await ctx.get_data() == {}


@pytest.mark.asyncio
async def test_client_fsm_integration():
    client = SoroushClient(StringSession())
    ctx = client.fsm_context(user_id=55, chat_id=77)
    await ctx.set_state(Registration.step_name)
    assert await ctx.get_state() == "Registration:step_name"

    guard = client.enable_group_guard(max_flood_messages=3)
    assert guard is not None
