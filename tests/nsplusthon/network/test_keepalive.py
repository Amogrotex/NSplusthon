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
