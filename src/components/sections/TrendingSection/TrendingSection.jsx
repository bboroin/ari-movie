import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import { fetchTrendingMoviesWithRuntime } from "../../../api/tmdb";
import "./TrendingSection.css";
import "../common/Section.css";
import SectionCard from "../common/SectionCard";
import { formatRuntime } from "../../../utils/format";

import arrowNext from "../../../assets/icons/arrow-icon-next.svg";
import arrowPrev from "../../../assets/icons/arrow-icon-prev.svg";
import vote from "../../../assets/icons/vote.svg";
import runtime from "../../../assets/icons/runtime.svg";

const TrendingSection = () => {
  const [data, setData] = useState([]);
  const [period, setPeriod] = useState("day");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTrendingMoviesWithRuntime(period);
        setData(data);
      } catch (err) {
        console.error("fetchMovies failed:", err);
      }
    };
    fetchMovies();
  }, [period]);

  return (
    <section className="section">
      <div className="section-header section-header--bar">
        <h2 className="section-title">Trending</h2>

        <div className="trending-period">
          <button
            className={`period-btn ${period === "day" ? "is-active" : ""}`}
            onClick={() => setPeriod("day")}
          >
            오늘
          </button>
          <button
            className={`period-btn ${period === "week" ? "is-active" : ""}`}
            onClick={() => setPeriod("week")}
          >
            이번 주
          </button>
        </div>

        <div className="section-nav">
          <button className="section-prev">
            <img src={arrowPrev} alt="이전 버튼" />
          </button>
          <button className="section-next">
            <img src={arrowNext} alt="다음 버튼" />
          </button>
        </div>
      </div>

      <p className="section-desc">전 세계에서 가장 주목받는 영화들</p>

      <div className="section-swiper">
        <Swiper
          key={period}
          modules={[Navigation, A11y]}
          navigation={{ prevEl: ".section-prev", nextEl: ".section-next" }}
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
                posterPath={movie.poster_path}
                title={movie.title}
                meta={[
                  {
                    icon: runtime,
                    text: formatRuntime(movie.runtime),
                    alt: "런타임",
                  },
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

export default TrendingSection;
