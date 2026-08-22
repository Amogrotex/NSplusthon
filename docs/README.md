# NSplusthon documentation

Persian MkDocs site for GitHub Pages, plus a short English overview for search.

## Layout

```
docs/
├── index.md                 # Home (EN blurb + فارسی)
├── en/index.md              # English overview
├── compare.md               # vs SPlusthon / spluspy / Telethon
├── migration.md             # SPlusthon → NSplusthon
├── installation.md
├── quick-start.md
├── api-reference.md
├── faq.md
├── robots.txt
├── concepts/
├── examples/
└── stylesheets/extra.css
```

Built HTML (`index.html`, `sitemap.xml`, …) may sit beside these files when Pages is served from `/docs`. Prefer the Actions workflow in `.github/workflows/deploy-docs.yml`.

## Preview

```bash
pip install -U "mkdocs-material>=9"
mkdocs serve
```

## Deploy

```bash
./scripts/build_docs.sh
```

Or enable **GitHub Actions** as the Pages source.

Do not link `https://tl.nsplusthon.dev/` — it is not live. Use `api-reference.md` instead.
