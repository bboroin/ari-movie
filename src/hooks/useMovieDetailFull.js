import { useEffect, useState } from "react";
import { fetchMovieDetailFull } from "@api/movies";

export function useMovieDetailFull(id) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let ignore = false;

    (async () => {
      try {
        const data = await fetchMovieDetailFull(id);
        if (!ignore) setDetail(data);
      } catch (err) {
        console.error("fetchMovieDetailFull failed:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [id]);

  return { detail, loading };
}
