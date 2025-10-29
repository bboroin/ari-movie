import { useEffect, useState } from "react";
import { fetchMovieDetailFull } from "@api/movies";

export function useRecommendationMovies(id) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    let ignore = false;

    (async () => {
      try {
        const detail = await fetchMovieDetailFull(id);
        if (ignore) return;

        const results = (detail?.recommendations?.results ?? [])
          .filter((m) => m && m.id && m.poster_path)
          .filter((m) => !m.adult)
          .filter((m) => String(m.id) !== String(id));

        setData(results);
      } catch (err) {
        console.error("fetchRecommendationMovies failed:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [id]);

  return { data, loading };
}
