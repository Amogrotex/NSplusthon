import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { search } from "../lib/content";
import { SearchIcon, CloseIcon } from "./icons";

interface Props {
  open: boolean;
  onClose: () => void;
}

/** Client-side search over the compiled markdown. Keyboard driven. */
export function SearchDialog({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const hits = useMemo(() => search(query), [query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setCursor(0);
      // wait for the dialog to paint before stealing focus
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  // lock background scroll while the dialog owns the screen
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const go = (slug: string) => {
    navigate("/" + slug);
    onClose();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, hits.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    }
    if (e.key === "Enter" && hits[cursor]) {
      e.preventDefault();
      go(hits[cursor].doc.slug);
    }
  };

  return (
    <div className="dialog" role="dialog" aria-modal="true" aria-label="جستجو" onKeyDown={onKeyDown}>
      <button className="dialog__scrim" onClick={onClose} aria-label="بستن" tabIndex={-1} />
      <div className="dialog__panel glass">
        <div className="dialog__field">
          <SearchIcon />
          <input
            ref={inputRef}
            className="dialog__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در مستندات…"
            aria-label="عبارت جستجو"
            autoComplete="off"
            spellCheck={false}
          />
          <button className="chip" onClick={onClose} aria-label="بستن">
            <CloseIcon />
          </button>
        </div>

        <div className="dialog__results">
          {query.trim().length < 2 && (
            <p className="dialog__hint">حداقل دو حرف بنویسید. با کلیدهای بالا و پایین حرکت کنید.</p>
          )}
          {query.trim().length >= 2 && hits.length === 0 && (
            <p className="dialog__hint">چیزی پیدا نشد.</p>
          )}
          {hits.map((h, i) => (
            <button
              key={h.doc.slug}
              className={"dialog__hit" + (i === cursor ? " dialog__hit--active" : "")}
              onClick={() => go(h.doc.slug)}
              onMouseEnter={() => setCursor(i)}
            >
              <span className="dialog__hitTitle">{h.doc.title}</span>
              <span className="dialog__hitExcerpt">{h.excerpt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
