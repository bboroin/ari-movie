import React from "react";
import ContentLoader from "react-content-loader";
import "./Skeleton.css";

const TabsLine = ({ width = 250, height = 40 }) => (
  <ContentLoader
    speed={1.6}
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
    backgroundColor="var(--sk-base-color)"
    foregroundColor="var(--sk-highlight-color)"
    className="sk-svg "
    style={{ width, height }}
  >
    <rect x="0" y="0" rx="10" ry="10" width={width} height={height} />
  </ContentLoader>
);

const PersonPosterSkeleton = ({ w = 200 }) => {
  const h = Math.round(w * 1.5); // 2:3
  return (
    <ContentLoader
      speed={1.6}
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      backgroundColor="var(--sk-base-color)"
      foregroundColor="var(--sk-highlight-color)"
      className="sk-svg"
      style={{ height: h }}
    >
      <rect x="0" y="0" rx="10" ry="10" width={w} height={h} />
    </ContentLoader>
  );
};

const DetailSwiperSkeleton = ({ count }) => {
  return (
    <section className="detail-people section is-skeleton">
      <div className="detail-header">
        <TabsLine width={250} height={40} />
      </div>

      <div className="people-skeleton-row">
        {Array.from({ length: count }).map((_, i) => (
          <div className="people-skeleton-card" key={i}>
            <PersonPosterSkeleton w={200} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default DetailSwiperSkeleton;
