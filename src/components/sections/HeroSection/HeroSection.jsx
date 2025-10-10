import { useEffect, useState } from "react";
import { fetchHeroMovies } from "../../../api/tmdb";

const HeroSection = () => {
  const [data, setData] = useState([]);

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
    <div>
      {data.map((movie) => (
        <div
          key={movie.id}
          className="hero-banner"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${movie.backdrop_path})`,
          }}
        >
          <div className="hero-overlay" />
          <div className="hero-content">
            <h2 className="hero-title">{movie.title}</h2>
            <p className="hero-overview">{movie.overview}</p>
            <div className="hero-meta">
              <span className="hero-tag">{movie.genre_ids}</span>
              <span className="hero-tag">{movie.vote_average}</span>
            </div>
            <button>TRAILER</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
