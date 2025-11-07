import { get, REGION } from "./client";
import { getBestTrailerUrl } from "./videos";
import { getToday, getMonthsAgo } from "@utils/format";
import { DEFAULT_SERVER_SORT } from "@utils/sort";

// Hero Movies
export async function fetchHeroMovies() {
  const fromDate = getMonthsAgo(6);
  const data = await get("/discover/movie", {
    region: REGION,
    sort_by: "vote_average.desc",
    "primary_release_date.gte": fromDate,
    "vote_count.gte": 100,
    page: 1,
  });
  return (data.results || []).slice(0, 5);
}

// Trending Movies
export async function fetchTrendingMovies(period = "day") {
  const data = await get(`/trending/movie/${period}`);
  return data.results || [];
}

// Movie Details(단일)
export async function fetchMovieDetails(id) {
  return get(`/movie/${id}`);
}

// Movie Detail(append: 디테일 전용)
export async function fetchMovieDetailFull(id) {
  return get(`/movie/${id}`, {
    append_to_response:
      "videos,images,credits,keywords,external_ids,release_dates,recommendations",
    include_image_language: "ko,en,null",
  });
}

// Movie Collection
export async function fetchCollection(collectionId) {
  return get(`/collection/${collectionId}`);
}

// Trending with runtime
export async function fetchTrendingMoviesWithRuntime(period = "day") {
  const list = await fetchTrendingMovies(period);
  const settled = await Promise.allSettled(
    list.map((m) => fetchMovieDetails(m.id))
  );
  return list.map((m, i) => ({
    ...m,
    runtime:
      settled[i].status === "fulfilled" ? settled[i].value.runtime : null,
  }));
}

// Upcoming
export async function fetchUpcomingMovies() {
  const today = getToday();
  const data = await get("/discover/movie", {
    region: REGION,
    sort_by: "popularity.desc",
    "primary_release_date.gte": today,
    with_original_language: "ko",
    page: 1,
  });
  return data.results || [];
}

// Now Playing
export async function fetchNowPlayingMovies(page = 1) {
  const data = await get("/movie/now_playing", { region: REGION, page });
  return data.results || [];
}

// Now Playing + Trailers
export async function fetchNowPlayingWithTrailers(page = 1) {
  const movies = await fetchNowPlayingMovies(page);
  const settled = await Promise.allSettled(
    movies.map(async (m) => {
      const url = await getBestTrailerUrl(m.id);
      return { ...m, trailerUrl: url };
    })
  );
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

// Search
export async function searchMovies(query, page = 1) {
  if (!query?.trim()) {
    return { results: [], page: 1, total_pages: 0, total_results: 0 };
  }
  return get("/search/movie", {
    region: REGION,
    include_adult: false,
    query,
    page,
  });
}

// Genres
export async function fetchGenreMap() {
  const data = await get("/genre/movie/list", { language: "ko" });
  return Object.fromEntries((data.genres || []).map((g) => [g.id, g.name]));
}

// Discover By Genre
export async function discoverByGenre(
  genreId,
  page = 1,
  sortBy = DEFAULT_SERVER_SORT
) {
  const today = getToday();

  const params = {
    with_genres: genreId,
    include_adult: false,
    page,
    sort_by: sortBy,
    "release_date.lte": today, // 개봉된 영화만
  };

  // 평점순 정렬일 때는 최소 투표 수 제한
  if (sortBy.startsWith("vote_average.")) {
    params["vote_count.gte"] = 100;
  }

  return get("/discover/movie", params);
}
