import searchIcon from "../../assets/icons/search.svg";
import avatarIcon from "../../assets/icons/avatar.svg";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src="/logo.png" alt="로고" />
      </div>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search Movie"
        />
        <button className="search-btn">
          <img src={searchIcon} alt="검색 버튼" />
        </button>
      </div>
      <button className="user-btn">
        <img src={avatarIcon} alt="사용자 프로필" />
      </button>
    </div>
  );
};

export default Header;
