"""End-to-end tests for the anonymous-chat example bot.

These drive the *real* handlers registered by
``nsplusthon_examples.anon_chat.register`` against a fake client, so the
command routing, profile wizard, relay and anonymity guarantees are all
exercised without a network, a session file or Soroush credentials.
"""

import asyncio
import importlib
import sys
from types import SimpleNamespace

import pytest

from nsplusthon import events
from nsplusthon.anonchat import AnonChatManager, Gender, MemoryProfileStore
from nsplusthon.fsm import MemoryStorage

# The examples directory is not an importable package, so load it by path.
import pathlib
_EXAMPLE = pathlib.Path(__file__).resolve().parents[2] / "nsplusthon_examples" / "anon_chat.py"
sys.path.insert(0, str(_EXAMPLE.parent))
anon_chat = importlib.import_module("anon_chat")


def run(coro):
    return asyncio.run(coro)


# --------------------------------------------------------------------------
# Fakes
# --------------------------------------------------------------------------

class FakeClient:
    """Records sends and replays events through the registered handlers."""

    def __init__(self):
        self.handlers = []
        self.sent = []

    def on(self, builder):
        def decorator(fn):
            self.handlers.append((builder, fn))
            return fn
        return decorator

    async def send_message(self, entity, message="", file=None, buttons=None, **kw):
        self.sent.append({
            "entity": entity, "message": message, "file": file, "buttons": buttons,
        })
        return SimpleNamespace(id=1, chat_id=entity)

    def messages_to(self, user_id):
        return [s["message"] for s in self.sent if s["entity"] == user_id]

    def all_text(self):
        return "\n".join(str(s["message"]) for s in self.sent)

    # -- dispatch -----------------------------------------------------------
    async def send(self, sender_id, text, chat_id=None, media=None):
        event = FakeMessageEvent(self, sender_id, chat_id or sender_id, text, media)
        for builder, handler in self.handlers:
            if not isinstance(builder, events.NewMessage):
                continue
            pattern = getattr(builder, "pattern", None)
            match = None
            if pattern is not None:
                match = pattern(text or "")
                if not match:
                    continue
            event.pattern_match = match
            await handler(event)
        return event

    async def callback(self, sender_id, data):
        payload = data.encode("utf-8") if isinstance(data, str) else data
        event = FakeCallbackEvent(self, sender_id, payload)
        for builder, handler in self.handlers:
            if not isinstance(builder, events.CallbackQuery):
                continue
            matcher = getattr(builder, "match", None)
            if matcher is not None and not matcher(payload):
                continue
            await handler(event)
        return event


class FakeMessageEvent:
    def __init__(self, client, sender_id, chat_id, text, media=None):
        self.client = client
        self.sender_id = sender_id
        self.chat_id = chat_id
        self.raw_text = text
        self.text = text
        self.media = media
        self.pattern_match = None
        self.replies = []

    async def respond(self, text, **kw):
        self.replies.append(text)

    async def reply(self, text, **kw):
        self.replies.append(text)


class FakeCallbackEvent:
    def __init__(self, client, sender_id, data):
        self.client = client
        self.sender_id = sender_id
        self.chat_id = sender_id
        self.data = data
        self.answers = []
        self.edits = []

    async def answer(self, text=None, **kw):
        self.answers.append(text)

    async def edit(self, text=None, **kw):
        self.edits.append(text)


@pytest.fixture
def bot():
    """A freshly registered example bot with an isolated in-memory manager."""
    anon_chat.manager = AnonChatManager(MemoryProfileStore(), min_message_interval=0.0)
    anon_chat.fsm = MemoryStorage()
    anon_chat.LANGS.clear()
    anon_chat.DEFAULT_LANG = "fa"
    client = FakeClient()
    anon_chat.register(client)
    return client


async def complete_profile(bot, user_id, nickname, **overrides):
    """Walk the whole /start wizard for a user."""
    await bot.send(user_id, "/start")
    await bot.send(user_id, overrides.get("nickname", nickname))
    await bot.send(user_id, str(overrides.get("age", 25)))
    await bot.send(user_id, overrides.get("gender", "مرد"))
    await bot.send(user_id, overrides.get("city", "تهران"))
    await bot.send(user_id, overrides.get("bio", "دوست جدید"))
    await bot.send(user_id, overrides.get("interests", "موسیقی، فیلم"))


# --------------------------------------------------------------------------
# Wiring
# --------------------------------------------------------------------------

def test_register_installs_handlers(bot):
    kinds = [type(b).__name__ for b, _ in bot.handlers]
    assert "NewMessage" in kinds and "CallbackQuery" in kinds
    # commands + wizard + relay + callbacks
    assert len(bot.handlers) >= 10


