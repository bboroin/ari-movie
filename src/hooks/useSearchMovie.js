import { useState, useEffect } from "react";
import { searchMovies } from "../api/movies";
import { useDebounce } from "./useDebounce";

export function useSearchMovie(query, page = 1) {
  const [data, setData] = useState({
    results: [],
    page: 1,
    total_pages: 0,
    total_results: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 입력값을 디바운스로 제어
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    let ignore = false; // 컴포넌트 언마운트 시 응답 무시용

    async function fetchMovies() {
      // 검색어가 비어 있으면 초기화만
      if (!debouncedQuery.trim()) {
        setData({ results: [], page: 1, total_pages: 0, total_results: 0 });
        return;
      }

      setLoading(true);
      setError("");

      try {
        const res = await searchMovies(debouncedQuery, page);
        if (!ignore) setData(res);
      } catch (err) {
        if (!ignore) setError(err.message || "검색 중 오류 발생");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchMovies();

    return () => {
      ignore = true; // cleanup
    };
  }, [debouncedQuery, page]);

  return { data, loading, error };
}
