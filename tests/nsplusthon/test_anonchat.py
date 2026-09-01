"""Tests for the anonymous-chat extension (nsplusthon.anonchat).

These exercise the real classes; the only stand-ins are an injectable
clock and an in-memory/SQLite profile store, so no client or network is
involved -- matching how the rest of the suite tests moderation/fsm.
"""

import asyncio

import pytest

from nsplusthon.anonchat import (
    STRINGS,
    AnonChatManager,
    AnonProfile,
    Gender,
    MatchMaker,
    MatchPrefs,
    MemoryProfileStore,
    SessionManager,
    SQLiteProfileStore,
    inline_keyboard,
    render_profile_card,
    tr,
)


class FakeClock:
    """Monotonic clock the tests can advance by hand."""

    def __init__(self, start: float = 1_000_000.0) -> None:
        self.t = start

    def __call__(self) -> float:
        return self.t

    def advance(self, seconds: float) -> None:
        self.t += seconds


def run(coro):
    return asyncio.get_event_loop().run_until_complete(coro) if False else asyncio.run(coro)


async def _profile(manager, user_id, nickname=None, **kw):
    """Create and persist a usable profile."""
    fields = {"nickname": nickname or f"user{user_id}"}
    fields.update(kw)
    profile, result = await manager.update_profile(user_id, **fields)
    assert result.ok, result.field_errors
    return profile


def make_manager(**kw):
    kw.setdefault("clock", FakeClock())
    return AnonChatManager(**kw)


# --------------------------------------------------------------------------
# Validation
# --------------------------------------------------------------------------

def test_validate_accepts_good_profile():
    res = AnonChatManager.validate(
        nickname="سارا", age=24, gender=Gender.FEMALE, city="Tehran",
        bio="hi", interests=["music", "film"],
    )
    assert res.ok
    assert res.field_errors == {}


def test_validate_rejects_empty_and_long_nickname():
    assert AnonChatManager.validate(nickname="").field_errors["nickname"] == "nickname_required"
    assert AnonChatManager.validate(nickname="   ").field_errors["nickname"] == "nickname_required"
    assert AnonChatManager.validate(nickname="x" * 33).field_errors["nickname"] == "nickname_too_long"


def test_validate_strips_zero_width_chars_from_nickname():
    # Invisible direction/zero-width marks should not survive into a nickname.
    res = AnonChatManager.validate(nickname="ali\u200b\u200e")
    assert res.ok


def test_validate_age_bounds():
    assert AnonChatManager.validate(age=12).field_errors["age"] == "age_out_of_range"
    assert AnonChatManager.validate(age=100).field_errors["age"] == "age_out_of_range"
    assert AnonChatManager.validate(age="abc").field_errors["age"] == "age_invalid"
    assert AnonChatManager.validate(age=13).ok
    assert AnonChatManager.validate(age=99).ok


def test_validate_gender():
    assert AnonChatManager.validate(gender="alien").field_errors["gender"] == "gender_invalid"
    for g in Gender.ALL:
        assert AnonChatManager.validate(gender=g).ok


def test_validate_bio_and_city_length():
    assert AnonChatManager.validate(bio="b" * 301).field_errors["bio"] == "bio_too_long"
    assert AnonChatManager.validate(city="c" * 41).field_errors["city"] == "city_too_long"


def test_validate_interests_count_and_splitting():
    assert AnonChatManager.validate(
        interests=["a"] * 9
    ).field_errors["interests"] == "too_many_interests"
    assert AnonChatManager.validate(interests=["x" * 25]).field_errors["interests"] == "interest_too_long"
    # Persian + latin comma separated strings are accepted.
    assert AnonChatManager.validate(interests="music, film، book").ok


def test_validate_prefs_inverted_age_range():
    prefs = MatchPrefs(age_min=40, age_max=20)
    assert AnonChatManager.validate(prefs=prefs).field_errors["prefs"] == "age_range_inverted"


def test_update_profile_rejects_and_persists_nothing():
    async def go():
        m = make_manager()
        profile, res = await m.update_profile(1, nickname="", age=200)
        assert profile is None
        assert not res.ok
        # Nothing stored, and the auto-created stub is still incomplete.
        stored = await m.get_profile(1)
        assert not stored.is_complete
        assert stored.age == 0
    run(go())


def test_update_profile_dedupes_interests_case_insensitively():
    async def go():
        m = make_manager()
        profile, _ = await m.update_profile(1, nickname="a", interests=["Music", "music", "FILM", "music"])
        assert profile.interests == ["Music", "FILM"]
    run(go())


