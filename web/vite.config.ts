import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { relative, resolve } from "node:path";

const OUT = resolve(__dirname, "../docs");

const CONTENT = resolve(__dirname, "content");

/** Every markdown file becomes a route, mirroring src/lib/content.ts. */
function contentSlugs(dir = CONTENT): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...contentSlugs(full));
    } else if (entry.name.endsWith(".md")) {
      const rel = relative(CONTENT, full).replace(/\\/g, "/").replace(/\.md$/, "");
      out.push(rel === "index" ? "" : rel.replace(/\/index$/, ""));
    }
  }
  return out;
}

/**
 * GitHub Pages (legacy, main/docs) serves static files only.
 *
 * 404.html mirrors index.html so unknown paths still boot the router, but
 * Pages returns them with a 404 status — bad for crawlers and link previews.
 * So every real route also gets its own index.html and resolves with a 200.
 * .nojekyll stops Pages from stripping files that begin with an underscore.
 */
function githubPages() {
  return {
    name: "github-pages",
    closeBundle() {
      const shell = resolve(OUT, "index.html");
      copyFileSync(shell, resolve(OUT, "404.html"));
      writeFileSync(resolve(OUT, ".nojekyll"), "");

      let n = 0;
      for (const slug of contentSlugs()) {
        if (!slug) continue;
        const dir = resolve(OUT, slug);
        mkdirSync(dir, { recursive: true });
        copyFileSync(shell, resolve(dir, "index.html"));
        n++;
      }
      // eslint-disable-next-line no-console
      console.log(`github-pages: wrote ${n} route shells + 404.html`);
    },
  };
}

export default defineConfig({
  base: "/NSplusthon/",
  plugins: [react(), githubPages()],
  build: {
    outDir: OUT,
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          markdown: ["react-markdown", "remark-gfm", "rehype-slug", "rehype-highlight"],
        },
      },
    },
  },
  server: { host: "0.0.0.0", port: 5173 },
});
