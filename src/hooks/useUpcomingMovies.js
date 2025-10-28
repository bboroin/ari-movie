import { useEffect, useState } from "react";
import { fetchUpcomingMovies } from "@api/movies";

export function useUpcomingMovies() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await fetchUpcomingMovies();
        if (!ignore) setData(res);
      } catch (err) {
        console.error("fetchUpcomingMovies failed:", err);
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
