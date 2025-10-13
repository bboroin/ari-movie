import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { useEffect, useState } from "react";
import { fetchUpcomingMovies } from "../../../api/tmdb";
import { getDDay } from "../../../utils/date";
import "./UpcomingSection.css";
import arrowNext from "../../../assets/icons/arrow-icon-next.svg";
import arrowPrev from "../../../assets/icons/arrow-icon-prev.svg";
import release from "../../../assets/icons/release.svg";
import popularity from "../../../assets/icons/popularity.svg";

const UpcomingSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchUpcomingMovies();
        setData(data);
      } catch (err) {
        console.error("fetchMovies failed:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className="upcoming-section">
      <div className="upcoming-header upcoming-header--bar">
        <h2 className="upcoming-title">Upcoming</h2>
        <div className="upcoming-nav">
          <button className="upcoming-prev">
            <img src={arrowPrev} alt="이전 버튼" />
          </button>
          <button className="upcoming-next">
            <img src={arrowNext} alt="다음 버튼" />
          </button>
        </div>
      </div>
      <p className="upcoming-desc">개봉을 앞둔 기대작들</p>

      <div className="upcoming-swiper">
        <Swiper
          modules={[Navigation, A11y]}
          navigation={{ prevEl: ".upcoming-prev", nextEl: ".upcoming-next" }}
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
              <div className="upcoming-card">
                <div className="upcoming-poster">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                  />
                  {movie.release_date && (
                    <div className="poster-d-day">
                      {getDDay(movie.release_date)}
                    </div>
                  )}
                </div>

                <div className="upcoming-content">
                  <h3 className="upcoming-movie-title">{movie.title}</h3>

                  <div className="upcoming-meta">
                    <div className="meta-pill">
                      <img src={release} alt="개봉일 아이콘" />
                      <span>{movie.release_date}</span>
                    </div>

                    <div className="meta-pill">
                      <img src={popularity} alt="인기도 아이콘" />
                      <span>{Math.round(movie.popularity)}</span>
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

export default UpcomingSection;
