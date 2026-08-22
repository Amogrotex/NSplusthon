# Security policy

## Secrets

Treat these as **compromised** the moment they appear in chat, a screenshot, a gist, or git history:

- GitHub personal access tokens (`ghp_…`, `github_pat_…`)
- PyPI API tokens (`pypi-…`)
- Soroush Plus session strings and `.session` files
- Bot tokens

Revoke them immediately:

- GitHub: <https://github.com/settings/tokens>
- PyPI: <https://pypi.org/manage/account/token/>

Do not publish packages with `twine` + a long-lived token if you can use
[Trusted Publishing](https://docs.pypi.org/trusted-publishers/) from GitHub Actions instead (see `.github/workflows/python-publish.yml`).

## Reporting a vulnerability

Open a **private** security advisory on GitHub if you can:
<https://github.com/Amogrotex/NSplusthon/security/advisories/new>

Otherwise email the maintainer listed on PyPI. Do not file a public issue that includes tokens or session material.

## Scope

NSplusthon is a third-party client. Account bans, FloodWait, and Soroush Plus policy violations are not security bugs in this repository.
