"""Command router and middleware dispatcher for Soroush Plus bots."""

from __future__ import annotations

import asyncio
import inspect
import logging
from dataclasses import dataclass, field
from typing import Any, Awaitable, Callable, Dict, List, Optional, Tuple, Union

from .ratelimit import RateLimiter

_log = logging.getLogger(__name__)

__all__ = ['Router', 'Command', 'CommandMessage', 'RouterContext', 'parse_command']

_KNOWN_PARAMS = ('event', 'args', 'kwargs', 'ctx', 'router', 'command')


@dataclass
class CommandMessage:
    name: str
    args: List[str] = field(default_factory=list)
    kwargs: Dict[str, Union[str, bool]] = field(default_factory=dict)


@dataclass
class Command:
    name: str
    callback: Callable
    description: str = ''
    usage: str = ''


class RouterContext:
    def __init__(self, event, args, kwargs, command: Command, router: 'Router'):
        self.event = event
        self.args = args
        self.kwargs = kwargs
        self.command = command
        self.router = router

    def __repr__(self):
        return f'<RouterContext command={self.command.name!r}>'


def parse_command(
        text: Optional[str],
        prefixes: str = '/!',
        bot_name: Optional[str] = None) -> Optional[CommandMessage]:
    if not text or not isinstance(text, str):
        return None
    text = text.lstrip()
    prefix = next((p for p in prefixes if text.startswith(p)), None)
    if prefix is None:
        return None

    head, _, tail = text[len(prefix):].partition(' ')
    if not head:
        return None

    at = head.find('@')
    if at != -1:
        mentioned = head[at + 1:]
        if bot_name is not None:
            if not mentioned or mentioned.lower() != bot_name.lower():
                return None
        head = head[:at]

    name = head.lower()
    if not name or not name.isidentifier():
        return None

    args: List[str] = []
    kwargs: Dict[str, Union[str, bool]] = {}
    tokens = tail.split()
    i = 0
    while i < len(tokens):
        t = tokens[i]
        if t.startswith('--'):
            body = t[2:]
            if not body:
                args.append(t)
                i += 1
                continue
            if '=' in body:
                k, v = body.split('=', 1)
                kwargs[k.replace('-', '_')] = v
                i += 1
            elif i + 1 < len(tokens) and not tokens[i + 1].startswith('-'):
                kwargs[body.replace('-', '_')] = tokens[i + 1]
                i += 2
            else:
                kwargs[body.replace('-', '_')] = True
                i += 1
        else:
            args.append(t)
            i += 1
    return CommandMessage(name=name, args=args, kwargs=kwargs)


