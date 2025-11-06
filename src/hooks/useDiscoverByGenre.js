import { useEffect, useState } from "react";
import { discoverByGenre } from "@api/movies";
import { DEFAULT_SERVER_SORT } from "@utils/sort";

export function useDiscoverByGenre(
  genreId,
  page = 1,
  sortBy = DEFAULT_SERVER_SORT
) {
  const [data, setData] = useState({
    results: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!genreId) return;

    let ignore = false;

    async function fetchGenreMovies() {
      setLoading(true);
      setError("");

      try {
        const res = await discoverByGenre(genreId, page, sortBy);
        if (!ignore) setData(res);
      } catch (err) {
        console.error("discoverByGenre failed:", err);
        if (!ignore) {
          setError(err.message || "장르별 영화 조회 중 오류 발생");
          setData({
            results: [],
            page: 1,
            total_pages: 0,
            total_results: 0,
          });
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchGenreMovies();

    return () => {
      ignore = true;
    };
  }, [genreId, page, sortBy]);

  return { data, loading, error };
}
