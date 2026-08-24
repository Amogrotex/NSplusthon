import base64
import ipaddress
import os
import struct

from .abstract import Session
from .memory import MemorySession
from ..crypto import AuthKey

_STRUCT_PREFORMAT = '>B{}sH256s'
_STRUCT_PREFORMAT_WITH_LEN = '>BH{}sH256s'

CURRENT_VERSION = '1'


class StringSession(MemorySession):
    """
    This session file can be easily saved and loaded as a string. According
    to the initial design, it contains only the data that is necessary for
    successful connection and authentication, so takeout ID is not stored.

    It is thought to be used where you don't want to create any on-disk
    files but would still like to be able to save and load existing sessions
    by other means.

    You can use custom `encode` and `decode` functions, if present:

    * `encode` definition must be ``def encode(value: bytes) -> str:``.
    * `decode` definition must be ``def decode(value: str) -> bytes:``.
    """
    def __init__(self, string: str = None):
        super().__init__()
        if string:
            if string[0] != CURRENT_VERSION:
                raise ValueError('Not a valid string')

            string = string[1:]
            data = StringSession.decode(string)
            if len(data) == 352:
                # Old format: raw IPv4 bytes
                self._dc_id, ip, self._port, key = struct.unpack(
                    _STRUCT_PREFORMAT.format(4), data)
                self._server_address = ipaddress.ip_address(ip).compressed
            else:
                # New format: length-prefixed address string
                self._dc_id, addr_len, = struct.unpack('>BH', data[:3])
                addr_bytes, self._port, key = struct.unpack(
                    '>{}sH256s'.format(addr_len), data[3:])
                self._server_address = addr_bytes.decode('utf-8')
            if any(key):
                self._auth_key = AuthKey(key)

    @staticmethod
    def encode(x: bytes) -> str:
        return base64.urlsafe_b64encode(x).decode('ascii')

    @staticmethod
    def decode(x: str) -> bytes:
        return base64.urlsafe_b64decode(x)

    def save(self: Session):
        if not self.auth_key:
            return ''

        addr = self.server_address.encode('utf-8')
        return CURRENT_VERSION + StringSession.encode(struct.pack(
            _STRUCT_PREFORMAT_WITH_LEN.format(len(addr)),
            self.dc_id,
            len(addr),
            addr,
            self.port,
            self.auth_key.key
        ))

    ENCRYPTED_VERSION = 'E1'
    _KDF_ITERATIONS = 120_000

    @staticmethod
    def _derive_key(passphrase: str, salt: bytes) -> bytes:
        import hashlib
        return hashlib.pbkdf2_hmac(
            'sha256', passphrase.encode('utf-8'), salt,
            StringSession._KDF_ITERATIONS)

    @classmethod
    def encrypt_session(cls, session: str, passphrase: str) -> str:
        """
        Encrypt a plain session string with a passphrase (AES-IGE,
        PBKDF2-SHA256 key derivation). Returns a self-describing string
        that starts with ``E1``.

        The result is safe to store in a config file or environment
        variable — without the passphrase the auth key is unreadable.
        """
        if not session or session[0] != CURRENT_VERSION:
            raise ValueError('not a valid NSplusthon session string')
        if not passphrase:
            raise ValueError('passphrase must not be empty')

        from ..crypto import AES
        data = session.encode('utf-8')
        pad = 16 - (len(data) % 16)
        data = data + bytes([pad]) * pad
        salt = os.urandom(16)
        iv = os.urandom(32)
        key = cls._derive_key(passphrase, salt)
        ct = AES.encrypt_ige(data, key, iv)
        return cls.ENCRYPTED_VERSION + cls.encode(salt + iv + ct)

    @classmethod
    def decrypt_session(cls, encrypted: str, passphrase: str) -> str:
        """
        Reverse of :meth:`encrypt_session`. Raises ``ValueError`` if the
        string is not an encrypted session or the passphrase is wrong.
        """
        if not encrypted or not encrypted.startswith(cls.ENCRYPTED_VERSION):
            raise ValueError('not an encrypted session string')
        blob = cls.decode(encrypted[len(cls.ENCRYPTED_VERSION):])
        if len(blob) < 16 + 32 + 16:
            raise ValueError('malformed encrypted session string')
        salt, iv, ct = blob[:16], blob[16:48], blob[48:]

        from ..crypto import AES
        key = cls._derive_key(passphrase, salt)
        data = AES.decrypt_ige(ct, key, iv)
        try:
            pad = data[-1]
            if not 1 <= pad <= 16 or data[-pad:] != bytes([pad]) * pad:
                raise ValueError
        except ValueError:
            raise ValueError('wrong passphrase or corrupted session')
        return data[:-pad].decode('utf-8')

    @classmethod
    def from_encrypted(cls, encrypted: str, passphrase: str) -> 'StringSession':
        """Build a :class:`StringSession` from an encrypted string."""
        return cls(cls.decrypt_session(encrypted, passphrase))
