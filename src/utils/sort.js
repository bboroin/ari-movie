export function sortCrew(crew = []) {
  const priority = ["Director", "Screenplay", "Writer", "Producer"];
  return [...crew].sort((a, b) => {
    const ai = priority.indexOf(a.job);
    const bi = priority.indexOf(b.job);
    if (ai !== -1 || bi !== -1)
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    return (a.department || "").localeCompare(b.department || "");
  });
}

export const SERVER_SORT_OPTIONS = [
  { value: "popularity.desc", label: "인기순" },
  { value: "release_date.desc", label: "개봉일 최신순" },
  { value: "release_date.asc", label: "개봉일 오래된순" },
  { value: "vote_average.desc", label: "평점 높은순" },
  { value: "vote_average.asc", label: "평점 낮은순" },
];

export const DEFAULT_SERVER_SORT = "popularity.desc";
