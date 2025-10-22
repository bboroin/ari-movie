import ContentLoader from "react-content-loader";
import "./Skeleton.css";

const HeroOverlaySkeleton = () => (
  <ContentLoader
    speed={1.6}
    viewBox="0 0 1280 900"
    backgroundColor="var(--sk-base-color)"
    foregroundColor="var(--sk-highlight-color)"
    className="sk-svg hero-overlay sk-hero-overlay "
    preserveAspectRatio="none"
  >
    <rect x="0" y="0" width="1280" height="900" />
  </ContentLoader>
);

const HeroContentSkeleton = () => (
  <ContentLoader
    speed={1.6}
    viewBox="0 0 520 280"
    backgroundColor="var(--sk-base-color)"
    foregroundColor="var(--sk-highlight-color)"
    className="sk-svg hero-content-skeleton"
  >
    {/* 타이틀 */}
    <rect x="0" y="0" rx="5" ry="5" width="350" height="40" />

    {/* 본문 */}
    <rect x="0" y="64" rx="5" ry="5" width="250" height="14" />
    <rect x="0" y="84" rx="5" ry="5" width="250" height="14" />
    <rect x="0" y="104" rx="5" ry="5" width="250" height="14" />
    <rect x="0" y="124" rx="5" ry="5" width="250" height="14" />

    {/* 태그 */}
    <rect x="0" y="155" rx="5" ry="5" width="50" height="16" />
    <rect x="60" y="155" rx="5" ry="5" width="50" height="16" />
    <rect x="120" y="155" rx="5" ry="5" width="50" height="16" />

    {/* 버튼 */}
    <rect x="0" y="200" rx="5" ry="5" width="130" height="30" />
  </ContentLoader>
);

const HeroSkeleton = () => (
  <section className="hero-section">
    <div className="hero-banner">
      <HeroOverlaySkeleton />

      <div className="hero-content">
        <HeroContentSkeleton />
      </div>
    </div>
  </section>
);

export default HeroSkeleton;
