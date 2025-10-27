import arrowNext from "../../../assets/icons/arrow-icon-next.svg";
import arrowPrev from "../../../assets/icons/arrow-icon-prev.svg";

const SectionHeader = ({
  title,
  desc,
  pageInfo,
  children,
  hasNav = true,
  navId,
}) => {
  return (
    <>
      <div className="section-header section-header--bar">
        <h2 className="section-title">{title}</h2>

        {children}

        {hasNav && (
          <div className="section-nav">
            <button className="section-prev" data-nav={navId}>
              <img src={arrowPrev} alt="이전 버튼" />
            </button>
            <button className="section-next" data-nav={navId}>
              <img src={arrowNext} alt="다음 버튼" />
            </button>
          </div>
        )}
      </div>

      {(desc || pageInfo) && (
        <div className="section-info">
          <p className="section-desc">{desc}</p>
          {pageInfo && <p className="section-page">{pageInfo}</p>}
        </div>
      )}
    </>
  );
};

export default SectionHeader;