class Router:
    def __init__(self, *, prefixes: str = '/!', name: Optional[str] = None):
        if not prefixes:
            raise ValueError('prefixes must not be empty')
        self._prefixes = tuple(prefixes)
        self._prefix_str = ''.join(prefixes)
        self._commands: Dict[str, Command] = {}
        self._middlewares: List[Callable] = []
        self._user_state: Dict[int, Dict] = {}
        self._chat_state: Dict[int, Dict] = {}
        self.name = name
        self.unknown_command: Optional[Callable] = None
        self._commands['help'] = Command(
            'help', self._help_callback, 'Show this help', '')

    def command(self, name: str, *, description: str = '', usage: str = ''):
        clean = name.strip().lstrip(self._prefix_str).lower()
        if not clean or not clean.isidentifier():
            raise ValueError(f'invalid command name: {name!r}')

        def decorator(fn: Callable) -> Callable:
            doc = (inspect.getdoc(fn) or '').strip()
            self.add_command(Command(
                name=clean,
                callback=fn,
                description=description or (doc.splitlines()[0] if doc else ''),
                usage=usage))
            return fn
        return decorator

    def add_command(self, command: Command) -> None:
        self._commands[command.name.lower()] = command

    def resolve(self, name: str) -> Optional[Command]:
        return self._commands.get(name.lower())

    def commands(self) -> List[Command]:
        return sorted(self._commands.values(), key=lambda c: c.name)

    def middleware(self, fn: Callable) -> Callable:
        self._middlewares.append(fn)
        return fn

    def use_rate_limit(self, max_calls: int = 40, period: float = 60.0) -> 'Router':
        limiter = RateLimiter(max_calls=max_calls, period=period)

        async def _guard(event, next_handler):
            key = getattr(event, 'chat_id', None) or '*'
            async with limiter.slot(key):
                await next_handler()

        self._middlewares.append(_guard)
        return self

    def user_state(self, user_id: int) -> Dict:
        return self._user_state.setdefault(int(user_id), {})

    def chat_state(self, chat_id: int) -> Dict:
        return self._chat_state.setdefault(int(chat_id), {})

    async def dispatch(self, event) -> None:
        parsed = parse_command(
            getattr(event, 'raw_text', None), self._prefixes, self.name)
        if parsed is None:
            return
        command = self._commands.get(parsed.name)
        if command is None:
            if self.unknown_command is not None:
                result = self.unknown_command(event, parsed)
                if inspect.isawaitable(result):
                    await result
            return

        ctx = RouterContext(event, parsed.args, parsed.kwargs,
                            command, router=self)

        async def _invoke() -> None:
            await self._call_callback(command.callback, event, ctx)

        handler = _invoke
        for mw in reversed(self._middlewares):
            handler = (lambda mw=mw, nxt=handler:
                       self._run_middleware(mw, event, nxt))
        await handler()

    @staticmethod
    async def _run_middleware(mw: Callable, event, next_handler: Callable):
        result = mw(event, next_handler)
        if inspect.isawaitable(result):
            await result

    @staticmethod
    async def _call_callback(cb: Callable, event, ctx: RouterContext) -> None:
        sig = inspect.signature(cb)
        params = list(sig.parameters.values())
        context = {
            'event': event, 'args': ctx.args, 'kwargs': ctx.kwargs,
            'ctx': ctx, 'router': ctx.router, 'command': ctx.command,
        }
        var_positional = None
        bound: Dict[str, Any] = {}
        for p in params:
            if p.kind is inspect.Parameter.VAR_POSITIONAL:
                var_positional = p
            elif p.kind in (inspect.Parameter.POSITIONAL_ONLY,
                            inspect.Parameter.POSITIONAL_OR_KEYWORD):
                if p.name in context:
                    bound[p.name] = context[p.name]
                elif p.default is inspect.Parameter.empty:
                    raise TypeError(
                        f"command {ctx.command.name!r} asks for an "
                        f"unsupported parameter {p.name!r} (use one of "
                        f"{', '.join(_KNOWN_PARAMS)} or *args)")
        if var_positional is not None:
            pos_values = [bound[p.name] for p in params
                          if p.kind in (inspect.Parameter.POSITIONAL_ONLY,
                                        inspect.Parameter.POSITIONAL_OR_KEYWORD)]
            result = cb(*pos_values, *tuple(ctx.args))
        else:
            result = cb(**bound)
        if inspect.isawaitable(result):
            await result

    async def _help_callback(self, event, args, kwargs) -> None:
        lines = [f"Commands for {self.name or 'this bot'}:"]
        for c in self.commands():
            if c.name == 'help':
                continue
            line = f"\u2022 {self._prefixes[0]}{c.name}"
            if c.usage:
                line += f" {c.usage}"
            if c.description:
                line += f" \u2014 {c.description}"
            lines.append(line)
        reply = getattr(event, 'reply', None)
        if reply is not None:
            result = reply('\n'.join(lines))
            if inspect.isawaitable(result):
                await result

    def attach(self, client) -> 'Router':
        from . import events

        @client.on(events.NewMessage)
        async def _router_handler(event) -> None:
            try:
                await self.dispatch(event)
            except Exception:
                _log.exception('NSplusthon router: dispatch failed')

        return self

    def __repr__(self):
        return (f'{self.__class__.__name__}('
                f'commands={list(self._commands)}, '
                f'middlewares={len(self._middlewares)})')
