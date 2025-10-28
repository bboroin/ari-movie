import React, { useState } from "react";
import arrowNext from "../../../../assets/icons/arrow-icon-next.svg";
import arrowPrev from "../../../../assets/icons/arrow-icon-prev.svg";
import MediaSwiper from "./MediaSwiper";
import "./DetailMedia.css";

const TABS = [
  { key: "videos", label: "Video" },
  { key: "backdrops", label: "Backdrop" },
  { key: "posters", label: "Poster" },
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
          <button className="section-prev" type="button" data-nav="media">
            <img src={arrowPrev} alt="이전 버튼" />
          </button>
          <button className="section-next" type="button" data-nav="media">
            <img src={arrowNext} alt="다음 버튼" />
          </button>
        </div>
      </div>

      <div className="media-panelwrap">
        {active === "videos" &&
          (videos.length === 0 ? (
            <div className="empty">준비된 영상이 없습니다.</div>
          ) : (
            <MediaSwiper
              items={videos}
              getKey={(v) => v.id}
              renderItem={(v) => (
                <div className="media-card">
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
                </div>
              )}
            />
          ))}

        {active === "backdrops" &&
          (backdrops.length === 0 ? (
            <div className="empty">준비된 배경 이미지가 없습니다.</div>
          ) : (
            <MediaSwiper
              items={backdrops}
              getKey={(img, i) => `bd-${img.file_path}-${i}`}
              renderItem={(img, i) => (
                <div className="media-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w780${img.file_path}`}
                    alt={`backdrop-${i}`}
                    loading="lazy"
                  />
                </div>
              )}
            />
          ))}

        {active === "posters" &&
          (posters.length === 0 ? (
            <div className="empty">준비된 포스터가 없습니다.</div>
          ) : (
            <MediaSwiper
              items={posters}
              getKey={(img, i) => `po-${img.file_path}-${i}`}
              renderItem={(img, i) => (
                <div className="media-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w342${img.file_path}`}
                    alt={`poster-${i}`}
                    loading="lazy"
                  />
                </div>
              )}
            />
          ))}
      </div>
    </section>
  );
};

export default DetailMedia;
