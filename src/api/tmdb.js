import { getToday, getMonthsAgo } from "../utils/date";

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
    const fromDate = getMonthsAgo(6);
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?language=ko-KR&region=KR&sort_by=vote_average.desc&primary_release_date.gte=${fromDate}&vote_count.gte=100&page=1`,
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
    const today = getToday();
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
export async function fetchNowPlayingMovies(page = 1) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&region=KR&page=${page}`,
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

    // YouTube 영상 중 첫 번째 사용
    const trailer = data.results.find((v) => v.site === "YouTube");
    return trailer
      ? `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`
      : null;
  } catch (err) {
    console.log("Failed to fetch Trailers", err);
    throw err;
  }
}

// Now Playing With Trailer
export async function fetchNowPlayingWithTrailers(page = 1) {
  const movies = await fetchNowPlayingMovies(page);

  // 병렬로 트레일러 조회
  const settled = await Promise.allSettled(
    movies.map(async (m) => {
      const url = await fetchTrailers(m.id);
      return { ...m, trailerUrl: url };
    })
  );

  // 트레일러 URL이 있는 항목만
  return settled
    .filter((r) => r.status === "fulfilled" && r.value.trailerUrl)
    .map((r) => r.value);
}

export async function fetchNowPlayingPagesWithTrailers() {
  const [p1, p2] = await Promise.all([
    fetchNowPlayingWithTrailers(1),
    fetchNowPlayingWithTrailers(2),
  ]);
  return { page1: p1, page2: p2 };
}
