import { REPO_URL, PYPI_URL } from "../lib/nav";

export function Footer() {
  return (
    <footer className="footer">
      <p>
        NSplusthon — کتابخانه پایتون برای سروش پلاس · GPL-3.0 ·{" "}
        <a href={REPO_URL} target="_blank" rel="noreferrer noopener">GitHub</a> ·{" "}
        <a href={PYPI_URL} target="_blank" rel="noreferrer noopener">PyPI</a>
      </p>
    </footer>
  );
}
