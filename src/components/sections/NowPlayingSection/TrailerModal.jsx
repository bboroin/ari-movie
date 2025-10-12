import "./TrailerModal.css";

export default function TrailerModal({ trailer, onClose }) {
  return (
    <div className="trailer-modal">
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