# --------------------------------------------------------------------------
# Stores
# --------------------------------------------------------------------------

def test_memory_store_roundtrip():
    async def go():
        store = MemoryProfileStore()
        assert await store.get(7) is None
        p = AnonProfile(user_id=7, nickname="n", interests=["a"], blocked={3, 4})
        await store.save(p)
        got = await store.get(7)
        assert got.nickname == "n"
        assert got.blocked == {3, 4}
        assert list(await store.ids()) == [7]
        assert await store.count() == 1
        assert await store.delete(7) is True
        assert await store.delete(7) is False
    run(go())


def test_sqlite_store_roundtrip(tmp_path):
    async def go():
        store = SQLiteProfileStore(str(tmp_path / "p.db"))
        prefs = MatchPrefs(gender=Gender.FEMALE, age_min=20, age_max=30,
                           require_shared_interest=True)
        await store.save(AnonProfile(
            user_id=42, nickname="ناشناس", age=25, gender=Gender.MALE,
            city="تهران", bio="سلام", interests=["موسیقی", "film"],
            prefs=prefs, blocked={9}, rating_total=9, rating_count=2,
        ))
        got = await store.get(42)
        assert got is not None
        assert got.nickname == "ناشناس"
        assert got.city == "تهران"
        assert got.interests == ["موسیقی", "film"]
        assert got.prefs.gender == Gender.FEMALE
        assert got.prefs.require_shared_interest is True
        assert got.blocked == {9}
        assert got.rating == 4.5
        assert list(await store.ids()) == [42]

        # upsert overwrites rather than duplicating
        got.bio = "changed"
        await store.save(got)
        again = await store.get(42)
        assert again.bio == "changed"
        assert await store.count() == 1
    run(go())


def test_profile_json_roundtrip_is_lossless():
    p = AnonProfile(user_id=1, nickname="n", age=30, gender=Gender.OTHER,
                    interests=["a"], prefs=MatchPrefs(gender=Gender.MALE),
                    blocked={2}, rating_total=4, rating_count=1)
    import json
    q = AnonProfile.from_dict(json.loads(json.dumps(p.to_dict())))
    assert q.to_dict() == p.to_dict()


# --------------------------------------------------------------------------
# Matchmaker
# --------------------------------------------------------------------------

def test_score_rewards_shared_interests_and_preferences():
    mm = MatchMaker()
    a = AnonProfile(user_id=1, nickname="a", age=25, gender=Gender.MALE,
                    interests=["music", "film", "code"],
                    prefs=MatchPrefs(gender=Gender.FEMALE, age_min=20, age_max=30))
    b = AnonProfile(user_id=2, nickname="b", age=26, gender=Gender.FEMALE,
                    interests=["music", "film"],
                    prefs=MatchPrefs(gender=Gender.MALE, age_min=20, age_max=30))
    c = AnonProfile(user_id=3, nickname="c", age=50, gender=Gender.MALE, interests=[])
    assert mm.score(a, b) > mm.score(a, c)
    assert mm.score(a, b) >= mm.weights["gender_match"] * 2 + mm.weights["shared_interest"] * 2


def test_hard_filters_block_ineligible_candidates():
    mm = MatchMaker()
    a = AnonProfile(user_id=1, nickname="a", gender=Gender.MALE,
                    prefs=MatchPrefs(gender=Gender.FEMALE))
    male = AnonProfile(user_id=2, nickname="m", gender=Gender.MALE)
    female = AnonProfile(user_id=3, nickname="f", gender=Gender.FEMALE)
    assert mm.is_eligible(a, male) is False
    assert mm.is_eligible(a, female) is True
    # self never matches self
    assert mm.is_eligible(a, a) is False


def test_age_preference_is_enforced():
    mm = MatchMaker()
    a = AnonProfile(user_id=1, nickname="a", prefs=MatchPrefs(age_min=20, age_max=25))
    young = AnonProfile(user_id=2, nickname="y", age=17)
    inrange = AnonProfile(user_id=3, nickname="i", age=22)
    assert mm.is_eligible(a, young) is False
    assert mm.is_eligible(a, inrange) is True


def test_blocked_users_never_match_either_direction():
    mm = MatchMaker()
    a = AnonProfile(user_id=1, nickname="a", blocked={2})
    b = AnonProfile(user_id=2, nickname="b")
    assert mm.is_eligible(a, b) is False
    b2 = AnonProfile(user_id=3, nickname="b", blocked={1})
    assert mm.is_eligible(a, b2) is False


