import { useState } from "react";
import PeopleSwiper from "./PeopleSwiper";
import "./DetailPeople.css";
import arrowNext from "../../../../assets/icons/arrow-icon-next.svg";
import arrowPrev from "../../../../assets/icons/arrow-icon-prev.svg";

const TABS = [
  { key: "cast", label: "Cast" },
  { key: "crew", label: "Crew" },
];

export default function DetailPeople({ cast = [], crew = [] }) {
  const [active, setActive] = useState("cast");

  const counts = {
    cast: cast.length,
    crew: crew.length,
  };

  return (
    <section className="detail-people section">
      <div className="detail-header">
        <div>
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              id={`tab-${key}`}
              className={`tabs-btn ${active === key ? "is-active" : ""}`}
              onClick={() => setActive(key)}
            >
              {label} <span className="tabs-count">{counts[key]}</span>
            </button>
          ))}
        </div>
        <div className="section-nav">
          <button className="section-prev" data-nav="people">
            <img src={arrowPrev} alt="이전 버튼" />
          </button>
          <button className="section-next" data-nav="people">
            <img src={arrowNext} alt="다음 버튼" />
          </button>
        </div>
      </div>

      <div className="people-panelwrap">
        {active === "cast" ? (
          <div className="people-panel">
            <PeopleSwiper people={cast} type="cast" />
          </div>
        ) : (
          <div className="people-panel">
            <PeopleSwiper people={crew} type="crew" />
          </div>
        )}
      </div>
    </section>
  );
}
