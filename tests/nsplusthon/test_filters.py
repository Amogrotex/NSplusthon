import pytest
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
async def test_combined_filters():
    f_group = ChatTypeFilter.group()
    f_reply = IsReplyFilter()
    combined = f_group & f_reply

    assert await combined(MockEvent(is_group=True, is_reply=True)) is True
    assert await combined(MockEvent(is_group=True, is_reply=False)) is False
    assert await combined(MockEvent(is_group=False, is_reply=True)) is False
