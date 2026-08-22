"""
Tests for `nsplusthon.crypto.rsa`.
"""
import pytest

from nsplusthon.crypto import rsa


@pytest.fixture
def server_key_fp():
    """Factory to return a key, old if so chosen."""
    def _server_key_fp(old: bool):
        for fp, data in rsa._server_keys.items():
            _, old_key = data
            if old_key == old:
                return fp

    return _server_key_fp


def test_encryption_inv_key():
    """Test for #1324."""
    assert rsa.encrypt("invalid", b"testdata") is None


def test_encryption_old_key(server_key_fp):
    """Test for #1324."""
    assert rsa.encrypt(server_key_fp(old=True), b"testdata") is None


def test_encryption_with_registered_old_key():
    """
    ``use_old=True`` works once an old key has actually been registered.

    Note: all *bundled* default keys are registered ``old=False`` (the
    Soroush server currently only uses current keys), so a fingerprint
    lookup for an unregistered key returns ``None`` — this is the
    documented contract. If Soroush ever serves old key ids, register
    them via ``rsa.add_key(pub, old=True)``.
    """
    import rsa as rsa_pkg  # the third-party package (not the module above)
    pub, _priv = rsa_pkg.newkeys(2048)
    rsa.add_key(pub.save_pkcs1('PEM').decode('ascii'), old=True)
    fp = rsa._compute_fingerprint(pub)

    # Old keys are refused unless explicitly requested...
    assert rsa.encrypt(fp, b"testdata") is None
    # ...but allowed with use_old=True (we can't verify validity without
    # the decryption keys, so just check shape).
    data = rsa.encrypt(fp, b"testdata", use_old=True)
    assert data is not None and len(data) == 256


def test_encryption_current_key(server_key_fp):
    data = rsa.encrypt(server_key_fp(old=False), b"testdata")
    # We can't verify the data is actually valid because we don't have
    # the decryption keys
    assert data is not None and len(data) == 256
