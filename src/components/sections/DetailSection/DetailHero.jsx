import React from "react";
import {
  formatRuntime,
  formatDate,
  pickCertification,
} from "../../../utils/format";
import playIcon from "../../../assets/icons/play.svg";
import noPoster from "../../../assets/poster-default.svg";
import "./DetailHero.css";

const DetailHero = ({ detail, onPlayTrailer }) => {
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

  const genreNames = genres.map((g) => g.name);

  const backdropUrl = backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${backdrop_path}`
    : null;

  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/original${poster_path}`
    : noPoster;

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

          {/* 태그라인 */}
          {tagline ? <p className="detail-hero__tagline">{tagline}</p> : null}

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

          {/* 장르 */}
          <div className="detail-hero__tags">
            {genreNames.map((name) => (
              <span className="detail-hero__tag" key={name}>
                {name}
              </span>
            ))}
          </div>

          {/* 개요 */}
          {overview && (
            <p className="detail-hero__overview" aria-label="개요">
              {overview}
            </p>
          )}

          {/* 액션 버튼 */}
          <div className="detail-hero__actions">
            <button
              type="button"
              className="hero-trailer-btn"
              onClick={() => onPlayTrailer?.(detail)}
            >
              <img src={playIcon} alt="트레일러 재생 버튼" />
              <span>TRAILER</span>
            </button>

            <button type="button" className="hero-great-btn">
              즐겨찾기
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailHero;
