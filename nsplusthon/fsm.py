"""Finite State Machine (FSM) implementation for conversation states."""

from __future__ import annotations

import asyncio
import json
import sqlite3
from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional, Union


class State:
    """Represents a single state inside a state group."""

    def __init__(self, name: Optional[str] = None, group_name: Optional[str] = None):
        self._name = name
        self._group_name = group_name

    @property
    def name(self) -> str:
        if self._group_name and self._name:
            return f"{self._group_name}:{self._name}"
        return self._name or "State"

    def __repr__(self) -> str:
        return f"<State '{self.name}'>"

    def __eq__(self, other: Any) -> bool:
        if isinstance(other, State):
            return self.name == other.name
        if isinstance(other, str):
            return self.name == other
        return False

    def __hash__(self) -> int:
        return hash(self.name)


class StatesGroupMeta(type):
    """Metaclass that automatically names state attributes in state groups."""

    def __new__(mcs, name, bases, namespace):
        cls = super().__new__(mcs, name, bases, namespace)
        states = []
        for attr_name, attr_val in namespace.items():
            if isinstance(attr_val, State):
                attr_val._name = attr_name
                attr_val._group_name = name
                states.append(attr_val)
        cls._states = states
        return cls


class StatesGroup(metaclass=StatesGroupMeta):
    """Base class for defining groups of states."""

    _states: List[State] = []

    @classmethod
    def all_states(cls) -> List[State]:
        return list(cls._states)


