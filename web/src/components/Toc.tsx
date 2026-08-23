import { useEffect, useState } from "react";
import type { Heading } from "../lib/content";

/** Right-hand table of contents with scroll spy. */
export function Toc({ headings }: { headings: Heading[] }) {
  const items = headings.filter((h) => h.depth === 2 || h.depth === 3);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (!items.length) return;
    const nodes = items
      .map((h) => document.getElementById(h.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // bias the band towards the top so the heading you just scrolled to wins
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [items.map((i) => i.id).join("|")]);

  if (items.length < 2) return <aside className="toc rail" aria-hidden="true" />;

  return (
    <aside className="toc rail glass" aria-label="فهرست موضوعات">
      <p className="rail__title">در این صفحه</p>
      <nav>
        {items.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={
              "toc__link" +
              (h.depth === 3 ? " toc__link--d3" : "") +
              (active === h.id ? " toc__link--active" : "")
            }
          >
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
