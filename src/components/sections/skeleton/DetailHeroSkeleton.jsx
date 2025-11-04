import React from "react";
import ContentLoader from "react-content-loader";
import "./Skeleton.css";

const BackdropSkeleton = () => (
  <ContentLoader
    speed={1.6}
    viewBox="0 0 1280 900"
    backgroundColor="var(--sk-base-color)"
    foregroundColor="var(--sk-highlight-color)"
    className="sk-svg sk-hero-overlay"
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" width="1280" height="900" />
  </ContentLoader>
);

const PosterSkeleton = () => (
  <ContentLoader
    speed={1.6}
    viewBox="0 0 300 450"
    backgroundColor="var(--sk-base-color)"
    foregroundColor="var(--sk-highlight-color)"
    className="sk-svg sk-hero-poster"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect x="0" y="0" rx="10" ry="10" width="300" height="450" />
  </ContentLoader>
);

const ContentSkeleton = () => (
  <ContentLoader
    speed={1.6}
    viewBox="0 0 560 260"
    backgroundColor="var(--sk-base-color)"
    foregroundColor="var(--sk-highlight-color)"
    className="sk-svg sk-hero-content"
  >
    {/* 제목 */}
    <rect x="0" y="0" rx="6" ry="6" width="380" height="40" />

    {/* 메타 (연령가 · 런타임 · 개봉일) */}
    <rect x="0" y="58" rx="8" ry="8" width="40" height="20" />
    <rect x="50" y="58" rx="8" ry="8" width="90" height="20" />
    <rect x="150" y="58" rx="8" ry="8" width="130" height="20" />

    {/* 태그라인 (한 줄) */}
    <rect x="0" y="92" rx="5" ry="5" width="200" height="22" />

    {/* 장르 태그 3~4개 */}
    <rect x="0" y="130" rx="8" ry="8" width="70" height="16" />
    <rect x="80" y="130" rx="8" ry="8" width="70" height="16" />
    <rect x="160" y="130" rx="8" ry="8" width="70" height="16" />

    {/* 개요 3~4줄 */}
    <rect x="0" y="160" rx="5" ry="5" width="380" height="12" />
    <rect x="0" y="177" rx="5" ry="5" width="380" height="12" />
    <rect x="0" y="194" rx="5" ry="5" width="380" height="12" />

    {/* 액션 버튼 (트레일러, 즐겨찾기) */}
    <rect x="0" y="220" rx="5" ry="5" width="120" height="34" />
    <rect x="140" y="220" rx="99" ry="99" width="34" height="34" />
  </ContentLoader>
);

const DetailHeroSkeleton = () => {
  return (
    <section className="detail-hero section is-skeleton">
      {/* 배경 */}
      <div className="detail-hero__backdrop" aria-hidden="true">
        <div className="detail-hero__overlay">
          <BackdropSkeleton />
        </div>
      </div>

      <div className="detail-hero__container">
        {/* 포스터 영역 */}
        <div className="detail-hero__poster">
          <PosterSkeleton />
        </div>

        {/* 본문 영역 */}
        <div className="detail-hero__content">
          <ContentSkeleton />
        </div>
      </div>
    </section>
  );
};

export default DetailHeroSkeleton;
