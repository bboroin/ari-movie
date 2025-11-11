import { useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDiscoverByGenres } from "@hooks/useDiscoverByGenres";
import SectionCard from "@components/sections/common/SectionCard";
import SectionHeader from "@components/sections/common/SectionHeader";
import Pagination from "@components/sections/common/Pagination";
import SortControls from "@components/sections/common/SortControls";
import GenreFilterBar from "./GenreFilterBar";
import { SERVER_SORT_OPTIONS, DEFAULT_SERVER_SORT } from "@utils/sort";
import "./GenreSection.css";
import { getDDay } from "@utils/format";
import {
  parseGenres,
  writeGenres,
  toggleGenreParam,
  clearGenresParam,
} from "@utils/genresQuery";
import { useGenres } from "@hooks/useGenres";

export default function GenreSection() {
  const { genreId } = useParams();
  const [params, setParams] = useSearchParams();
  const genresMap = useGenres();

  const page = Math.max(1, Number(params.get("page") || 1));
  const sort = params.get("sort") || DEFAULT_SERVER_SORT;

  const selectedIds = parseGenres(params);

  useEffect(() => {
    if (!genreId) return;
    if (!selectedIds.includes(String(genreId))) {
      const next = writeGenres(params, [...selectedIds, String(genreId)]);
      setParams(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreId]);

  const { data, loading, error } = useDiscoverByGenres(
    selectedIds,
    page,
    sort,
    "and"
  );
  const results = useMemo(() => data?.results ?? [], [data?.results]);
  const hasResults =
    selectedIds.length > 0 && !loading && !error && results.length > 0;

  const selectedNames = useMemo(() => {
    return selectedIds
      .map((id) => (genresMap ?? {})[String(id)])
      .filter(Boolean);
  }, [selectedIds, genresMap]);

  const titleText = useMemo(() => {
    if (selectedNames.length === 0) return "장르를 선택해 주세요";
    // 4개 이상이면 요약 표시
    const MAX = 3;
    if (selectedNames.length > MAX) {
      return `${selectedNames.slice(0, MAX).join(" · ")} 외 ${
        selectedNames.length - MAX
      }개`;
    }
    return selectedNames.join(" · ");
  }, [selectedNames]);

  // 페이지/정렬 변경
  const handlePageChange = (nextPage) => {
    const next = new URLSearchParams(params);
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

  // 장르 토글/초기화
  const handleToggleGenre = (id) => setParams(toggleGenreParam(params, id));
  const handleClear = () => {
    const next = new URLSearchParams();
    next.set("page", "1");
    next.set("sort", DEFAULT_SERVER_SORT);
    setParams(next);
  };

  if (loading) return <p>불러오는 중...</p>;

  return (
    <section className="genre section">
      <SectionHeader
        title={titleText}
        desc={
          selectedIds.length > 0 ? (
            <>
              총{" "}
              <span className="highlight">
                {data.total_results > 10000
                  ? "10,000+"
                  : data.total_results?.toLocaleString?.() ?? 0}
              </span>
              개의 영화가 존재합니다.
            </>
          ) : (
            <>장르를 선택하면 영화가 표시됩니다.</>
          )
        }
        pageInfo={
          hasResults
            ? `${data.page} / ${Math.min(data.total_pages ?? 1, 500)} 페이지`
            : undefined
        }
        hasNav={false}
      />

      {/* 장르 필터 바 */}
      <GenreFilterBar
        selectedIds={selectedIds}
        onToggle={handleToggleGenre}
        onClear={handleClear}
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
      {!error && selectedIds.length > 0 && results.length === 0 && (
        <p className="section-desc">해당 조건의 영화가 존재하지 않습니다.</p>
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
