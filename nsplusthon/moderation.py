"""Group moderation, anti-flood, link filtering, and schedule management."""

from __future__ import annotations

import re
import time
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional, Set, Tuple, Union

# Tehran is UTC+3:30
TEHRAN_OFFSET = timedelta(hours=3, minutes=30)
TEHRAN_TZ = timezone(TEHRAN_OFFSET)

PERSIAN_BAD_WORDS_DEFAULT = {
    "کص", "کیر", "خواهرکصده", "مادرجنده", "کونی", "جنده", "پدرکسته",
    "کصکش", "دیوث", "عوضی", "حرومزاده", "بیناموس", "لاشی",
}

CLEAN_NORMALIZE_RE = re.compile(r"[\u200c\u200d\u200e\u200f\s\._\-\+\*\/\\\,\:\;\#\!\?\=\(\)]+")

SOROUSH_TELEGRAM_LINK_RE = re.compile(
    r"(?:https?://)?(?:www\.)?(?:splus\.ir|sapp\.ir|soroush-app\.ir|web\.splus\.ir|t\.me|telegram\.me)/(?:joinchat/|\+|\#|c/|u/)?([a-zA-Z0-9_\-]+)",
    re.IGNORECASE,
)

GENERAL_URL_RE = re.compile(
    r"(?:https?://|ftp://|www\.)[^\s/$.?#].[^\s]*",
    re.IGNORECASE,
)


class AntiFlood:
    """Sliding-window per-user flood limiter."""

    def __init__(self, max_messages: int = 5, period: float = 3.0):
        self.max_messages = max_messages
        self.period = period
        self._user_history: Dict[Tuple[int, int], List[float]] = {}

    def is_flooding(self, chat_id: int, user_id: int) -> bool:
        now = time.time()
        key = (chat_id, user_id)
        timestamps = self._user_history.get(key, [])

        cutoff = now - self.period
        valid = [t for t in timestamps if t > cutoff]
        valid.append(now)
        self._user_history[key] = valid

        return len(valid) > self.max_messages

    def reset(self, chat_id: int, user_id: int) -> None:
        self._user_history.pop((chat_id, user_id), None)


class LinkGuard:
    """Detects unallowed links and invite URLs."""

    def __init__(self, allowed_domains: Optional[List[str]] = None):
        self.allowed_domains = {d.lower() for d in (allowed_domains or [])}

    def has_unallowed_links(self, text: str) -> bool:
        if not text:
            return False

        links = GENERAL_URL_RE.findall(text)
        if not links:
            return False

        if not self.allowed_domains:
            return True

        for link in links:
            link_low = link.lower()
            if not any(domain in link_low for domain in self.allowed_domains):
                return True
        return False

    def is_invite_link(self, text: str) -> bool:
        if not text:
            return False
        return bool(SOROUSH_TELEGRAM_LINK_RE.search(text))


class PersianBadWordsFilter:
    """Persian profanity detector with text normalization."""

    def __init__(self, custom_bad_words: Optional[Set[str]] = None):
        self.bad_words = set(custom_bad_words) if custom_bad_words else set(PERSIAN_BAD_WORDS_DEFAULT)

    def normalize(self, text: str) -> str:
        if not text:
            return ""
        return CLEAN_NORMALIZE_RE.sub("", text.lower())

    def contains_bad_words(self, text: str) -> bool:
        if not text:
            return False

        raw_low = text.lower()
        normalized = self.normalize(text)

        for word in self.bad_words:
            if word in raw_low or word in normalized:
                return True
        return False


class NightLock:
    """Validates if current time falls within scheduled lock window (Tehran Time UTC+3:30)."""

    def __init__(self, start_hour: int = 0, end_hour: int = 7):
        self.start_hour = start_hour
        self.end_hour = end_hour

    def is_locked_now(self) -> bool:
        tehran_now = datetime.now(TEHRAN_TZ)
        hour = tehran_now.hour

        if self.start_hour > self.end_hour:
            return hour >= self.start_hour or hour < self.end_hour
        else:
            return self.start_hour <= hour < self.end_hour


class WarnManager:
    """Tracks user warnings with threshold checking."""

    def __init__(self, max_warns: int = 3):
        self.max_warns = max_warns
        self._warns: Dict[Tuple[int, int], int] = {}

    def warn(self, chat_id: int, user_id: int) -> Tuple[int, bool]:
        key = (chat_id, user_id)
        current = self._warns.get(key, 0) + 1
        self._warns[key] = current
        exceeded = current >= self.max_warns
        return current, exceeded

    def reset_warns(self, chat_id: int, user_id: int) -> None:
        self._warns.pop((chat_id, user_id), None)

    def get_warns(self, chat_id: int, user_id: int) -> int:
        return self._warns.get((chat_id, user_id), 0)


class GroupGuard:
    """Group moderation inspector combining anti-flood, link, profanity, and tag checks."""

    def __init__(
        self,
        max_flood_messages: int = 5,
        flood_period: float = 3.0,
        allowed_domains: Optional[List[str]] = None,
        custom_bad_words: Optional[Set[str]] = None,
        max_warns: int = 3,
        max_mentions: int = 5,
        night_start: int = 0,
        night_end: int = 7,
    ):
        self.anti_flood = AntiFlood(max_flood_messages, flood_period)
        self.link_guard = LinkGuard(allowed_domains)
        self.bad_words_filter = PersianBadWordsFilter(custom_bad_words)
        self.warn_manager = WarnManager(max_warns)
        self.night_lock = NightLock(night_start, night_end)
        self.max_mentions = max_mentions

    def count_mentions(self, text: str) -> int:
        if not text:
            return 0
        return len(re.findall(r"@\w+", text))

    def inspect_message(
        self, chat_id: int, user_id: int, text: Optional[str]
    ) -> Dict[str, Any]:
        result = {
            "is_violation": False,
            "reason": None,
            "warn_count": self.warn_manager.get_warns(chat_id, user_id),
            "max_warns_reached": False,
        }

        if self.night_lock.is_locked_now():
            result["is_violation"] = True
            result["reason"] = "night_lock"
            return result

        if self.anti_flood.is_flooding(chat_id, user_id):
            wc, exceeded = self.warn_manager.warn(chat_id, user_id)
            result["is_violation"] = True
            result["reason"] = "flood"
            result["warn_count"] = wc
            result["max_warns_reached"] = exceeded
            return result

        if text:
            if self.bad_words_filter.contains_bad_words(text):
                wc, exceeded = self.warn_manager.warn(chat_id, user_id)
                result["is_violation"] = True
                result["reason"] = "bad_words"
                result["warn_count"] = wc
                result["max_warns_reached"] = exceeded
                return result

            if self.link_guard.has_unallowed_links(text):
                wc, exceeded = self.warn_manager.warn(chat_id, user_id)
                result["is_violation"] = True
                result["reason"] = "link"
                result["warn_count"] = wc
                result["max_warns_reached"] = exceeded
                return result

            if self.count_mentions(text) > self.max_mentions:
                wc, exceeded = self.warn_manager.warn(chat_id, user_id)
                result["is_violation"] = True
                result["reason"] = "tag_flood"
                result["warn_count"] = wc
                result["max_warns_reached"] = exceeded
                return result

        return result
