import pytest
from nsplusthon.utils import (
    detect_soroush_entity,
    is_soroush_link,
    extract_soroush_links,
    parse_username,
    is_soroush_username
)
from nsplusthon.network.circuitbreaker import CircuitBreaker
from nsplusthon.tl.core.gzippacked import GzipPacked


def test_soroush_username_parsing():
    u, is_inv = parse_username("https://splus.ir/my_channel")
    assert u == "my_channel"
    assert not is_inv

    u, is_inv = parse_username("https://sapp.ir/botzone")
    assert u == "botzone"
    assert not is_inv

    u, is_inv = parse_username("https://splus.ir/joinchat/AbCdEfGhIj")
    assert u == "AbCdEfGhIj"
    assert is_inv

    u, is_inv = parse_username("soroush://resolve?domain=veltriox")
    assert u == "veltriox"
    assert not is_inv


def test_detect_soroush_entity():
    info = detect_soroush_entity("@veltriox")
    assert info.type == "username"
    assert info.username == "veltriox"
    assert info.url == "https://splus.ir/veltriox"

    info_link = detect_soroush_entity("https://splus.ir/joinchat/K7Mpx")
    assert info_link.type == "invite"
    assert info_link.invite_hash == "K7Mpx"

    info_user = detect_soroush_entity("splus://user?id=65510342")
    assert info_user.type == "user"
    assert info_user.id == 65510342

    info_num = detect_soroush_entity(-1001234567890)
    assert info_num.type == "channel"
    assert info_num.is_marked


def test_is_and_extract_soroush_links():
    text = "سلام به کانال ما در https://splus.ir/botzone و https://sapp.ir/joinchat/xyz سر بزنید!"
    assert is_soroush_link(text)
    links = extract_soroush_links(text)
    assert len(links) == 2


def test_circuit_breaker():
    cb = CircuitBreaker(failure_threshold=3, recovery_timeout=0.1)
    assert cb.can_attempt()
    assert cb.state == "CLOSED"

    cb.record_failure()
    cb.record_failure()
    assert cb.can_attempt()
    cb.record_failure()
    assert cb.state == "OPEN"
    assert not cb.can_attempt()


def test_adaptive_gzip():
    small_data = b"small data"
    packed = GzipPacked.gzip_if_smaller(True, small_data)
    assert packed == small_data

    large_data = b"Hello world! " * 200
    packed_large = GzipPacked.gzip_if_smaller(True, large_data)
    assert len(packed_large) < len(large_data)