def test_require_shared_interest():
    mm = MatchMaker()
    a = AnonProfile(user_id=1, nickname="a", interests=["chess"],
                    prefs=MatchPrefs(require_shared_interest=True))
    other = AnonProfile(user_id=2, nickname="o", interests=["tennis"])
    same = AnonProfile(user_id=3, nickname="s", interests=["Chess"])  # case-insensitive
    assert mm.is_eligible(a, other) is False
    assert mm.is_eligible(a, same) is True


def test_find_partner_prefers_high_score():
    mm = MatchMaker(rng=__import__("random").Random(0))
    me = AnonProfile(user_id=1, nickname="me", age=25, gender=Gender.MALE,
                     interests=["music", "film", "art"],
                     prefs=MatchPrefs(gender=Gender.FEMALE, age_min=20, age_max=30))
    weak = AnonProfile(user_id=2, nickname="w", age=40, gender=Gender.MALE)
    strong = AnonProfile(user_id=3, nickname="s", age=24, gender=Gender.FEMALE,
                         interests=["music", "film", "art"],
                         prefs=MatchPrefs(gender=Gender.MALE, age_min=20, age_max=30))
    assert mm.find_partner(me, [weak, strong]).user_id == 3


def test_avoid_previous_partners_falls_back_when_pool_is_small():
    mm = MatchMaker(rng=__import__("random").Random(0))
    me = AnonProfile(user_id=1, nickname="me", prefs=MatchPrefs(avoid_previous_partners=True))
    only = AnonProfile(user_id=2, nickname="only")
    history = {(1, 2)}
    # Would be filtered out, but it is the only option -> rematch instead of hang.
    assert mm.find_partner(me, [only], history=history).user_id == 2


def test_avoid_previous_partners_picks_someone_new_when_possible():
    mm = MatchMaker(rng=__import__("random").Random(0))
    me = AnonProfile(user_id=1, nickname="me", prefs=MatchPrefs(avoid_previous_partners=True))
    old = AnonProfile(user_id=2, nickname="old")
    new = AnonProfile(user_id=3, nickname="new")
    got = mm.find_partner(me, [old, new], history={(1, 2)})
    assert got.user_id == 3


def test_avoid_previous_disabled_allows_rematch_immediately():
    mm = MatchMaker(rng=__import__("random").Random(0))
    me = AnonProfile(user_id=1, nickname="me",
                     prefs=MatchPrefs(avoid_previous_partners=False))
    old = AnonProfile(user_id=2, nickname="old")
    assert mm.find_partner(me, [old], history={(1, 2)}).user_id == 2


def test_queue_fifo_position_and_purge():
    clock = FakeClock()
    mm = MatchMaker(max_queue_age=100, clock=clock)
    mm.enqueue(1)
    clock.advance(1)
    mm.enqueue(2)
    clock.advance(1)
    mm.enqueue(3)
    assert mm.position_of(1) == 1
    assert mm.position_of(2) == 2
    assert mm.position_of(3) == 3
    assert mm.position_of(99) == 0
    assert len(mm) == 3
    clock.advance(200)
    assert sorted(mm.purge_stale(clock())) == [1, 2, 3]
    assert len(mm) == 0


# --------------------------------------------------------------------------
# Sessions
# --------------------------------------------------------------------------

def test_session_manager_open_close_and_history():
    sm = SessionManager()
    s = sm.open_session(1, 2)
    assert s.partner_of(1) == 2 and s.partner_of(2) == 1
    assert s.partner_of(3) is None
    assert sm.active_count == 1
    assert sm.for_user(1) is s

    closed = sm.close_session(1)
    assert closed is s and not closed.is_open
    assert sm.for_user(1) is None and sm.for_user(2) is None
    assert sm.active_count == 0
    assert (1, 2) in sm.history_pairs()


def test_opening_a_new_session_closes_the_old_one():
    sm = SessionManager()
    first = sm.open_session(1, 2)
    second = sm.open_session(1, 3)
    assert first is not second
    assert not first.is_open
    assert sm.for_user(2) is None
    assert sm.for_user(3) is second


def test_session_message_counts_and_key():
    sm = SessionManager()
    s = sm.open_session(1, 2)
    s.record_message(1)
    s.record_message(1)
    s.record_message(2)
    assert s.messages == {1: 2, 2: 1}
    assert s.total_messages == 3
    assert isinstance(s.key, int)


# --------------------------------------------------------------------------
# Manager: search flow
# --------------------------------------------------------------------------

