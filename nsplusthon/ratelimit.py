"""
A small, dependency-free async rate limiter for outgoing Soroush Plus
traffic.

Soroush Plus applies flood control per chat; a long-running bot that
fires off messages as fast as it can will eat ``FloodWaitError``s (or
worse, a ban) even when the traffic is perfectly legitimate. Use a
:class:`RateLimiter` to shape outgoing calls:

    from nsplusthon.ratelimit import RateLimiter

    limiter = RateLimiter(max_calls=40, period=60)      # 40 per minute

    async def send(event):
        async with limiter.slot(event.chat_id):
            await event.reply('hi')

Each *key* (chat id, user id, ...) gets its own sliding window, so one
busy chat never starves another. The limiter is safe to share across
tasks — it is asyncio-aware and never blocks the event loop.
"""
from __future__ import annotations

import asyncio
import time
from collections import defaultdict, deque
from contextlib import asynccontextmanager
from typing import AsyncIterator, Hashable, Iterator, Optional


class RateLimiter:
    """
    Sliding-window rate limiter.

    Args:
        max_calls (`int`):
            Maximum number of calls allowed within a single ``period``.

        period (`float`, optional):
            Length of the sliding window in seconds (default ``60``).

    Example:
        .. code-block:: python

            limiter = RateLimiter(max_calls=30, period=60)

            async with limiter.slot(chat_id):
                await client.send_message(chat_id, 'hello')
    """

    def __init__(self, max_calls: int, period: float = 60.0):
        if max_calls <= 0:
            raise ValueError('max_calls must be a positive integer')
        if period <= 0:
            raise ValueError('period must be a positive number of seconds')
        self.max_calls = int(max_calls)
        self.period = float(period)
        self._windows: 'defaultdict[Hashable, deque]' = defaultdict(deque)
        self._lock = asyncio.Lock()

    def _prune(self, window: deque, now: float) -> None:
        cutoff = now - self.period
        while window and window[0] <= cutoff:
            window.popleft()

    def pending(self, key: Hashable) -> float:
        """Seconds you would have to wait right now for ``key``."""
        now = time.monotonic()
        window = self._windows.get(key)
        if not window or len(window) < self.max_calls:
            return 0.0
        return max(0.0, window[0] + self.period - now)

    @asynccontextmanager
    async def slot(self, key: Hashable = '*') -> AsyncIterator[None]:
        """
        Acquire a slot for ``key``, sleeping if the window is full.

        Usage::

            async with limiter.slot(key):
                ... do the rate-limited work ...
        """
        granted = False
        wait = 0.05
        while not granted:
            async with self._lock:
                now = time.monotonic()
                window = self._windows[key]
                self._prune(window, now)
                if len(window) < self.max_calls:
                    window.append(now)
                    granted = True
                else:
                    wait = window[0] + self.period - now
            if not granted:
                await asyncio.sleep(max(wait, 0.05))
        yield

    def __repr__(self) -> str:
        return (f'{self.__class__.__name__}('
                f'max_calls={self.max_calls}, period={self.period})')


__all__ = ['RateLimiter']
