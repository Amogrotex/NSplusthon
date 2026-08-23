import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const OUT = resolve(__dirname, "../docs");

/**
 * GitHub Pages (legacy, main/docs) serves static files only. A client-routed
 * SPA therefore needs 404.html to mirror index.html so deep links such as
 * /NSplusthon/quick-start/ resolve instead of hitting Pages' own 404.
 * .nojekyll stops Pages from stripping files that begin with an underscore.
 */
function githubPages() {
  return {
    name: "github-pages",
    closeBundle() {
      copyFileSync(resolve(OUT, "index.html"), resolve(OUT, "404.html"));
      writeFileSync(resolve(OUT, ".nojekyll"), "");
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
