"""
Regression tests for MTProto keepalive pings.

Idle sessions used to force a full reconnect every ``_RECV_TIMEOUT``
(90s) because the client never sent Ping requests: ``_keepalive_ping``
was dead code, never called from ``send()``. ``send()`` must now
piggyback a ping when none is outstanding, and a Pong must clear it.
"""
import logging
from types import SimpleNamespace

import pytest

from nsplusthon import functions, types
from nsplusthon.network import mtprotosender
from nsplusthon.network.mtprotosender import MTProtoSender


class _Loggers(dict):
    def __missing__(self, key):
        return logging.getLogger('test.' + key.rsplit('.', 1)[-1])


def _make_sender():
    sender = MTProtoSender(None, loggers=_Loggers())
    sender._user_connected = True
    return sender


@pytest.mark.asyncio
async def test_send_emits_keepalive_ping_when_none_outstanding():
    sender = _make_sender()
    assert sender._ping is None
    sender.send(functions.PingRequest(1))
    # A ping was issued and is now outstanding
    assert sender._ping is not None


@pytest.mark.asyncio
async def test_send_does_not_double_ping():
    sender = _make_sender()
    sender.send(functions.PingRequest(1))
    first_ping = sender._ping
    sender.send(functions.PingRequest(2))
    # Same outstanding ping — no new one was sent
    assert sender._ping == first_ping


@pytest.mark.asyncio
async def test_pong_clears_outstanding_ping():
    sender = _make_sender()
    sender.send(functions.PingRequest(1))
    ping_id = sender._ping
    pong = types.Pong(msg_id=42, ping_id=ping_id)
    await sender._handle_pong(SimpleNamespace(obj=pong))
    assert sender._ping is None


@pytest.mark.asyncio
async def test_prepare_resend_drops_ping_and_getusers_keeps_signin():
    """Reconnect must not replay GetUsersRequest (closes Soroush WS)
    or leftover PingRequest (forces another reconnect)."""
    from nsplusthon.network.requeststate import RequestState

    sender = _make_sender()
    sender._ping = 99

    ping = RequestState(functions.PingRequest(1))
    ping.msg_id = 1
    users = RequestState(functions.users.GetUsersRequest([types.InputUserSelf()]))
    users.msg_id = 2
    signin = RequestState(functions.auth.SignInRequest('98912', 'hash', '12345'))
    signin.msg_id = 3
    sender._pending_state = {1: ping, 2: users, 3: signin}

    out = sender._prepare_resend_after_reconnect()

    assert sender._ping is None
    assert sender._pending_state == {}
    assert out == [signin]
    assert ping.future.cancelled()
    with pytest.raises(ConnectionError, match='GetUsersRequest'):
        users.future.result()
    assert not signin.future.done()


@pytest.mark.asyncio
async def test_stale_ping_does_not_force_reconnect_after_prepare():
    sender = _make_sender()
    sender._ping = 99
    started = []
    sender._start_reconnect = lambda error: started.append(error)

    sender._prepare_resend_after_reconnect()
    sender._keepalive_ping(7)

    assert started == []
    assert sender._ping == 7
