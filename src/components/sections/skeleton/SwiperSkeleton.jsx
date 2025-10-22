// SwiperSkeleton.jsx
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

const CardSkeleton = () => (
  <ContentLoader
    speed={1.6}
    viewBox="0 0 200 340" // 카드 비율(포스터 + 텍스트)
    backgroundColor="var(--sk-base-color)"
    foregroundColor="var(--sk-highlight-color)"
  >
    <rect x="0" y="0" width="200" height="340" />
  </ContentLoader>
);

const SwiperSkeleton = ({ count = 5 }) => {
  return (
    <section className="section is-skeleton">
      <div className="section-header">
        <h2 className="section-title">
          <TitleSkeleton width={250} height={40} />
        </h2>
      </div>

      <div className="section-swiper">
        <div className="skeleton-row">
          {Array.from({ length: count }).map((_, i) => (
            <div className="card" key={i}>
              <div className="card-poster">
                <CardSkeleton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SwiperSkeleton;
