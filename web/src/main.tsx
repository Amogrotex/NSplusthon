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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
