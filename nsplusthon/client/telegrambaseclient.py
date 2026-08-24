"""Compatibility shim.

The abstract client used to live in this Telegram-named module. The
implementation is now ``nsplusthon.client.plusbaseclient``.
"""
from .plusbaseclient import SoroushPlusBaseClient

__all__ = ["SoroushPlusBaseClient"]
