import React from "react";
import ContentLoader from "react-content-loader";
import "./Skeleton.css";

const Block = ({ w = 500, h = 100, r = 5 }) => (
  <ContentLoader
    speed={1.6}
    viewBox={`0 0 ${w} ${h}`}
    height={h}
    backgroundColor="var(--sk-base-color)"
    foregroundColor="var(--sk-highlight-color)"
    className="sk-svg"
  >
    <rect x="0" y="0" rx={r} ry={r} width={w} height={h} />
  </ContentLoader>
);

const DetailInfoSkeleton = () => {
  return (
    <section className="detail-info section is-skeleton" aria-busy="true">
      <div className="info-grid">
        {/* 상단 */}
        <div className="info-card">
          <Block h={100} />
        </div>
        <div className="info-card">
          <Block h={100} />
        </div>

        {/* 하단 */}
        <div className="info-card info-card--full">
          <Block h={50} />
        </div>
        <div className="info-card info-card--full">
          <Block h={50} />
        </div>
      </div>
    </section>
  );
};

export default DetailInfoSkeleton;
