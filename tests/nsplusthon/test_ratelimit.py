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
