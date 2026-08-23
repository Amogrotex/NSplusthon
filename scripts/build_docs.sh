#!/usr/bin/env bash
#
# Build the documentation site (React + TypeScript + Vite, in web/) into docs/.
#
# GitHub Pages for this repo is configured in legacy mode: it serves the
# contents of /docs on the main branch. So docs/ holds build output only —
# never edit it by hand. The markdown lives in web/content/.
#
# Usage:  ./scripts/build_docs.sh
# Requires: Node.js 18+
set -euo pipefail
cd "$(dirname "$0")/.."

if ! command -v npm >/dev/null 2>&1; then
    echo "npm is required (Node.js 18 or newer)." >&2
    exit 1
fi

cd web

if [ ! -d node_modules ]; then
    echo "==> Installing dependencies..."
    npm ci 2>/dev/null || npm install
fi

echo "==> Type-checking and building..."
npm run build

echo "==> Done. Output is in docs/. Commit it to update the live site."
