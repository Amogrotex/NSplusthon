"""
Regression tests for the 1.8.3 bug fixes.

Covers:
* C1  ``ImportBotAuthorizationRequest`` exists in the TL schema and
      round-trips (bot-token login previously always raised AttributeError).
* H1  ``MTProtoSender._reconnect`` actually filters stale Ping/GetUsers
      requests before re-enqueueing them (the filter was dead code).
* H2  The WebSocket transport disables WebSocket-level ping frames
      (``heartbeat=0``) — Soroush closes connections that receive them.
* M1  The periodic WebSocket reset goes through the owning sender's
      reconnect machinery (no raw transport swap under a live sender).
* M2  The periodic keepalive loop pings idle connections and reconnects
      when a ping goes unanswered.
* L1  ``get_me()`` propagates ``asyncio.CancelledError`` instead of
      swallowing it.
"""
import asyncio
import contextlib
import logging

import pytest

from nsplusthon import functions, types
from nsplusthon.network.mtprotosender import MTProtoSender
from nsplusthon.network.connection.websocket import ConnectionWebSocket
from nsplusthon.network.requeststate import RequestState


class _Loggers(dict):
    def __missing__(self, key):
        return logging.getLogger('test.' + key.rsplit('.', 1)[-1])


def _make_sender():
    sender = MTProtoSender(None, loggers=_Loggers())
    sender._user_connected = True
    return sender


class _RecorderQueue:
    """Stand-in for MessagePacker that records appended/extended states."""

    def __init__(self):
        self.states = []

    def append(self, state):
        self.states.append(state)

    def extend(self, states):
        self.states.extend(states)


# ---------------------------------------------------------------------------
# C1 — ImportBotAuthorizationRequest
# ---------------------------------------------------------------------------

def test_import_bot_authorization_request_registered_and_roundtrips():
    from nsplusthon.tl.alltlobjects import tlobjects
    from nsplusthon.extensions import BinaryReader

    cls = functions.auth.ImportBotAuthorizationRequest
    # Registered under the standard MTProto constructor id.
    assert tlobjects[0x141e2a1b] is cls
    assert cls.CONSTRUCTOR_ID == 0x141e2a1b

    req = cls(flags=0, bot_auth_token='12345:secret',
              api_id=1030400, api_hash='6edb16cf88714a4e9a805e928c39c937')
    data = bytes(req)
    # Constructor id, little-endian.
    assert data[:4] == b'\x1b*\x1e\x14'

    # from_reader expects the reader positioned *after* the constructor id
    # (tgread_object consumes the id before dispatching).
    parsed = cls.from_reader(BinaryReader(data[4:]))
    assert parsed.flags == 0
    assert parsed.bot_auth_token == '12345:secret'
    assert parsed.api_id == 1030400
    assert parsed.api_hash == '6edb16cf88714a4e9a805e928c39c937'
    # Serialization must be stable across the round trip.
    assert bytes(parsed) == data


# ---------------------------------------------------------------------------
# H1 — _reconnect must filter stale requests
# ---------------------------------------------------------------------------

def _pending_states(sender):
    ping = RequestState(functions.PingRequest(1))
    ping.msg_id = 1
    users = RequestState(functions.users.GetUsersRequest([types.InputUserSelf()]))
    users.msg_id = 2
    signin = RequestState(functions.auth.SignInRequest('98912', 'hash', '12345'))
    signin.msg_id = 3
    sender._pending_state = {1: ping, 2: users, 3: signin}
    return ping, users, signin


class _FakeConnection:
    async def disconnect(self):
        pass


