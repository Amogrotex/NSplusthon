"""Event filtering abstractions and composable filter functions."""

from __future__ import annotations

import inspect
import re
from abc import ABC, abstractmethod
from typing import Any, Callable, List, Optional, Pattern, Sequence, Set, Union


class Filter(ABC):
    """Base class for composable event filters."""

    @abstractmethod
    async def __call__(self, event: Any) -> bool:
        pass

    def __and__(self, other: Filter) -> Filter:
        return AndFilter(self, other)

    def __or__(self, other: Filter) -> Filter:
        return OrFilter(self, other)

    def __invert__(self) -> Filter:
        return NotFilter(self)


class AndFilter(Filter):
    def __init__(self, *filters: Filter):
        self.filters = filters

    async def __call__(self, event: Any) -> bool:
        for f in self.filters:
            res = f(event)
            if inspect.isawaitable(res):
                res = await res
            if not res:
                return False
        return True


class OrFilter(Filter):
    def __init__(self, *filters: Filter):
        self.filters = filters

    async def __call__(self, event: Any) -> bool:
        for f in self.filters:
            res = f(event)
            if inspect.isawaitable(res):
                res = await res
            if res:
                return True
        return False


class NotFilter(Filter):
    def __init__(self, target: Filter):
        self.target = target

    async def __call__(self, event: Any) -> bool:
        res = self.target(event)
        if inspect.isawaitable(res):
            res = await res
        return not res


class TextFilter(Filter):
    """Filter messages based on text matching."""

    def __init__(
        self,
        equals: Optional[str] = None,
        contains: Optional[str] = None,
        startswith: Optional[Union[str, Sequence[str]]] = None,
        endswith: Optional[Union[str, Sequence[str]]] = None,
        choices: Optional[Sequence[str]] = None,
        ignore_case: bool = True,
    ):
        self.equals = equals
        self.contains = contains
        self.startswith = (startswith,) if isinstance(startswith, str) else startswith
        self.endswith = (endswith,) if isinstance(endswith, str) else endswith
        self.choices = set(choices) if choices else None
        self.ignore_case = ignore_case

    async def __call__(self, event: Any) -> bool:
        text = getattr(event, "raw_text", None) or getattr(event, "text", None)
        if text is None:
            return False

        if self.ignore_case:
            text_cmp = text.lower()
            if self.equals is not None and text_cmp != self.equals.lower():
                return False
            if self.contains is not None and self.contains.lower() not in text_cmp:
                return False
            if self.startswith is not None and not any(text_cmp.startswith(s.lower()) for s in self.startswith):
                return False
            if self.endswith is not None and not any(text_cmp.endswith(s.lower()) for s in self.endswith):
                return False
            if self.choices is not None and text_cmp not in {c.lower() for c in self.choices}:
                return False
        else:
            if self.equals is not None and text != self.equals:
                return False
            if self.contains is not None and self.contains not in text:
                return False
            if self.startswith is not None and not any(text.startswith(s) for s in self.startswith):
                return False
            if self.endswith is not None and not any(text.endswith(e) for e in self.endswith):
                return False
            if self.choices is not None and text not in self.choices:
                return False

        return True


class RegexFilter(Filter):
    """Filter messages using regular expression patterns."""

    def __init__(self, pattern: Union[str, Pattern], flags: int = re.IGNORECASE):
        if isinstance(pattern, str):
            self.pattern = re.compile(pattern, flags)
        else:
            self.pattern = pattern

    async def __call__(self, event: Any) -> bool:
        text = getattr(event, "raw_text", None) or getattr(event, "text", None)
        if not text:
            return False
        return bool(self.pattern.search(text))


class ChatTypeFilter(Filter):
    """Filter events based on chat type (private, group, channel)."""

    def __init__(self, types_list: Sequence[str]):
        self.types = {t.lower() for t in types_list}

    @classmethod
    def private(cls) -> ChatTypeFilter:
        return cls(["private"])

    @classmethod
    def group(cls) -> ChatTypeFilter:
        return cls(["group", "supergroup"])

    @classmethod
    def channel(cls) -> ChatTypeFilter:
        return cls(["channel"])

    async def __call__(self, event: Any) -> bool:
        if getattr(event, "is_private", False) and "private" in self.types:
            return True
        if getattr(event, "is_group", False) and ("group" in self.types or "supergroup" in self.types):
            return True
        if getattr(event, "is_channel", False) and "channel" in self.types:
            return True
        return False


class SenderFilter(Filter):
    """Filter events by sender user ID or username."""

    def __init__(self, users: Sequence[Union[int, str]]):
        self.user_ids: Set[int] = set()
        self.usernames: Set[str] = set()
        for u in users:
            if isinstance(u, int):
                self.user_ids.add(u)
            elif isinstance(u, str):
                self.usernames.add(u.lower().lstrip("@"))

    async def __call__(self, event: Any) -> bool:
        sender_id = getattr(event, "sender_id", None)
        if sender_id is not None and sender_id in self.user_ids:
            return True

        sender = getattr(event, "sender", None)
        if sender and hasattr(sender, "username") and sender.username:
            if sender.username.lower() in self.usernames:
                return True

        return False


class HasMediaFilter(Filter):
    """Filter events by media type attachment."""

    def __init__(self, media_type: Optional[str] = None):
        self.media_type = media_type.lower() if media_type else None

    async def __call__(self, event: Any) -> bool:
        media = getattr(event, "media", None)
        if media is None:
            return False

        if self.media_type is None:
            return True

        mt = self.media_type
        if mt == "photo" and getattr(event, "photo", None):
            return True
        if mt == "document" and getattr(event, "document", None):
            return True
        if mt in ("voice", "audio") and getattr(event, "voice", None):
            return True
        if mt == "video" and getattr(event, "video", None):
            return True
        if mt == "sticker" and getattr(event, "sticker", None):
            return True
        if mt == "poll" and getattr(event, "poll", None):
            return True

        return False


class IsReplyFilter(Filter):
    """Filter messages that reply to another message."""

    async def __call__(self, event: Any) -> bool:
        return bool(getattr(event, "is_reply", False) or getattr(event, "reply_to_msg_id", None))


class StateFilter(Filter):
    """Filter events based on current FSM state."""

    def __init__(self, state: Any, fsm_storage: Any):
        self.target_state = state.name if hasattr(state, "name") else str(state) if state else None
        self.fsm_storage = fsm_storage

    async def __call__(self, event: Any) -> bool:
        user_id = getattr(event, "sender_id", None) or 0
        chat_id = getattr(event, "chat_id", None) or 0
        key = f"{chat_id}:{user_id}"
        current = await self.fsm_storage.get_state(key)
        return current == self.target_state


class IsAdminFilter(Filter):
    """Filter verifying if the sender has admin rights."""

    async def __call__(self, event: Any) -> bool:
        client = getattr(event, "client", None)
        if not client or not hasattr(client, "is_admin"):
            return False
        try:
            chat = await event.get_input_chat()
            user = await event.get_input_sender()
            return bool(await client.is_admin(chat, user))
        except (AttributeError, TypeError, ValueError):
            return False


__all__ = [
    "Filter",
    "AndFilter",
    "OrFilter",
    "NotFilter",
    "TextFilter",
    "RegexFilter",
    "ChatTypeFilter",
    "SenderFilter",
    "HasMediaFilter",
    "IsReplyFilter",
    "StateFilter",
    "IsAdminFilter",
]


def __dir__():
    return list(__all__)
