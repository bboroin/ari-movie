import { useGenres } from "@hooks/useGenres";

export default function GenreFilterBar({
  selectedIds = [],
  onToggle,
  onClear,
}) {
  const genreMap = useGenres() ?? {};

  if (!genreMap) return null;

  const all = Object.entries(genreMap).map(([id, name]) => ({ id, name }));

  return (
    <div className="genre-filter">
      <div className="genre-filter__tags">
        {all.map((g) => {
          const active = selectedIds.includes(String(g.id));
          return (
            <button
              key={g.id}
              type="button"
              className={`tag ${active ? "tag--active" : ""}`}
              onClick={() => onToggle(String(g.id))}
              aria-pressed={active}
            >
              {g.name}
            </button>
          );
        })}
      </div>

      <div className="genre-filter__controls">
        <button type="button" className="clear-btn" onClick={onClear}>
          필터 초기화
        </button>
      </div>
    </div>
  );
}
