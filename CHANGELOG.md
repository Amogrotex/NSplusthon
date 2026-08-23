# Changelog

## Unreleased

## 1.4.0

Performance and speedup release.

- Hardware-accelerated AES-CTR stream encryption via `cryptography` (up to 1,700x faster).
- Native AES-IGE block processing (up to 16x faster MTProto payload decryption).
- Pre-compiled struct parsing and O(1) byte reads in `BinaryReader` (2x faster TL serialization).
- Upgraded WebSocket buffer sizing (512 KB) for lower packet fragmentation and high-traffic throughput.
- Optimized SQLite session database with WAL journal mode, 64 MB memory-mapped I/O, and 8 MB RAM cache.
- Fixed Python linter syntax warnings in RSA key registration.

- README / docs no longer describe another project as upstream.

## 1.3.5

Docs and packaging release.

- Bilingual README (PyPI long description)
- English overview
- Python 3.9 called out everywhere; dead `tl.nsplusthon.dev` / `v1.zip` links removed

## 1.3.0

- Command router, rate limiter, encrypted sessions.
- Lazy `import nsplusthon` (~15 ms).

## 1.1.4

- First public `nsplusthon` release (GPL-3.0).
