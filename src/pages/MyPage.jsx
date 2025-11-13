import { useEffect, useState } from "react";
import { getFavoriteMovies } from "@utils/favorites";
import SectionCard from "@components/sections/common/SectionCard";
import SectionHeader from "@/components/sections/common/SectionHeader";

const MyPage = () => {
  const [favorites, setFavorites] = useState(() => getFavoriteMovies());

  useEffect(() => {
    setFavorites(getFavoriteMovies());
  }, []);

  return (
    <section className="section list">
      <SectionHeader
        title="Favorite Movies"
        desc={
          <>
            총{" "}
            <span className="highlight">
              {favorites.length.toLocaleString()}
            </span>
            개의 즐겨찾기한 영화가 존재합니다.
          </>
        }
        hasNav={false}
      />

      <div className="poster-list--grid">
        {favorites.map((movie) => (
          <SectionCard
            key={movie.id}
            id={movie.id}
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
    </section>
  );
};

export default MyPage;
