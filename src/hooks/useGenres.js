import { useEffect, useState } from "react";
import { fetchGenreMap } from "../api/genres";

export function useGenres() {
  const [genreMap, setGenreMap] = useState(null);

  useEffect(() => {
    const controller = new AbortController(); // fetch를 제어할 컨트롤러 생성
    const signal = controller.signal; // signal을 fetch에 전달할 준비

    (async () => {
      try {
        const data = await fetchGenreMap({ signal });
        setGenreMap(data);
      } catch (err) {
        // AbortError인 경우는 무시
        if (err.name === "AbortError") return;
        else {
          console.error("Failed to fetch Movie Genres", err);
        }
      }
    })();

    // 컴포넌트가 사라질 때 (fetch 취소)
    return () => {
      controller.abort();
    };
  }, []);

  return genreMap;
}
