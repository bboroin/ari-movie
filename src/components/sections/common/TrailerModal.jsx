import { Link } from "react-router-dom";
import "./TrailerModal.css";
import noTrailer from "@assets/trailer-default.svg";

export default function TrailerModal({
  id,
  trailer,
  onClose,
  detailBtn = true,
}) {
  return (
    <div className="trailer-modal">
      <div className="trailer-frame-wrap">
        {trailer ? (
          <iframe
            className="trailer-iframe"
            src={trailer}
            title="Trailer"
            allowFullScreen
          />
        ) : (
          <img
            src={noTrailer}
            alt="트레일러 영상 대체 이미지"
            className="trailer-frame"
          />
        )}
        <div className="trailer-toolbar">
          {detailBtn ? (
            <Link to={`/movie/${id}`}>
              <button className="hero-detail-btn">MORE INFO</button>
            </Link>
          ) : null}
          <button className="trailer-close" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