def test_importing_the_example_has_no_side_effects():
    # The module-level manager is in-memory; importing must not create a DB.
    assert isinstance(anon_chat.manager.store, MemoryProfileStore)


# --------------------------------------------------------------------------
# Profile wizard
# --------------------------------------------------------------------------

def test_wizard_creates_a_complete_profile(bot):
    async def go():
        await complete_profile(bot, 101, "سارا", gender="زن")
        profile = await anon_chat.manager.get_profile(101)
        assert profile.nickname == "سارا"
        assert profile.age == 25
        assert profile.gender == Gender.FEMALE
        assert profile.city == "تهران"
        assert profile.bio == "دوست جدید"
        assert profile.interests == ["موسیقی", "فیلم"]
        assert profile.is_complete
    run(go())


def test_wizard_rejects_bad_age_and_asks_again(bot):
    async def go():
        await bot.send(102, "/start")
        await bot.send(102, "رضا")
        bad = await bot.send(102, "999")
        assert any("۱۳" in r or "13" in r for r in bad.replies), bad.replies
        # still waiting for age, so the next valid value is accepted
        await bot.send(102, "30")
        profile = await anon_chat.manager.get_profile(102)
        assert profile.age == 30
        assert profile.nickname == "رضا"
    run(go())


def test_wizard_rejects_unknown_gender(bot):
    async def go():
        await bot.send(103, "/start")
        await bot.send(103, "نیما")
        await bot.send(103, "22")
        res = await bot.send(103, "فضایی")
        assert any(anon_chat.tr("fa", "gender_invalid") in r for r in res.replies)
        profile = await anon_chat.manager.get_profile(103)
        assert profile.gender == Gender.UNSPECIFIED
    run(go())


def test_start_with_existing_profile_shows_the_card(bot):
    async def go():
        await complete_profile(bot, 104, "مریم", gender="زن")
        bot.sent.clear()
        ev = await bot.send(104, "/start")
        assert any("مریم" in r for r in ev.replies)
    run(go())


# --------------------------------------------------------------------------
# Matching + relay
# --------------------------------------------------------------------------

