try:
    from isal import igzip as gzip
except ImportError:
    import gzip
import zlib
import struct

from .. import TLObject

_GZIP_CONSTRUCTOR_BYTES = b'\xa1\xcf\x72\x30'


class GzipPacked(TLObject):
    CONSTRUCTOR_ID = 0x3072cfa1

    def __init__(self, data):
        self.data = data

    @staticmethod
    def gzip_if_smaller(content_related, data):
        """
        Adaptive compression: gzips payloads larger than 256 bytes
        if the compressed output is smaller than the original.
        """
        if content_related and len(data) > 256:
            try:
                compressed = zlib.compress(data, level=6)
                if len(compressed) + 12 < len(data):
                    return _GZIP_CONSTRUCTOR_BYTES + TLObject.serialize_bytes(compressed)
            except Exception:
                pass
            return data
        return data

    def __bytes__(self):
        return _GZIP_CONSTRUCTOR_BYTES + TLObject.serialize_bytes(zlib.compress(self.data, level=6))

    @staticmethod
    def read(reader):
        constructor = reader.read_int(signed=False)
        assert constructor == GzipPacked.CONSTRUCTOR_ID
        raw = reader.tgread_bytes()
        try:
            return zlib.decompress(raw, zlib.MAX_WBITS | 16)
        except Exception:
            return gzip.decompress(raw)

    @classmethod
    def from_reader(cls, reader):
        constructor = reader.read_int(signed=False)
        assert constructor == GzipPacked.CONSTRUCTOR_ID
        raw = reader.tgread_bytes()
        try:
            decompressed = zlib.decompress(raw, zlib.MAX_WBITS | 16)
        except Exception:
            decompressed = gzip.decompress(raw)
        return GzipPacked(decompressed)

    def to_dict(self):
        return {
            '_': 'GzipPacked',
            'data': self.data
        }
