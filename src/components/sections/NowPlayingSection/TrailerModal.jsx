import "./TrailerModal.css";

export default function TrailerModal({ trailer, onClose, display }) {
  return (
    <div className={`trailer-modal trailer-modal--${display}`}>
      <div className="trailer-frame-wrap">
        <iframe
          className="trailer-iframe"
          src={trailer}
          title="Trailer"
          allowFullScreen
        />
        <button className="trailer-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
}
