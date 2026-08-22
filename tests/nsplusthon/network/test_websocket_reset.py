"""
Regression tests for the WebSocket periodic reset (self-cancellation bug).

``_reconnect_loop`` calls ``disconnect()`` from *inside* the reset task.
``disconnect()`` must therefore NOT cancel the currently running reset
task: self-cancellation raises CancelledError (or a RuntimeError in the
"Task cancelling" state) inside the very coroutine performing the reset,
which killed the reset mid-flight, left stale state, and skipped the
writer/session cleanup (socket + aiohttp session leak).
"""
import asyncio
import logging

import pytest

from nsplusthon.network.connection.websocket import ConnectionWebSocket


def _make_ws():
    log = logging.getLogger('test.ws')
    ws = ConnectionWebSocket(
        '1.2.3.4', 443, 2,
        loggers={
            'nsplusthon.network.connection.connection': log,
            'nsplusthon.network.connection.websocket': log,
        },
    )
    ws._connected = True
    ws._send_task = None
    ws._recv_task = None
    return ws


@pytest.mark.asyncio
async def test_disconnect_from_running_reset_task_does_not_cancel_it():
    ws = _make_ws()
    # Simulate being called from inside the reset loop: the reset task
    # IS the currently running task.
    ws._reconnect_task = asyncio.current_task()

    # Must complete without raising (before the fix this raised
    # RuntimeError / swallowed CancelledError) and without cancelling us.
    await ws.disconnect()

    assert ws._connected is False
    # If the task had been cancelled, this await would raise CancelledError.
    await asyncio.sleep(0)


@pytest.mark.asyncio
async def test_reset_cycles_complete_without_duplicate_tasks():
    """
    Full-cycle regression: run several reset cycles and assert the reset
    task survives each cycle, the connection re-establishes, and no second
    reset task is spawned (the dedupe guard in _connect).
    """
    log = logging.getLogger('test.ws.cycle')
    ws = ConnectionWebSocket(
        '1.2.3.4', 443, 2,
        loggers={
            'nsplusthon.network.connection.connection': log,
            'nsplusthon.network.connection.websocket': log,
        },
    )
    ws._connected = True
    ws._reconnect_interval = 0.02

    calls = 0

    async def fake_low_level_connect(timeout=None, ssl=None):
        nonlocal calls
        calls += 1

    async def _noop_loop():
        await asyncio.Event().wait()  # blocks forever until cancelled

    # Neutralize the transport-dependent parts (fake socket can't serve
    # real packets): only the task/lifecycle logic under test is real.
    ws._connect = fake_low_level_connect
    ws._send_loop = _noop_loop
    ws._recv_loop = _noop_loop

    task = asyncio.ensure_future(ws._reconnect_loop())
    ws._reconnect_task = task
    try:
        await asyncio.sleep(0.3)  # ~15 reset cycles
        assert calls >= 5, f"expected several reset cycles, got {calls}"
        assert not task.done(), "reset task died during reset cycles"
        assert ws._reconnect_task is task, "a duplicate reset task was spawned"
        assert ws._connected is True
    finally:
        task.cancel()
        try:
            await task
        except asyncio.CancelledError:
            pass
        for t in (ws._send_task, ws._recv_task):
            if t is not None and not t.done():
                t.cancel()
                try:
                    await t
                except asyncio.CancelledError:
                    pass


@pytest.mark.asyncio
async def test_disconnect_cancels_reset_task_when_called_from_outside():
    ws = _make_ws()

    async def _reset():
        # Just wait until cancelled, like the real reset loop would.
        await asyncio.sleep(3600)

    ws._reconnect_task = asyncio.ensure_future(_reset())
    await asyncio.sleep(0)  # let it start

    # Called from a different task (e.g. user-initiated client disconnect):
    # the reset task must be cancelled as before.
    await ws.disconnect()
    await asyncio.sleep(0)

    assert ws._reconnect_task.cancelled() or ws._reconnect_task.done()
