"""
AES IGE implementation in Python.

If available, cryptg will be used instead, otherwise
if available, libssl will be used instead, otherwise
the Python implementation will be used.
"""
import os
import pyaes
import logging
from . import libssl


__log__ = logging.getLogger(__name__)


try:
    import cryptg
    __log__.info('cryptg detected, it will be used for encryption')
except ImportError:
    cryptg = None
    if libssl.encrypt_ige and libssl.decrypt_ige:
        __log__.info('libssl detected, it will be used for encryption')
    else:
        __log__.info('cryptg module not installed and libssl not found, '
                     'falling back to (slower) Python encryption')


def _xor16(a, b):
    """
    XOR two 16-byte sequences as a single big-integer operation.

    This is markedly faster than a per-byte Python loop (which the previous
    implementation ran twice per block), and keeps the pure-Python fallback
    bit-for-bit identical to the ``cryptg`` / ``libssl`` fast paths.
    """
    return (int.from_bytes(a, 'big') ^ int.from_bytes(b, 'big')).to_bytes(16, 'big')


class AES:
    """
    Class that servers as an interface to encrypt and decrypt
    text through the AES IGE mode.
    """
    @staticmethod
    def decrypt_ige(cipher_text, key, iv):
        """
        Decrypts the given text in 16-bytes blocks by using the
        given key and 32-bytes initialization vector.
        """
        if cryptg:
            return cryptg.decrypt_ige(cipher_text, key, iv)
        if libssl.decrypt_ige:
            return libssl.decrypt_ige(cipher_text, key, iv)

        aes = pyaes.AES(key)
        iv1 = iv[:16]      # previous ciphertext block
        iv2 = iv[16:32]    # previous plaintext block

        out = bytearray(len(cipher_text))
        for off in range(0, len(cipher_text), 16):
            cblock = cipher_text[off:off + 16]
            tmp = _xor16(cblock, iv2)
            dec = bytes(aes.decrypt(list(tmp)))
            plain = _xor16(dec, iv1)
            out[off:off + 16] = plain
            iv1 = cblock
            iv2 = plain

        return bytes(out)

    @staticmethod
    def encrypt_ige(plain_text, key, iv):
        """
        Encrypts the given text in 16-bytes blocks by using the
        given key and 32-bytes initialization vector.
        """
        padding = len(plain_text) % 16
        if padding:
            plain_text += os.urandom(16 - padding)

        if cryptg:
            return cryptg.encrypt_ige(plain_text, key, iv)
        if libssl.encrypt_ige:
            return libssl.encrypt_ige(plain_text, key, iv)

        aes = pyaes.AES(key)
        iv1 = iv[:16]      # previous ciphertext block
        iv2 = iv[16:32]    # previous plaintext block

        out = bytearray(len(plain_text))
        for off in range(0, len(plain_text), 16):
            block = plain_text[off:off + 16]
            tmp = _xor16(block, iv1)
            enc = bytes(aes.encrypt(list(tmp)))
            cipher = _xor16(enc, iv2)
            out[off:off + 16] = cipher
            iv1 = cipher
            iv2 = block

        return bytes(out)
