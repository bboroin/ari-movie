import { useEffect, useState } from "react";
import { fetchNowPlayingPagesWithTrailers } from "../api/movies";

export function useNowPlayingPagesWithTrailers() {
  const [data, setData] = useState({ page1: [], page2: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await fetchNowPlayingPagesWithTrailers();
        if (!ignore) setData(res); // { page1, page2 }
      } catch (err) {
        console.error("fetchNowPlayingPagesWithTrailers failed:", err);
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
