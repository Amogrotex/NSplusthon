from .client.soroushclient import SoroushClient
from .network import connection
from .tl.custom import Button
from .tl import patched as _  # import for its side-effects
from . import custom, errors, events, functions, types, utils, version

__version__ = version.__version__

__all__ = [
    "SoroushClient",
    "Button",
    "types",
    "functions",
    "custom",
    "errors",
    "events",
    "utils",
    "connection",
    "__version__",
]
