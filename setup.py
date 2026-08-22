#!/usr/bin/env python3
"""NSplusthon setup.

Metadata lives in pyproject.toml. This file keeps:
* ``python setup.py gen|clean`` — regenerate TL / errors / docs
* ``python setup.py pypi`` — build + upload
* a ``build_py`` hook so editable / sdist builds refresh generated code
"""

import itertools
import json
import os
import re
import shutil
import sys
import urllib.request
from pathlib import Path
from subprocess import run

from setuptools import setup
from setuptools.command.build_py import build_py as _build_py

sys.path.insert(0, os.path.dirname(__file__))


class TempWorkDir:
    """Switch cwd to this file's directory inside the ``with`` block."""

    def __init__(self, new=None):
        self.original = None
        self.new = new or str(Path(__file__).parent.resolve())

    def __enter__(self):
        self.original = str(Path(".").resolve())
        os.makedirs(self.new, exist_ok=True)
        os.chdir(self.new)
        return self

    def __exit__(self, *args):
        os.chdir(self.original)


API_REF_URL = "https://tl.nsplusthon.dev/"

GENERATOR_DIR = Path("nsplusthon_generator")
LIBRARY_DIR = Path("nsplusthon")

ERRORS_IN = GENERATOR_DIR / "data/errors.csv"
ERRORS_OUT = LIBRARY_DIR / "errors/rpcerrorlist.py"

METHODS_IN = GENERATOR_DIR / "data/methods.csv"
FRIENDLY_IN = GENERATOR_DIR / "data/friendly.csv"

TLOBJECT_IN_TLS = [Path(x) for x in GENERATOR_DIR.glob("data/*.tl")]
TLOBJECT_OUT = LIBRARY_DIR / "tl"
IMPORT_DEPTH = 2

DOCS_IN_RES = GENERATOR_DIR / "data/html"
DOCS_OUT = Path("docs")


def generate(which, action="gen"):
    from nsplusthon_generator.parsers import find_layer, parse_errors, parse_methods, parse_tl
    from nsplusthon_generator.generators import (
        clean_tlobjects,
        generate_docs,
        generate_errors,
        generate_tlobjects,
    )

    layer = next(filter(None, map(find_layer, TLOBJECT_IN_TLS)))
    errors = list(parse_errors(ERRORS_IN))
    methods = list(parse_methods(METHODS_IN, FRIENDLY_IN, {e.str_code: e for e in errors}))

    tlobjects = list(
        itertools.chain(*(parse_tl(file, layer, methods) for file in TLOBJECT_IN_TLS))
    )

    if not which:
        which.extend(("tl", "errors"))

    clean = action == "clean"
    action_name = "Cleaning" if clean else "Generating"

    if "all" in which:
        which.remove("all")
        for x in ("tl", "errors", "docs"):
            if x not in which:
                which.append(x)

    if "tl" in which:
        which.remove("tl")
        print(action_name, "TLObjects...")
        if clean:
            clean_tlobjects(TLOBJECT_OUT)
        else:
            generate_tlobjects(tlobjects, layer, IMPORT_DEPTH, TLOBJECT_OUT)

    if "errors" in which:
        which.remove("errors")
        print(action_name, "RPCErrors...")
        if clean:
            if ERRORS_OUT.is_file():
                ERRORS_OUT.unlink()
        else:
            with ERRORS_OUT.open("w") as file:
                generate_errors(errors, file)

    if "docs" in which:
        which.remove("docs")
        print(action_name, "documentation...")
        if clean:
            if DOCS_OUT.is_dir():
                shutil.rmtree(str(DOCS_OUT))
        else:
            in_path = DOCS_IN_RES.resolve()
            with TempWorkDir(DOCS_OUT):
                generate_docs(tlobjects, methods, layer, in_path)

    if "json" in which:
        which.remove("json")
        print(action_name, "JSON schema...")
        json_files = [x.with_suffix(".json") for x in TLOBJECT_IN_TLS]
        if clean:
            for file in json_files:
                if file.is_file():
                    file.unlink()
        else:

            def gen_json(fin, fout):
                meths = []
                constructors = []
                for tl in parse_tl(fin, layer):
                    if tl.is_function:
                        meths.append(tl.to_dict())
                    else:
                        constructors.append(tl.to_dict())
                what = {"constructors": constructors, "methods": meths}
                with open(fout, "w") as f:
                    json.dump(what, f, indent=2)

            for fs in zip(TLOBJECT_IN_TLS, json_files):
                gen_json(*fs)

    if which:
        print(
            "The following items were not understood:",
            which,
            '\n  Consider using only "tl", "errors" and/or "docs".'
            '\n  Using only "clean" will clean them. "all" to act on all.'
            '\n  For instance "gen tl errors".',
        )


class build_py(_build_py):
    """Generate TL/errors only when the compiled modules are missing."""

    def run(self):
        compiled = TLOBJECT_OUT / "alltlobjects.py"
        if GENERATOR_DIR.is_dir() and not compiled.is_file():
            generate(["tl", "errors"])
        super().run()


def _upload_pypi():
    with urllib.request.urlopen(API_REF_URL) as resp:
        html = resp.read()
        m = re.search(br"layer\s+(\d+)", html)
        if not m:
            print("Failed to check that the API reference is up to date:", API_REF_URL)
            return

        from nsplusthon_generator.parsers import find_layer

        layer = next(filter(None, map(find_layer, TLOBJECT_IN_TLS)))
        published_layer = int(m[1])
        if published_layer != layer:
            print(
                "Published layer",
                published_layer,
                "does not match current layer",
                layer,
                ".",
            )
            print("Make sure to update the API reference site first:", API_REF_URL)
            return

    generate(["tl", "errors"])

    try:
        import nsplusthon  # noqa: F401
    except Exception as e:
        print("Packaging for PyPI aborted, importing the module failed.")
        print(e)
        return

    remove_dirs = ["__pycache__", "build", "dist", "NSplusthon.egg-info"]
    for root, _dirs, _files in os.walk(LIBRARY_DIR, topdown=False):
        if root.endswith("/__pycache__"):
            remove_dirs.append(root)
    for x in remove_dirs:
        shutil.rmtree(x, ignore_errors=True)

    run([sys.executable, "-m", "build"], check=False)
    run([sys.executable, "-m", "twine", "upload", "dist/*"], check=False)
    for x in ("build", "dist", "NSplusthon.egg-info"):
        shutil.rmtree(x, ignore_errors=True)


_CLI = {"gen", "clean", "pypi"}

if __name__ == "__main__" and len(sys.argv) >= 2 and sys.argv[1] in _CLI:
    with TempWorkDir():
        if sys.argv[1] in ("gen", "clean"):
            generate(sys.argv[2:], sys.argv[1])
        else:
            _upload_pypi()
else:
    setup(cmdclass={"build_py": build_py})
