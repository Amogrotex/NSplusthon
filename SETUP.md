# Docs setup

NSplusthon docs are **MkDocs Material**. Source markdown is in `docs/`. GitHub Pages currently serves the **built HTML committed inside `docs/`**. There is also an Actions workflow (`.github/workflows/deploy-docs.yml`) that builds a clean site; switch Settings → Pages → Source to **GitHub Actions** after the first green run.

## Requirements

- Python 3.9+
- `pip install -U "mkdocs-material>=9"`

## Local preview

```bash
mkdocs serve
```

Open `http://127.0.0.1:8000`. Bind `0.0.0.0` if you need it from another host: `mkdocs serve -a 0.0.0.0:8000`.

## Rebuild the committed Pages tree

```bash
./scripts/build_docs.sh
```

This writes generated HTML next to the markdown in `docs/`. Commit those files if Pages is still set to “Deploy from branch / docs folder”.

## What we keep true in the docs

- Python **3.9+** (not 3.7)
- Install from PyPI or `git+https://github.com/Amogrotex/NSplusthon.git` (there is no `v1` zip)
- No `tl.nsplusthon.dev` — that host is not deployed
- `aiohttp` is a **required** dependency
- User accounts **and** bots (`SoroushClient.start(bot_token=...)`)
- English overview at `/en/` for search engines

## Theme

`mkdocs.yml`: Material, `language: fa`, `direction: rtl`, Vazirmatn, black/white palette.
