"""Deprecated filename. Use interactive_soroush_client.py."""
import warnings
warnings.warn(
    "interactive_telegram_client.py is renamed to interactive_soroush_client.py",
    DeprecationWarning,
    stacklevel=2,
)
from interactive_soroush_client import *  # noqa: F401,F403
