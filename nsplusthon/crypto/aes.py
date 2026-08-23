"""
AES IGE implementation in Python.

Supports hardware-accelerated cryptg, libssl (C), and cryptography (C/Rust)
with pure-Python pyaes fallback.
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

try:
    from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
    _has_cryptography = True
except ImportError:
    _has_cryptography = False

if not cryptg:
    if libssl.encrypt_ige and libssl.decrypt_ige:
        __log__.info('libssl detected, it will be used for encryption')
    elif _has_cryptography:
        __log__.info('cryptography detected, it will be used for fast AES encryption')
    else:
        __log__.info('falling back to pure Python pyaes encryption')


def _xor16(a, b):
    """XOR two 16-byte sequences as a single big-integer operation."""
    return (int.from_bytes(a, 'big') ^ int.from_bytes(b, 'big')).to_bytes(16, 'big')


class AES:
    """
    Class that serves as an interface to encrypt and decrypt
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

        if _has_cryptography:
            cipher = Cipher(algorithms.AES(key), modes.ECB())
            decryptor = cipher.decryptor()
            iv1 = iv[:16]      # previous ciphertext block
            iv2 = iv[16:32]    # previous plaintext block

            out = bytearray(len(cipher_text))
            for off in range(0, len(cipher_text), 16):
                cblock = cipher_text[off:off + 16]
                tmp = _xor16(cblock, iv2)
                dec = decryptor.update(tmp)
                plain = _xor16(dec, iv1)
                out[off:off + 16] = plain
                iv1 = cblock
                iv2 = plain

            return bytes(out)

        aes = pyaes.AES(key)
        iv1 = iv[:16]      # previous ciphertext block
        iv2 = iv[16:32]    # previous plaintext block

        out = bytearray(len(cipher_text))
        for off in range(0, len(cipher_text), 16):
            cblock = cipher_text[off:off + 16]
            tmp = _xor16(cblock, iv2)
            dec = bytes(aes.decrypt(tmp))
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

        if _has_cryptography:
            cipher = Cipher(algorithms.AES(key), modes.ECB())
            encryptor = cipher.encryptor()
            iv1 = iv[:16]      # previous ciphertext block
            iv2 = iv[16:32]    # previous plaintext block

            out = bytearray(len(plain_text))
            for off in range(0, len(plain_text), 16):
                block = plain_text[off:off + 16]
                tmp = _xor16(block, iv1)
                enc = encryptor.update(tmp)
                cipher_block = _xor16(enc, iv2)
                out[off:off + 16] = cipher_block
                iv1 = cipher_block
                iv2 = block

            return bytes(out)

        aes = pyaes.AES(key)
        iv1 = iv[:16]      # previous ciphertext block
        iv2 = iv[16:32]    # previous plaintext block

        out = bytearray(len(plain_text))
        for off in range(0, len(plain_text), 16):
            block = plain_text[off:off + 16]
            tmp = _xor16(block, iv1)
            enc = bytes(aes.encrypt(tmp))
            cipher_block = _xor16(enc, iv2)
            out[off:off + 16] = cipher_block
            iv1 = cipher_block
            iv2 = block

        return bytes(out)
