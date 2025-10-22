import ContentLoader from "react-content-loader";
import "./Skeleton.css";

const TitleSkeleton = ({ width, height }) => (
  <ContentLoader
    speed={1.6}
    viewBox={`0 0 ${width} ${height}`}
    width={width}
    height={height}
    backgroundColor="var(--sk-base-color)"
    foregroundColor="var(--sk-highlight-color)"
    className="sk-svg"
  >
    <rect x="0" y="0" rx="5" ry="5" width={width} height={height} />
  </ContentLoader>
);

const PosterSkeleton = () => (
  <div className="poster-card">
    <ContentLoader
      speed={1.6}
      viewBox="0 0 220 330"
      backgroundColor="var(--sk-base-color)"
      foregroundColor="var(--sk-highlight-color)"
    >
      <rect x="0" y="0" width="220" height="330" />
    </ContentLoader>
  </div>
);

const NowPlayingSkeleton = () => (
  <section className="section is-skeleton">
    <div className="section-header">
      <h2 className="section-title">
        <TitleSkeleton width={250} height={40} />
      </h2>
    </div>

    <div className="poster-container">
      <div className="row">
        <div className="poster-list row-top">
          {Array.from({ length: 10 }).map((_, i) => (
            <PosterSkeleton key={`top-${i}`} />
          ))}
        </div>
        <div className="poster-list row-bottom">
          {Array.from({ length: 10 }).map((_, i) => (
            <PosterSkeleton key={`bottom-${i}`} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default NowPlayingSkeleton;
