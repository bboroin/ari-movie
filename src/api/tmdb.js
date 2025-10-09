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

// Upcoming Movies
export async function fetchUpcomingMovies() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=ko-KR&region=KR&sort_by=primary_release_date.asc&primary_release_date.gte=${today}&with_original_language=ko&page=1`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.log("Failed to fetch Upcoming Movies", err);
    throw err;
  }
}

// NowPlaying Movies
export async function fetchNowPlayingMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&region=KR&page=1`,
      options
    );
    const data = await response.json();
    return data.results;
  } catch (err) {
    console.log("Failed to fetch NowPlaying Movies", err);
    throw err;
  }
}
