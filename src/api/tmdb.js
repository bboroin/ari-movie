const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// Hero Movies
export async function fetchHeroMovies() {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/discover/movie?language=ko-KR&region=KR&sort_by=vote_average.desc&primary_release_date.gte=2025-04-01&vote_count.gte=100&page=1",
      options
    );
    const data = await res.json();
    return data.results.slice(0, 5);
  } catch (err) {
    console.log("Failed to fetch Hero Movies", err);
    throw err;
  }
}

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

// Trailers
export async function fetchTrailers(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`,
      options
    );
    const data = await response.json();

    // YouTube + Trailer 타입만 남김
    const trailers = data.results.filter(
      (v) => v.site === "YouTube" && v.type === "Trailer"
    );
    return trailers.length > 0 ? trailers[0] : null;
  } catch (err) {
    console.log("Failed to fetch Trailers", err);
    throw err;
  }
}

// Trailer Movies
export async function fetchTrailerMovies() {
  try {
    const nowPlaying = await fetchNowPlayingMovies();

    // 각 영화의 트레일러 요청
    const trailers = await Promise.all(
      nowPlaying.map(async (movie) => {
        const trailer = await fetchTrailers(movie.id);
        if (!trailer) return null; // 트레일러 없는 건 제외
        return { movie, trailer };
      })
    );
    return trailers.filter(Boolean);
  } catch (err) {
    console.log("Failed to fetch Trailer Movies", err);
    throw err;
  }
}
