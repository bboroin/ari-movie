import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useUpcomingMovies } from "../../../hooks/useUpcomingMovies";
import { getDDay } from "../../../utils/format";
import "../common/Section.css";
import SectionHeader from "../common/SectionHeader";
import SectionCard from "../common/SectionCard";
import SwiperSkeleton from "../skeleton/SwiperSkeleton";

import release from "../../../assets/icons/release.svg";
import popularity from "../../../assets/icons/popularity.svg";

const UpcomingSection = () => {
  const { data, loading } = useUpcomingMovies();
  if (loading) return <SwiperSkeleton count={5} />;

  return (
    <section className="section">
      <SectionHeader
        title="Upcoming"
        desc="개봉을 앞둔 기대작들"
        hasNav={true}
        navId="upcoming"
      />

      <div className="section-swiper">
        <Swiper
          modules={[Navigation, A11y]}
          navigation={{
            prevEl: '.section-prev[data-nav="upcoming"]',
            nextEl: '.section-next[data-nav="upcoming"]',
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
          {data.map((movie) => (
            <SwiperSlide key={movie.id}>
              <SectionCard
                id={movie.id}
                posterPath={movie.poster_path}
                title={movie.title}
                badge={movie.release_date ? getDDay(movie.release_date) : null}
                meta={[
                  { icon: release, text: movie.release_date, alt: "개봉일" },
                  {
                    icon: popularity,
                    text: Math.round(movie.popularity),
                    alt: "인기도",
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

export default UpcomingSection;
