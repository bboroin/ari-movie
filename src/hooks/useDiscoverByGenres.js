import { useEffect, useState } from "react";
import { discoverByGenres } from "@api/genres";
import { DEFAULT_SERVER_SORT } from "@utils/sort";

export function useDiscoverByGenres(
  genres, // 단일 id 또는 배열
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
    if (!genres || (Array.isArray(genres) && genres.length === 0)) return;

    let ignore = false;

    async function fetchGenreMovies() {
      setLoading(true);
      setError("");

      try {
        const res = await discoverByGenres(genres, page, sortBy);
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
  }, [
    Array.isArray(genres) ? genres.join(",") : genres, // 배열이면 문자열로 변환해 의존성 추적
    page,
    sortBy,
  ]);

  return { data, loading, error };
}
