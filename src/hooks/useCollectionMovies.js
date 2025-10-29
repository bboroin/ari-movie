import { useEffect, useState } from "react";
import { fetchMovieDetailFull, fetchCollection } from "@api/movies";

export function useCollectionMovies(id) {
  const [collection, setCollection] = useState(null); // 컬렉션 메타 (name, id 등)
  const [parts, setParts] = useState([]); // 컬렉션에 포함된 영화들
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    let ignore = false;

    (async () => {
      try {
        const detail = await fetchMovieDetailFull(id);
        if (ignore) return;

        const col = detail?.belongs_to_collection;
        if (!col?.id) {
          if (!ignore) {
            setCollection(null);
            setParts([]);
          }
          return;
        }

        // parts 정렬/필터
        const full = await fetchCollection(col.id);
        if (ignore) return;

        const sorted = (full?.parts ?? [])
          .filter((m) => m && m.id && m.poster_path)
          .filter((m) => !m.adult)
          .filter((m) => String(m.id) !== String(id))
          .sort((a, b) => {
            const da = a.release_date || "9999-12-31";
            const db = b.release_date || "9999-12-31";
            return da.localeCompare(db); // 오름차순
          });

        setCollection({
          id: full?.id ?? col.id,
          name: full?.name ?? col.name,
          poster_path: full?.poster_path ?? col.poster_path,
          backdrop_path: full?.backdrop_path ?? col.backdrop_path,
          partsCount: sorted.length,
        });
        setParts(sorted);
      } catch (err) {
        console.error("fetchCollectionMovies failed:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [id]);

  return { collection, parts, loading };
}
