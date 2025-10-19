import { useEffect, useState } from "react";

export function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);

    // 다음 입력이 오면 이전 타이머 취소
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
