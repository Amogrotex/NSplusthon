import pytest
from nsplusthon.events import NewMessage
from nsplusthon.filters import TextFilter, RegexFilter, ChatTypeFilter, IsReplyFilter


class MockEvent:
    def __init__(self, text="", is_group=True, is_reply=False):
        self.raw_text = text
        self.text = text
        self.is_private = False
        self.is_group = is_group
        self.is_channel = False
        self.is_reply = is_reply


@pytest.mark.asyncio
async def test_text_and_regex_filters():
    t_filter = TextFilter(startswith="!hello", ignore_case=True)
    assert await t_filter(MockEvent(text="!Hello world")) is True
    assert await t_filter(MockEvent(text="goodbye")) is False

    r_filter = RegexFilter(r"order_\d+")
    assert await r_filter(MockEvent(text="check order_12345 details")) is True
    assert await r_filter(MockEvent(text="no order here")) is False


@pytest.mark.asyncio
async def test_text_filter_endswith_and_case_sensitivity():
    # Regression: `endswith` iterated with the wrong loop variable
    # (`e.lower()`) and raised NameError at runtime.
    t_filter = TextFilter(endswith="bye")
    assert await t_filter(MockEvent(text="goodbye")) is True
    assert await t_filter(MockEvent(text="good night")) is False

    # Multiple suffixes, case-sensitive mode
    multi = TextFilter(endswith=["bye", "night"], ignore_case=False)
    assert await multi(MockEvent(text="goodnight")) is True
    assert await multi(MockEvent(text="goodNight")) is False

    # startswith with a list of prefixes
    starts = TextFilter(startswith=["good", "ok"])
    assert await starts(MockEvent(text="goodbye")) is True
    assert await starts(MockEvent(text="okay thanks")) is True
    assert await starts(MockEvent(text="nope")) is False

    # equals / contains / choices still behave
    eq = TextFilter(equals="HELLO")  # ignore_case defaults to True
    assert await eq(MockEvent(text="hello")) is True
    assert await eq(MockEvent(text="world")) is False


@pytest.mark.asyncio
async def test_combined_filters():
    f_group = ChatTypeFilter.group()
    f_reply = IsReplyFilter()
    combined = f_group & f_reply

    assert await combined(MockEvent(is_group=True, is_reply=True)) is True
    assert await combined(MockEvent(is_group=True, is_reply=False)) is False
    assert await combined(MockEvent(is_group=False, is_reply=True)) is False


@pytest.mark.asyncio
async def test_new_message_with_filter():
    builder = NewMessage(filter=TextFilter(startswith="hello"))
    assert builder.func is not None


def test_filters_public_api():
    import nsplusthon.filters as filters

    assert "TextFilter" in filters.__all__
    assert "ABC" not in filters.__all__
    assert "TextFilter" in dir(filters)
