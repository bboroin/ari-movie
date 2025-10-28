import { Link } from "react-router-dom";
import noPoster from "@assets/poster-default.svg";
import "./Section.css";

const IMG = (p) => (p ? `https://image.tmdb.org/t/p/original/${p}` : noPoster);

const SectionCard = ({ id, posterPath, title, badge, meta = [] }) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className="card">
        <div className="card-poster">
          <img src={IMG(posterPath)} alt={title} />
          {badge && <div className="card-badge">{badge}</div>}
        </div>

        <div className="card-content">
          <h3 className="card-title">{title}</h3>

          <div className="card-meta">
            {meta.map(({ icon, text, alt }, i) => (
              <div className="meta-pill" key={i}>
                <img src={icon} alt={alt || "meta"} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SectionCard;
