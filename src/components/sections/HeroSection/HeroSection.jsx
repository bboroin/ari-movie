import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useState, useRef } from "react";
import { useHeroMovies } from "../../../hooks/useHeroMovies";
import { useGenres } from "../../../hooks/useGenres";
import { fetchTrailers } from "../../../api/movies";
import "./HeroSection.css";
import HeroSkeleton from "../skeleton/HeroSkeleton";
import TrailerModal from "../NowPlayingSection/TrailerModal";
import playIcon from "../../../assets/icons/play.svg";

const HeroSection = () => {
  const { data, loading } = useHeroMovies();
  const genreMap = useGenres(null);
  const [trailer, setTrailer] = useState({ url: "", id: null });
  const swiperRef = useRef(null);

  async function handleTrailerOpen(movie) {
    const url = await fetchTrailers(movie.id);
    setTrailer({ url, id: movie.id });
    swiperRef.current?.autoplay?.stop?.();
  }

  function handleTrailerClose() {
    setTrailer({ url: "", id: null });
    swiperRef.current?.autoplay?.start?.();
  }

  if (loading) return <HeroSkeleton />;

  return (
    <section className="hero-section">
      <Swiper
        modules={[Pagination, Autoplay, A11y]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        onSwiper={(sw) => (swiperRef.current = sw)}
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
                <button
                  className="hero-trailer-btn"
                  onClick={() => handleTrailerOpen(movie)}
                >
                  <img src={playIcon} alt="트레일러 재생 버튼" />
                  <span>TRAILER</span>
                </button>
              </div>
              {trailer.id !== null && (
                <TrailerModal
                  id={trailer.id}
                  trailer={trailer.url}
                  onClose={handleTrailerClose}
                  display="right"
                />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
