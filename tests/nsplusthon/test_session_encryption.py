import os

import pytest

from nsplusthon.crypto.authkey import AuthKey
from nsplusthon.sessions import StringSession


def _make_raw_session() -> str:
    s = StringSession()
    s._dc_id = 2
    s._server_address = '178.128.136.30'
    s._port = 443
    s._auth_key = AuthKey(os.urandom(256))
    return s.save()


def test_roundtrip():
    raw = _make_raw_session()
    enc = StringSession.encrypt_session(raw, 'passphrase-1')
    assert enc.startswith('E1')
    assert enc != raw
    assert StringSession.decrypt_session(enc, 'passphrase-1') == raw


def test_from_encrypted_restores_session():
    raw = _make_raw_session()
    enc = StringSession.encrypt_session(raw, 'secret')
    restored = StringSession.from_encrypted(enc, 'secret')
    assert restored.dc_id == 2
    assert restored.server_address == '178.128.136.30'
    assert restored.port == 443
    assert restored.auth_key is not None


def test_wrong_passphrase():
    raw = _make_raw_session()
    enc = StringSession.encrypt_session(raw, 'correct')
    with pytest.raises(ValueError):
        StringSession.decrypt_session(enc, 'wrong')


def test_rejects_garbage():
    with pytest.raises(ValueError):
        StringSession.decrypt_session('E1notreallyencrypted', 'x')
    with pytest.raises(ValueError):
        StringSession.encrypt_session('', 'x')
    with pytest.raises(ValueError):
        StringSession.encrypt_session('1notasession', '')
