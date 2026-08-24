"""
Unit tests for NSplusthon v1.8.0 new features: FSM, Filters, Moderation, Paginator, and AI helpers.
"""

import os
import pytest
from nsplusthon.fsm import StatesGroup, State, MemoryStorage, SQLiteStorage
from nsplusthon.filters import TextFilter, RegexFilter, ChatTypeFilter, SenderFilter, HasMediaFilter, IsReplyFilter
from nsplusthon.moderation import GroupGuard, AntiFlood, LinkGuard, PersianBadWordsFilter, NightLock, WarnManager
from nsplusthon.paginator import Paginator
from nsplusthon.ai import RedactionGuard, IntentRouter, MultiProviderAI
from nsplusthon.tl.custom.button import Button


class MockEvent:
    def __init__(
        self,
        text="",
        chat_id=100,
        sender_id=200,
        is_private=False,
        is_group=True,
        is_channel=False,
        media=None,
        is_reply=False,
    ):
        self.raw_text = text
        self.text = text
        self.chat_id = chat_id
        self.sender_id = sender_id
        self.is_private = is_private
        self.is_group = is_group
        self.is_channel = is_channel
        self.media = media
        self.is_reply = is_reply
        self.photo = "photo_obj" if media == "photo" else None
        self.document = "doc_obj" if media == "doc" else None
        self.voice = "voice_obj" if media == "voice" else None


# ── FSM TESTS ──
@pytest.mark.asyncio
async def test_fsm_memory_storage():
    class Registration(StatesGroup):
        step_name = State()
        step_age = State()

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


# ── FILTERS TESTS ──
@pytest.mark.asyncio
async def test_filters_text_and_regex():
    t_filter = TextFilter(startswith="!hello", ignore_case=True)
    e1 = MockEvent(text="!Hello world")
    e2 = MockEvent(text="goodbye")

    assert await t_filter(e1) is True
    assert await t_filter(e2) is False

    r_filter = RegexFilter(r"order_\d+")
    assert await r_filter(MockEvent(text="check order_12345 details")) is True
    assert await r_filter(MockEvent(text="no order here")) is False


@pytest.mark.asyncio
async def test_filters_combination():
    f_group = ChatTypeFilter.group()
    f_reply = IsReplyFilter()
    combined = f_group & f_reply

    assert await combined(MockEvent(is_group=True, is_reply=True)) is True
    assert await combined(MockEvent(is_group=True, is_reply=False)) is False
    assert await combined(MockEvent(is_group=False, is_reply=True)) is False


# ── MODERATION TESTS ──
def test_moderation_bad_words():
    bw = PersianBadWordsFilter()
    assert bw.contains_bad_words("سلام چطوری؟") is False
    assert bw.contains_bad_words("این پیام کص می‌باشد") is True
    assert bw.contains_bad_words("این ک‌ص ده است") is True  # zero-width / space normalization


def test_moderation_link_guard():
    lg = LinkGuard(allowed_domains=["splus.ir/botzone"])
    assert lg.has_unallowed_links("به splus.ir/botzone خوش آمدید") is False
    assert lg.has_unallowed_links("به https://t.me/spamchannel بیا") is True
    assert lg.is_invite_link("splus.ir/joinchat/AbCdEf") is True


def test_moderation_group_guard():
    guard = GroupGuard(max_flood_messages=2, flood_period=5.0, max_mentions=2, night_start=25, night_end=26)
    
    # 1. Normal message
    res = guard.inspect_message(chat_id=1, user_id=10, text="سلام بچه ها")
    assert res["is_violation"] is False

    # 2. Tag flood
    res_tag = guard.inspect_message(chat_id=1, user_id=10, text="@u1 @u2 @u3 @u4")
    assert res_tag["is_violation"] is True
    assert res_tag["reason"] == "tag_flood"

    # 3. Flood limit
    guard.inspect_message(chat_id=1, user_id=20, text="msg 1")
    guard.inspect_message(chat_id=1, user_id=20, text="msg 2")
    res_flood = guard.inspect_message(chat_id=1, user_id=20, text="msg 3")
    assert res_flood["is_violation"] is True
    assert res_flood["reason"] == "flood"


# ── PAGINATOR TESTS ──
def test_paginator():
    items = list(range(1, 13))  # 12 items
    pag = Paginator(items, page_size=5)

    assert pag.total_pages == 3
    assert pag.get_page(1) == [1, 2, 3, 4, 5]
    assert pag.get_page(3) == [11, 12]

    keyboard = pag.build_keyboard(current_page=1, callback_prefix="test")
    assert len(keyboard) == 1  # 1 nav row since no item_button_factory
    nav_buttons = keyboard[0]
    assert len(nav_buttons) == 3


# ── AI TESTS ──
def test_redaction_guard():
    token_str = "Bot token: 123456789:abcdefghijklmnopqrstuvwxyz0123456789 and phone 09123456789"
    cleaned = RedactionGuard.sanitize(token_str)
    assert "123456789:abcdefghijkl" not in cleaned
    assert "09123456789" not in cleaned
    assert "[REDACTED]" in cleaned


def test_intent_router():
    router = IntentRouter()
    matched_intents = []

    def rules_handler(m):
        matched_intents.append("rules")

    router.add_default_persian_rules({"rules": rules_handler})

    res = router.match("لطفا قوانین گروه رو نشون بده")
    assert res is not None
    intent_name, handler, match = res
    assert intent_name == "rules"
    handler(match)
    assert matched_intents == ["rules"]
