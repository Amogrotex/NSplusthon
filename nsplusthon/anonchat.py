"""Anonymous 1-on-1 chat: profiles, matchmaking, relay and safety.

This module implements "find a random chat friend and talk anonymously"
on top of a Soroush Plus client. It is deliberately split in two layers:

* **Core logic** (:class:`AnonChatManager` and friends) performs *no* I/O.
  Every method returns a small result object describing what should happen
  (who to pair with, where to forward a message, why a message was
  rejected). This keeps the whole feature unit-testable without a client,
  a session file or a network connection.

* **Presentation** (:func:`render_profile_card`, :func:`inline_keyboard`,
  :data:`STRINGS`) turns those results into text and buttons, in Persian
  or English.

Wiring it to a live client is then a handful of lines::

    from nsplusthon import SoroushClient
    from nsplusthon.anonchat import AnonChatManager, SQLiteProfileStore

    client = SoroushClient(session, api_id, api_hash)
    manager = AnonChatManager(SQLiteProfileStore("anon.db"))

    @client.on(events.NewMessage(incoming=True))
    async def handler(event):
        result = await manager.relay(event.sender_id, text=event.raw_text)
        if result.delivered:
            await client.send_message(result.to, event.raw_text)

Anonymous by construction: the partner is only ever identified by the
``user_id`` the *bot* talks to. Nicknames, never real names, are what the
render layer exposes, and nothing in this module reads ``first_name``,
``last_name`` or ``username``.
"""

from __future__ import annotations

import asyncio
import json
import random
import re
import sqlite3
import time
import uuid
from abc import ABC, abstractmethod
from contextlib import closing
from dataclasses import dataclass, field
from typing import Any, Dict, Iterable, List, Optional, Sequence, Set, Tuple

from .moderation import AntiFlood, LinkGuard, PersianBadWordsFilter

__all__ = [
    "STRINGS",
    "AnonChatManager",
    "AnonProfile",
    "BanRecord",
    "ChatSession",
    "Gender",
    "MatchPrefs",
    "MatchMaker",
    "MemoryProfileStore",
    "ProfileStore",
    "RelayResult",
    "ReportResult",
    "SearchResult",
    "SessionManager",
    "SQLiteProfileStore",
    "ValidationResult",
    "inline_keyboard",
    "render_profile_card",
]

# --------------------------------------------------------------------------
# Constants
# --------------------------------------------------------------------------

#: Accepted gender values. Stored as plain strings so JSON/SQLite round-trips
#: are trivial and unknown values from a client never raise.
class Gender:
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"
    UNSPECIFIED = "unspecified"

    ALL = (MALE, FEMALE, OTHER, UNSPECIFIED)


#: Minimum/maximum sane values for user-supplied profile fields.
MIN_AGE = 13
MAX_AGE = 99
MAX_NICKNAME_LEN = 32
MAX_CITY_LEN = 40
MAX_BIO_LEN = 300
MAX_INTERESTS = 8
MAX_INTEREST_LEN = 24
MIN_RATING = 1
MAX_RATING = 5

_NICKNAME_BAD_RE = re.compile(r"[\u200b-\u200f\U0001f300-\U0001faff]")
_PHONE_RE = re.compile(r"(?:\+?\d[\d\-\s]{7,}\d)")


# --------------------------------------------------------------------------
# Profile
# --------------------------------------------------------------------------

@dataclass
class MatchPrefs:
    """Who a user wants to be paired with.

    ``gender=None`` means "any". Age bounds are inclusive.
    """

    gender: Optional[str] = None
    age_min: int = MIN_AGE
    age_max: int = MAX_AGE
    require_shared_interest: bool = False
    avoid_previous_partners: bool = True

    def accepts(self, other: "AnonProfile", my_interests: Optional[Sequence[str]] = None) -> bool:
        """Hard filter: is ``other`` even eligible for this user?

        ``my_interests`` is the owner's interest list. It is passed in
        rather than stored so :class:`MatchPrefs` stays a plain value
        object that round-trips through JSON untouched.
        """
        if self.gender is not None and other.gender != self.gender:
            return False
        if other.age and not (self.age_min <= other.age <= self.age_max):
            return False
        if self.require_shared_interest:
            mine = {i.lower() for i in (my_interests or [])}
            if mine and not (mine & {i.lower() for i in other.interests}):
                return False
        return True

    def to_dict(self) -> Dict[str, Any]:
        return {
            "gender": self.gender,
            "age_min": self.age_min,
            "age_max": self.age_max,
            "require_shared_interest": self.require_shared_interest,
            "avoid_previous_partners": self.avoid_previous_partners,
        }

    @classmethod
    def from_dict(cls, data: Optional[Dict[str, Any]]) -> "MatchPrefs":
        data = data or {}
        return cls(
            gender=data.get("gender"),
            age_min=int(data.get("age_min", MIN_AGE)),
            age_max=int(data.get("age_max", MAX_AGE)),
            require_shared_interest=bool(data.get("require_shared_interest", False)),
            avoid_previous_partners=bool(data.get("avoid_previous_partners", True)),
        )


