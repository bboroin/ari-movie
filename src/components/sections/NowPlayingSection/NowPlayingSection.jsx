import { useEffect, useState } from "react";
import { fetchNowPlayingMovies } from "../../../api/tmdb";
import "./NowPlayingSection.css";

const TrailerSection = () => {
  const [data, setData] = useState([]);
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

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
    <section className="playing-section">
      <h2>Now Playing</h2>

      <div
        className={`playing-container ${animate ? "" : "is-paused"}`}
        onMouseEnter={onStop}
        onMouseLeave={onRun}
      >
        <div className="row">
          <ul className="playing-list">
            {[...data, ...data].map((movie, i) => (
              <li className="playing-card" key={`${movie.id}-${i}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TrailerSection;
