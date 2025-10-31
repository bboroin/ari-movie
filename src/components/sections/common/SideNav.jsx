import { useState } from "react";
import "./SideNav.css";
import arrowNext from "@assets/icons/arrow-icon-next.svg";
import arrowPrev from "@assets/icons/arrow-icon-prev.svg";

export default function SideNav({ items = [], offsetTop = 80 }) {
  const [collapsed, setCollapsed] = useState(false);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - offsetTop;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      <button
        type="button"
        className="sidenav-toggle"
        onClick={() => setCollapsed((v) => !v)}
      >
        {collapsed ? (
          <img src={arrowPrev} alt="펼치기 버튼" title="펼치기" />
        ) : (
          <img src={arrowNext} alt="접기 버튼" title="접기" />
        )}
      </button>
      <aside className={`sidenav ${collapsed ? "sidenav-collapsed" : ""}`}>
        <ul className="sidenav-list">
          <li key="top" className="sidenav-item">
            <button
              type="button"
              className="sidenav-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Top
            </button>
          </li>
          {items.map((it) => {
            return (
              <li key={it.selector} className="sidenav-item">
                <button
                  type="button"
                  className="sidenav-btn"
                  onClick={() => scrollToId(it.selector)}
                >
                  <span className="sidenav-label">{it.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </>
  );
}
