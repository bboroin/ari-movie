import { useState, useMemo } from "react";

export const useSortedMovies = (results) => {
  const [sortOption, setSortOption] = useState("date-desc");

  const sortedResults = useMemo(() => {
    const sorted = [...results];

    switch (sortOption) {
      case "popularity-desc":
        return sorted.sort((a, b) => b.popularity - a.popularity);
      case "date-desc":
        return sorted.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date)
        );
      case "date-asc":
        return sorted.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date)
        );
      case "vote-desc":
        return sorted.sort((a, b) => b.vote_average - a.vote_average);
      case "vote-asc":
        return sorted.sort((a, b) => a.vote_average - b.vote_average);
      default:
        return sorted;
    }
  }, [results, sortOption]);

  return { sortedResults, sortOption, setSortOption };
};
