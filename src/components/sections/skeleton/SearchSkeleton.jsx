import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Skeleton.css";

const SearchSkeleton = ({ count = 20 }) => {
  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">
          <Skeleton width={160} height={33} />
        </h2>
      </div>
      <div className="section-info">
        <Skeleton width={200} height={18} />
        <Skeleton width={80} height={18} />
      </div>

      <div className="poster-list--grid">
        {Array.from({ length: count }).map((_, i) => (
          <div className="card" key={i}>
            <div className="card-poster">
              <Skeleton height="100%" />
            </div>
            <div className="card-content">
              <div className="card-title">
                <Skeleton width="80%" height={19} />
              </div>
              <div className="card-meta">
                <Skeleton height={14} width={50} />
                <Skeleton height={14} width={30} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchSkeleton;
