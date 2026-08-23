import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/prose.css";

/**
 * GitHub Pages serves this project from /NSplusthon/, and 404.html mirrors
 * index.html so deep links reach the router. BASE_URL carries the prefix in
 * production and is "/" during `vite dev`.
 */
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

/**
 * Pages redirects /foo to /foo/, so the app almost always boots on a path
 * with a trailing slash. React Router's exact (`end`) matching treats
 * "/concepts/events/" and "/concepts/events" as different, which left every
 * sidebar row inactive on the live site. Normalise once, before rendering.
 */
{
  const { pathname, search, hash } = window.location;
  if (pathname.length > basename.length + 1 && pathname.endsWith("/")) {
    window.history.replaceState(null, "", pathname.slice(0, -1) + search + hash);
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
