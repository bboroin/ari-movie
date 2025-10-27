import React, { useState } from "react";
import arrowNext from "../../../assets/icons/arrow-icon-next.svg";
import arrowPrev from "../../../assets/icons/arrow-icon-prev.svg";
import "./DetailMedia.css";

const TABS = [
  { key: "videos", label: "영상" },
  { key: "backdrops", label: "배경" },
  { key: "posters", label: "포스터" },
];

const DetailMedia = ({ videos = [], backdrops = [], posters = [], onPlay }) => {
  const [active, setActive] = useState("videos");

  const counts = {
    videos: videos.length,
    backdrops: backdrops.length,
    posters: posters.length,
  };

  return (
    <section className="detail-media section">
      <div className="detail-header">
        <div>
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              id={`tab-${key}`}
              className={`tabs-btn ${active === key ? "is-active" : ""}`}
              onClick={() => setActive(key)}
              type="button"
            >
              {label} <span className="tabs-count">{counts[key]}</span>
            </button>
          ))}
        </div>
        <div className="section-nav">
          <button className="section-prev" type="button">
            <img src={arrowPrev} alt="이전 버튼" />
          </button>
          <button className="section-next" type="button">
            <img src={arrowNext} alt="다음 버튼" />
          </button>
        </div>
      </div>

      <div className="media-panelwrap">
        {active === "videos" && (
          <ul className="media-panel videos">
            {videos.length === 0 && (
              <li className="empty">준비된 영상이 없습니다.</li>
            )}
            {videos.map((v) => (
              <li key={v.id} className="media-card video">
                <button
                  className="thumb"
                  onClick={() => onPlay?.(v.key)}
                  type="button"
                >
                  <img
                    src={`https://i.ytimg.com/vi/${v.key}/hqdefault.jpg`}
                    alt={v.name || v.type}
                    loading="lazy"
                  />
                </button>
                <div className="title">{v.name}</div>
              </li>
            ))}
          </ul>
        )}

        {active === "backdrops" && (
          <ul className="media-panel">
            {backdrops.length === 0 && (
              <li className="empty">준비된 배경 이미지가 없습니다.</li>
            )}
            {backdrops.map((img, i) => (
              <li key={i} className="media-card">
                <img
                  src={`https://image.tmdb.org/t/p/original${img.file_path}`}
                  alt={`backdrop-${i}`}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        )}

        {active === "posters" && (
          <ul className="media-panel">
            {posters.length === 0 && (
              <li className="empty">준비된 포스터가 없습니다.</li>
            )}
            {posters.map((img, i) => (
              <li key={i} className="media-card">
                <img
                  src={`https://image.tmdb.org/t/p/original${img.file_path}`}
                  alt={`poster-${i}`}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default DetailMedia;
