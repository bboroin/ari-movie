import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import searchIcon from "../../assets/icons/search.svg";
import avatarIcon from "../../assets/icons/avatar.svg";

const Header = () => {
  const [query, setQuery] = useState(""); // 검색어 상태
  const navigate = useNavigate(); // 라우팅 이동 함수

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return; // 빈 값 방지
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.png" alt="로고" />
      </div>
      <form className="search-container" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          placeholder="영화 검색..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-btn">
          <img src={searchIcon} alt="검색 버튼" />
        </button>
      </form>
      <button className="user-btn">
        <img src={avatarIcon} alt="사용자 프로필" />
      </button>
    </div>
  );
};

export default Header;
