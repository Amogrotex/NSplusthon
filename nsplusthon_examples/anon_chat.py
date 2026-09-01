"""Anonymous chat bot: find a random friend and talk without revealing who you are.

A complete bot built on :mod:`nsplusthon.anonchat`. Users create an
anonymous profile (nickname, age, city, interests, optional photo), get
paired with someone compatible, and chat through the bot. Real names and
usernames are never read, stored or forwarded.

Run it::

    python -m nsplusthon_examples.anon_chat          # needs a session/api id
    # or, for a bot account:
    SPLUS_BOT_TOKEN=123456:ABC-DEF... python -m nsplusthon_examples.anon_chat

Environment:
    ANON_DB_PATH     profile database   (default: anon_profiles.db)
    ANON_LANG        default language   (fa | en, default: fa)
    ANON_REPORTS_TO_BAN   reports before an auto-ban (default: 3)

Commands:
    /start            welcome + create a profile
    /profile          view or edit your anonymous profile
    /search           find a chat partner
    /next             leave and find someone new
    /stop             leave the chat
    /rate <1-5>       rate your last partner
    /report           report your partner
    /block            never be matched with your last partner again
    /lang <fa|en>     switch language
    /stats            queue and chat counters
"""

from __future__ import annotations

import logging
import os
import sys

from nsplusthon import Button, SoroushClient, events
from nsplusthon.anonchat import (
    AnonChatManager,
    Gender,
    MemoryProfileStore,
    SQLiteProfileStore,
    inline_keyboard,
    render_profile_card,
    tr,
)
from nsplusthon.fsm import MemoryStorage, State, StatesGroup

logging.basicConfig(level=logging.WARNING)

# --------------------------------------------------------------------------
# Setup
# --------------------------------------------------------------------------

DB_PATH = os.environ.get("ANON_DB_PATH", "anon_profiles.db")
DEFAULT_LANG = os.environ.get("ANON_LANG", "fa").lower()

# Importing this module must not touch the filesystem, so the default store is
# in-memory; main() swaps in SQLite, and tests can inject their own manager.
manager: AnonChatManager = AnonChatManager(MemoryProfileStore())
fsm: MemoryStorage = MemoryStorage()

# Per-user language choice. Kept out of the profile store on purpose: it is a
# UI preference, and mixing it in would leak it into the partner-facing card.
LANGS: dict[int, str] = {}


def lang_of(user_id: int) -> str:
    return LANGS.get(user_id, DEFAULT_LANG)


class ProfileSetup(StatesGroup):
    nickname = State()
    age = State()
    gender = State()
    city = State()
    bio = State()
    interests = State()


# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------

def as_buttons(lang: str, in_chat: bool):
    """Turn the module's plain button specs into real inline buttons."""
    rows = inline_keyboard(lang, in_chat=in_chat)
    # Two per row keeps the keyboard compact on a phone.
    buttons = [Button.inline(b["text"], b["callback_data"]) for b in rows]
    return [buttons[i:i + 2] for i in range(0, len(buttons), 2)]


async def notify_partner_left(client, partner_id: int) -> None:
    lang = lang_of(partner_id)
    await client.send_message(
        partner_id,
        tr(lang, "partner_left"),
        buttons=as_buttons(lang, in_chat=False),
    )


async def announce_match(client, user_id: int, partner) -> None:
    lang = lang_of(user_id)
    await client.send_message(
        user_id,
        tr(lang, "matched", nickname=partner.nickname),
        buttons=as_buttons(lang, in_chat=True),
    )
    await client.send_message(user_id, render_profile_card(partner, lang))


# --------------------------------------------------------------------------
# Commands
# --------------------------------------------------------------------------

