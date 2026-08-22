#!/usr/bin/env bash
#
# Rebuild the docs site and refresh the built output committed inside
# docs/ (GitHub Pages serves the repo's main branch /docs folder).
#
# Usage:  ./scripts/build_docs.sh
# Requires: pip install mkdocs mkdocs-material
#
set -euo pipefail
cd "$(dirname "$0")/.."

BUILD_DIR="$(mktemp -d)"
trap 'rm -rf "$BUILD_DIR"' EXIT

if command -v mkdocs >/dev/null 2>&1; then
    MKDOCS=(mkdocs)
else
    MKDOCS=(python3 -m mkdocs)
fi

echo "==> Building site..."
"${MKDOCS[@]}" build --site-dir "$BUILD_DIR"

echo "==> Removing previously generated files from docs/..."
(cd "$BUILD_DIR" && find . -type f | sed 's|^\./||') | while IFS= read -r f; do
    rm -f "docs/$f"
done

echo "==> Copying built site into docs/..."
cp -r "$BUILD_DIR"/. docs/

echo "==> Done. Commit the changes in docs/ to update the live site."