@dataclass
class AnonProfile:
    """The anonymous, user-controlled identity shown to a chat partner."""

    user_id: int
    nickname: str = ""
    age: int = 0
    gender: str = Gender.UNSPECIFIED
    city: str = ""
    bio: str = ""
    interests: List[str] = field(default_factory=list)
    avatar_file_id: Optional[str] = None
    prefs: MatchPrefs = field(default_factory=MatchPrefs)
    rating_total: int = 0
    rating_count: int = 0
    reports_received: int = 0
    created_at: float = field(default_factory=time.time)
    updated_at: float = field(default_factory=time.time)
    blocked: Set[int] = field(default_factory=set)

    # -- derived ------------------------------------------------------------
    @property
    def rating(self) -> float:
        """Average rating in 1..5, or 0.0 when never rated."""
        if not self.rating_count:
            return 0.0
        return round(self.rating_total / self.rating_count, 2)

    @property
    def is_complete(self) -> bool:
        """A profile is usable for matching once it has a nickname."""
        return bool(self.nickname.strip())

    def add_rating(self, stars: int) -> float:
        stars = max(MIN_RATING, min(MAX_RATING, int(stars)))
        self.rating_total += stars
        self.rating_count += 1
        self.updated_at = time.time()
        return self.rating

    def shares_interests(self, other: "AnonProfile") -> List[str]:
        mine = {i.lower(): i for i in self.interests}
        return [mine[i.lower()] for i in other.interests if i.lower() in mine]

    def blocks(self, other_id: int) -> bool:
        return other_id in self.blocked

    # -- serialisation ------------------------------------------------------
    def to_dict(self) -> Dict[str, Any]:
        return {
            "user_id": self.user_id,
            "nickname": self.nickname,
            "age": self.age,
            "gender": self.gender,
            "city": self.city,
            "bio": self.bio,
            "interests": list(self.interests),
            "avatar_file_id": self.avatar_file_id,
            "prefs": self.prefs.to_dict(),
            "rating_total": self.rating_total,
            "rating_count": self.rating_count,
            "reports_received": self.reports_received,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "blocked": sorted(self.blocked),
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "AnonProfile":
        return cls(
            user_id=int(data["user_id"]),
            nickname=data.get("nickname", ""),
            age=int(data.get("age", 0) or 0),
            gender=data.get("gender", Gender.UNSPECIFIED),
            city=data.get("city", ""),
            bio=data.get("bio", ""),
            interests=list(data.get("interests") or []),
            avatar_file_id=data.get("avatar_file_id"),
            prefs=MatchPrefs.from_dict(data.get("prefs")),
            rating_total=int(data.get("rating_total", 0)),
            rating_count=int(data.get("rating_count", 0)),
            reports_received=int(data.get("reports_received", 0)),
            created_at=float(data.get("created_at", time.time())),
            updated_at=float(data.get("updated_at", time.time())),
            blocked=set(data.get("blocked") or []),
        )


@dataclass
class ValidationResult:
    """Outcome of validating a profile edit before it is stored."""

    ok: bool
    errors: List[str] = field(default_factory=list)
    field_errors: Dict[str, str] = field(default_factory=dict)

    def __bool__(self) -> bool:  # pragma: no cover - trivial
        return self.ok


# --------------------------------------------------------------------------
# Storage
# --------------------------------------------------------------------------

class ProfileStore(ABC):
    """Persistence for :class:`AnonProfile`.

    Implementations must be safe for concurrent ``await`` from a single
    event loop; the SQLite backend serialises through :mod:`asyncio`
    threads, the memory backend through an :class:`asyncio.Lock`.
    """

    @abstractmethod
    async def get(self, user_id: int) -> Optional[AnonProfile]:
        ...

    @abstractmethod
    async def save(self, profile: AnonProfile) -> None:
        ...

    @abstractmethod
    async def delete(self, user_id: int) -> bool:
        ...

    @abstractmethod
    async def ids(self) -> Iterable[int]:
        ...

    async def count(self) -> int:
        return len(list(await self.ids()))

    async def all(self) -> List[AnonProfile]:
        out: List[AnonProfile] = []
        for uid in list(await self.ids()):
            profile = await self.get(uid)
            if profile is not None:
                out.append(profile)
        return out


class MemoryProfileStore(ProfileStore):
    """In-memory store. Fast, and loses everything on restart."""

    def __init__(self) -> None:
        self._data: Dict[int, AnonProfile] = {}
        self._lock = asyncio.Lock()

    async def get(self, user_id: int) -> Optional[AnonProfile]:
        async with self._lock:
            return self._data.get(user_id)

    async def save(self, profile: AnonProfile) -> None:
        async with self._lock:
            self._data[profile.user_id] = profile

    async def delete(self, user_id: int) -> bool:
        async with self._lock:
            return self._data.pop(user_id, None) is not None

    async def ids(self) -> Iterable[int]:
        async with self._lock:
            return list(self._data.keys())


class SQLiteProfileStore(ProfileStore):
    """Persistent store, one JSON blob per user.

    A single ``data`` column keeps the schema stable as the profile grows:
    new fields never need a migration, and :meth:`AnonProfile.from_dict`
    already tolerates missing keys. ``user_id`` stays a real column so
    ``ids()``/``count()`` never have to decode JSON.
    """

    def __init__(self, db_path: str = "anon_profiles.db") -> None:
        self.db_path = db_path
        self._init_db()

    def _get_conn(self) -> sqlite3.Connection:
        conn = sqlite3.connect(self.db_path, check_same_thread=False, timeout=15.0)
        conn.row_factory = sqlite3.Row
        try:
            conn.execute("pragma journal_mode=WAL")
            conn.execute("pragma synchronous=NORMAL")
        except sqlite3.Error:
            pass
        return conn

    def _init_db(self) -> None:
        with closing(self._get_conn()) as conn, conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS anon_profiles (
                    user_id INTEGER PRIMARY KEY,
                    nickname TEXT NOT NULL DEFAULT '',
                    created_at REAL NOT NULL,
                    updated_at REAL NOT NULL,
                    data TEXT NOT NULL
                )
                """
            )
            conn.commit()

    async def get(self, user_id: int) -> Optional[AnonProfile]:
        def _run() -> Optional[str]:
            with closing(self._get_conn()) as conn, conn:
                cur = conn.execute(
                    "SELECT data FROM anon_profiles WHERE user_id = ?", (user_id,)
                )
                row = cur.fetchone()
                return row["data"] if row else None

        raw = await asyncio.to_thread(_run)
        return AnonProfile.from_dict(json.loads(raw)) if raw else None

    async def save(self, profile: AnonProfile) -> None:
        payload = json.dumps(profile.to_dict(), ensure_ascii=False)
        profile.updated_at = time.time()

        def _run() -> None:
            with closing(self._get_conn()) as conn, conn:
                conn.execute(
                    """
                    INSERT INTO anon_profiles
                        (user_id, nickname, created_at, updated_at, data)
                    VALUES (?, ?, ?, ?, ?)
                    ON CONFLICT(user_id) DO UPDATE SET
                        nickname = excluded.nickname,
                        updated_at = excluded.updated_at,
                        data = excluded.data
                    """,
                    (
                        profile.user_id,
                        profile.nickname,
                        profile.created_at,
                        profile.updated_at,
                        payload,
                    ),
                )
                conn.commit()

        await asyncio.to_thread(_run)

    async def delete(self, user_id: int) -> bool:
        def _run() -> bool:
            with closing(self._get_conn()) as conn, conn:
                cur = conn.execute(
                    "DELETE FROM anon_profiles WHERE user_id = ?", (user_id,)
                )
                conn.commit()
                return cur.rowcount > 0

        return await asyncio.to_thread(_run)

    async def ids(self) -> Iterable[int]:
        def _run() -> List[int]:
            with closing(self._get_conn()) as conn, conn:
                cur = conn.execute("SELECT user_id FROM anon_profiles")
                return [row["user_id"] for row in cur.fetchall()]

        return await asyncio.to_thread(_run)


# --------------------------------------------------------------------------
# Matchmaking
# --------------------------------------------------------------------------

class MatchMaker:
    """Pairs waiting users, preferring good matches over pure randomness.

    Scoring is intentionally simple and explainable:

    ============================  =====
    criterion                     weight
    ============================  =====
    shared interest (each)        3
    gender preference satisfied   5
    age inside preference         2
    mutually positive rating      2
    ============================  =====

    A candidate must pass *both* users' hard filters
    (:meth:`MatchPrefs.accepts`) before it is scored at all, so a user who
    asked for a specific age range never gets someone outside it.

    ``avoid_previous_partners`` skips people you have already chatted with,
    but only while other options exist -- in a small pool it is better to
    rematch than to leave someone waiting forever.
    """

    DEFAULT_WEIGHTS = {
        "shared_interest": 3.0,
        "gender_match": 5.0,
        "age_match": 2.0,
        "rating": 2.0,
    }

    def __init__(
        self,
        *,
        weights: Optional[Dict[str, float]] = None,
        max_queue_age: float = 600.0,
        rng: Optional[random.Random] = None,
        clock: Any = time.time,
    ) -> None:
        self.weights = {**self.DEFAULT_WEIGHTS, **(weights or {})}
        self.max_queue_age = max_queue_age
        self._rng = rng or random.Random()
        self._clock = clock
        # user_id -> time enqueued
        self._queue: Dict[int, float] = {}

    def _now(self) -> float:
        return float(self._clock())

    # -- queue --------------------------------------------------------------
    def enqueue(self, user_id: int) -> None:
        self._queue.setdefault(user_id, self._now())

    def remove(self, user_id: int) -> bool:
        return self._queue.pop(user_id, None) is not None

    def __contains__(self, user_id: int) -> bool:
        return user_id in self._queue

    def __len__(self) -> int:
        return len(self._queue)

    @property
    def queue_ids(self) -> List[int]:
        return list(self._queue.keys())

    def position_of(self, user_id: int) -> int:
        """1-based FIFO position, or 0 when not queued.

        Sorted by enqueue time (then id, so the order is deterministic for
        users who joined in the same instant).
        """
        if user_id not in self._queue:
            return 0
        ordered = sorted(self._queue.items(), key=lambda kv: (kv[1], kv[0]))
        for index, (uid, _) in enumerate(ordered, start=1):
            if uid == user_id:
                return index
        return 0

    def purge_stale(self, now: Optional[float] = None) -> List[int]:
        """Drop entries older than ``max_queue_age``; returns what was dropped."""
        now = self._now() if now is None else now
        stale = [uid for uid, ts in self._queue.items() if now - ts > self.max_queue_age]
        for uid in stale:
            self._queue.pop(uid, None)
        return stale

    # -- scoring ------------------------------------------------------------
    def score(self, a: AnonProfile, b: AnonProfile) -> float:
        """Symmetric compatibility score, 0 or higher."""
        total = 0.0
        shared = a.shares_interests(b)
        total += self.weights["shared_interest"] * len(shared)

        if a.prefs.gender is not None and b.gender == a.prefs.gender:
            total += self.weights["gender_match"]
        if b.prefs.gender is not None and a.gender == b.prefs.gender:
            total += self.weights["gender_match"]

        if a.age and a.prefs.age_min <= a.age <= a.prefs.age_max:
            total += self.weights["age_match"]
        if b.age and b.prefs.age_min <= b.age <= b.prefs.age_max:
            total += self.weights["age_match"]

        if a.rating >= 4.0 and b.rating >= 4.0:
            total += self.weights["rating"]
        return total

    def is_eligible(self, a: AnonProfile, b: AnonProfile) -> bool:
        """Both hard filters pass, neither has blocked the other."""
        if a.user_id == b.user_id:
            return False
        if a.blocks(b.user_id) or b.blocks(a.user_id):
            return False
        return a.prefs.accepts(b, a.interests) and b.prefs.accepts(a, b.interests)

    def find_partner(
        self,
        me: AnonProfile,
        candidates: Sequence[AnonProfile],
        history: Optional[Iterable[Tuple[int, int]]] = None,
    ) -> Optional[AnonProfile]:
        """Best eligible candidate from the queue, or ``None``.

        ``history`` is an iterable of ``(user_a, user_b)`` pairs already
        chatted; used for ``avoid_previous_partners``.
        """
        history = set(history or ())

        def _already_chatted(candidate: AnonProfile) -> bool:
            """``history`` may be stored in either id order (or normalised)."""
            return (
                (me.user_id, candidate.user_id) in history
                or (candidate.user_id, me.user_id) in history
            )

        eligible = [c for c in candidates if self.is_eligible(me, c)]
        if not eligible:
            return None

        # `and` binds tighter than `or`, so this needs explicit parens:
        # only skip a past partner when the user actually asked for that.
        fresh = [
            c for c in eligible
            if not (me.prefs.avoid_previous_partners and _already_chatted(c))
        ]
        pool = fresh or eligible  # rematch beats waiting forever

        best_score = max(self.score(me, c) for c in pool)
        # Tie-break randomly so one popular profile is not always picked first.
        top = [c for c in pool if self.score(me, c) == best_score]
        return self._rng.choice(top)


# --------------------------------------------------------------------------
# Sessions
# --------------------------------------------------------------------------

@dataclass
class ChatSession:
    """One live anonymous conversation between two users."""

    id: str
    a: int
    b: int
    started_at: float = field(default_factory=time.time)
    ended_at: Optional[float] = None
    messages: Dict[int, int] = field(default_factory=dict)

    def partner_of(self, user_id: int) -> Optional[int]:
        if user_id == self.a:
            return self.b
        if user_id == self.b:
            return self.a
        return None

    def participants(self) -> Tuple[int, int]:
        return (self.a, self.b)

    def record_message(self, user_id: int) -> int:
        self.messages[user_id] = self.messages.get(user_id, 0) + 1
        return self.messages[user_id]

    @property
    def total_messages(self) -> int:
        return sum(self.messages.values())

    @property
    def is_open(self) -> bool:
        return self.ended_at is None

    @property
    def key(self) -> int:
        """Stable integer form of :attr:`id`, for use as a rate-limit bucket.

        Ids are normally 12 hex chars from :func:`uuid.uuid4`; the fallback
        keeps the property total for hand-constructed sessions.
        """
        try:
            return int(self.id[:12], 16)
        except ValueError:
            return hash(self.id) & 0xFFFFFFFF


class SessionManager:
    """Tracks open sessions and finished-pair history."""

    def __init__(self, *, keep_history: int = 4096) -> None:
        self._open: Dict[int, ChatSession] = {}
        self._history: Set[Tuple[int, int]] = set()
        self._keep_history = keep_history
        self._finished: List[ChatSession] = []

    def open_session(self, a: int, b: int) -> ChatSession:
        """Create a session, closing any existing one for either user."""
        for uid in (a, b):
            existing = self._open.get(uid)
            if existing is not None:
                self.close_session(uid)
        session = ChatSession(id=uuid.uuid4().hex[:12], a=a, b=b)
        self._open[a] = session
        self._open[b] = session
        return session

    def for_user(self, user_id: int) -> Optional[ChatSession]:
        session = self._open.get(user_id)
        return session if session is not None and session.is_open else None

    def close_session(self, user_id: int) -> Optional[ChatSession]:
        session = self._open.pop(user_id, None)
        if session is None:
            return None
        partner = session.partner_of(user_id)
        if partner is not None:
            self._open.pop(partner, None)
        session.ended_at = time.time()
        self._record_history(session)
        return session

    def _record_history(self, session: ChatSession) -> None:
        pair = (min(session.a, session.b), max(session.a, session.b))
        if pair not in self._history:
            self._history.add(pair)
            if len(self._history) > self._keep_history:
                # bounded: drop an arbitrary oldest-ish entry
                self._history.pop()
        self._finished.append(session)

    def history_pairs(self) -> Set[Tuple[int, int]]:
        """Normalised ``(low_id, high_id)`` pairs that have chatted before."""
        return set(self._history)

    @property
    def active_count(self) -> int:
        return len(self._open) // 2

    @property
    def finished(self) -> List[ChatSession]:
        return list(self._finished)


# --------------------------------------------------------------------------
# Results
# --------------------------------------------------------------------------

@dataclass
class SearchResult:
    """Outcome of asking for a chat partner."""

    status: str  # "matched" | "queued" | "no_partner" | "already_searching" | "in_chat" | "banned" | "needs_profile"
    session: Optional[ChatSession] = None
    partner: Optional[AnonProfile] = None
    queue_position: int = 0
    reason: str = ""

    @property
    def matched(self) -> bool:
        return self.status == "matched"


@dataclass
class RelayResult:
    """Outcome of forwarding one message inside a chat."""

    delivered: bool
    to: Optional[int] = None
    reason: str = ""  # "" | "no_session" | "flood" | "banned" | "blocked" | "link" | "profanity"
    text: Optional[str] = None
    partner: Optional[AnonProfile] = None

    @property
    def blocked_by_policy(self) -> bool:
        return self.reason in {"flood", "banned", "blocked", "link", "profanity"}


@dataclass
class ReportResult:
    """Outcome of reporting a partner."""

    accepted: bool
    target_banned: bool = False
    ban_seconds: float = 0.0
    reports_on_target: int = 0
    reason: str = ""
    #: Set when the ban tore down a live chat: the *innocent* partner who now
    #: needs to be told why their conversation just disappeared.
    evicted_partner: Optional[int] = None


@dataclass
class BanRecord:
    user_id: int
    until: float
    reason: str = ""
    reports: int = 0
    #: The live session torn down by this ban, if any. The caller uses it to
    #: tell the *innocent* partner why their chat just ended -- otherwise they
    #: only see "you are not in a chat", which reads like a bug.
    evicted_session: Optional["ChatSession"] = None

    def is_active(self, now: Optional[float] = None) -> bool:
        now = time.time() if now is None else now
        return now < self.until

    def partner_of_banned(self) -> Optional[int]:
        """Who to notify about this ban, or ``None`` if nobody was chatting."""
        if self.evicted_session is None:
            return None
        return self.evicted_session.partner_of(self.user_id)


# --------------------------------------------------------------------------
# The manager
# --------------------------------------------------------------------------

class AnonChatManager:
    """Orchestrates profiles, matching, relay and safety.

    No I/O beyond the injected :class:`ProfileStore`. Every public method
    returns a result object; the caller decides how to render and send it.
    """

    #: Why a relay may be refused -- also the i18n keys.
    REASON_NO_SESSION = "no_session"
    REASON_FLOOD = "flood"
    REASON_BANNED = "banned"
    REASON_BLOCKED = "blocked"
    REASON_LINK = "link"
    REASON_PROFANITY = "profanity"

    def __init__(
        self,
        store: Optional[ProfileStore] = None,
        *,
        matcher: Optional[MatchMaker] = None,
        sessions: Optional[SessionManager] = None,
        link_guard: Optional[LinkGuard] = None,
        antiflood: Optional[AntiFlood] = None,
        bad_words: Optional[PersianBadWordsFilter] = None,
        max_messages_per_minute: int = 25,
        min_message_interval: float = 0.9,
        reports_to_ban: int = 3,
        ban_seconds: float = 24 * 3600,
        block_links: bool = True,
        block_profanity: bool = True,
        clock: Any = time.time,
        rng: Optional[random.Random] = None,
    ) -> None:
        self.store = store or MemoryProfileStore()
        self.matcher = matcher or MatchMaker(rng=rng, clock=clock)
        self.sessions = sessions or SessionManager()
        self.link_guard = link_guard if link_guard is not None else LinkGuard()
        self.antiflood = antiflood if antiflood is not None else AntiFlood(
            max_messages=max_messages_per_minute, period=60.0
        )
        self.bad_words = bad_words if bad_words is not None else PersianBadWordsFilter()
        self.min_message_interval = min_message_interval
        self.reports_to_ban = reports_to_ban
        self.ban_seconds = ban_seconds
        self.block_links = block_links
        self.block_profanity = block_profanity
        self._clock = clock
        self._rng = rng or random.Random()

        self._bans: Dict[int, BanRecord] = {}
        self._reports: Dict[int, Set[int]] = {}  # target -> set(reporter)
        self._last_message_at: Dict[int, float] = {}
        self._stats = {"searches": 0, "matches": 0, "messages": 0, "reports": 0, "blocks": 0}

    # -- helpers ------------------------------------------------------------
    @property
    def clock(self) -> Any:
        """The time source, exposed so callers (and tests) can drive it."""
        return self._clock

    def now(self) -> float:
        return float(self._clock())

    def ban_info(self, user_id: int) -> Optional[BanRecord]:
        record = self._bans.get(user_id)
        if record is None:
            return None
        if not record.is_active(self.now()):
            self._bans.pop(user_id, None)
            return None
        return record

    def is_banned(self, user_id: int) -> bool:
        return self.ban_info(user_id) is not None

    def ban(self, user_id: int, seconds: Optional[float] = None, reason: str = "") -> BanRecord:
        seconds = self.ban_seconds if seconds is None else seconds
        # A banned user must not stay in the queue or in a live chat. Closing
        # the session first lets us hand it back for partner notification.
        evicted = self.sessions.close_session(user_id)
        self.matcher.remove(user_id)
        record = BanRecord(
            user_id=user_id,
            until=self.now() + seconds,
            reason=reason,
            reports=len(self._reports.get(user_id, ())),
            evicted_session=evicted,
        )
        self._bans[user_id] = record
        return record

    def unban(self, user_id: int) -> bool:
        self._reports.pop(user_id, None)
        return self._bans.pop(user_id, None) is not None

    # -- profiles -----------------------------------------------------------
    async def get_profile(self, user_id: int) -> AnonProfile:
        profile = await self.store.get(user_id)
        if profile is None:
            profile = AnonProfile(user_id=user_id, created_at=self.now(), updated_at=self.now())
        return profile

    async def ensure_profile(self, user_id: int) -> AnonProfile:
        """Fetch, or create-and-persist, a profile."""
        profile = await self.get_profile(user_id)
        if await self.store.get(user_id) is None:
            await self.store.save(profile)
        return profile

    @staticmethod
    def validate(**fields: Any) -> ValidationResult:
        """Validate user-supplied profile fields without touching storage."""
        errors: List[str] = []
        field_errors: Dict[str, str] = {}

        if "nickname" in fields:
            nick = str(fields["nickname"]).strip()
            nick = _NICKNAME_BAD_RE.sub("", nick)
            if not nick:
                field_errors["nickname"] = "nickname_required"
            elif len(nick) > MAX_NICKNAME_LEN:
                field_errors["nickname"] = "nickname_too_long"

        if "age" in fields and fields["age"] not in (None, ""):
            try:
                age = int(fields["age"])
            except (TypeError, ValueError):
                field_errors["age"] = "age_invalid"
            else:
                if not MIN_AGE <= age <= MAX_AGE:
                    field_errors["age"] = "age_out_of_range"

        if "gender" in fields and fields["gender"] not in Gender.ALL:
            field_errors["gender"] = "gender_invalid"

        if "city" in fields and len(str(fields["city"])) > MAX_CITY_LEN:
            field_errors["city"] = "city_too_long"

        if "bio" in fields and len(str(fields["bio"])) > MAX_BIO_LEN:
            field_errors["bio"] = "bio_too_long"

        if "interests" in fields:
            items = fields["interests"]
            if isinstance(items, str):
                items = [p.strip() for p in re.split(r"[,،\n]+", items) if p.strip()]
            if not isinstance(items, (list, tuple)):
                field_errors["interests"] = "interests_invalid"
            elif len(items) > MAX_INTERESTS:
                field_errors["interests"] = "too_many_interests"
            elif any(len(str(i)) > MAX_INTEREST_LEN for i in items):
                field_errors["interests"] = "interest_too_long"

        if "prefs" in fields and isinstance(fields["prefs"], MatchPrefs):
            p = fields["prefs"]
            if p.age_min > p.age_max:
                field_errors["prefs"] = "age_range_inverted"
            if p.gender is not None and p.gender not in Gender.ALL:
                field_errors["gender"] = "gender_invalid"

        errors = list(field_errors.values())
        return ValidationResult(ok=not errors, errors=errors, field_errors=field_errors)

    async def update_profile(self, user_id: int, **fields: Any) -> Tuple[Optional[AnonProfile], ValidationResult]:
        """Apply validated edits. Returns ``(profile, result)``; profile is
        ``None`` when validation failed."""
        result = self.validate(**fields)
        if not result.ok:
            return None, result

        profile = await self.ensure_profile(user_id)

        if "nickname" in fields:
            profile.nickname = _NICKNAME_BAD_RE.sub("", str(fields["nickname"]).strip())
        if "age" in fields and fields["age"] not in (None, ""):
            profile.age = int(fields["age"])
        if "gender" in fields:
            profile.gender = fields["gender"]
        if "city" in fields:
            profile.city = str(fields["city"]).strip()[:MAX_CITY_LEN]
        if "bio" in fields:
            profile.bio = str(fields["bio"]).strip()[:MAX_BIO_LEN]
        if "interests" in fields:
            items = fields["interests"]
            if isinstance(items, str):
                items = [p.strip() for p in re.split(r"[,،\n]+", items) if p.strip()]
            # de-duplicate case-insensitively, preserving order
            seen: Set[str] = set()
            cleaned: List[str] = []
            for item in items:
                key = str(item).strip().lower()
                if key and key not in seen:
                    seen.add(key)
                    cleaned.append(str(item).strip()[:MAX_INTEREST_LEN])
            profile.interests = cleaned[:MAX_INTERESTS]
        if "avatar_file_id" in fields:
            profile.avatar_file_id = fields["avatar_file_id"]
        if "prefs" in fields and isinstance(fields["prefs"], MatchPrefs):
            profile.prefs = fields["prefs"]

        profile.updated_at = self.now()
        await self.store.save(profile)
        return profile, result

    async def delete_profile(self, user_id: int) -> bool:
        self.matcher.remove(user_id)
        self.sessions.close_session(user_id)
        return await self.store.delete(user_id)

    # -- matching -----------------------------------------------------------
    async def _candidate_profiles(self) -> List[AnonProfile]:
        out: List[AnonProfile] = []
        for uid in self.matcher.queue_ids:
            profile = await self.store.get(uid)
            if profile is not None and profile.is_complete and not self.is_banned(uid):
                out.append(profile)
        return out

    async def start_search(self, user_id: int) -> SearchResult:
        """Find a partner now, or join the queue."""
        if self.is_banned(user_id):
            return SearchResult(status="banned", reason="banned")

        if self.sessions.for_user(user_id) is not None:
            return SearchResult(status="in_chat", reason="in_chat")

        profile = await self.ensure_profile(user_id)
        if not profile.is_complete:
            return SearchResult(status="needs_profile", reason="needs_profile")

        self._stats["searches"] += 1

        # Already waiting? Report position instead of re-queueing.
        if user_id in self.matcher:
            return SearchResult(
                status="already_searching",
                queue_position=self.matcher.position_of(user_id),
            )

        self.matcher.purge_stale(self.now())
        candidates = await self._candidate_profiles()
        partner = self.matcher.find_partner(
            profile, candidates, history=self.sessions.history_pairs()
        )

        if partner is None:
            self.matcher.enqueue(user_id)
            position = len(self.matcher)
            return SearchResult(status="queued", queue_position=position)

        self.matcher.remove(partner.user_id)
        session = self.sessions.open_session(user_id, partner.user_id)
        self._stats["matches"] += 1
        return SearchResult(status="matched", session=session, partner=partner)

    async def cancel_search(self, user_id: int) -> bool:
        return self.matcher.remove(user_id)

    @property
    def queue_size(self) -> int:
        return len(self.matcher)

    # -- relay --------------------------------------------------------------
    async def relay(
        self,
        sender_id: int,
        *,
        text: Optional[str] = None,
        has_media: bool = False,
    ) -> RelayResult:
        """Decide where (or whether) a message goes.

        Media is relayed by ``file_id`` and only text is inspected, so
        ``has_media=True`` with no text skips content checks but still
        counts against the flood limiter.
        """
        if self.is_banned(sender_id):
            return RelayResult(delivered=False, reason=self.REASON_BANNED)

        session = self.sessions.for_user(sender_id)
        if session is None:
            return RelayResult(delivered=False, reason=self.REASON_NO_SESSION)

        partner_id = session.partner_of(sender_id)
        if partner_id is None:  # pragma: no cover - defensive
            return RelayResult(delivered=False, reason=self.REASON_NO_SESSION)

        if self.is_banned(partner_id):
            return RelayResult(delivered=False, reason=self.REASON_BANNED)

        partner = await self.store.get(partner_id)

        # Minimum spacing between a sender's own messages.
        last = self._last_message_at.get(sender_id, 0.0)
        if self.now() - last < self.min_message_interval:
            return RelayResult(delivered=False, reason=self.REASON_FLOOD, partner=partner)

        if text:
            if self.block_links and (
                self.link_guard.has_unallowed_links(text)
                or self.link_guard.is_invite_link(text)
                or _PHONE_RE.search(text)
            ):
                return RelayResult(delivered=False, reason=self.REASON_LINK, partner=partner)
            if self.block_profanity and self.bad_words.contains_bad_words(text):
                return RelayResult(
                    delivered=False, reason=self.REASON_PROFANITY, partner=partner
                )

        if self.antiflood.is_flooding(session.key, sender_id):
            return RelayResult(delivered=False, reason=self.REASON_FLOOD, partner=partner)

        self._last_message_at[sender_id] = self.now()
        session.record_message(sender_id)
        self._stats["messages"] += 1
        return RelayResult(delivered=True, to=partner_id, text=text, partner=partner)

    # -- ending, rating, reporting -----------------------------------------
    async def next_partner(self, user_id: int) -> SearchResult:
        """Leave the current chat and immediately look for a new partner."""
        self.sessions.close_session(user_id)
        return await self.start_search(user_id)

    async def stop_chat(self, user_id: int) -> Optional[ChatSession]:
        """Leave the current chat without searching again."""
        self.matcher.remove(user_id)
        return self.sessions.close_session(user_id)

    async def rate_partner(self, user_id: int, stars: int) -> bool:
        """Rate the most recent partner. Returns False when there is none."""
        if not MIN_RATING <= stars <= MAX_RATING:
            return False
        session = self._most_recent_session(user_id)
        if session is None:
            return False
        target = session.partner_of(user_id)
        if target is None:
            return False
        profile = await self.ensure_profile(target)
        profile.add_rating(stars)
        await self.store.save(profile)
        return True

    def _most_recent_session(self, user_id: int) -> Optional[ChatSession]:
        live = self.sessions.for_user(user_id)
        if live is not None:
            return live
        for session in reversed(self.sessions.finished):
            if session.partner_of(user_id) is not None:
                return session
        return None

    async def report(
        self, reporter_id: int, target_id: Optional[int] = None, reason: str = ""
    ) -> ReportResult:
        """Report the current (or given) partner.

        Reports are de-duplicated per reporter, so spamming the button does
        not accelerate a ban. Reaching :attr:`reports_to_ban` unique
        reporters bans the target and evicts them from queue and chat.
        """
        if target_id is None:
            session = self._most_recent_session(reporter_id)
            if session is None:
                return ReportResult(accepted=False, reason="no_partner")
            target_id = session.partner_of(reporter_id)
            if target_id is None:
                return ReportResult(accepted=False, reason="no_partner")

        if target_id == reporter_id:
            return ReportResult(accepted=False, reason="self_report")

        reporters = self._reports.setdefault(target_id, set())
        already = reporter_id in reporters
        reporters.add(reporter_id)

        target = await self.ensure_profile(target_id)
        if not already:
            target.reports_received = len(reporters)
            await self.store.save(target)

        self._stats["reports"] += 1

        if len(reporters) >= self.reports_to_ban:
            record = self.ban(target_id, reason=reason or "reported")
            evicted = record.partner_of_banned()
            return ReportResult(
                accepted=True,
                target_banned=True,
                ban_seconds=max(0.0, record.until - self.now()),
                reports_on_target=len(reporters),
                # May equal the reporter themselves; the caller decides
                # whether they still need the "partner left" message.
                evicted_partner=evicted,
            )
        return ReportResult(accepted=True, reports_on_target=len(reporters))

    async def block(self, user_id: int, target_id: int) -> bool:
        """Never be matched with ``target_id`` again."""
        if user_id == target_id:
            return False
        profile = await self.ensure_profile(user_id)
        if target_id in profile.blocked:
            return False
        profile.blocked.add(target_id)
        await self.store.save(profile)
        self._stats["blocks"] += 1
        # Blocking also ends a live chat with that person.
        session = self.sessions.for_user(user_id)
        if session is not None and session.partner_of(user_id) == target_id:
            self.sessions.close_session(user_id)
        return True

    async def unblock(self, user_id: int, target_id: int) -> bool:
        profile = await self.ensure_profile(user_id)
        if target_id not in profile.blocked:
            return False
        profile.blocked.discard(target_id)
        await self.store.save(profile)
        return True

    # -- stats --------------------------------------------------------------
    def stats(self) -> Dict[str, Any]:
        """Synchronous counters. Use :meth:`full_stats` to include the
        profile total, which needs a storage round-trip."""
        return {
            **self._stats,
            "waiting": len(self.matcher),
            "active_chats": self.sessions.active_count,
            "banned": len([r for r in self._bans.values() if r.is_active(self.now())]),
        }

    async def full_stats(self) -> Dict[str, Any]:
        return {**self.stats(), "profiles": await self.store.count()}


# --------------------------------------------------------------------------
# Presentation
# --------------------------------------------------------------------------

STRINGS: Dict[str, Dict[str, str]] = {
    "fa": {
        "welcome": "👋 سلام! اینجا می‌تونی ناشناس با افراد جدید چت کنی.\nاول یه پروفایل بساز، بعد بزن بریم.",
        "need_profile": "⚠️ اول باید پروفایلت رو کامل کنی. حداقل یه نام مستعار لازم است.",
        "profile_saved": "✅ پروفایل ذخیره شد.",
        "searching": "🔎 دنبال هم‌صحبت می‌گردم…",
        "queued": "⏳ توی صف هستی. جایگاه تو: {position}",
        "matched": "🎉 وصل شدی! با {nickname} صحبت می‌کنی.",
        "no_partner": "😕 فعلاً کسی آنلاین نیست. کمی بعد دوباره امتحان کن.",
        "partner_left": "👋 طرف مقابل چت را ترک کرد.",
        "you_left": "چت پایان یافت.",
        "next": "⏭️ نفر بعدی",
        "stop": "🛑 پایان چت",
        "view_profile": "👤 پروفایل",
        "report": "🚨 گزارش",
        "rate": "⭐ امتیاز",
        "flood": "⛔ آروم‌تر! پشت سر هم پیام نده.",
        "banned": "🚫 حساب شما به دلیل گزارش کاربران مسدود شده است.",
        "link_blocked": "⛔ ارسال لینک یا شماره تماس در چت ناشناس مجاز نیست.",
        "profanity_blocked": "⛔ لطفاً مؤدب باش.",
        "not_in_chat": "🤔 الان توی چت نیستی. اول یه هم‌صحبت پیدا کن.",
        "report_sent": "🚨 گزارش ثبت شد. ممنون که کمک می‌کنی اینجا امن بمونه.",
        "report_banned": "🚫 کاربر گزارش‌شده مسدود شد.",
        "rating_saved": "⭐ ممنون از امتیازت!",
        "blocked": "🚫 این کاربر مسدود شد؛ دیگه به هم وصل نمی‌شید.",
        # -- profile wizard prompts --
        "ask_age": "🎂 سنت رو وارد کن (۱۳ تا ۹۹):",
        "ask_gender": "⚧ جنسیتت چیه؟ (مرد / زن / سایر)",
        "ask_city": "📍 شهرت رو بنویس:",
        "ask_bio": "📝 یه معرفی کوتاه درباره خودت بنویس:",
        "ask_interests": "🎯 علایقت رو با کاما جدا کن (مثلاً موسیقی، فیلم، کتاب):",
        "ask_rating": "⭐ به هم‌صحبت قبلی‌ت از ۱ تا ۵ امتیاز بده: /rate 5",
        "already_in_chat": "🤝 الان توی چت هستی! اول /stop بزن.",
        "lang_set": "🌐 زبان تنظیم شد.",
        "stats": ("📊 آمار\n⏳ در انتظار: {waiting}\n💬 چت فعال: {chats}\n"
                  "👤 پروفایل‌ها: {profiles}\n✉️ پیام‌ها: {messages}"),
        # -- validation errors (the codes AnonChatManager.validate returns) --
        "nickname_required": "⚠️ لطفاً یک نام مستعار وارد کن.",
        "nickname_too_long": "⚠️ نام مستعار خیلی طولانی است (حداکثر ۳۲ کاراکتر).",
        "age_invalid": "⚠️ سن باید یک عدد باشد.",
        "age_out_of_range": "⚠️ سن باید بین ۱۳ تا ۹۹ باشد.",
        "gender_invalid": "⚠️ لطفاً یکی از گزینه‌ها را انتخاب کن: مرد، زن یا سایر.",
        "city_too_long": "⚠️ نام شهر خیلی طولانی است.",
        "bio_too_long": "⚠️ معرفی خیلی طولانی است (حداکثر ۳۰۰ کاراکتر).",
        "interests_invalid": "⚠️ علایق را با کاما جدا کن.",
        "too_many_interests": "⚠️ حداکثر ۸ علاقه می‌توانی انتخاب کنی.",
        "interest_too_long": "⚠️ یکی از علایق خیلی طولانی است.",
        "age_range_inverted": "⚠️ حداقل سن نمی‌تواند از حداکثر سن بیشتر باشد.",
        "card_title": "👤 {nickname}",
        "card_age": "🎂 سن: {age}",
        "card_gender": "⚧ جنسیت: {gender}",
        "card_city": "📍 شهر: {city}",
        "card_bio": "📝 {bio}",
        "card_interests": "🎯 علایق: {interests}",
        "card_rating": "⭐ امتیاز: {rating} ({count} نظر)",
        "anon_note": "🕶 نام واقعی و آیدی شما هرگز نمایش داده نمی‌شود.",
        "gender_male": "مرد",
        "gender_female": "زن",
        "gender_other": "سایر",
        "gender_unspecified": "نگفته",
    },
    "en": {
        "welcome": "👋 Hi! Chat anonymously with new people here.\nBuild a profile first, then start searching.",
        "need_profile": "⚠️ Complete your profile first. A nickname is required.",
        "profile_saved": "✅ Profile saved.",
        "searching": "🔎 Looking for a chat partner…",
        "queued": "⏳ You are in the queue. Position: {position}",
        "matched": "🎉 Connected! You are now chatting with {nickname}.",
        "no_partner": "😕 Nobody is around right now. Try again shortly.",
        "partner_left": "👋 Your partner left the chat.",
        "you_left": "Chat ended.",
        "next": "⏭️ Next",
        "stop": "🛑 Stop",
        "view_profile": "👤 Profile",
        "report": "🚨 Report",
        "rate": "⭐ Rate",
        "flood": "⛔ Slow down! Don't spam messages.",
        "banned": "🚫 Your account was blocked following user reports.",
        "link_blocked": "⛔ Links and phone numbers are not allowed in anonymous chat.",
        "profanity_blocked": "⛔ Please keep it polite.",
        "not_in_chat": "🤔 You are not in a chat. Find a partner first.",
        "report_sent": "🚨 Report filed. Thanks for helping keep this safe.",
        "report_banned": "🚫 The reported user has been blocked.",
        "rating_saved": "⭐ Thanks for rating!",
        "blocked": "🚫 User blocked; you will not be matched again.",
        # -- profile wizard prompts --
        "ask_age": "🎂 Enter your age (13-99):",
        "ask_gender": "⚧ What is your gender? (male / female / other)",
        "ask_city": "📍 Which city are you in?",
        "ask_bio": "📝 Write a short line about yourself:",
        "ask_interests": "🎯 List your interests, comma separated (e.g. music, film, books):",
        "ask_rating": "⭐ Rate your last partner from 1 to 5: /rate 5",
        "already_in_chat": "🤝 You are already in a chat. Send /stop first.",
        "lang_set": "🌐 Language updated.",
        "stats": ("📊 Stats\n⏳ Waiting: {waiting}\n💬 Active chats: {chats}\n"
                  "👤 Profiles: {profiles}\n✉️ Messages: {messages}"),
        # -- validation errors (the codes AnonChatManager.validate returns) --
        "nickname_required": "⚠️ Please enter a nickname.",
        "nickname_too_long": "⚠️ That nickname is too long (max 32 characters).",
        "age_invalid": "⚠️ Age must be a number.",
        "age_out_of_range": "⚠️ Age must be between 13 and 99.",
        "gender_invalid": "⚠️ Please pick one: male, female or other.",
        "city_too_long": "⚠️ That city name is too long.",
        "bio_too_long": "⚠️ That bio is too long (max 300 characters).",
        "interests_invalid": "⚠️ Separate your interests with commas.",
        "too_many_interests": "⚠️ You can pick at most 8 interests.",
        "interest_too_long": "⚠️ One of those interests is too long.",
        "age_range_inverted": "⚠️ Minimum age cannot be greater than maximum age.",
        "card_title": "👤 {nickname}",
        "card_age": "🎂 Age: {age}",
        "card_gender": "⚧ Gender: {gender}",
        "card_city": "📍 City: {city}",
        "card_bio": "📝 {bio}",
        "card_interests": "🎯 Interests: {interests}",
        "card_rating": "⭐ Rating: {rating} ({count} votes)",
        "anon_note": "🕶 Your real name and username are never shown.",
        "gender_male": "Male",
        "gender_female": "Female",
        "gender_other": "Other",
        "gender_unspecified": "Not set",
    },
}


def tr(lang: str, key: str, **kwargs: Any) -> str:
    """Look up a string, falling back to English then to the key itself."""
    table = STRINGS.get(lang) or STRINGS["en"]
    text = table.get(key) or STRINGS["en"].get(key) or key
    try:
        return text.format(**kwargs) if kwargs else text
    except (KeyError, IndexError):
        return text


def render_profile_card(profile: AnonProfile, lang: str = "fa", *, show_rating: bool = True) -> str:
    """Render the anonymous card a partner sees. Never includes real identity."""
    table = STRINGS.get(lang) or STRINGS["en"]
    lines = [tr(lang, "card_title", nickname=profile.nickname or "?")]
    if profile.age:
        lines.append(tr(lang, "card_age", age=profile.age))
    gender_key = f"gender_{profile.gender}"
    lines.append(tr(lang, "card_gender", gender=table.get(gender_key, profile.gender)))
    if profile.city:
        lines.append(tr(lang, "card_city", city=profile.city))
    if profile.bio:
        lines.append(tr(lang, "card_bio", bio=profile.bio))
    if profile.interests:
        lines.append(tr(lang, "card_interests", interests="، ".join(profile.interests)
                        if lang == "fa" else ", ".join(profile.interests)))
    if show_rating and profile.rating_count:
        lines.append(tr(lang, "card_rating", rating=profile.rating, count=profile.rating_count))
    lines.append("")
    lines.append(tr(lang, "anon_note"))
    return "\n".join(lines)


def inline_keyboard(lang: str = "fa", *, in_chat: bool = True) -> List[Dict[str, str]]:
    """Plain ``{text, callback_data}`` rows for the in-chat controls.

    Returned as plain dicts so callers can feed them to
    :meth:`client.build_reply_markup` / ``Button.inline`` without this
    module importing the TL layer.
    """
    if not in_chat:
        return [{"text": tr(lang, "view_profile"), "callback_data": "anon:profile"}]
    return [
        {"text": tr(lang, "next"), "callback_data": "anon:next"},
        {"text": tr(lang, "stop"), "callback_data": "anon:stop"},
        {"text": tr(lang, "view_profile"), "callback_data": "anon:profile"},
        {"text": tr(lang, "rate"), "callback_data": "anon:rate"},
        {"text": tr(lang, "report"), "callback_data": "anon:report"},
    ]
