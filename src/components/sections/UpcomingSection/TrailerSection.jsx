import { useEffect, useState } from "react";
import { fetchTrailerMovies } from "../../../api/tmdb";

const TrailerSection = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTrailerMovies();
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
      {data.map(({ movie, trailer }) => (
        <div key={movie.id}>
          <p>{movie.title}</p>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={movie.title}
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
};

export default TrailerSection;
