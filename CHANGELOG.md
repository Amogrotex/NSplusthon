# Changelog

## 1.3.5

Docs and packaging release so PyPI/search actually describe the project.

- Bilingual README (this is the PyPI long description)
- English overview, SPlusthon comparison and migration pages
- Keywords: soroush-plus, splusthon, telethon, userbot
- Python 3.9 called out everywhere; dead `tl.nsplusthon.dev` / `v1.zip` links removed

## Unreleased

### Docs

- Bilingual README and homepage so “NSplusthon”, “Soroush Plus”, and “SPlusthon” are actually searchable.
- English overview, comparison, and SPlusthon migration pages.
- Require Python 3.9 everywhere (removed leftover 3.7).
- Replace dead `tl.nsplusthon.dev` and `archive/v1.zip` links.
- Document `aiohttp` as a required dependency, not an extra.
- Stop pointing issue templates at a missing Telegram channel.

### Packaging

- Richer PyPI description and keywords (`soroush-plus`, `splusthon`, `telethon`, `userbot`).

## 1.3.0

- Command router, rate limiter, encrypted sessions.
- Lazy `import nsplusthon` (~15 ms).

## 1.1.4

- Initial import of the SPlusthon codebase as `nsplusthon` (GPL-3.0).
