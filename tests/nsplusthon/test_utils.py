import io
import pathlib

import pytest

from nsplusthon import utils
from nsplusthon.tl.types import (
    MessageMediaGame, Game, PhotoEmpty
)


def test_game_input_media_memory_error():
    large_long = 2**62
    media = MessageMediaGame(Game(
        id=large_long,  # <- key to trigger `MemoryError`
        access_hash=large_long,
        short_name='short_name',
        title='title',
        description='description',
        photo=PhotoEmpty(large_long),
    ))
    input_media = utils.get_input_media(media)
    bytes(input_media)  # <- shouldn't raise `MemoryError`


def test_private_get_extension():
    # Positive cases
    png_header = bytes.fromhex('89 50 4e 47 0d 0a 1a 0a  00 00 00 0d 49 48 44 52')
    png_buffer = io.BytesIO(png_header)

    class CustomFd:
        def __init__(self, name):
            self.name = name

    assert utils._get_extension('foo.bar.baz') == '.baz'
    assert utils._get_extension(pathlib.Path('foo.bar.baz')) == '.baz'
    assert utils._get_extension(CustomFd('foo.bar.baz')) == '.baz'

    # Negative cases
    null_header = bytes.fromhex('00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00')
    null_buffer = io.BytesIO(null_header)

    empty_header = bytes()
    empty_buffer = io.BytesIO(empty_header)

    assert utils._get_extension('foo') == ''
    assert utils._get_extension(pathlib.Path('foo')) == ''
    assert utils._get_extension(null_header) == ''
    assert utils._get_extension(null_buffer) == ''
    assert utils._get_extension(null_buffer) == ''  # make sure it did seek back
    assert utils._get_extension(empty_header) == ''
    assert utils._get_extension(empty_buffer) == ''
    assert utils._get_extension(empty_buffer) == ''  # make sure it did seek back
    assert utils._get_extension(CustomFd('foo')) == ''


def test_rle_encode_trailing_zeros():
    assert utils._rle_encode(b'\x12\x00\x00\x00\x00') == b'\x12\x00\x04'


@pytest.mark.parametrize('raw, expected', [
    # International format (the canonical form Soroush expects)
    ('+989351234567', '989351234567'),
    ('989351234567', '989351234567'),
    # Country code + leading zero
    ('+9809351234567', '989351234567'),
    ('9809351234567', '989351234567'),
    # Local format with leading zero
    ('09351234567', '989351234567'),
    # Local fixed line
    ('02188888888', '982188888888'),
    # International prefix 00 (with or without the extra zero)
    ('00989351234567', '989351234567'),
    ('009809351234567', '989351234567'),
    # Formatting characters are stripped
    ('+98 0935 123 4567', '989351234567'),
    ('+98(0)935-123.4567', '989351234567'),
    ('0935.123.4567', '989351234567'),
    # Numbers from other countries pass through unchanged
    ('+14155551234', '14155551234'),
    ('+447911123456', '447911123456'),
    # ints
    (989351234567, '989351234567'),
])
def test_parse_phone_normalization(raw, expected):
    assert utils.parse_phone(raw) == expected


@pytest.mark.parametrize('raw', ['abc', '', '+', '989a55'])
def test_parse_phone_invalid(raw):
    assert utils.parse_phone(raw) is None
