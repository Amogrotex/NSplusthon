import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { primaryNav, REPO_URL } from "../lib/nav";
import { useTheme } from "../lib/useTheme";
import { SearchIcon, SunIcon, MoonIcon, GithubIcon, MenuIcon, LangIcon } from "./icons";

interface Props {
  onOpenSearch: () => void;
  onToggleMenu: () => void;
}

/** Floating glass capsule: brand, search, controls; nav pill underneath. */
export function TopBar({ onOpenSearch, onToggleMenu }: Props) {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isEnglish = pathname.startsWith("/en");

  return (
    <header className={"topbar" + (scrolled ? " topbar--scrolled" : "")}>
      <div className="topbar__capsule">
        <button className="chip chip--menu" onClick={onToggleMenu} aria-label="فهرست">
          <MenuIcon />
        </button>

        <Link to="/" className="brand" aria-label="NSplusthon">
          <img className="brand__mark" src={`${import.meta.env.BASE_URL}logo.png`} alt="" width={34} height={34} />
          <span className="brand__name">NSplusthon</span>
        </Link>

        <span className="topbar__spacer" />

        <button className="searchbtn" onClick={onOpenSearch} aria-label="جستجو">
          <SearchIcon />
          <span className="searchbtn__label">جستجو…</span>
          <span className="kbd">Ctrl K</span>
        </button>

        <Link to={isEnglish ? "/" : "/en"} className="chip" aria-label={isEnglish ? "فارسی" : "English"} title={isEnglish ? "فارسی" : "English"}>
          <LangIcon />
        </Link>

        <button
          className="chip"
          onClick={toggle}
          aria-label={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
          title={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>

        <a className="chip" href={REPO_URL} target="_blank" rel="noreferrer noopener" aria-label="GitHub">
          <GithubIcon />
        </a>
      </div>

      <nav className="navpill" aria-label="ناوبری اصلی">
        <ul className="navpill__list">
          {primaryNav.map((item) => (
            <li key={item.slug}>
              <NavLink
                to={"/" + item.slug}
                end={item.slug === ""}
                className={({ isActive }) =>
                  "navpill__link" + (isActive ? " navpill__link--active" : "")
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
