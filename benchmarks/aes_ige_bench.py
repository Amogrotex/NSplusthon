#!/usr/bin/env python3
"""
Benchmark + correctness check for nsplusthon's AES-IGE implementation.

It forces the *pure-Python* fallback path (as if neither ``cryptg`` nor
``libssl`` were installed), times encrypt/decrypt, verifies a round-trip,
and cross-checks the output against ``cryptg`` (the C fast-path) so we know
the optimised fallback stays bit-for-bit correct.

Run with:  python benchmarks/aes_ige_bench.py
"""
import os
import time

import nsplusthon.crypto.aes as aes_mod
import nsplusthon.crypto.libssl as libssl_mod

# --- Force the pure-Python fallback ---------------------------------------
aes_mod.cryptg = None
libssl_mod.encrypt_ige = None
libssl_mod.decrypt_ige = None

from nsplusthon.crypto.aes import AES  # noqa: E402

SIZE = 256 * 1024  # 256 KiB
key = os.urandom(32)
iv = os.urandom(32)
data = os.urandom(SIZE)


def bench(fn, *args, repeat=7):
    best = float("inf")
    res = None
    for _ in range(repeat):
        t0 = time.perf_counter()
        res = fn(*args)
        best = min(best, time.perf_counter() - t0)
    return best, res


# Warm up the block cipher tables
AES.encrypt_ige(data[:1024], key, iv)

et, ct = bench(AES.encrypt_ige, data, key, iv)
dt, pt = bench(AES.decrypt_ige, ct, key, iv)

# --- Correctness: round-trip ----------------------------------------------
assert pt[:len(data)] == data, "AES-IGE round-trip FAILED!"
print("round-trip ............ OK")

# --- Correctness: matches cryptg (the C fast-path) ------------------------
try:
    import cryptg  # noqa: E402

    ref = cryptg.encrypt_ige(data, key, iv)
    assert ref == ct, "pure-Python output differs from cryptg!"
    print("matches cryptg ........ OK")
except ImportError:
    print("matches cryptg ........ SKIPPED (cryptg not installed)")

throughput_enc = SIZE / et / (1024 * 1024)
throughput_dec = SIZE / dt / (1024 * 1024)
print(f"size .................. {SIZE} bytes")
print(f"pure-python encrypt ... {et * 1000:8.2f} ms  ({throughput_enc:6.1f} MiB/s)")
print(f"pure-python decrypt ... {dt * 1000:8.2f} ms  ({throughput_dec:6.1f} MiB/s)")
