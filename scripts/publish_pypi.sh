#!/usr/bin/env bash
# Upload dist/ to PyPI.
#
# Do NOT paste a token into chat, git, or this file.
# Create a FRESH token at https://pypi.org/manage/account/token/
# then:
#   export TWINE_USERNAME=__token__
#   export TWINE_PASSWORD='pypi-...'   # new token, local shell only
#   ./scripts/publish_pypi.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -z "${TWINE_PASSWORD:-}" ]]; then
    echo "TWINE_PASSWORD is empty."
    echo "Create a new PyPI token (revoke any token that appeared in chat)"
    echo "and export it in THIS shell only."
    exit 1
fi

python3 -m pip install -U build twine
rm -rf dist build *.egg-info
python3 -m build
python3 -m twine check dist/*
python3 -m twine upload dist/*
