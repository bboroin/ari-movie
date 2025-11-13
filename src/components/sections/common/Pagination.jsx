import "./Pagination.css";

function getPageWindow(cur, total, delta = 2) {
  // cur=현재 페이지, total=전체 페이지, delta=현재 기준 좌우 몇 개 보여줄지
  const pages = [];
  const start = Math.max(1, cur - delta);
  const end = Math.min(total, cur + delta);

  if (start > 1) pages.push(1);
  if (start > 2) pages.push("...");

  for (let p = start; p <= end; p++) pages.push(p);

  if (end < total - 1) pages.push("...");
  if (end < total) pages.push(total);

  return pages;
}

const Pagination = ({ page, totalPages, onChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const windowPages = getPageWindow(page, totalPages);

  const go = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onChange(p);
  };

  return (
    <nav className="pagination" aria-label="결과 페이지네이션">
      <button
        className="pagination-btn"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="이전 페이지"
      >
        ‹
      </button>

      <ul className="pagination-pages">
        {windowPages.map((p, i) =>
          p === "..." ? (
            <li key={`ellipsis-${i}`} className="pagination-ellipsis">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                className={`pagination-page ${p === page ? "is-active" : ""}`}
                onClick={() => go(p)}
                aria-current={p === page ? "page" : undefined}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        className="pagination-btn"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="다음 페이지"
      >
        ›
      </button>
    </nav>
  );
};

export default Pagination;