def test_search_queues_first_user_and_matches_second(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")

        first = await bot.send(1, "/search")
        assert any("صف" in r for r in first.replies), first.replies

        bot.sent.clear()
        await bot.send(2, "/search")

        # both sides were told they matched, each seeing the OTHER's nickname
        to_1 = "\n".join(bot.messages_to(1))
        to_2 = "\n".join(bot.messages_to(2))
        assert "سارا" in to_1
        assert "علی" in to_2
        assert anon_chat.manager.stats()["active_chats"] == 1
    run(go())


def test_match_announcement_never_shows_your_own_card(bot):
    """Regression: each side used to be shown their own profile card."""
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        bot.sent.clear()
        await bot.send(2, "/search")

        to_2 = "\n".join(bot.messages_to(2))
        assert "علی" in to_2, "user 2 must see user 1's nickname"
        assert "سارا" not in to_2, "user 2 must NOT be shown their own card"
    run(go())


def test_relay_forwards_text_both_ways(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        bot.sent.clear()
        await bot.send(2, "/search")
        bot.sent.clear()

        await bot.send(1, "سلام خوبی؟")
        assert bot.messages_to(2) == ["سلام خوبی؟"]

        bot.sent.clear()
        await bot.send(2, "سلام، ممنون")
        assert bot.messages_to(1) == ["سلام، ممنون"]
    run(go())


def test_relay_media_is_resent_not_forwarded(bot):
    """A forward would carry the original sender's identity."""
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        await bot.send(2, "/search")
        bot.sent.clear()

        media = SimpleNamespace(file_id="abc123")
        await bot.send(1, "", media=media)
        assert len(bot.sent) == 1
        assert bot.sent[0]["file"] is media
        assert bot.sent[0]["entity"] == 2
    run(go())


def test_relay_blocks_links_and_tells_the_sender(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        await bot.send(2, "/search")
        bot.sent.clear()

        ev = await bot.send(1, "بیا https://t.me/spam")
        assert bot.messages_to(2) == [], "the link must not reach the partner"
        assert any(anon_chat.tr("fa", "link_blocked") in r for r in ev.replies)
    run(go())


def test_commands_are_not_relayed(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        await bot.send(2, "/search")
        bot.sent.clear()

        await bot.send(1, "/profile")
        assert bot.messages_to(2) == []
    run(go())


def test_stop_notifies_the_partner(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        await bot.send(2, "/search")
        bot.sent.clear()

        await bot.send(1, "/stop")
        assert any(anon_chat.tr("fa", "partner_left") in m for m in bot.messages_to(2))
        assert anon_chat.manager.stats()["active_chats"] == 0
    run(go())


def test_search_while_already_in_chat_is_refused(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        await bot.send(2, "/search")
        ev = await bot.send(2, "/search")
        assert any(anon_chat.tr("fa", "already_in_chat") in r for r in ev.replies)
    run(go())


# --------------------------------------------------------------------------
# Rating, reporting, blocking
# --------------------------------------------------------------------------

def test_rate_command_scores_the_partner(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        await bot.send(2, "/search")

        ev = await bot.send(1, "/rate 5")
        assert any(anon_chat.tr("fa", "rating_saved") in r for r in ev.replies)
        partner = await anon_chat.manager.get_profile(2)
        assert partner.rating == 5.0
    run(go())


def test_rate_without_argument_asks_for_one(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        await bot.send(2, "/search")
        ev = await bot.send(1, "/rate")
        assert any(anon_chat.tr("fa", "ask_rating") in r for r in ev.replies)
    run(go())


def test_block_command_ends_the_chat(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        await bot.send(2, "/search")
        bot.sent.clear()

        ev = await bot.send(1, "/block")
        assert any(anon_chat.tr("fa", "blocked") in r for r in ev.replies)
        assert any(anon_chat.tr("fa", "partner_left") in m for m in bot.messages_to(2))
        profile = await anon_chat.manager.get_profile(1)
        assert 2 in profile.blocked
    run(go())


def test_report_command(bot):
    async def go():
        anon_chat.manager.reports_to_ban = 5
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        await bot.send(2, "/search")

        ev = await bot.send(1, "/report")
        assert any(anon_chat.tr("fa", "report_sent") in r for r in ev.replies)
    run(go())


# --------------------------------------------------------------------------
# Inline buttons
# --------------------------------------------------------------------------

def test_callback_stop_button_ends_the_chat(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        await bot.send(2, "/search")
        bot.sent.clear()

        ev = await bot.callback(1, "anon:stop")
        assert any(anon_chat.tr("fa", "you_left") in e for e in ev.edits)
        assert any(anon_chat.tr("fa", "partner_left") in m for m in bot.messages_to(2))
    run(go())


def test_callback_profile_button_shows_the_partner_anonymously(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await complete_profile(bot, 2, "سارا", gender="زن")
        await bot.send(1, "/search")
        await bot.send(2, "/search")

        ev = await bot.callback(1, "anon:profile")
        card = "\n".join(a for a in ev.answers if a)
        assert "سارا" in card, "should see the partner's card while in chat"
        assert "2" != card and "\n2\n" not in card
    run(go())


def test_callback_next_button_finds_someone_new(bot):
    async def go():
        for uid, nick, gender in ((1, "علی", "مرد"), (2, "سارا", "زن"), (3, "رضا", "مرد")):
            await complete_profile(bot, uid, nick, gender=gender)
        await bot.send(1, "/search")
        await bot.send(2, "/search")
        await bot.send(3, "/search")

        bot.sent.clear()
        await bot.callback(1, "anon:next")
        # 1 left user 2 and was paired with the waiting user 3
        assert any("رضا" in m for m in bot.messages_to(1))
    run(go())


def test_unrelated_callback_data_is_ignored(bot):
    async def go():
        ev = await bot.callback(1, "other:thing")
        assert ev.answers == [] and ev.edits == []
    run(go())


# --------------------------------------------------------------------------
# Language + anonymity
# --------------------------------------------------------------------------

def test_lang_command_switches_language(bot):
    async def go():
        await bot.send(7, "/lang en")
        assert anon_chat.LANGS[7] == "en"
        ev = await bot.send(7, "/stats")
        assert any("Stats" in r for r in ev.replies)
    run(go())


def test_stats_command_reports_counters(bot):
    async def go():
        await complete_profile(bot, 1, "علی")
        await bot.send(1, "/search")
        ev = await bot.send(1, "/stats")
        text = "\n".join(ev.replies)
        assert "۱" in text or "1" in text
    run(go())


def test_no_message_ever_leaks_an_internal_user_id(bot):
    """The whole point of the feature: partners see nicknames, never ids."""
    async def go():
        await complete_profile(bot, 1000001, "علی")
        await complete_profile(bot, 2000002, "سارا", gender="زن")
        await bot.send(1000001, "/search")
        await bot.send(2000002, "/search")
        await bot.send(1000001, "سلام")
        await bot.callback(1000001, "anon:profile")

        blob = bot.all_text()
        assert "1000001" not in blob
        assert "2000002" not in blob
    run(go())
