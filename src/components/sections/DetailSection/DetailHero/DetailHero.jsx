import React, { useEffect, useState } from "react";
import GenreTags from "@/components/sections/common/GenreTags";
import { formatRuntime, formatDate, pickCertification } from "@utils/format";
import { toggleFavoriteMovie, isFavoriteMovie } from "@utils/favorites";
import playIcon from "@assets/icons/play.svg";
import noPoster from "@assets/poster-default.svg";
import quoteOpen from "@assets/icons/quote-open.png";
import quoteClose from "@assets/icons/quote-close.png";
import favOutline from "@assets/icons/fav-outline.svg";
import favFilled from "@assets/icons/fav-filled.svg";
import "./DetailHero.css";

const DetailHero = ({ detail, onPlayTrailer }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const movieId = detail?.id;

  useEffect(() => {
    if (!movieId) return;
    setIsFavorite(isFavoriteMovie(movieId));
  }, [movieId]);

  if (!detail) return null;

  const {
    title,
    overview,
    release_date,
    runtime,
    tagline,
    genres = [],
    backdrop_path,
    poster_path,
    release_dates,
  } = detail;

  const year = release_date?.slice(0, 4) ?? "";
  const runtimeText = formatRuntime(runtime);
  const certification = pickCertification(release_dates);
  const dateText = formatDate(release_date);

  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/original${backdrop_path}`
    : null;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/original${poster_path}`
    : noPoster;

  const handleToggleFavorite = () => {
    toggleFavoriteMovie(detail);
    setIsFavorite((prev) => !prev);
  };

  return (
    <section className="detail-hero">
      {/* 배경 */}
      <div
        className="detail-hero__backdrop"
        style={backdropUrl ? { backgroundImage: `url(${backdropUrl})` } : {}}
        aria-hidden="true"
      >
        <div className="detail-hero__overlay" />
      </div>

      <div className="detail-hero__container">
        {/* 포스터 */}
        <div className="detail-hero__poster">
          <img src={posterUrl} alt={title ? `${title} 포스터` : "포스터"} />
        </div>

        <div className="detail-hero__content">
          {/* 제목 & 연도 */}
          <h1 className="detail-hero__title">
            {title}
            {year ? <span className="detail-hero__year">({year})</span> : null}
          </h1>

          {/* 연령가 · 런타임 · 개봉일 */}
          <ul className="detail-hero__meta">
            {certification ? (
              <li className="detail-hero__cert">{certification}</li>
            ) : null}
            {runtimeText ? (
              <li className="detail-hero__runtime">{runtimeText}</li>
            ) : null}
            {dateText ? (
              <li className="detail-hero__date">{dateText}</li>
            ) : null}
          </ul>

          {/* 태그라인 */}
          {tagline ? (
            <p className="detail-hero__tagline">
              <img src={quoteOpen} alt="인용문 열기" />
              <i>{tagline}</i>
              <img src={quoteClose} alt="인용문 닫기" />
            </p>
          ) : null}

          {/* 장르 */}
          <GenreTags genres={genres} />

          {/* 개요 */}
          {overview && <p className="detail-hero__overview">{overview}</p>}

          {/* 액션 버튼 */}
          <div className="detail-hero__actions">
            <button
              type="button"
              className="hero-trailer-btn"
              onClick={() => onPlayTrailer?.()}
            >
              <img src={playIcon} alt="트레일러 재생 버튼" />
              <span>TRAILER</span>
            </button>

            <button
              type="button"
              className={`hero-fav-btn ${isFavorite ? "active" : ""}`}
              onClick={handleToggleFavorite}
            >
              <img
                src={isFavorite ? favFilled : favOutline}
                alt="즐겨찾기 버튼"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailHero;
