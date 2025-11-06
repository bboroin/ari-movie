import { useParams, useSearchParams } from "react-router-dom";
import { useDiscoverByGenre } from "@hooks/useDiscoverByGenre";
import { useSortedMovies } from "@hooks/useSortedMovies";
import SectionCard from "@components/sections/common/SectionCard";
import SectionHeader from "@components/sections/common/SectionHeader";
import "./GenreSection.css";
import { getDDay } from "@utils/format";
import SortControls from "../SearchSection/SortControls";

export default function GenreSection() {
  const { genreId } = useParams();
  const [sp] = useSearchParams();
  const name = sp.get("name") || "";
  const { data, loading } = useDiscoverByGenre(genreId);
  const results = data?.results ?? [];
  const { sortedResults, sortOption, setSortOption } = useSortedMovies(results);

  if (loading) return <p>불러오는 중...</p>;
  if (!results.length) return <p>해당 장르의 영화가 없습니다.</p>;

  return (
    <section className="genre section">
      <SectionHeader
        title={`"${name}" 장르 영화`}
        desc={
          <>
            총{" "}
            <span className="highlight">
              {data.total_results.toLocaleString()}
            </span>
            개의 영화가 존재합니다.
          </>
        }
        hasNav={false}
      />

      <SortControls value={sortOption} onChange={setSortOption} />

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
    </section>
  );
}
