"""Group moderation, anti-flood, link filtering, and schedule management."""

from __future__ import annotations

import re
import time
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, Iterable, List, Optional, Set, Tuple
from urllib.parse import urlparse

# Tehran is UTC+3:30
TEHRAN_OFFSET = timedelta(hours=3, minutes=30)
TEHRAN_TZ = timezone(TEHRAN_OFFSET)

PERSIAN_BAD_WORDS_DEFAULT = {
    "کص", "کیر", "خواهرکصده", "مادرجنده", "کونی", "جنده", "پدرکسته",
    "کصکش", "دیوث", "عوضی", "حرومزاده", "بیناموس", "لاشی",
}

CLEAN_NORMALIZE_RE = re.compile(r"[\u200c\u200d\u200e\u200f\s\._\-\+\*\/\\,\:\;\#\!\?\=\(\)]+")

# Scheme-ful URLs, www.*, and common invite hosts without a scheme.
_SCHEME_URL_RE = re.compile(
    r"(?:https?://|ftp://|www\.)[^\s/$.?#].[^\s]*",
    re.IGNORECASE,
)
_BARE_INVITE_RE = re.compile(
    r"(?:splus\.ir|sapp\.ir|soroush-app\.ir|web\.splus\.ir|t\.me|telegram\.me)"
    r"/[^\s]+",
    re.IGNORECASE,
)
SOROUSH_TELEGRAM_LINK_RE = re.compile(
    r"(?:https?://)?(?:www\.)?(?:splus\.ir|sapp\.ir|soroush-app\.ir|web\.splus\.ir|t\.me|telegram\.me)"
    r"/(?:joinchat/|\+|\#|c/|u/)?([a-zA-Z0-9_\-]+)",
    re.IGNORECASE,
)
GENERAL_URL_RE = _SCHEME_URL_RE  # kept for callers / tests that import the name

_MAX_TRACKED = 10_000


def _iter_urls(text: str) -> List[str]:
    if not text:
        return []
    found = _SCHEME_URL_RE.findall(text)
    found.extend(_BARE_INVITE_RE.findall(text))
    # de-dupe while preserving order
    seen = set()
    out = []
    for item in found:
        key = item.lower()
        if key not in seen:
            seen.add(key)
            out.append(item)
    return out


def _hostname(link: str) -> str:
    candidate = link.strip()
    if "://" not in candidate:
        candidate = "http://" + candidate
    try:
        host = (urlparse(candidate).hostname or "").lower()
    except ValueError:
        return ""
    if host.startswith("www."):
        host = host[4:]
    return host


def _path(link: str) -> str:
    candidate = link.strip()
    if "://" not in candidate:
        candidate = "http://" + candidate
    try:
        return (urlparse(candidate).path or "").rstrip("/")
    except ValueError:
        return ""


class AntiFlood:
    """Sliding-window per-user flood limiter.

    Idle keys are dropped when their window expires, and the map is
    capped so a long-running group bot cannot grow it forever.
    """

    def __init__(self, max_messages: int = 5, period: float = 3.0, max_tracked: int = _MAX_TRACKED):
        self.max_messages = max_messages
        self.period = period
        self.max_tracked = max_tracked
        self._user_history: Dict[Tuple[int, int], List[float]] = {}

    def _evict(self, now: float) -> None:
        cutoff = now - self.period
        stale = [k for k, ts in self._user_history.items() if not ts or ts[-1] <= cutoff]
        for k in stale:
            self._user_history.pop(k, None)
        overflow = len(self._user_history) - self.max_tracked
        if overflow > 0:
            # drop the oldest-last-seen keys
            oldest = sorted(self._user_history.items(), key=lambda kv: kv[1][-1] if kv[1] else 0)
            for k, _ in oldest[:overflow]:
                self._user_history.pop(k, None)

    def is_flooding(self, chat_id: int, user_id: int) -> bool:
        now = time.time()
        key = (chat_id, user_id)
        timestamps = self._user_history.get(key, [])

        cutoff = now - self.period
        valid = [t for t in timestamps if t > cutoff]
        valid.append(now)
        self._user_history[key] = valid

        if len(self._user_history) > self.max_tracked:
            self._evict(now)

        return len(valid) > self.max_messages

    def reset(self, chat_id: int, user_id: int) -> None:
        self._user_history.pop((chat_id, user_id), None)

    def tracked(self) -> int:
        return len(self._user_history)


class LinkGuard:
    """Detects unallowed links and invite URLs.

    ``allowed_domains`` entries are hostnames (``splus.ir``) or
    host+path prefixes (``splus.ir/botzone``). Matching is on the
    parsed hostname (and optional path prefix), never a raw substring,
    so ``ex.com`` does not allow ``notex.com``.
    """

    def __init__(self, allowed_domains: Optional[List[str]] = None):
        self.allowed_domains = {d.lower().rstrip("/") for d in (allowed_domains or [])}

    def _is_allowed(self, link: str) -> bool:
        host = _hostname(link)
        path = _path(link)
        if not host:
            return False
        for rule in self.allowed_domains:
            if "/" in rule:
                rule_host, rule_path = rule.split("/", 1)
                rule_path = "/" + rule_path.rstrip("/")
                if host == rule_host or host.endswith("." + rule_host):
                    if path == rule_path or path.startswith(rule_path + "/"):
                        return True
            else:
                if host == rule or host.endswith("." + rule):
                    return True
        return False

    def has_unallowed_links(self, text: str) -> bool:
        links = _iter_urls(text)
        if not links:
            return False
        if not self.allowed_domains:
            return True
        return any(not self._is_allowed(link) for link in links)

    def is_invite_link(self, text: str) -> bool:
        if not text:
            return False
        return bool(SOROUSH_TELEGRAM_LINK_RE.search(text))


