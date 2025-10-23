import { Link } from "react-router-dom";
import "./TrailerModal.css";

export default function TrailerModal({ id, trailer, onClose, display }) {
  return (
    <div className={`trailer-modal trailer-modal--${display}`}>
      <div className="trailer-frame-wrap">
        <iframe
          className="trailer-iframe"
          src={trailer}
          title="Trailer"
          allowFullScreen
        />
        <Link to={`/movie/${id}`} className="trailer-detail">
          상세보기
        </Link>
        <button className="trailer-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
