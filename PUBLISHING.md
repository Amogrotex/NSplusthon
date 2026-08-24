# Publishing NSplusthon to PyPI

GitHub Releases **do not** reach PyPI until Trusted Publishing is
configured. The last two releases (`v1.3.0`, `v1.7.0`) built the wheel
and then failed with:

```
invalid-publisher: valid token, but no corresponding publisher
sub: repo:Amogrotex@…/NSplusthon@…:environment:pypi
```

`1.3.5` on PyPI was uploaded by hand. Repo `main` is ahead of that.

## One-time setup (you must click this)

1. Sign in at <https://pypi.org/manage/account/publishing/>
2. Add a **pending publisher**:
   - **PyPI project name:** `NSplusthon`
   - **Owner:** `Amogrotex`
   - **Repository:** `NSplusthon`
   - **Workflow name:** `python-publish.yml` (exactly)
   - **Environment name:** `pypi` (exactly — a GitHub Environment with
     this name already exists)
3. Save. The next `release` event will publish.

Do **not** put a long-lived `pypi-…` token in GitHub secrets. Trusted
Publishing is already wired in `.github/workflows/python-publish.yml`.

## Cutting a release

```bash
# version lives in nsplusthon/version.py
git tag -a v1.8.1 -m "v1.8.1"
git push origin v1.8.1
gh release create v1.8.1 --generate-notes
```

The `Upload Python Package` workflow runs on `release: published`.
You can also run it by hand from the Actions tab (`workflow_dispatch`).

Until the publisher above is saved, that job will keep failing and
`pip install nsplusthon` will stay on 1.3.5. Install from git instead:

```bash
pip install -U "nsplusthon[fast] @ git+https://github.com/Amogrotex/NSplusthon.git"
```
