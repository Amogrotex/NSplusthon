"""
Micro-benchmarks for the NSplusthon hot paths.

Run:  python3 benchmarks/microbench.py

Covers:
  - import time
  - TL pack (request serialization)
  - StringSession save/restore
  - AES-IGE throughput (the active crypto path)
  - router command dispatch (no network)
"""
import base64
import os
import struct
import sys
import time

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))


def bench_import():
    import subprocess
    code = 'import nsplusthon'
    t0 = time.perf_counter()
    subprocess.run([sys.executable, '-c', code], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return (time.perf_counter() - t0) * 1000


def bench_tl_pack(n=3000):
    from nsplusthon.tl.functions.messages import SendMessageRequest
    from nsplusthon.tl.types import InputPeerUser
    req = SendMessageRequest(
        peer=InputPeerUser(1234567890, 9876543210),
        message='سلام از NSplusthon — micro-benchmark payload',
        silent=True)
    t0 = time.perf_counter()
    for _ in range(n):
        b = bytes(req)
    t = (time.perf_counter() - t0) / n * 1e6
    return t, len(b)


def bench_string_session(n=2000):
    from nsplusthon.sessions import StringSession
    s = StringSession()
    from nsplusthon.crypto.authkey import AuthKey
    s._dc_id = 2
    s._server_address = '178.128.136.30'
    s._port = 443
    s._auth_key = AuthKey(os.urandom(256))
    raw = s.save()
    t0 = time.perf_counter()
    for _ in range(n):
        StringSession(raw)
    return (time.perf_counter() - t0) / n * 1e6


def bench_aes_ige(n=200, size=65536):
    from nsplusthon.crypto.aes import AES
    key, iv = os.urandom(32), os.urandom(32)
    blob = os.urandom(size)
    AES.encrypt_ige(blob, key, iv)  # warmup
    t0 = time.perf_counter()
    for _ in range(n):
        AES.encrypt_ige(blob, key, iv)
    ms = (time.perf_counter() - t0) / n * 1e3
    return ms, (size / (ms / 1000)) / 1024 / 1024  # MiB/s


def bench_router(n=5000):
    from nsplusthon.router import Router, parse_command
    router = Router()

    @router.command('start', description='test')
    async def _start(event, args, kwargs):
        return 'ok'

    # dispatch-level: pure parsing + resolution (no network, no await)
    text = '/start hello --name=world'
    t0 = time.perf_counter()
    for _ in range(n):
        parsed = parse_command(text, prefixes='/!')
        router.resolve(parsed.name)
    return (time.perf_counter() - t0) / n * 1e6


def main():
    print('NSplusthon micro-benchmarks')
    print('=' * 46)
    r = {}
    r['import'] = bench_import()
    print(f"{'import nsplusthon':<34} {r['import']:8.0f} ms")
    us, blen = bench_tl_pack()
    print(f"{'TL pack (SendMessageRequest)':<34} {us:8.2f} us  ({blen} B/req)")
    us = bench_string_session()
    print(f"{'StringSession restore':<34} {us:8.2f} us")
    ms, mibs = bench_aes_ige()
    print(f"{'AES-IGE 64KB (active path)':<34} {ms:8.3f} ms  ({mibs:6.1f} MiB/s)")
    try:
        us = bench_router()
        print(f"{'router parse+resolve':<34} {us:8.2f} us")
    except (ImportError, AttributeError):
        print(f"{'router parse+resolve':<34} {'n/a':>8}   (router not present)")


if __name__ == '__main__':
    main()
