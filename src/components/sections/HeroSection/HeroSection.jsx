import { useEffect, useState } from "react";
import { fetchHeroMovies } from "../../../api/tmdb";
import { useGenres } from "../../../hooks/useGenres";
import "./HeroSection.css";

const HeroSection = () => {
  const [data, setData] = useState([]);
  const genreMap = useGenres();

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
            <div className="hero-tags">
              {movie.genre_ids.map((id) => (
                <span className="hero-tag">{genreMap[id]}</span>
              ))}
            </div>
            <button>TRAILER</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroSection;
