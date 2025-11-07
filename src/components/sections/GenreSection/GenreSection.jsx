import { useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDiscoverByGenre } from "@hooks/useDiscoverByGenre";
import SectionCard from "@components/sections/common/SectionCard";
import SectionHeader from "@components/sections/common/SectionHeader";
import Pagination from "@components/sections/common/Pagination";
import SortControls from "@components/sections/common/SortControls";
import { SERVER_SORT_OPTIONS, DEFAULT_SERVER_SORT } from "@utils/sort";
import "./GenreSection.css";
import { getDDay } from "@utils/format";

export default function GenreSection() {
  const { genreId } = useParams();
  const [params, setParams] = useSearchParams();

  const name = params.get("name") || "";
  const page = Math.max(1, Number(params.get("page") || 1));
  const sort = params.get("sort") || DEFAULT_SERVER_SORT;

  // 장르가 바뀌면 page=1, sort 기본값 보장
  useEffect(() => {
    setParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("name", name);
      next.set("page", "1");
      if (!next.get("sort")) next.set("sort", DEFAULT_SERVER_SORT);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreId]);

  const { data, loading, error } = useDiscoverByGenre(genreId, page, sort);
  const results = useMemo(() => data?.results ?? [], [data?.results]);
  const hasResults = !loading && !error && results.length > 0;

  const handlePageChange = (nextPage) => {
    const next = new URLSearchParams(params);
    next.set("name", name);
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

  if (loading) return <p>불러오는 중...</p>;

  return (
    <section className="genre section">
      <SectionHeader
        title={`"${name}" 장르 영화`}
        desc={
          <>
            총{" "}
            <span className="highlight">
              {data.total_results > 10000
                ? "10,000+"
                : data.total_results?.toLocaleString?.() ?? 0}
            </span>
            개의 영화가 존재합니다.
          </>
        }
        pageInfo={`${data.page} / ${Math.min(
          data.total_pages ?? 1,
          500
        )} 페이지`}
        hasNav={false}
      />

      {hasResults && (
        <SortControls
          value={sort}
          onChange={handleSortChange}
          options={SERVER_SORT_OPTIONS}
          defaultValue={DEFAULT_SERVER_SORT}
        />
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
            {results.map((movie) => (
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