def register(client: SoroushClient) -> None:
    """Attach every handler to ``client``.

    Kept as a function (rather than module-level decorators) so the client is
    only constructed when the bot actually runs, which keeps this module safe
    to import from tests.
    """

    @client.on(events.NewMessage(pattern=r"^/start$"))
    async def cmd_start(event):
        uid = event.sender_id
        lang = lang_of(uid)
        profile = await manager.ensure_profile(uid)
        if manager.is_banned(uid):
            await event.respond(tr(lang, "banned"))
            return
        if not profile.is_complete:
            ctx = fsm.get_context(user_id=uid, chat_id=event.chat_id)
            await ctx.set_state(ProfileSetup.nickname)
            await event.respond(tr(lang, "welcome"))
            await event.respond(tr(lang, "need_profile"))
        else:
            await event.respond(
                render_profile_card(profile, lang),
                buttons=as_buttons(lang, in_chat=False),
            )

    # -- profile wizard -----------------------------------------------------
    @client.on(events.NewMessage(incoming=True))
    async def profile_wizard(event):
        uid = event.sender_id
        ctx = fsm.get_context(user_id=uid, chat_id=event.chat_id)
        state = await ctx.get_state()
        if state is None:
            return
        lang = lang_of(uid)
        text = (event.raw_text or "").strip()

        # A command is never a wizard answer. Every matching handler sees the
        # same update in registration order, so without this guard the very
        # "/start" that opened the wizard would be swallowed as the nickname
        # (and "/stop" typed mid-wizard would become someone's city).
        if text.startswith("/"):
            return

        if state == ProfileSetup.nickname.name:
            profile, res = await manager.update_profile(uid, nickname=text)
            if profile is None:
                await event.respond(tr(lang, res.field_errors.get("nickname", "nickname_required")))
                return
            await ctx.set_state(ProfileSetup.age)
            await event.respond(tr(lang, "ask_age"))

        elif state == ProfileSetup.age.name:
            profile, res = await manager.update_profile(uid, age=text)
            if profile is None:
                await event.respond(tr(lang, res.field_errors.get("age", "age_invalid")))
                return
            await ctx.set_state(ProfileSetup.gender)
            await event.respond(tr(lang, "ask_gender"))

        elif state == ProfileSetup.gender.name:
            mapping = {
                tr(lang, "gender_male").lower(): Gender.MALE,
                tr(lang, "gender_female").lower(): Gender.FEMALE,
                tr(lang, "gender_other").lower(): Gender.OTHER,
                "male": Gender.MALE, "female": Gender.FEMALE, "other": Gender.OTHER,
                "m": Gender.MALE, "f": Gender.FEMALE,
                "مرد": Gender.MALE, "زن": Gender.FEMALE,
            }
            gender = mapping.get(text.lower())
            if gender is None:
                await event.respond(tr(lang, "gender_invalid"))
                return
            await manager.update_profile(uid, gender=gender)
            await ctx.set_state(ProfileSetup.city)
            await event.respond(tr(lang, "ask_city"))

        elif state == ProfileSetup.city.name:
            await manager.update_profile(uid, city=text)
            await ctx.set_state(ProfileSetup.bio)
            await event.respond(tr(lang, "ask_bio"))

        elif state == ProfileSetup.bio.name:
            await manager.update_profile(uid, bio=text)
            await ctx.set_state(ProfileSetup.interests)
            await event.respond(tr(lang, "ask_interests"))

        elif state == ProfileSetup.interests.name:
            profile, res = await manager.update_profile(uid, interests=text)
            if profile is None:
                await event.respond(tr(lang, res.field_errors.get("interests", "interests_invalid")))
                return
            await ctx.finish()
            await event.respond(tr(lang, "profile_saved"))
            await event.respond(
                render_profile_card(profile, lang),
                buttons=as_buttons(lang, in_chat=False),
            )

    # -- searching ----------------------------------------------------------
    @client.on(events.NewMessage(pattern=r"^/(search|next)$"))
    async def cmd_search(event):
        uid = event.sender_id
        lang = lang_of(uid)
        result = await manager.start_search(uid) if event.raw_text.strip() == "/search" \
            else await manager.next_partner(uid)

        if result.matched:
            await announce_match(client, uid, result.partner)
            other = result.session.partner_of(uid)
            # Show the *other* side who they are talking to -- not themselves.
            await announce_match(client, other, await manager.get_profile(uid))
        elif result.status == "queued":
            await event.respond(
                tr(lang, "queued", position=result.queue_position),
                buttons=as_buttons(lang, in_chat=False),
            )
        elif result.status == "needs_profile":
            await event.respond(tr(lang, "need_profile"))
        elif result.status == "banned":
            await event.respond(tr(lang, "banned"))
        elif result.status == "already_searching":
            await event.respond(tr(lang, "queued", position=result.queue_position))
        elif result.status == "in_chat":
            await event.respond(tr(lang, "already_in_chat"))

    @client.on(events.NewMessage(pattern=r"^/stop$"))
    async def cmd_stop(event):
        uid = event.sender_id
        lang = lang_of(uid)
        session = await manager.stop_chat(uid)
        await event.respond(tr(lang, "you_left"), buttons=as_buttons(lang, in_chat=False))
        if session is not None:
            partner = session.partner_of(uid)
            if partner is not None:
                await notify_partner_left(client, partner)

    # -- profile / rating / reporting --------------------------------------
    @client.on(events.NewMessage(pattern=r"^/profile$"))
    async def cmd_profile(event):
        uid = event.sender_id
        lang = lang_of(uid)
        profile = await manager.get_profile(uid)
        await event.respond(
            render_profile_card(profile, lang),
            buttons=as_buttons(lang, in_chat=False),
        )

    @client.on(events.NewMessage(pattern=r"^/rate(?:\s+(\d))?$"))
    async def cmd_rate(event):
        uid = event.sender_id
        lang = lang_of(uid)
        stars = (event.pattern_match.group(1) if event.pattern_match else None)
        if not stars:
            await event.respond(tr(lang, "ask_rating"))
            return
        if await manager.rate_partner(uid, int(stars)):
            await event.respond(tr(lang, "rating_saved"))
        else:
            await event.respond(tr(lang, "not_in_chat"))

    @client.on(events.NewMessage(pattern=r"^/report$"))
    async def cmd_report(event):
        uid = event.sender_id
        lang = lang_of(uid)
        result = await manager.report(uid)
        if not result.accepted:
            await event.respond(tr(lang, "not_in_chat"))
            return
        await event.respond(
            tr(lang, "report_banned" if result.target_banned else "report_sent")
        )
        # If the report tipped them over into a ban, their chat was torn down
        # mid-conversation -- tell the other side why.
        if result.target_banned and result.evicted_partner not in (None, uid):
            await notify_partner_left(client, result.evicted_partner)

    @client.on(events.NewMessage(pattern=r"^/block$"))
    async def cmd_block(event):
        uid = event.sender_id
        lang = lang_of(uid)
        session = manager.sessions.for_user(uid)
        target = session.partner_of(uid) if session else None
        if target is None:
            await event.respond(tr(lang, "not_in_chat"))
            return
        if await manager.block(uid, target):
            await event.respond(tr(lang, "blocked"))
            await notify_partner_left(client, target)

    @client.on(events.NewMessage(pattern=r"^/lang(?:\s+(fa|en))?$"))
    async def cmd_lang(event):
        uid = event.sender_id
        chosen = (event.pattern_match.group(1) if event.pattern_match else None)
        if chosen:
            LANGS[uid] = chosen
        lang = lang_of(uid)
        await event.respond(tr(lang, "lang_set"))

    @client.on(events.NewMessage(pattern=r"^/stats$"))
    async def cmd_stats(event):
        lang = lang_of(event.sender_id)
        stats = await manager.full_stats()
        await event.respond(tr(
            lang, "stats",
            waiting=stats["waiting"],
            chats=stats["active_chats"],
            profiles=stats["profiles"],
            messages=stats["messages"],
        ))

    # -- inline buttons -----------------------------------------------------
    @client.on(events.CallbackQuery(pattern=r"^anon:"))
    async def on_button(event):
        uid = event.sender_id
        lang = lang_of(uid)
        data = event.data
        data = data.decode("utf-8", "ignore") if isinstance(data, (bytes, bytearray)) else str(data)
        action = data.split(":", 1)[-1]

        if action == "next":
            result = await manager.next_partner(uid)
            if result.matched:
                await announce_match(client, uid, result.partner)
                other = result.session.partner_of(uid)
                await announce_match(client, other, await manager.get_profile(uid))
            else:
                await event.answer(tr(lang, "queued", position=result.queue_position))
        elif action == "stop":
            session = await manager.stop_chat(uid)
            await event.edit(tr(lang, "you_left"))
            if session is not None:
                partner = session.partner_of(uid)
                if partner is not None:
                    await notify_partner_left(client, partner)
        elif action == "profile":
            session = manager.sessions.for_user(uid)
            target = session.partner_of(uid) if session else uid
            profile = await manager.get_profile(target)
            # The card is anonymous by construction: nickname only.
            await event.answer(render_profile_card(profile, lang))
        elif action == "rate":
            await event.answer(tr(lang, "ask_rating"))
        elif action == "report":
            result = await manager.report(uid)
            await event.answer(
                tr(lang, "report_banned" if result.target_banned else "report_sent")
                if result.accepted else tr(lang, "not_in_chat")
            )

    # -- relay: everything that is not a command ---------------------------
    @client.on(events.NewMessage(incoming=True))
    async def relay_message(event):
        text = event.raw_text or ""
        if text.startswith("/"):
            return  # commands are handled above

        uid = event.sender_id
        session = manager.sessions.for_user(uid)
        if session is None:
            return  # not in an anonymous chat; ignore silently

        has_media = bool(getattr(event, "media", None))
        result = await manager.relay(uid, text=text or None, has_media=has_media)

        if result.delivered:
            if has_media:
                # Re-send the media as a *new* message rather than forwarding
                # it: a forward carries the original sender's identity, which
                # would break anonymity.
                await client.send_message(result.to, file=event.media)
            elif result.text:
                await client.send_message(result.to, result.text)
            return

        lang = lang_of(uid)
        if result.reason == AnonChatManager.REASON_FLOOD:
            await event.respond(tr(lang, "flood"))
        elif result.reason == AnonChatManager.REASON_LINK:
            await event.respond(tr(lang, "link_blocked"))
        elif result.reason == AnonChatManager.REASON_PROFANITY:
            await event.respond(tr(lang, "profanity_blocked"))
        elif result.reason == AnonChatManager.REASON_BANNED:
            await event.respond(tr(lang, "banned"))

def main() -> None:
    global manager
    # Real runs persist profiles; the in-memory default only exists so that
    # importing this module has no side effects.
    manager = AnonChatManager(
        SQLiteProfileStore(DB_PATH),
        reports_to_ban=int(os.environ.get("ANON_REPORTS_TO_BAN", "3")),
    )
    client = SoroushClient(os.environ.get("SPLUS_SESSION", "anon_chat_session"))
    register(client)
    token = os.environ.get("SPLUS_BOT_TOKEN")
    print("Anonymous chat bot starting (Ctrl+C to stop)…", file=sys.stderr)
    if token:
        client.start(bot_token=token)
    else:
        client.start()
    client.run_until_disconnected()


if __name__ == "__main__":
    main()
