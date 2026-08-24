"""
NSplusthon — an asynchronous Python library for the Soroush Plus API.

Public names are resolved lazily (PEP 562) so that ``import nsplusthon``
stays fast: the heavy client stack (TL schema, network, events) is only
loaded when it is actually requested, e.g. by
``from nsplusthon import SoroushClient``.
"""
from .version import __version__

__all__ = [
    "SoroushClient",
    "ClientPool",
    "Button",
    "fsm",
    "filters",
    "moderation",
    "paginator",
    "ai",
    "connection",
    "custom",
    "errors",
    "events",
    "functions",
    "ratelimit",
    "router",
    "sessions",
    "sync",
    "types",
    "utils",
    "__version__",
]

# public name -> (module providing it, attribute inside that module)
_LAZY = {
    "SoroushClient": ("nsplusthon.client.soroushclient", "SoroushClient"),
    "ClientPool": ("nsplusthon.clientpool", "ClientPool"),
    "Button": ("nsplusthon.tl.custom", "Button"),
    "fsm": ("nsplusthon.fsm", None),
    "filters": ("nsplusthon.filters", None),
    "moderation": ("nsplusthon.moderation", None),
    "paginator": ("nsplusthon.paginator", None),
    "ai": ("nsplusthon.ai", None),
    "connection": ("nsplusthon.network.connection", "connection"),
    "custom": ("nsplusthon.custom", None),
    "crypto": ("nsplusthon.crypto", None),
    "errors": ("nsplusthon.errors", None),
    "events": ("nsplusthon.events", None),
    "functions": ("nsplusthon.functions", None),
    "helpers": ("nsplusthon.helpers", None),
    "network": ("nsplusthon.network", None),
    "password": ("nsplusthon.password", None),
    "ratelimit": ("nsplusthon.ratelimit", None),
    "router": ("nsplusthon.router", None),
    "sessions": ("nsplusthon.sessions", None),
    "sync": ("nsplusthon.sync", None),
    "tl": ("nsplusthon.tl", None),
    "types": ("nsplusthon.types", None),
    "utils": ("nsplusthon.utils", None),
    "version": ("nsplusthon.version", None),
}


def __getattr__(name):
    if name in _LAZY:
        import importlib

        module_name, attr = _LAZY[name]
        module = importlib.import_module(module_name)
        # `tl.patched` installs the custom Message classes as a side
        # effect; it must be in place before the client is used.
        if name == "SoroushClient":
            importlib.import_module("nsplusthon.tl.patched")
        value = getattr(module, attr) if attr is not None else module
        globals()[name] = value  # cache for subsequent lookups
        return value
    raise AttributeError(f"module {__name__!r} has no attribute {name!r}")


def __dir__():
    return sorted(set(globals()) | set(_LAZY))
