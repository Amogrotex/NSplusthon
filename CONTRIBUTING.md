# Contributing to NSplusthon

Thanks for helping. Short, focused PRs are easiest to review.

## Setup

```bash
git clone https://github.com/Amogrotex/NSplusthon.git
cd NSplusthon
python3 -m venv .venv
source .venv/bin/activate
pip install -e ".[dev]"
```

Python **3.9+**. Do not name local scripts `nsplusthon.py`.

## Before you open a PR

1. Open an [issue](https://github.com/Amogrotex/NSplusthon/issues) for anything larger than a typo.
2. Work on a branch, not `main`.
3. `python -m compileall nsplusthon`
4. `pytest tests/ -q`
5. If you touched docs: `./scripts/build_docs.sh` (needs `mkdocs-material`) and commit the refreshed HTML under `docs/` **or** rely on the Pages workflow.

## Docs

Source markdown lives next to the built GitHub Pages site in `docs/`. Edit the `.md` files, then rebuild.

- Persian is the default site language (RTL).
- Keep an English summary on `docs/en/index.md` and on the homepage so search engines can index the project.
- Do not link to `tl.nsplusthon.dev` or Telegram (`t.me`, `my.telegram.org`) unless the text is explicitly about Telegram/Telethon.

## What helps the package grow

These are more useful than extra badges:

- Real usage examples in `nsplusthon_examples/`
- Bug reports with versions (`pip show nsplusthon`)
- A short post that links the **exact** name: NSplusthon, Soroush Plus, سروش پلاس
- GitHub topics on the repo: `nsplusthon`, `soroush-plus`, `splus`, `python`, `asyncio`, `mtproto`, `telethon`, `userbot`
- Repo description: `Async Python library for the Soroush Plus (سروش پلاس) API`

## Security

Never commit GitHub PATs, PyPI tokens, session strings, or bot tokens. See [SECURITY.md](SECURITY.md).
