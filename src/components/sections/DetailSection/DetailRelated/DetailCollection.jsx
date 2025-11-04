import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import SectionHeader from "@components/sections/common/SectionHeader";
import SectionCard from "@components/sections/common/SectionCard";
import { useCollectionMovies } from "@/hooks/useCollectionMovies";
import { getDDay } from "@utils/format";
import SwiperSkeleton from "@components/sections/skeleton/SwiperSkeleton";
import release from "@assets/icons/release.svg";
import vote from "@assets/icons/vote.svg";

const DetailCollection = ({ anchorId, movieId }) => {
  const { collection, parts, loading } = useCollectionMovies(movieId);

  if (loading) return <SwiperSkeleton count={5} />;

  if (!parts.length) {
    return (
      <section id={anchorId} className="detail-related section">
        <SectionHeader
          title="Collection Movies"
          desc={
            collection?.name
              ? `"${collection.name}" 에 포함된 영화들`
              : "같은 컬렉션에 포함된 영화들"
          }
        />
        <p className="empty">표시할 항목이 없습니다.</p>
      </section>
    );
  }

  return (
    <section id={anchorId} className="detail-related section">
      <SectionHeader
        title="Collection Movies"
        desc={
          collection?.name
            ? `"${collection.name}" 에 포함된 영화들`
            : "컬렉션에 포함된 영화들"
        }
        hasNav={true}
        navId="collection"
      />

      <div className="section-swiper">
        <Swiper
          modules={[Navigation, A11y]}
          navigation={{
            prevEl: '.section-prev[data-nav="collection"]',
            nextEl: '.section-next[data-nav="collection"]',
          }}
          spaceBetween={20}
          a11y={{ enabled: true }}
          slidesPerView={5}
          slidesPerGroup={5}
          breakpoints={{
            320: { slidesPerView: 1, slidesPerGroup: 1 },
            640: { slidesPerView: 2, slidesPerGroup: 2 },
            1024: { slidesPerView: 4, slidesPerGroup: 4 },
            1280: { slidesPerView: 5, slidesPerGroup: 5 },
          }}
          rewind={true}
        >
          {parts.map((movie) => (
            <SwiperSlide key={movie.id}>
              <SectionCard
                id={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
                badge={movie.release_date ? getDDay(movie.release_date) : null}
                meta={[
                  { icon: release, text: movie.release_date, alt: "개봉일" },
                  {
                    icon: vote,
                    text: (movie.vote_average ?? 0).toFixed(1),
                    alt: "평점",
                  },
                ]}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default DetailCollection;
