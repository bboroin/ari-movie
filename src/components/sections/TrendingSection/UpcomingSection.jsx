import { useEffect, useState } from "react";
import { fetchUpcomingMovies } from "../../../api/tmdb";

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
    <div>
      <h3>UpcomingSection</h3>
      {data.map((movie) => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </div>
  );
};

export default UpcomingSection;
