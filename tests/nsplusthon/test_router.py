import asyncio

import pytest

from nsplusthon.router import Router, parse_command


class FakeEvent:
    def __init__(self, raw_text, chat_id=1, sender_id=2):
        self.raw_text = raw_text
        self.chat_id = chat_id
        self.sender_id = sender_id
        self.replies = []

    async def reply(self, text):
        self.replies.append(text)


# ----------------------------------------------------------------------
# parse_command
# ----------------------------------------------------------------------
def test_parse_basic():
    m = parse_command('/start')
    assert m.name == 'start' and m.args == [] and m.kwargs == {}


def test_parse_args_and_kwargs():
    m = parse_command('/start hi --name=world --verbose')
    assert m.args == ['hi']
    assert m.kwargs == {'name': 'world', 'verbose': True}


def test_parse_kwargs_space_form():
    m = parse_command('/set --timeout 30')
    assert m.args == [] and m.kwargs == {'timeout': '30'}
    m = parse_command('/plain a b')
    assert m.args == ['a', 'b'] and m.kwargs == {}


def test_parse_prefixes():
    assert parse_command('/start').name == 'start'
    assert parse_command('!start').name == 'start'
    assert parse_command('start', prefixes='/!') is None


def test_parse_bot_mention():
    assert parse_command('/start@MyBot', bot_name='MyBot').name == 'start'
    assert parse_command('/start@OtherBot', bot_name='MyBot') is None
    # no bot_name set: suffix is simply stripped
    assert parse_command('/start@Anyone').name == 'start'


def test_parse_non_command():
    assert parse_command('hello world') is None
    assert parse_command('') is None
    assert parse_command(None) is None
    assert parse_command('/1start') is None


# ----------------------------------------------------------------------
# dispatch
# ----------------------------------------------------------------------
def test_dispatch_runs_command():
    router = Router()
    seen = {}

    @router.command('start', description='hello')
    async def cmd(event, args, kwargs):
        seen['args'] = args
        seen['kwargs'] = kwargs
        await event.reply('hi')

    event = FakeEvent('/start a b --k=v')
    asyncio.run(router.dispatch(event))
    assert event.replies == ['hi']
    assert seen['args'] == ['a', 'b']
    assert seen['kwargs'] == {'k': 'v'}


def test_dispatch_ignores_non_commands():
    router = Router()

    @router.command('start')
    async def cmd(event):
        await event.reply('nope')

    event = FakeEvent('just a message')
    asyncio.run(router.dispatch(event))
    assert event.replies == []


def test_unknown_command_callback():
    router = Router()
    unknown = []

    async def on_unknown(event, parsed):
        unknown.append(parsed.name)

    router.unknown_command = on_unknown
    asyncio.run(router.dispatch(FakeEvent('/doesnotexist')))
    assert unknown == ['doesnotexist']


def test_help_lists_commands():
    router = Router()

    @router.command('start', description='begin')
    async def cmd(event):
        pass

    @router.command('setname', usage='<name>')
    async def cmd2(event, args):
        pass

    event = FakeEvent('/help')
    asyncio.run(router.dispatch(event))
    assert len(event.replies) == 1
    text = event.replies[0]
    assert '/start' in text and 'begin' in text
    assert '/setname' in text and '<name>' in text


def test_callback_signature_variants():
    router = Router()
    calls = []

    @router.command('one')
    def sync_only_event(event):
        calls.append('one')

    @router.command('two')
    async def two_args(event, args):
        calls.append(('two', args))

    @router.command('three')
    async def three_ctx(ctx):
        calls.append(('three', ctx.command.name))

    @router.command('four')
    async def four_var(event, *args):
        calls.append(('four', args))

    asyncio.run(router.dispatch(FakeEvent('/one x y')))
    asyncio.run(router.dispatch(FakeEvent('/two a b')))
    asyncio.run(router.dispatch(FakeEvent('/three')))
    asyncio.run(router.dispatch(FakeEvent('/four p q')))
    assert 'one' in calls
    assert ('two', ['a', 'b']) in calls
    assert ('three', 'three') in calls
    assert ('four', ('p', 'q')) in calls


def test_middleware_order_and_shortcircuit():
    router = Router()
    order = []

    @router.middleware
    async def mw1(event, next_handler):
        order.append('mw1-in')
        await next_handler()
        order.append('mw1-out')

    @router.middleware
    async def mw2(event, next_handler):
        order.append('mw2-in')
        await next_handler()

    @router.command('go')
    async def cmd(event):
        order.append('cmd')

    asyncio.run(router.dispatch(FakeEvent('/go')))
    assert order == ['mw1-in', 'mw2-in', 'cmd', 'mw1-out']

    # short-circuit: mw2 swallows the command
    order.clear()

    @router.middleware
    async def mw3(event, next_handler):
        order.append('mw3-blocks')

    asyncio.run(router.dispatch(FakeEvent('/go')))
    # onion model: outer middlewares' "out" phase still runs,
    # but the command itself is never reached
    assert order == ['mw1-in', 'mw2-in', 'mw3-blocks', 'mw1-out']
    assert 'cmd' not in order


def test_state_dicts():
    router = Router()
    u1, u2 = router.user_state(11), router.user_state(22)
    c1 = router.chat_state(9)
    u1['x'] = 1
    assert u1 is router.user_state(11)
    assert u2 != u1 and 'x' not in u2
    assert c1 is router.chat_state(9)


def test_attach_registers_handler():
    class FakeClient:
        def __init__(self):
            self.handlers = []

        def on(self, event):
            def deco(f):
                self.handlers.append((event, f))
                return f
            return deco

    router = Router()

    @router.command('start')
    async def cmd(event):
        await event.reply('hi')

    client = FakeClient()
    returned = router.attach(client)
    assert returned is router
    assert len(client.handlers) == 1
    event_builder, handler = client.handlers[0]
    assert event_builder.__name__ == 'NewMessage'
    # end-to-end through the registered handler
    event = FakeEvent('/start')
    asyncio.run(handler(event))
    assert event.replies == ['hi']


def test_client_use_router():
    from nsplusthon import SoroushClient
    from nsplusthon.sessions import StringSession

    client = SoroushClient(StringSession())
    router = Router()

    @router.command('start')
    async def cmd(event):
        pass

    result = client.use_router(router)
    assert result is client
    assert router.resolve('start') is not None


def test_rate_limit_integration():
    import time

    router = Router().use_rate_limit(max_calls=2, period=0.3)
    hits = []

    @router.command('tick')
    async def cmd(event):
        hits.append(time.monotonic())

    async def run():
        for _ in range(3):
            await router.dispatch(FakeEvent('/tick'))

    t0 = time.monotonic()
    asyncio.run(run())
    elapsed = time.monotonic() - t0
    assert len(hits) == 3
    # the third tick had to wait for the window to free up
    assert elapsed >= 0.25
    assert hits[0] < hits[1] < hits[2]
