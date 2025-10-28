import githubLogo from "@assets/icons/github-logo.png";
import tmdbLogo from "@assets/icons/tmdb-logo.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/logo.png" alt="사이트 로고" className="footer-logo" />
          <p className="footer-desc">
            영화의 모든 정보를 한눈에 — powered by TMDB API
          </p>
        </div>

        <ul className="footer-links">
          <li>
            <a href="#">서비스 소개</a>
          </li>
          <li>
            <a href="#">개인정보 처리방침</a>
          </li>
          <li>
            <a href="#">이용약관</a>
          </li>
          <li>
            <a href="#">문의하기</a>
          </li>
        </ul>
        <div className="footer-social">
          <a
            href="https://github.com/bboroin/ari-tmdb-react"
            target="_blank"
            rel="noreferrer"
          >
            <img src={githubLogo} alt="GitHub" className="github-logo" />
          </a>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={tmdbLogo} alt="TMDB" className="tmdb-logo" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} ARI MOVIE | Powered by TMDB
        </p>
        <p className="footer-notice">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