@pytest.mark.asyncio
async def test_reconnect_replays_only_surviving_requests():
    """
    Drive the real ``_reconnect`` end-to-end (with the transport and the
    auth connect step stubbed) and assert that stale Ping/GetUsers
    requests are NOT re-enqueued while the SignIn request is.
    """
    sender = _make_sender()
    sender._connection = _FakeConnection()
    sender._send_queue = _RecorderQueue()
    sender._send_loop_handle = None
    sender._recv_loop_handle = None
    sender._keepalive_loop_handle = None
    sender._auto_reconnect = True
    sender._retries = 1
    sender._delay = 0
    sender._auto_reconnect_callback = None
    sender._reconnecting = False

    ping, users, signin = _pending_states(sender)

    async def fake_connect():
        pass

    sender._connect = fake_connect

    await sender._reconnect(None)

    # Only the SignIn request survives the filter.
    assert sender._send_queue.states == [signin]
    assert sender._pending_state == {}
    # Dropped requests get their futures resolved (no hang):
    assert ping.future.cancelled()
    with pytest.raises(ConnectionError, match='GetUsersRequest'):
        users.future.result()
    # The surviving request is still waiting for a response.
    assert not signin.future.done()


@pytest.mark.asyncio
async def test_reconnect_failure_still_fails_all_pending_requests():
    """
    If every reconnect attempt fails, every pending request (including
    the ones that would have survived the filter) must have its future
    failed — no orphaned futures.
    """
    sender = _make_sender()
    sender._connection = _FakeConnection()
    sender._send_queue = _RecorderQueue()
    sender._send_loop_handle = None
    sender._recv_loop_handle = None
    sender._keepalive_loop_handle = None
    sender._auto_reconnect = True
    sender._retries = 1
    sender._delay = 0
    sender._auto_reconnect_callback = None
    sender._reconnecting = False

    ping, users, signin = _pending_states(sender)

    async def failing_connect():
        raise OSError('network down')

    sender._connect = failing_connect

    await sender._reconnect(None)

    # Nothing was re-enqueued, and every pending future failed.
    assert sender._send_queue.states == []
    assert sender._pending_state == {}
    for future in (ping.future, users.future, signin.future):
        assert future.done()


# ---------------------------------------------------------------------------
# H2 — WebSocket ping frames disabled
# ---------------------------------------------------------------------------

class _FakeWS:
    _writer = None  # skip the socket-optimization path

    async def send_bytes(self, data):
        self.sent = data

    async def receive(self):
        raise AssertionError('should not be called in this test')

    async def close(self):
        pass


class _FakeSession:
    def __init__(self, timeout=None):
        self.timeout = timeout

    async def ws_connect(self, url, **kwargs):
        _ws_connect_kwargs.clear()
        _ws_connect_kwargs['url'] = url
        _ws_connect_kwargs.update(kwargs)
        return _FakeWS()

    async def close(self):
        pass


class _FakeAiohttp:
    class WSMsgType:
        CLOSE = 'CLOSE'
        CLOSING = 'CLOSING'
        CLOSED = 'CLOSED'
        ERROR = 'ERROR'

    class ClientTimeout:
        def __init__(self, **kw):
            self.kw = kw

    ClientSession = _FakeSession


_ws_connect_kwargs = {}


@pytest.mark.asyncio
async def test_ws_connect_disables_heartbeat(monkeypatch):
    """
    Soroush closes connections that receive WebSocket-level ping frames,
    so ws_connect must be called with heartbeat=0. MTProto PingRequest
    (sent by the keepalive loop) is the intended keepalive.
    """
    import nsplusthon.network.connection.websocket as wsmod

    monkeypatch.setattr(wsmod, 'aiohttp', _FakeAiohttp)

    ws = ConnectionWebSocket('1.2.3.4', 443, 2, loggers=_Loggers())
    try:
        await ws._connect(timeout=None)
    finally:
        if ws._reconnect_task is not None:
            ws._reconnect_task.cancel()
            with contextlib.suppress(asyncio.CancelledError):
                await ws._reconnect_task

    assert _ws_connect_kwargs['url'] == 'wss://1.2.3.4:443/apiws'
    assert _ws_connect_kwargs['heartbeat'] == 0


