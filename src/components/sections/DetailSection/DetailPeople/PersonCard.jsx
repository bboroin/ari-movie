const IMG = (path, size = 185) =>
  path ? `https://image.tmdb.org/t/p/w${size}${path}` : null;
import personDefault from "@assets/person-default.svg";

function PersonCard({ name, sub, imgPath }) {
  const src = IMG(imgPath);
  return (
    <article className="person">
      <div className="person-thumb">
        {src ? (
          <img src={src} alt={`${name} 프로필`} loading="lazy" />
        ) : (
          <img
            src={personDefault}
            alt="기본 프로필 이미지"
            className="person-default"
          />
        )}
      </div>
      <div className="person-name" title={name}>
        {name}
      </div>
      {sub ? (
        <p className="person-sub" title={sub}>
          {sub}
        </p>
      ) : null}
    </article>
  );
}

export default PersonCard;
