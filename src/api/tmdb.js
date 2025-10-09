const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Trending Movies
export async function fetchTrendingMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/trending/movie/week?language=ko-KR",
      options
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.log("Failed to fetch Trending Movies", err);
    throw err;
  }
}