def test_search_without_profile_is_rejected():
    async def go():
        m = make_manager()
        res = await m.start_search(1)
        assert res.status == "needs_profile"
    run(go())


def test_first_user_is_queued_second_gets_matched():
    async def go():
        m = make_manager()
        await _profile(m, 1, "ali")
        await _profile(m, 2, "sara")

        r1 = await m.start_search(1)
        assert r1.status == "queued" and r1.queue_position == 1

        r2 = await m.start_search(2)
        assert r2.status == "matched"
        assert r2.partner.user_id == 1
        assert r2.session.participants() == (2, 1)
        # Queue drained, one chat open.
        assert m.queue_size == 0
        assert m.stats()["active_chats"] == 1
        assert m.stats()["matches"] == 1
    run(go())


def test_search_while_already_queued_reports_position():
    async def go():
        m = make_manager()
        await _profile(m, 1, "a")
        await _profile(m, 2, "b")
        assert (await m.start_search(1)).status == "queued"
        again = await m.start_search(1)
        assert again.status == "already_searching"
        assert again.queue_position == 1
        assert m.queue_size == 1
    run(go())


def test_search_while_in_chat_is_rejected():
    async def go():
        m = make_manager()
        await _profile(m, 1, "a")
        await _profile(m, 2, "b")
        await m.start_search(1)
        assert (await m.start_search(2)).matched
        res = await m.start_search(2)
        assert res.status == "in_chat"
    run(go())


def test_banned_user_cannot_search():
    async def go():
        m = make_manager()
        await _profile(m, 1, "a")
        m.ban(1, seconds=60, reason="test")
        assert (await m.start_search(1)).status == "banned"
    run(go())


def test_ban_expires_with_the_clock():
    clock = FakeClock()
    m = make_manager(clock=clock)
    m.ban(5, seconds=100, reason="x")
    assert m.is_banned(5)
    clock.advance(50)
    assert m.is_banned(5)
    clock.advance(60)
    assert m.is_banned(5) is False


# --------------------------------------------------------------------------
# Manager: relay
# --------------------------------------------------------------------------

async def _matched_manager():
    """Manager with users 1 and 2 already in a chat."""
    m = make_manager()
    await _profile(m, 1, "ali", interests=["music"])
    await _profile(m, 2, "sara", interests=["music"])
    await m.start_search(1)
    res = await m.start_search(2)
    assert res.matched
    return m


def test_relay_delivers_to_partner():
    async def go():
        m = await _matched_manager()
        res = await m.relay(1, text="سلام")
        assert res.delivered is True
        assert res.to == 2
        assert res.partner.nickname == "sara"
        assert m.stats()["messages"] == 1
    run(go())


def test_relay_without_session_is_refused():
    async def go():
        m = make_manager()
        await _profile(m, 1, "a")
        res = await m.relay(1, text="hi")
        assert res.delivered is False
        assert res.reason == AnonChatManager.REASON_NO_SESSION
    run(go())


def test_relay_blocks_links_and_phone_numbers():
    async def go():
        m = await _matched_manager()
        for bad in ["بیا https://t.me/spam", "splus.ir/joinchat/abcd",
                    "شماره من 09123456789", "www.example.com"]:
            res = await m.relay(1, text=bad)
            assert res.delivered is False, bad
            assert res.reason == AnonChatManager.REASON_LINK, bad
            m.clock.advance(5)  # clear the min-interval guard
    run(go())


def test_relay_allows_plain_text_after_a_link_was_blocked():
    async def go():
        m = await _matched_manager()
        assert (await m.relay(1, text="http://x.com")).reason == AnonChatManager.REASON_LINK
        m.clock.advance(5)
        assert (await m.relay(1, text="سلام خوبی؟")).delivered is True
    run(go())


def test_relay_blocks_profanity():
    async def go():
        m = await _matched_manager()
        res = await m.relay(1, text="این پیام کص می‌باشد")
        assert res.delivered is False
        assert res.reason == AnonChatManager.REASON_PROFANITY
    run(go())


def test_relay_respects_min_interval():
    async def go():
        m = await _matched_manager()
        m.min_message_interval = 10.0
        assert (await m.relay(1, text="one")).delivered
        too_soon = await m.relay(1, text="two")
        assert too_soon.delivered is False
        assert too_soon.reason == AnonChatManager.REASON_FLOOD
        m.clock.advance(11)
        assert (await m.relay(1, text="three")).delivered
    run(go())


