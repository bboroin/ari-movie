import { useEffect, useState } from "react";
import { getFavoriteMovies } from "@utils/favorites";
import SectionCard from "@components/sections/common/SectionCard";
import SectionHeader from "@/components/sections/common/SectionHeader";
import Pagination from "@/components/sections/common/Pagination";

import release from "@assets/icons/release.svg";
import vote from "@assets/icons/vote.svg";

const PAGE_SIZE = 20;

const MyPage = () => {
  const [favorites, setFavorites] = useState(() => getFavoriteMovies());
  const [page, setPage] = useState(1);

  useEffect(() => {
    setFavorites(getFavoriteMovies());
    setPage(1);
  }, []);

  const totalPages = Math.ceil(favorites.length / PAGE_SIZE) || 1;
  const startIndex = (page - 1) * PAGE_SIZE;
  const pagedFavorites = favorites.slice(startIndex, startIndex + PAGE_SIZE);

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
        pageInfo={`${page} / ${totalPages} 페이지`}
        hasNav={false}
      />

      <div className="poster-list--grid">
        {pagedFavorites.map((movie) => (
          <SectionCard
            key={movie.id}
            id={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            meta={[
              { icon: release, text: movie.release_date, alt: "개봉일" },
              {
                icon: vote,
                text: (movie.vote_average ?? 0).toFixed(1),
                alt: "평점",
              },
            ]}
          />
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </section>
  );
};

export default MyPage;
