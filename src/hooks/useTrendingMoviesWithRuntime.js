import { useEffect, useState } from "react";
import { fetchTrendingMoviesWithRuntime } from "../api/tmdb";

export function useTrendingMoviesWithRuntime(period = "day") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    (async () => {
      setLoading(true);
      try {
        const res = await fetchTrendingMoviesWithRuntime(period);
        if (!ignore) setData(res);
      } catch (err) {
        console.error("fetchTrendingMoviesWithRuntime failed:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [period]);

  return { data, loading };
}