def test_relay_respects_per_minute_limit():
    async def go():
        m = AnonChatManager(clock=FakeClock(), max_messages_per_minute=3,
                            min_message_interval=0.0)
        await _profile(m, 1, "a")
        await _profile(m, 2, "b")
        await m.start_search(1)
        await m.start_search(2)
        for _ in range(3):
            assert (await m.relay(1, text="hi")).delivered
        blocked = await m.relay(1, text="hi")
        assert blocked.delivered is False
        assert blocked.reason == AnonChatManager.REASON_FLOOD
    run(go())


def test_relay_media_only_skips_content_checks_but_counts():
    async def go():
        m = await _matched_manager()
        res = await m.relay(1, text=None, has_media=True)
        assert res.delivered and res.to == 2
        assert m.stats()["messages"] == 1
    run(go())


def test_ban_evicts_the_session_and_identifies_who_to_notify():
    async def go():
        m = await _matched_manager()
        record = m.ban(2, seconds=60)
        # The ban tears the chat down and tells us which innocent partner
        # needs an explanation, instead of leaving them guessing.
        assert record.evicted_session is not None
        assert record.partner_of_banned() == 1
        assert m.sessions.for_user(1) is None
        assert m.sessions.for_user(2) is None
        # From user 1's side the chat is simply over.
        res = await m.relay(1, text="hi")
        assert res.delivered is False
        assert res.reason == AnonChatManager.REASON_NO_SESSION
    run(go())


def test_ban_with_no_live_chat_has_nothing_to_evict():
    m = make_manager()
    record = m.ban(9, seconds=60)
    assert record.evicted_session is None
    assert record.partner_of_banned() is None


def test_relay_refuses_when_partner_is_banned():
    """``ban()`` normally closes the session first; this covers the defensive
    guard for a session that is open while the partner is already banned
    (e.g. several processes sharing one profile store)."""
    async def go():
        m = await _matched_manager()
        m.ban(2, seconds=60)
        m.sessions.open_session(1, 2)  # stale/reopened session
        res = await m.relay(1, text="hi")
        assert res.delivered is False
        assert res.reason == AnonChatManager.REASON_BANNED
    run(go())


# --------------------------------------------------------------------------
# Manager: next / stop / rating / report / block
# --------------------------------------------------------------------------

def test_next_partner_leaves_and_requeues():
    async def go():
        m = make_manager()
        for uid in (1, 2, 3):
            await _profile(m, uid, f"u{uid}")
        await m.start_search(1)
        await m.start_search(2)
        await m.start_search(3)
        # 1 and 2 are chatting; 3 is waiting.
        res = await m.next_partner(1)
        assert res.status == "matched"
        assert res.partner.user_id == 3
    run(go())


def test_stop_chat_leaves_without_searching():
    async def go():
        m = await _matched_manager()
        session = await m.stop_chat(1)
        assert session is not None and not session.is_open
        assert m.sessions.for_user(2) is None
        assert m.queue_size == 0
    run(go())


def test_rate_partner_updates_average():
    async def go():
        m = await _matched_manager()
        assert await m.rate_partner(1, 5) is True
        assert await m.rate_partner(1, 4) is True
        partner = await m.get_profile(2)
        assert partner.rating == 4.5
        assert partner.rating_count == 2
        # out of range is rejected
        assert await m.rate_partner(1, 9) is False
    run(go())


def test_rate_without_any_session_is_false():
    async def go():
        m = make_manager()
        await _profile(m, 1, "a")
        assert await m.rate_partner(1, 5) is False
    run(go())


def test_report_dedupes_and_bans_at_threshold():
    async def go():
        m = make_manager(reports_to_ban=3)
        for uid in (1, 2, 3, 4):
            await _profile(m, uid, f"u{uid}")
        # 1 chats with 2, then 3 chats with 2, then 4 chats with 2.
        await m.start_search(1)
        await m.start_search(2)
        r = await m.report(1)
        assert r.accepted and not r.target_banned and r.reports_on_target == 1
        # same reporter again does not add weight
        r = await m.report(1)
        assert r.reports_on_target == 1

        await m.stop_chat(2)
        await m.start_search(3)
        await m.start_search(2)
        r = await m.report(3)
        assert r.reports_on_target == 2

        await m.stop_chat(2)
        await m.start_search(4)
        await m.start_search(2)
        r = await m.report(4)
        assert r.target_banned is True
        assert r.reports_on_target == 3
        assert m.is_banned(2)
        # banned user is evicted from queue and chat
        assert m.sessions.for_user(2) is None
        assert 2 not in m.matcher
    run(go())


