const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Movie Genres
export async function fetchGenreMap({ signal } = {}) {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=ko",
      { ...options, signal }
    );
    const data = await res.json();
    const genreMap = Object.fromEntries(data.genres.map((g) => [g.id, g.name]));
    return genreMap;
  } catch (err) {
    if (err.name === "AbortError") return null;
    throw err;
  }
}
