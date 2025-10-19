const SortControls = ({ value, onChange }) => {
  return (
    <div className="sort-controls">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="date-desc">개봉일 최신순</option>
        <option value="date-asc">개봉일 오래된순</option>
        <option value="vote-desc">평점 높은순</option>
        <option value="vote-asc">평점 낮은순</option>
      </select>
    </div>
  );
};

export default SortControls;
