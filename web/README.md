# NSplusthon docs site

React + TypeScript + Vite. Builds the static site that GitHub Pages serves
from `main:/docs`.

## Layout

```
web/
  content/          markdown pages (the only thing you normally edit)
  src/
    lib/content.ts  compiles every .md into routes, headings and a search index
    lib/mkdocs.ts   mkdocs-material compatibility (admonitions, icons, attr_list)
    lib/nav.ts      nav pill + sidebar structure
    components/     TopBar, Sidebar, Toc, SearchDialog, Markdown, CodeBlock
    styles/         global tokens, layout, prose
```

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + build into ../docs
npm run typecheck
```

Or from the repo root: `./scripts/build_docs.sh`

## Notes

- **`docs/` is build output.** Never edit it by hand; it is regenerated and
  committed so legacy GitHub Pages can serve it.
- Markdown is authored in the mkdocs-material dialect. `src/lib/mkdocs.ts`
  converts admonitions (`!!! note`), strips icon shortcodes
  (`:material-key:`) and turns attr_list (`{ .ns-btn }`) into real classes.
  Add new conversions there rather than rewriting the content.
- Routing is client-side. `404.html` is a copy of `index.html` so deep links
  work on Pages; `vite.config.ts` writes both it and `.nojekyll` after build.
- Adding a page: drop a `.md` in `content/`, then add it to `src/lib/nav.ts`.
