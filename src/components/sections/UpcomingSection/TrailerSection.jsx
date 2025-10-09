import { useEffect, useState } from "react";
import { fetchNowPlayingMovies } from "../../../api/tmdb";

const TrailerSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchNowPlayingMovies();
        setData(data);
      } catch (err) {
        console.error("fetchMovies failed:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h3>TrailerSection</h3>
      {data.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
};

export default TrailerSection;
