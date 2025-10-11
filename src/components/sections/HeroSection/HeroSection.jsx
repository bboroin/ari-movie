import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useEffect, useState } from "react";
import { fetchHeroMovies } from "../../../api/tmdb";
import { useGenres } from "../../../hooks/useGenres";
import "./HeroSection.css";
import playIcon from "../../../assets/icons/play.svg";

const HeroSection = () => {
  const [data, setData] = useState([]);
  const genreMap = useGenres(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchHeroMovies();
        setData(data);
      } catch (err) {
        console.error("fetchMovies failed:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className="hero-section">
      <Swiper
        modules={[Pagination, Autoplay, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
      >
        {data.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div
              className="hero-banner"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
              }}
            >
              <div className="hero-overlay" />
              <div className="hero-content">
                <h2 className="hero-title">{movie.title}</h2>
                <p className="hero-overview">{movie.overview}</p>
                <div className="hero-tags">
                  {movie.genre_ids.map((id) => (
                    <span key={id} className="hero-tag">
                      {genreMap?.[id] ?? ""}
                    </span>
                  ))}
                </div>
                <button className="hero-trailer-btn">
                  <img src={playIcon} alt="트레일러 재생 버튼" />
                  <span>TRAILER</span>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
