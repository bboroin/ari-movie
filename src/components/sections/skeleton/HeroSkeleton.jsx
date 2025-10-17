import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Skeleton.css";

const HeroSkeleton = () => (
  <section className="hero-section">
    <div className="hero-banner">
      <Skeleton
        style={{
          position: "absolute",
          inset: 0,
          height: "100%",
          width: "100%",
          opacity: 0.4,
        }}
        animate={true}
      />

      <div
        className="hero-content"
        style={{
          zIndex: 3,
          maxWidth: 960,
        }}
      >
        <Skeleton height={48} width="550px" />

        <Skeleton count={4} height={16} width="450px" />

        <div className="hero-tags">
          <Skeleton width={64} height={24} borderRadius={5} />
          <Skeleton width={64} height={24} borderRadius={5} />
          <Skeleton width={64} height={24} borderRadius={5} />
        </div>

        <Skeleton width={170} height={44} />
      </div>
    </div>
  </section>
);

export default HeroSkeleton;
