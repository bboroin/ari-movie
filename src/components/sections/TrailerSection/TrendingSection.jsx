import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../../api/tmdb";

const TrendingSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setData(data);
      } catch (err) {
        console.error("fetchMovies failed:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h3>TrendingSection</h3>
      {data.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
};

export default TrendingSection;
