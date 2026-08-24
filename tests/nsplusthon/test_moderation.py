from datetime import datetime

from nsplusthon.moderation import (
    AntiFlood,
    GroupGuard,
    LinkGuard,
    NightLock,
    PersianBadWordsFilter,
    TEHRAN_TZ,
    WarnManager,
)


def test_persian_bad_words():
    bw = PersianBadWordsFilter()
    assert bw.contains_bad_words("سلام چطوری؟") is False
    assert bw.contains_bad_words("این پیام کص می‌باشد") is True
    assert bw.contains_bad_words("این ک‌ص ده است") is True


def test_link_guard():
    lg = LinkGuard(allowed_domains=["splus.ir/botzone"])
    assert lg.has_unallowed_links("به splus.ir/botzone خوش آمدید") is False
    assert lg.has_unallowed_links("به https://t.me/spamchannel بیا") is True
    assert lg.is_invite_link("splus.ir/joinchat/AbCdEf") is True


def test_link_guard_hostname_not_substring():
    lg = LinkGuard(allowed_domains=["ex.com"])
    assert lg.has_unallowed_links("see https://notex.com/spam") is True
    assert lg.has_unallowed_links("see https://ex.com/ok") is False
    assert lg.has_unallowed_links("see https://cdn.ex.com/ok") is False


def test_group_guard():
    guard = GroupGuard(max_flood_messages=2, flood_period=5.0, max_mentions=2)

    res = guard.inspect_message(chat_id=1, user_id=10, text="سلام بچه ها")
    assert res["is_violation"] is False

    res_tag = guard.inspect_message(chat_id=1, user_id=10, text="@u1 @u2 @u3 @u4")
    assert res_tag["is_violation"] is True
    assert res_tag["reason"] == "tag_flood"

    guard.inspect_message(chat_id=1, user_id=20, text="msg 1")
    guard.inspect_message(chat_id=1, user_id=20, text="msg 2")
    res_flood = guard.inspect_message(chat_id=1, user_id=20, text="msg 3")
    assert res_flood["is_violation"] is True
    assert res_flood["reason"] == "flood"


def test_group_guard_exempt_and_admin():
    guard = GroupGuard(
        max_flood_messages=1,
        flood_period=60,
        exempt_user_ids={99},
        night_lock=True,
        night_start=0,
        night_end=24,
    )
    locked = datetime(2026, 1, 1, 3, 0, tzinfo=TEHRAN_TZ)
    assert guard.inspect_message(1, 99, "https://t.me/x", now=locked)["is_violation"] is False
    assert guard.inspect_message(1, 1, "hi", is_admin=True, now=locked)["is_violation"] is False
    assert guard.inspect_message(1, 2, "hi", now=locked)["reason"] == "night_lock"


def test_night_lock_opt_in():
    # default: night lock off, even at 3am Tehran
    guard = GroupGuard()
    three_am = datetime(2026, 1, 1, 3, 0, tzinfo=TEHRAN_TZ)
    assert guard.inspect_message(1, 1, "hi", now=three_am)["is_violation"] is False

    lock = NightLock(0, 7)
    assert lock.is_locked_now(three_am) is True
    assert lock.is_locked_now(datetime(2026, 1, 1, 12, 0, tzinfo=TEHRAN_TZ)) is False


def test_antiflood_and_warn_evict():
    flood = AntiFlood(max_messages=5, period=0.01, max_tracked=3)
    for i in range(8):
        flood.is_flooding(1, i)
    assert flood.tracked() <= 3

    warns = WarnManager(max_warns=3, max_tracked=3)
    for i in range(8):
        warns.warn(1, i)
    assert warns.tracked() <= 3
