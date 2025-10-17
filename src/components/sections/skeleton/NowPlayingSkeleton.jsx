import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Skeleton.css";

const NowPlayingSkeleton = () => {
  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">
          <Skeleton width={130} height={33} />
        </h2>
      </div>

      <div className="poster-container">
        <div className="row">
          {/* 윗줄 */}
          <div className="poster-list row-top">
            {[...Array(10)].map((_, i) => (
              <Skeleton className="poster-card" key={`top-${i}`} />
            ))}
          </div>

          {/* 아랫줄 */}
          <div className="poster-list row-bottom">
            {[...Array(10)].map((_, i) => (
              <Skeleton className="poster-card" key={`bottom-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NowPlayingSkeleton;
