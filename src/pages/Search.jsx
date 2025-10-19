import { useSearchParams } from "react-router-dom";
import { useSearchMovie } from "../hooks/useSearchMovie";
import SectionHeader from "../components/sections/common/SectionHeader";
import SectionCard from "../components/sections/common/SectionCard";
import Pagination from "../components/sections/common/Pagination";
import "../components/sections/common/Section.css";

const Search = () => {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const page = Math.max(1, Number(params.get("page") || 1));

  const { data, loading, error } = useSearchMovie(query, page);
  const results = data.results ?? [];

  const handlePageChange = (nextPage) => {
    const next = new URLSearchParams(params);
    next.set("q", query);
    next.set("page", String(nextPage));
    setParams(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasResults = !loading && !error && results.length > 0;

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

      {/* 상태별 UI */}
      {loading && <p className="section-desc">검색 중...</p>}
      {error && (
        <p className="section-desc" style={{ color: "red" }}>
          {error}
        </p>
      )}
      {!loading && !error && results.length === 0 && (
        <p className="section-desc">검색 결과가 없습니다.</p>
      )}

      {/* 검색 결과 */}
      {hasResults && (
        <>
          <div className="poster-list--grid">
            {results.map((movie) => (
              <SectionCard
                key={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
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
