import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useSearchMovie } from "../hooks/useSearchMovie";
import SectionHeader from "../components/sections/common/SectionHeader";
import SectionCard from "../components/sections/common/SectionCard";
import Pagination from "../components/sections/common/Pagination";
import "./Search.css";
import { getDDay } from "../utils/format";
import SearchSkeleton from "../components/sections/skeleton/SearchSkeleton";

const Search = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const page = Math.max(1, Number(params.get("page") || 1));

  const { data, loading, error } = useSearchMovie(query, page);
  const results = useMemo(() => data.results ?? [], [data.results]);

  const handlePageChange = (nextPage) => {
    const next = new URLSearchParams(params);
    next.set("q", query);
    next.set("page", String(nextPage));
    setParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [sortOption, setSortOption] = useState("date-desc");

  const sortedResults = useMemo(() => {
    const sorted = [...results];
    switch (sortOption) {
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

  const handleSortChange = (e) => setSortOption(e.target.value);

  const hasResults = !loading && !error && results.length > 0;

  if (loading) {
    const skeletonCount = Math.min(data?.results?.length, 20);
    return <SearchSkeleton count={skeletonCount} />;
  }

  return (
    <section className="section">
      <SectionHeader
        title={`"${query}" 관련 영화`}
        desc={
          <>
            총 <span className="highlight">{data.total_results}</span>개의
            영화가 검색되었습니다.
          </>
        }
        pageInfo={`${page} / ${data.total_pages} 페이지`}
        hasNav={false}
      />

      {hasResults && (
        <div className="sort-controls">
          <select value={sortOption} onChange={handleSortChange}>
            <option value="date-desc">개봉일 최신순</option>
            <option value="date-asc">개봉일 오래된순</option>
            <option value="vote-desc">평점 높은순</option>
            <option value="vote-asc">평점 낮은순</option>
          </select>
        </div>
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
            totalPages={data.total_pages}
            onChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};

export default Search;