# ---------------------------------------------------------------------------
# M1 — periodic reset goes through the sender
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_periodic_reset_uses_refresh_callback():
    ws = ConnectionWebSocket('1.2.3.4', 443, 2, loggers=_Loggers())
    ws._connected = True
    ws._reconnect_interval = 0.01

    calls = []

    async def fake_refresh():
        calls.append(1)

    ws._refresh_callback = fake_refresh

    def raw_disconnect_must_not_be_called(*args, **kwargs):
        raise AssertionError('raw transport disconnect was called '
                             'although a refresh callback is installed')

    ws.disconnect = raw_disconnect_must_not_be_called

    task = asyncio.ensure_future(ws._reconnect_loop())
    await asyncio.sleep(0.05)
    task.cancel()
    with contextlib.suppress(asyncio.CancelledError):
        await task

    assert len(calls) >= 1


@pytest.mark.asyncio
async def test_sender_installs_refresh_callback_on_websocket():
    """The sender must hand its coordinated refresh to the transport."""
    sender = MTProtoSender(None, loggers=_Loggers())  # not user-connected yet
    ws = ConnectionWebSocket('1.2.3.4', 443, 2, loggers=_Loggers())

    async def fake_connect():
        pass

    sender._connect = fake_connect

    assert await sender.connect(ws) is True
    # (bound methods are compared via __self__/__func__: a fresh
    # ``sender._periodic_refresh`` access creates a new wrapper object)
    assert ws._refresh_callback is not None
    assert ws._refresh_callback.__self__ is sender
    assert ws._refresh_callback.__func__ is MTProtoSender._periodic_refresh

    # And invoking the installed callback must go through the sender's
    # reconnect machinery (not a raw transport swap).
    started = []
    sender._start_reconnect = lambda error: started.append(error)
    await ws._refresh_callback()
    assert len(started) == 1
    assert isinstance(started[0], TimeoutError)


# ---------------------------------------------------------------------------
# M2 — periodic keepalive
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_keepalive_loop_pings_idle_connection():
    sender = _make_sender()
    sender._keepalive_interval = 0.01
    sender._send_queue = _RecorderQueue()
    sender._ping = None
    started = []
    sender._start_reconnect = lambda error: started.append(error)

    task = asyncio.ensure_future(sender._keepalive_loop())
    await asyncio.sleep(0.05)
    task.cancel()
    with contextlib.suppress(asyncio.CancelledError):
        await task

    # A keepalive ping was issued for the idle connection and is now
    # outstanding.
    assert sender._ping is not None
    ping_requests = [s for s in sender._send_queue.states
                     if isinstance(s.request, functions.PingRequest)]
    assert len(ping_requests) >= 1
    # ...and an unanswered ping eventually triggers a reconnect.
    assert len(started) == 1
    assert isinstance(started[0], TimeoutError)


@pytest.mark.asyncio
async def test_keepalive_loop_reconnects_on_stale_ping():
    sender = _make_sender()
    sender._keepalive_interval = 0.01
    sender._send_queue = _RecorderQueue()
    sender._ping = 99  # a ping from before, never answered
    started = []
    sender._start_reconnect = lambda error: started.append(error)

    task = asyncio.ensure_future(sender._keepalive_loop())
    await asyncio.sleep(0.05)
    task.cancel()
    with contextlib.suppress(asyncio.CancelledError):
        await task

    assert len(started) == 1
    assert isinstance(started[0], TimeoutError)
    # No additional ping was sent on top of the stale one.
    assert sender._send_queue.states == []


# ---------------------------------------------------------------------------
# L1 — get_me must not swallow CancelledError
# ---------------------------------------------------------------------------

@pytest.mark.asyncio
async def test_get_me_propagates_cancellation():
    from nsplusthon import SoroushClient
    from nsplusthon.sessions import StringSession

    client = SoroushClient(StringSession())

    async def fake_call(sender, request, ordered=False,
                        flood_sleep_threshold=None, request_retries=None):
        raise asyncio.CancelledError()

    client._call = fake_call

    with pytest.raises(asyncio.CancelledError):
        await client.get_me()
