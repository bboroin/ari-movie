import { useEffect, useState } from "react";
import { fetchNowPlayingPages } from "../../../api/tmdb";
import "./NowPlayingSection.css";

const NowPlayingSection = () => {
  const [rows, setRows] = useState({ page1: [], page2: [] });
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchNowPlayingPages();
        setRows(data);
      } catch (err) {
        console.error("fetchMovies failed:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <section className="nowplaying-section">
      <h2>Now Playing</h2>

      <div
        className={`poster-container ${animate ? "" : "is-paused"}`}
        onMouseEnter={onStop}
        onMouseLeave={onRun}
      >
        <div className="row">
          <ul className="poster-list poster-list--left">
            {[...rows.page1, ...rows.page1].map((movie, i) => (
              <li className="poster-card" key={`${movie.id}-${i}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="row">
          <ul className="poster-list poster-list--right">
            {[...rows.page2, ...rows.page2].map((movie, i) => (
              <li className="poster-card" key={`${movie.id}-${i}`}>
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

export default NowPlayingSection;
