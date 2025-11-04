import { useState } from "react";
import { useNowPlayingPagesWithTrailers } from "@hooks/useNowPlayingWithTrailers";

import "./NowPlayingSection.css";
import "@components/sections/common/Section.css";
import SectionHeader from "@components/sections/common/SectionHeader";
import NowPlayingSkeleton from "@components/sections/skeleton/NowPlayingSkeleton";
import TrailerModal from "@components/sections/common/TrailerModal";

const NowPlayingSection = ({ id }) => {
  const { data: rows, loading } = useNowPlayingPagesWithTrailers();
  const [animate, setAnimate] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [trailer, setTrailer] = useState({ url: "", id: null }); // iframe src

  const onStop = () => {
    if (!trailer.url) setAnimate(false);
  };
  const onRun = () => {
    if (!trailer.url) setAnimate(true);
  };

  function handleTrailerOpen(movie) {
    setAnimate(false);
    setIsOpen(true);
    setTrailer({
      url: movie.trailerUrl || "",
      id: movie.id,
    });
  }

  function handleTrailerClose() {
    setIsOpen(false);
    setTrailer({ url: "", id: null });
    setAnimate(true);
  }

  if (loading) return <NowPlayingSkeleton />;

  return (
    <section id={id} className="section">
      <SectionHeader
        title="Now Playing Movies"
        desc="극장에서 상영 중인 최신 영화들"
        hasNav={false}
      />

      {isOpen && (
        <TrailerModal
          id={trailer.id}
          trailer={trailer.url}
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
