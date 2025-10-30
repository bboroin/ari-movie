import "./SideNav.css";

export default function SideNav({ items = [], offsetTop = 80 }) {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - offsetTop;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <aside className="sidenav">
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
  );
}