class StateStorage(ABC):
    """Abstract base class for FSM state storage backends."""

    @abstractmethod
    async def set_state(self, key: str, state: Optional[Union[State, str]]) -> None:
        pass

    @abstractmethod
    async def get_state(self, key: str) -> Optional[str]:
        pass

    @abstractmethod
    async def set_data(self, key: str, data: Dict[str, Any]) -> None:
        pass

    @abstractmethod
    async def get_data(self, key: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    async def update_data(self, key: str, **kwargs: Any) -> Dict[str, Any]:
        pass

    @abstractmethod
    async def clear(self, key: str) -> None:
        pass

    def get_context(self, user_id: int, chat_id: Optional[int] = None) -> FSMContext:
        key = f"{chat_id or 0}:{user_id}"
        return FSMContext(storage=self, key=key)


class MemoryStorage(StateStorage):
    """In-memory storage backend for FSM states and context data."""

    def __init__(self):
        self._states: Dict[str, Optional[str]] = {}
        self._data: Dict[str, Dict[str, Any]] = {}
        self._lock = None  # created lazily — py3.9 binds Lock to the current loop

    def _get_lock(self) -> asyncio.Lock:
        if self._lock is None:
            self._lock = asyncio.Lock()
        return self._lock

    async def set_state(self, key: str, state: Optional[Union[State, str]]) -> None:
        async with self._get_lock():
            if state is None:
                self._states.pop(key, None)
            else:
                self._states[key] = state.name if isinstance(state, State) else str(state)

    async def get_state(self, key: str) -> Optional[str]:
        async with self._get_lock():
            return self._states.get(key)

    async def set_data(self, key: str, data: Dict[str, Any]) -> None:
        async with self._get_lock():
            self._data[key] = dict(data)

    async def get_data(self, key: str) -> Dict[str, Any]:
        async with self._get_lock():
            return dict(self._data.get(key, {}))

    async def update_data(self, key: str, **kwargs: Any) -> Dict[str, Any]:
        async with self._get_lock():
            current = self._data.setdefault(key, {})
            current.update(kwargs)
            return dict(current)

    async def clear(self, key: str) -> None:
        async with self._get_lock():
            self._states.pop(key, None)
            self._data.pop(key, None)


class SQLiteStorage(StateStorage):
    """SQLite-backed persistent storage for FSM states and context data."""

    def __init__(self, db_path: str = "fsm_states.db"):
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
        with self._get_conn() as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS fsm_data (
                    key TEXT PRIMARY KEY,
                    state TEXT,
                    data TEXT NOT NULL DEFAULT '{}'
                )
                """
            )
            conn.commit()

    @staticmethod
    def _state_to_str(state: Optional[Union[State, str]]) -> Optional[str]:
        if state is None:
            return None
        return state.name if isinstance(state, State) else str(state)

    async def set_state(self, key: str, state: Optional[Union[State, str]]) -> None:
        st_str = self._state_to_str(state)

        def _run():
            with self._get_conn() as conn:
                if st_str is None:
                    conn.execute("UPDATE fsm_data SET state = NULL WHERE key = ?", (key,))
                else:
                    conn.execute(
                        """
                        INSERT INTO fsm_data (key, state, data) VALUES (?, ?, '{}')
                        ON CONFLICT(key) DO UPDATE SET state = excluded.state
                        """,
                        (key, st_str),
                    )
                conn.commit()

        await asyncio.to_thread(_run)

    async def get_state(self, key: str) -> Optional[str]:
        def _run():
            with self._get_conn() as conn:
                cur = conn.execute("SELECT state FROM fsm_data WHERE key = ?", (key,))
                row = cur.fetchone()
                return row["state"] if row else None

        return await asyncio.to_thread(_run)

    async def set_data(self, key: str, data: Dict[str, Any]) -> None:
        raw = json.dumps(data)

        def _run():
            with self._get_conn() as conn:
                conn.execute(
                    """
                    INSERT INTO fsm_data (key, state, data) VALUES (?, NULL, ?)
                    ON CONFLICT(key) DO UPDATE SET data = excluded.data
                    """,
                    (key, raw),
                )
                conn.commit()

        await asyncio.to_thread(_run)

    async def get_data(self, key: str) -> Dict[str, Any]:
        def _run():
            with self._get_conn() as conn:
                cur = conn.execute("SELECT data FROM fsm_data WHERE key = ?", (key,))
                row = cur.fetchone()
                if row and row["data"]:
                    try:
                        return json.loads(row["data"])
                    except (TypeError, ValueError):
                        return {}
                return {}

        return await asyncio.to_thread(_run)

    async def update_data(self, key: str, **kwargs: Any) -> Dict[str, Any]:
        """Merge ``kwargs`` into stored data in a single transaction.

        A get-then-set across two connections races when two handlers
        update the same user at once; this keeps the read+write under
        ``BEGIN IMMEDIATE``.
        """

        def _run():
            with self._get_conn() as conn:
                conn.execute("BEGIN IMMEDIATE")
                cur = conn.execute("SELECT data FROM fsm_data WHERE key = ?", (key,))
                row = cur.fetchone()
                current: Dict[str, Any] = {}
                if row and row["data"]:
                    try:
                        current = json.loads(row["data"])
                    except (TypeError, ValueError):
                        current = {}
                current.update(kwargs)
                raw = json.dumps(current)
                conn.execute(
                    """
                    INSERT INTO fsm_data (key, state, data) VALUES (?, NULL, ?)
                    ON CONFLICT(key) DO UPDATE SET data = excluded.data
                    """,
                    (key, raw),
                )
                conn.commit()
                return current

        return await asyncio.to_thread(_run)

    async def clear(self, key: str) -> None:
        def _run():
            with self._get_conn() as conn:
                conn.execute("DELETE FROM fsm_data WHERE key = ?", (key,))
                conn.commit()

        await asyncio.to_thread(_run)


class FSMContext:
    """Helper context wrapper for managing state and data for a user or chat."""

    def __init__(self, storage: StateStorage, key: str):
        self.storage = storage
        self.key = key

    async def set_state(self, state: Optional[Union[State, str]]) -> None:
        await self.storage.set_state(self.key, state)

    async def get_state(self) -> Optional[str]:
        return await self.storage.get_state(self.key)

    async def set_data(self, data: Dict[str, Any]) -> None:
        await self.storage.set_data(self.key, data)

    async def get_data(self) -> Dict[str, Any]:
        return await self.storage.get_data(self.key)

    async def update_data(self, **kwargs: Any) -> Dict[str, Any]:
        return await self.storage.update_data(self.key, **kwargs)

    async def clear(self) -> None:
        await self.storage.clear(self.key)

    async def finish(self) -> None:
        await self.clear()

    def __repr__(self) -> str:
        return f"<FSMContext key={self.key!r}>"


__all__ = [
    "State",
    "StatesGroup",
    "StateStorage",
    "MemoryStorage",
    "SQLiteStorage",
    "FSMContext",
]