def test_report_with_no_partner_is_rejected():
    async def go():
        m = make_manager()
        await _profile(m, 1, "a")
        r = await m.report(1)
        assert r.accepted is False and r.reason == "no_partner"
    run(go())


def test_self_report_is_rejected():
    async def go():
        m = make_manager()
        await _profile(m, 1, "a")
        r = await m.report(1, target_id=1)
        assert r.accepted is False and r.reason == "self_report"
    run(go())


def test_unban_clears_reports():
    async def go():
        m = make_manager(reports_to_ban=2)
        for uid in (1, 2, 3):
            await _profile(m, uid, f"u{uid}")

        r = await m.report(1, target_id=2)
        assert r.reports_on_target == 1 and r.target_banned is False

        r = await m.report(3, target_id=2)
        assert r.reports_on_target == 2 and r.target_banned is True
        assert m.is_banned(2)

        assert m.unban(2) is True
        assert m.is_banned(2) is False

        # The report set was cleared, so the counter restarts at 1 rather
        # than continuing from 2 and instantly re-banning.
        r = await m.report(1, target_id=2)
        assert r.reports_on_target == 1
        assert r.target_banned is False
    run(go())


def test_block_prevents_future_matches():
    async def go():
        m = make_manager()
        await _profile(m, 1, "a")
        await _profile(m, 2, "b")
        await m.start_search(1)
        await m.start_search(2)
        # 1 blocks 2 -> live chat ends and they cannot be paired again
        assert await m.block(1, 2) is True
        assert m.sessions.for_user(1) is None
        assert await m.block(1, 2) is False  # already blocked
        assert await m.block(1, 1) is False  # self

        await m.start_search(1)
        res = await m.start_search(2)
        assert res.status == "queued", "blocked pair must not match"

        assert await m.unblock(1, 2) is True
        assert await m.unblock(1, 2) is False
    run(go())


def test_stats_and_full_stats():
    async def go():
        m = await _matched_manager()
        await m.relay(1, text="hi")
        s = m.stats()
        assert s["searches"] == 2 and s["matches"] == 1 and s["messages"] == 1
        assert s["active_chats"] == 1 and s["waiting"] == 0
        full = await m.full_stats()
        assert full["profiles"] == 2
    run(go())


# --------------------------------------------------------------------------
# Presentation
# --------------------------------------------------------------------------

def test_profile_card_never_leaks_identity_and_is_localised():
    p = AnonProfile(user_id=99, nickname="ناشناس", age=22, gender=Gender.FEMALE,
                    city="تهران", bio="دوست جدید", interests=["موسیقی", "کتاب"],
                    rating_total=18, rating_count=4)
    fa = render_profile_card(p, "fa")
    assert "ناشناس" in fa and "تهران" in fa
    assert "99" not in fa, "internal user id must never be shown"
    assert tr("fa", "anon_note") in fa

    en = render_profile_card(p, "en")
    assert "Female" in en and "Tehran" not in en and "تهران" in en
    assert "4.5" in en


def test_profile_card_omits_empty_fields():
    p = AnonProfile(user_id=1, nickname="x")
    card = render_profile_card(p, "en")
    assert "City" not in card
    assert "Interests" not in card
    assert "Rating" not in card
    assert "Age" not in card


def test_tr_falls_back_to_english_then_key():
    assert tr("de", "next") == STRINGS["en"]["next"]
    assert tr("fa", "next") == STRINGS["fa"]["next"]
    assert tr("fa", "does_not_exist") == "does_not_exist"


def test_tr_tolerates_missing_format_kwargs():
    # A missing placeholder value must not raise inside a message handler.
    assert tr("en", "matched") == STRINGS["en"]["matched"]


def test_fa_and_en_have_identical_key_sets():
    assert set(STRINGS["fa"]) == set(STRINGS["en"])


def test_inline_keyboard_contents():
    chat = inline_keyboard("fa", in_chat=True)
    data = [b["callback_data"] for b in chat]
    assert data == ["anon:next", "anon:stop", "anon:profile", "anon:rate", "anon:report"]
    assert all(b["text"] for b in chat)
    assert [b["callback_data"] for b in inline_keyboard("en", in_chat=False)] == ["anon:profile"]


def test_callback_data_fits_soroush_64_byte_limit():
    for lang in ("fa", "en"):
        for button in inline_keyboard(lang, in_chat=True):
            assert len(button["callback_data"].encode("utf-8")) <= 64
