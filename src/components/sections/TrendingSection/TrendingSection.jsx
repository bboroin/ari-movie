import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import { fetchTrendingMoviesWithRuntime } from "../../../api/tmdb";
import "./TrendingSection.css";
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

  function formatRuntime(mins) {
    if (!mins && mins !== 0) return "-";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h ? `${h}h ${m}m` : `${m}m`;
  }

  return (
    <section className="trending-section">
      <div className="trending-header trending-header--bar">
        <h2 className="trending-title">Trending</h2>

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

        <div className="trending-nav">
          <button className="trending-prev">
            <img src={arrowPrev} alt="이전 버튼" />
          </button>
          <button className="trending-next">
            <img src={arrowNext} alt="다음 버튼" />
          </button>
        </div>
      </div>
      <p className="trending-desc">전 세계에서 가장 주목받는 영화들</p>

      <div className="trending-swiper">
        <Swiper
          key={period}
          modules={[Navigation, A11y]}
          navigation={{ prevEl: ".trending-prev", nextEl: ".trending-next" }}
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
              <div className="trend-card">
                <div className="trend-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                  />
                </div>

                <div className="trend-content">
                  <h3 className="trend-movie-title">{movie.title}</h3>

                  <div className="trend-meta">
                    <div className="meta-pill">
                      <img src={runtime} alt="런타임 아이콘" />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>

                    <div className="meta-pill">
                      <img src={vote} alt="평점 아이콘" />
                      <span>{(movie.vote_average ?? 0).toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TrendingSection;
