import asyncio
import time

import pytest

from nsplusthon.ratelimit import RateLimiter


def test_invalid_args():
    with pytest.raises(ValueError):
        RateLimiter(max_calls=0)
    with pytest.raises(ValueError):
        RateLimiter(max_calls=10, period=0)


def test_slots_pass_until_full():
    limiter = RateLimiter(max_calls=2, period=60)

    async def run():
        async with limiter.slot('a'):
            pass
        async with limiter.slot('a'):
            pass

    t0 = time.monotonic()
    asyncio.run(run())
    assert time.monotonic() - t0 < 0.1
    # window is now full for key 'a'
    assert limiter.pending('a') > 0
    # other keys are unaffected
    assert limiter.pending('b') == 0.0


def test_third_slot_waits_for_window():
    limiter = RateLimiter(max_calls=2, period=0.3)

    async def run():
        async with limiter.slot('a'):
            pass
        async with limiter.slot('a'):
            pass
        async with limiter.slot('a'):
            pass

    t0 = time.monotonic()
    asyncio.run(run())
    assert time.monotonic() - t0 >= 0.25


def test_window_slides():
    limiter = RateLimiter(max_calls=1, period=0.2)

    async def run():
        async with limiter.slot('a'):
            pass
        await asyncio.sleep(0.25)
        async with limiter.slot('a'):
            pass

    t0 = time.monotonic()
    asyncio.run(run())
    assert time.monotonic() - t0 < 0.5  # second slot did not wait long


def test_construct_after_loop_cleared():
    """
    Regression (Python 3.9): asyncio.run() clears the main thread's event
    loop policy when it finishes. Constructing a RateLimiter afterwards, at
    top level (the standard `Router().use_rate_limit(...)` pattern), used to
    raise RuntimeError because asyncio.Lock() binds to the *current* loop at
    construction time on 3.9. The lock is now created lazily on first use.
    """
    async def _noop():
        pass

    # Clears the current-loop binding on Python 3.9
    asyncio.run(_noop())

    # Must not raise, even though no event loop is currently running
    limiter = RateLimiter(max_calls=1, period=60)

    async def run():
        async with limiter.slot('a'):
            pass

    asyncio.run(run())
