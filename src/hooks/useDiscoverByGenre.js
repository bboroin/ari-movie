import { useEffect, useState } from "react";
import { discoverByGenre } from "@api/movies";

export function useDiscoverByGenre(genreId, page = 1) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!genreId) return;

    let ignore = false;

    (async () => {
      try {
        const res = await discoverByGenre(genreId, page);
        if (!ignore) setData(res);
      } catch (err) {
        console.error("discoverByGenre failed:", err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [genreId, page]);

  return { data, loading };
}
