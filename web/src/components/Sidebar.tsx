import { NavLink } from "react-router-dom";
import { sidebar } from "../lib/nav";

/** Full documentation tree. Becomes a full-screen drawer on small screens. */
export function Sidebar({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  return (
    <aside
      className={"sidebar rail glass" + (open ? " sidebar--open" : "")}
      aria-label="فهرست مستندات"
    >
      {sidebar.map((section) => (
        <div className="rail__section" key={section.title}>
          <p className="rail__title">{section.title}</p>
          <ul className="rail__list">
            {section.items.map((item) => (
              <li key={item.slug}>
                <NavLink
                  to={"/" + item.slug}
                  // exact match only: without this "/concepts" also lights up
                  // on /concepts/events, marking two rows active at once
                  end
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    "rail__link" + (isActive ? " rail__link--active" : "")
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
