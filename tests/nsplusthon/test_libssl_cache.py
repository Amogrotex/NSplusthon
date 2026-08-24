"""AES-IGE via libssl still round-trips after key-schedule caching."""
import os

import pytest

from nsplusthon.crypto import libssl


@pytest.mark.skipif(
    libssl.encrypt_ige is None or libssl.decrypt_ige is None,
    reason="libssl AES-IGE not available on this host",
)
def test_libssl_ige_roundtrip_reuses_schedule():
    key = os.urandom(32)
    iv = os.urandom(32)
    blob = os.urandom(4096)
    ct1 = libssl.encrypt_ige(blob, key, iv)
    ct2 = libssl.encrypt_ige(blob, key, iv)
    assert ct1 == ct2
    pt = libssl.decrypt_ige(ct1, key, iv)
    assert pt[: len(blob)] == blob
