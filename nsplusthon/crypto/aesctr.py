"""
This module holds the AESModeCTR wrapper class.
"""
try:
    from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
    _has_cryptography = True
except ImportError:
    _has_cryptography = False

import pyaes


class AESModeCTR:
    """Fast wrapper around AES CTR mode with custom IV."""

    def __init__(self, key, iv):
        assert isinstance(key, bytes)
        assert isinstance(iv, bytes)
        assert len(iv) == 16
        self._key = key
        self._iv = iv

        if _has_cryptography:
            self._cipher = Cipher(algorithms.AES(key), modes.CTR(iv))
            self._encryptor = self._cipher.encryptor()
            self._decryptor = self._cipher.decryptor()
            self._use_crypto = True
        else:
            self._aes = pyaes.AESModeOfOperationCTR(key)
            self._aes._counter._counter = list(iv)
            self._use_crypto = False

    def encrypt(self, data):
        """Encrypts the given plain text through AES CTR."""
        if self._use_crypto:
            return self._encryptor.update(data)
        return self._aes.encrypt(data)

    def decrypt(self, data):
        """Decrypts the given cipher text through AES CTR."""
        if self._use_crypto:
            return self._decryptor.update(data)
        return self._aes.decrypt(data)
