const STORAGE_KEY = "favorite-movies";

export function getFavoriteMovies() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveFavoriteMovies(movies) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
}

// 영화 토글 (추가/삭제)
export function toggleFavoriteMovie(movie) {
  const current = getFavoriteMovies();
  const exists = current.some((item) => item.id === movie.id);

  const next = exists
    ? current.filter((item) => item.id !== movie.id)
    : [...current, movie];

  saveFavoriteMovies(next);
  return next;
}

// 해당 영화가 즐겨찾기인지 체크
export function isFavoriteMovie(id) {
  const current = getFavoriteMovies();
  return current.some((item) => item.id === id);
}