class PersianBadWordsFilter:
    """Persian profanity detector with text normalization.

    Matching is done on the *normalized* form so ZWNJ / punctuation
    tricks (``ک‌ص``) still hit, but we require the needle to be at
    least two characters so single-letter noise cannot match.
    """

    def __init__(self, custom_bad_words: Optional[Set[str]] = None):
        self.bad_words = set(custom_bad_words) if custom_bad_words else set(PERSIAN_BAD_WORDS_DEFAULT)

    def normalize(self, text: str) -> str:
        if not text:
            return ""
        return CLEAN_NORMALIZE_RE.sub("", text.lower())

    def contains_bad_words(self, text: str) -> bool:
        if not text:
            return False
        normalized = self.normalize(text)
        if not normalized:
            return False
        for word in self.bad_words:
            needle = self.normalize(word)
            if len(needle) < 2:
                continue
            if needle in normalized:
                return True
        return False


class NightLock:
    """Validates if current time falls within scheduled lock window (Tehran Time UTC+3:30)."""

    def __init__(self, start_hour: int = 0, end_hour: int = 7):
        self.start_hour = start_hour
        self.end_hour = end_hour

    def is_locked_now(self, now: Optional[datetime] = None) -> bool:
        tehran_now = now.astimezone(TEHRAN_TZ) if now else datetime.now(TEHRAN_TZ)
        hour = tehran_now.hour

        if self.start_hour == self.end_hour:
            return False
        if self.start_hour > self.end_hour:
            return hour >= self.start_hour or hour < self.end_hour
        return self.start_hour <= hour < self.end_hour


class WarnManager:
    """Tracks user warnings with threshold checking.

    Idle entries are dropped when ``reset_warns`` is called, and the
    map is capped so it cannot grow without bound.
    """

    def __init__(self, max_warns: int = 3, max_tracked: int = _MAX_TRACKED):
        self.max_warns = max_warns
        self.max_tracked = max_tracked
        self._warns: Dict[Tuple[int, int], int] = {}

    def _evict_if_needed(self) -> None:
        overflow = len(self._warns) - self.max_tracked
        if overflow <= 0:
            return
        # drop the lowest-count keys first (least "hot")
        for key, _ in sorted(self._warns.items(), key=lambda kv: kv[1])[:overflow]:
            self._warns.pop(key, None)

    def warn(self, chat_id: int, user_id: int) -> Tuple[int, bool]:
        key = (chat_id, user_id)
        current = self._warns.get(key, 0) + 1
        self._warns[key] = current
        self._evict_if_needed()
        exceeded = current >= self.max_warns
        return current, exceeded

    def reset_warns(self, chat_id: int, user_id: int) -> None:
        self._warns.pop((chat_id, user_id), None)

    def get_warns(self, chat_id: int, user_id: int) -> int:
        return self._warns.get((chat_id, user_id), 0)

    def tracked(self) -> int:
        return len(self._warns)


class GroupGuard:
    """Group moderation inspector combining anti-flood, link, profanity, and tag checks.

    Night lock is **opt-in** (``night_lock=True``). Turning it on with
    the default 00:00–07:00 Tehran window would otherwise flag *every*
    message overnight, including admins and the bot itself.

    Pass ``exempt_user_ids`` (admins, the bot, …) to skip inspection.
    """

    def __init__(
        self,
        max_flood_messages: int = 5,
        flood_period: float = 3.0,
        allowed_domains: Optional[List[str]] = None,
        custom_bad_words: Optional[Set[str]] = None,
        max_warns: int = 3,
        max_mentions: int = 5,
        night_lock: bool = False,
        night_start: int = 0,
        night_end: int = 7,
        exempt_user_ids: Optional[Iterable[int]] = None,
    ):
        self.anti_flood = AntiFlood(max_flood_messages, flood_period)
        self.link_guard = LinkGuard(allowed_domains)
        self.bad_words_filter = PersianBadWordsFilter(custom_bad_words)
        self.warn_manager = WarnManager(max_warns)
        self.night_lock_enabled = night_lock
        self.night_lock = NightLock(night_start, night_end)
        self.max_mentions = max_mentions
        self.exempt_user_ids: Set[int] = set(exempt_user_ids or ())

    def count_mentions(self, text: str) -> int:
        if not text:
            return 0
        return len(re.findall(r"@\w+", text))

    def inspect_message(
        self,
        chat_id: int,
        user_id: int,
        text: Optional[str],
        *,
        is_admin: bool = False,
        now: Optional[datetime] = None,
    ) -> Dict[str, Any]:
        result = {
            "is_violation": False,
            "reason": None,
            "warn_count": self.warn_manager.get_warns(chat_id, user_id),
            "max_warns_reached": False,
        }

        if is_admin or user_id in self.exempt_user_ids:
            return result

        if self.night_lock_enabled and self.night_lock.is_locked_now(now):
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


__all__ = [
    "AntiFlood",
    "LinkGuard",
    "PersianBadWordsFilter",
    "NightLock",
    "WarnManager",
    "GroupGuard",
    "PERSIAN_BAD_WORDS_DEFAULT",
    "TEHRAN_TZ",
]
