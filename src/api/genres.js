import { get } from "./client";
import { getToday } from "@utils/format";
import { DEFAULT_SERVER_SORT } from "@utils/sort";

// Genres
export async function fetchGenreMap() {
  const data = await get("/genre/movie/list", { language: "ko" });
  return Object.fromEntries((data.genres || []).map((g) => [g.id, g.name]));
}

// Discover By Genre
export async function discoverByGenres(
  genres,
  page = 1,
  sortBy = DEFAULT_SERVER_SORT,
  mode = "and"
) {
  const today = getToday();

  let with_genres;
  if (Array.isArray(genres)) {
    with_genres = genres.join(mode === "or" ? "|" : ",");
  } else {
    with_genres = genres; // 단일 값
  }

  const params = {
    with_genres,
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
