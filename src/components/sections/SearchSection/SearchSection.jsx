import { useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovie } from "@hooks/useSearchMovie";
import { useSortedMovies } from "@hooks/useSortedMovies";
import SectionHeader from "@components/sections/common/SectionHeader";
import SectionCard from "@components/sections/common/SectionCard";
import Pagination from "@components/sections/common/Pagination";
import SortControls from "@components/sections/common/SortControls";
import { CLIENT_SORT_OPTIONS, DEFAULT_CLIENT_SORT } from "@utils/sort";
import "./SearchSection.css";
import SearchSkeleton from "@components/sections/skeleton/SearchSkeleton";
import { getDDay } from "@utils/format";

const SearchSection = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const page = Math.max(1, Number(params.get("page") || 1));
  const sort = params.get("sort") || DEFAULT_CLIENT_SORT;

  const { data, loading, error } = useSearchMovie(query, page);
  const results = useMemo(() => data.results ?? [], [data.results]);
  const { sortedResults, sortOption, setSortOption } = useSortedMovies(results);

  useEffect(() => {
    if (!sort) {
      const next = new URLSearchParams(params);
      next.set("sort", DEFAULT_CLIENT_SORT);
      setParams(next, { replace: true });
    } else {
      setSortOption(sort);
    }
  }, [sort, params, setParams, setSortOption]);

  const handlePageChange = (nextPage) => {
    const next = new URLSearchParams(params);
    next.set("q", query);
    next.set("sort", sort);
    next.set("page", String(nextPage));
    setParams(next);
  };

  const handleSortChange = (nextSort) => {
    const next = new URLSearchParams(params);
    next.set("sort", nextSort);
    next.set("page", "1");
    setParams(next);
  };

  const hasResults = !loading && !error && results.length > 0;

  if (loading) {
    const skeletonCount = Math.min(data?.results?.length, 20);
    return <SearchSkeleton count={skeletonCount} />;
  }

  return (
    <section className="section list">
      <SectionHeader
        title={`"${query}" 관련 영화`}
        desc={
          <>
            총{" "}
            <span className="highlight">
              {data.total_results > 10000
                ? "10,000+"
                : data.total_results?.toLocaleString?.() ?? 0}
            </span>
            개의 영화가 검색되었습니다.
          </>
        }
        pageInfo={`${page} / ${data.total_pages} 페이지`}
        hasNav={false}
      />

      {hasResults && (
        <SortControls
          value={sortOption}
          onChange={handleSortChange}
          options={CLIENT_SORT_OPTIONS}
          defaultValue={DEFAULT_CLIENT_SORT}
        />
      )}

      {/* 상태별 UI */}
      {error && (
        <p className="section-desc" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {!error && results.length === 0 && (
        <p className="section-desc">검색 결과가 없습니다.</p>
      )}

      {/* 검색 결과 */}
      {hasResults && (
        <>
          <div className="poster-list--grid">
            {sortedResults.map((movie) => (
              <SectionCard
                key={movie.id}
                id={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
                badge={movie.release_date ? getDDay(movie.release_date) : null}
                meta={[
                  {
                    icon: "/src/assets/icons/release.svg",
                    text: movie.release_date || "-",
                    alt: "개봉일",
                  },
                  {
                    icon: "/src/assets/icons/vote.svg",
                    text: (movie.vote_average ?? 0).toFixed(1),
                    alt: "평점",
                  },
                ]}
              />
            ))}
          </div>

          <Pagination
            page={data.page}
            totalPages={Math.min(data.total_pages ?? 1, 500)}
            onChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};

export default SearchSection;
