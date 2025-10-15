import arrowNext from "../../../assets/icons/arrow-icon-next.svg";
import arrowPrev from "../../../assets/icons/arrow-icon-prev.svg";

const SectionHeader = ({ title, desc, children, hasNav = true }) => {
  return (
    <>
      <div className="section-header section-header--bar">
        <h2 className="section-title">{title}</h2>

        {children}

        {hasNav && (
          <div className="section-nav">
            <button className="section-prev">
              <img src={arrowPrev} alt="이전 버튼" />
            </button>
            <button className="section-next">
              <img src={arrowNext} alt="다음 버튼" />
            </button>
          </div>
        )}
      </div>

      <p className="section-desc">{desc}</p>
    </>
  );
};

export default SectionHeader;
