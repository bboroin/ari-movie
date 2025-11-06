import Select from "react-select";

const options = [
  { value: "date-desc", label: "개봉일 최신순" },
  { value: "date-asc", label: "개봉일 오래된순" },
  { value: "vote-desc", label: "평점 높은순" },
  { value: "vote-asc", label: "평점 낮은순" },
];

const SortControls = ({ value, onChange }) => {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="sort-controls">
      <Select
        unstyled
        classNamePrefix="rs"
        className="sort-select"
        value={selectedOption}
        onChange={(option) => onChange(option.value)}
        options={options}
        isSearchable={false}
      />
    </div>
  );
};

export default SortControls;
