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
      <h3>HeroSection</h3>
      {data.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
};

export default HeroSection;
