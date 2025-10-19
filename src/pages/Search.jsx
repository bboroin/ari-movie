import { useSearchParams } from "react-router-dom";
import { useSearchMovie } from "../hooks/useSearchMovie";
import SectionHeader from "../components/sections/common/SectionHeader";
import SectionCard from "../components/sections/common/SectionCard";
import "../components/sections/common/Section.css";

const Search = () => {
  const [params] = useSearchParams();
  const query = params.get("q") ?? "";
  const { data, loading, error } = useSearchMovie(query);
  const results = data.results ?? [];

  return (
    <section className="section">
      <SectionHeader
        title={`"${query}" 관련 영화`}
        desc={`총 ${data.total_results}개의 영화가 검색되었습니다.`}
        hasNav={false}
      />

      {/* 상태별 UI */}
      {loading && <p className="section-desc">검색 중...</p>}
      {error && (
        <p className="section-desc" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {/* 검색 결과 */}
      <div className="poster-list--grid">
        {results.map((movie) => (
          <SectionCard
            key={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            meta={[
              {
                icon: "/src/assets/icons/release.svg",
                text: movie.release_date,
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
    </section>
  );
};

export default Search;
