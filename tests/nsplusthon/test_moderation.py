from nsplusthon.moderation import GroupGuard, LinkGuard, PersianBadWordsFilter


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


def test_group_guard():
    guard = GroupGuard(max_flood_messages=2, flood_period=5.0, max_mentions=2, night_start=25, night_end=26)

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
