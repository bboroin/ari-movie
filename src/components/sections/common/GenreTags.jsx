import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useGenres } from "@hooks/useGenres";

export default function GenreTags({ ids, genres }) {
  const genreMap = useGenres();

  const items = useMemo(() => {
    // DetailHero 섹션의 {id, name}
    if (Array.isArray(genres) && genres.length) {
      return genres
        .map(({ id, name }) => ({ id, name }))
        .filter((g) => g.id && g.name);
    }

    // Hero 섹션의 ids
    if (Array.isArray(ids) && ids.length && genreMap) {
      return ids
        .map((id) => ({ id, name: genreMap[id] }))
        .filter((g) => g.name);
    }

    return [];
  }, [genres, ids, genreMap]);

  if (!items.length) return null;

  return (
    <div className="hero-tags">
      {items.map(({ id, name }) => (
        <span key={id} className="hero-tag">
          <Link to={`/genre/${id}?name=${encodeURIComponent(name)}`}>
            {name}
          </Link>
        </span>
      ))}
    </div>
  );
}
