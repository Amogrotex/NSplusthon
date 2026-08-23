import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams, Link } from "react-router-dom";
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { Toc } from "./components/Toc";
import { Footer } from "./components/Footer";
import { SearchDialog } from "./components/SearchDialog";
import { Markdown } from "./components/Markdown";
import { getDoc } from "./lib/content";

const SITE = "NSplusthon";

function Page({ onLayout }: { onLayout: (wide: boolean) => void }) {
  const params = useParams();
  const slug = (params["*"] ?? "").replace(/^\/+|\/+$/g, "");
  const doc = getDoc(slug);

  useEffect(() => {
    onLayout(Boolean(doc?.hideNav));
  }, [doc, onLayout]);

  useEffect(() => {
    document.title = doc ? `${doc.title} · ${SITE}` : `صفحه پیدا نشد · ${SITE}`;
    document.documentElement.lang = doc?.lang ?? "fa";
    document.documentElement.dir = doc?.lang === "en" ? "ltr" : "rtl";
  }, [doc]);

  // honour #anchor links once the markdown has rendered
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
  }, [hash, slug]);

  if (!doc) {
    return (
      <main className="article glass fadein" id="main">
        <div className="prose">
          <h1>۴۰۴</h1>
          <p>این صفحه وجود ندارد.</p>
          <p>
            <Link to="/">بازگشت به خانه</Link>
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="article glass fadein" id="main" key={doc.slug}>
        <Markdown source={doc.body} />
      </main>
      {!doc.hideToc && <Toc headings={doc.headings} />}
    </>
  );
}

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wide, setWide] = useState(false);
  const { pathname } = useLocation();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => setMenuOpen(false), [pathname]);

  // Ctrl/Cmd+K opens search, / focuses it, Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setSearchOpen(true);
      } else if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="shell">
      <a className="skip-link" href="#main">پرش به محتوا</a>

      <TopBar onOpenSearch={() => setSearchOpen(true)} onToggleMenu={() => setMenuOpen((v) => !v)} />

      <div className={"layout" + (wide ? " layout--wide" : "")}>
        {!wide && <Sidebar open={menuOpen} onNavigate={closeMenu} />}
        <Routes>
          <Route path="*" element={<Page onLayout={setWide} />} />
        </Routes>
      </div>

      <Footer />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
