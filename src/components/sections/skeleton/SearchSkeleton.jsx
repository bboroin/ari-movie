import ContentLoader from "react-content-loader";
import "./Skeleton.css";

const TextSkeleton = ({ width, height, className }) => (
  <div className={className}>
    <ContentLoader
      speed={1.6}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      backgroundColor="var(--sk-base-color)"
      foregroundColor="var(--sk-highlight-color)"
      className="sk-svg"
      role="img"
    >
      <rect x="0" y="0" rx="5" ry="5" width={width} height={height} />
    </ContentLoader>
  </div>
);

const CardSkeleton = () => (
  <div className="card-poster">
    <ContentLoader
      speed={1.6}
      viewBox="0 0 205 305"
      backgroundColor="var(--sk-base-color)"
      foregroundColor="var(--sk-highlight-color)"
    >
      <rect x="0" y="0" width="200" height="300" />
    </ContentLoader>
  </div>
);

const SearchSkeleton = ({ count }) => {
  return (
    <section className="section is-skeleton">
      <div className="section-header search">
        <h2 className="section-title">
          <TextSkeleton width={250} height={40} />
        </h2>
      </div>

      <div className="poster-list--grid">
        {Array.from({ length: count }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default SearchSkeleton;
