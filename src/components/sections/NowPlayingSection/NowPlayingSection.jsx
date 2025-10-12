import { useEffect, useState } from "react";
import { fetchNowPlayingPagesWithTrailers } from "../../../api/tmdb";
import "./NowPlayingSection.css";
import TrailerModal from "./TrailerModal";

const NowPlayingSection = () => {
  const [rows, setRows] = useState({ page1: [], page2: [] });
  const [animate, setAnimate] = useState(true);
  const [trailer, setTrailer] = useState(""); // iframe src

  const onStop = () => {
    if (!trailer) setAnimate(false);
  };
  const onRun = () => {
    if (!trailer) setAnimate(true);
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchNowPlayingPagesWithTrailers();
        setRows(data);
      } catch (err) {
        console.error("fetchMovies failed:", err);
      }
    };
    fetchMovies();
  }, []);

  function handleTrailerOpen(movie) {
    setAnimate(false);
    setTrailer(movie.trailerUrl || "");
  }

  function handleTrailerClose() {
    setTrailer("");
    setAnimate(true);
  }

  return (
    <section className="nowplaying-section">
      <h2>Now Playing</h2>

      {trailer && (
        <TrailerModal
          trailer={trailer}
          onClose={handleTrailerClose}
          display="center"
        />
      )}

      <div
        className={`poster-container ${animate ? "" : "is-paused"}`}
        onMouseEnter={onStop}
        onMouseLeave={onRun}
      >
        <div className="row">
          <ul className="poster-list poster-list--left">
            {[...rows.page1, ...rows.page1].map((movie, i) => (
              <li className="poster-card" key={`${movie.id}-p1-${i}`}>
                <button
                  className="trailer-btn"
                  onClick={() => handleTrailerOpen(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="row">
          <ul className="poster-list poster-list--right">
            {[...rows.page2, ...rows.page2].map((movie, i) => (
              <li className="poster-card" key={`${movie.id}-p2-${i}`}>
                <button
                  className="trailer-btn"
                  onClick={() => handleTrailerOpen(movie)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    loading="lazy"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default NowPlayingSection;
