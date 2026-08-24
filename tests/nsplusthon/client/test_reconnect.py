"""GetUsersRequest before login closes the Soroush WebSocket."""
import logging
from types import SimpleNamespace

import pytest

from nsplusthon import errors, functions, types
from nsplusthon.client.updates import UpdateMethods
from nsplusthon.client.users import UserMethods


class _Loggers(dict):
    def __missing__(self, key):
        return logging.getLogger('test.' + key)


@pytest.mark.asyncio
async def test_auto_reconnect_skips_get_me_until_authorized():
    class Dummy(UpdateMethods):
        def __init__(self):
            self._authorized = False
            self._log = _Loggers()
            self.get_me_calls = 0

        async def get_me(self, input_peer=False):
            self.get_me_calls += 1

        async def catch_up(self):
            self.get_me_calls += 10

    dummy = Dummy()
    await dummy._handle_auto_reconnect()
    assert dummy.get_me_calls == 0

    dummy._authorized = True
    await dummy._handle_auto_reconnect()
    assert dummy.get_me_calls == 11


@pytest.mark.asyncio
async def test_get_me_does_not_retry_server_error():
    calls = []

    class Dummy(UserMethods):
        def __init__(self):
            self._sender = object()
            self._mb_entity_cache = SimpleNamespace(self_id=None)

        async def _call(self, sender, request, ordered=False,
                        flood_sleep_threshold=None, request_retries=None):
            calls.append(request_retries)
            raise errors.ServerError(
                request=functions.users.GetUsersRequest([types.InputUserSelf()]),
                message='INTERNAL',
            )

    assert await Dummy().get_me() is None
    assert calls == [1]
