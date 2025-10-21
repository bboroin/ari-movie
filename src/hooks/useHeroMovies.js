import { useEffect, useState } from "react";
import { fetchHeroMovies } from "../api/tmdb";

export function useHeroMovies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await fetchHeroMovies();
        if (!ignore) setData(res);
      } catch (err) {
        console.error("fetchHeroMovies failed:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return { data, loading };
}
