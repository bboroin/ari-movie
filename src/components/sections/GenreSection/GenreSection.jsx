import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDiscoverByGenre } from "@hooks/useDiscoverByGenre";
import { useSortedMovies } from "@hooks/useSortedMovies";
import SectionCard from "@components/sections/common/SectionCard";
import SectionHeader from "@components/sections/common/SectionHeader";
import Pagination from "@components/sections/common/Pagination";
import "./GenreSection.css";
import { getDDay } from "@utils/format";
import SortControls from "../SearchSection/SortControls";

export default function GenreSection() {
  const { genreId } = useParams();
  const [params, setParams] = useSearchParams();
  const name = params.get("name") || "";
  const page = Math.max(1, Number(params.get("page") || 1));

  const { data, loading, error } = useDiscoverByGenre(genreId, page);
  const results = useMemo(() => data?.results ?? [], [data?.results]);
  const { sortedResults, sortOption, setSortOption } = useSortedMovies(results);

  const hasResults = !loading && !error && results.length > 0;

  const handlePageChange = (nextPage) => {
    const next = new URLSearchParams(params);
    next.set("name", name);
    next.set("page", String(nextPage));
    setParams(next);
  };

  if (loading) return <p>불러오는 중...</p>;

  return (
    <section className="genre section">
      <SectionHeader
        title={`"${name}" 장르 영화`}
        desc={
          <>
            총{" "}
            <span className="highlight">
              {data.total_results?.toLocaleString?.() ?? 0}
            </span>
            개의 영화가 존재합니다.
          </>
        }
        pageInfo={`${data.page} / ${data.total_pages} 페이지`}
        hasNav={false}
      />

      {hasResults && (
        <SortControls value={sortOption} onChange={setSortOption} />
      )}

      {/* 상태별 UI */}
      {error && (
        <p className="section-desc" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {!error && results.length === 0 && (
        <p className="section-desc">해당 장르의 영화가 존재하지 않습니다.</p>
      )}

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
}
