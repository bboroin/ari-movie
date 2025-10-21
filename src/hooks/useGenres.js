import { useEffect, useState } from "react";
import { fetchGenreMap } from "../api/genres";

export function useGenres() {
  const [genreMap, setGenreMap] = useState(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const data = await fetchGenreMap();
        if (!ignore) setGenreMap(data);
      } catch (err) {
        console.error("Failed to fetch Movie Genres", err);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return genreMap;
}
