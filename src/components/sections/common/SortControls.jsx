import Select from "react-select";
import { SERVER_SORT_OPTIONS, DEFAULT_SERVER_SORT } from "@utils/sort";

const SortControls = ({ value, onChange, disabled = false }) => {
  const selected =
    SERVER_SORT_OPTIONS.find((opt) => opt.value === value) ||
    SERVER_SORT_OPTIONS.find((opt) => opt.value === DEFAULT_SERVER_SORT);

  return (
    <div className="sort-controls">
      <Select
        inputId="server-sort"
        unstyled
        classNamePrefix="rs"
        className="sort-select"
        isSearchable={false}
        isDisabled={disabled}
        value={selected}
        options={SERVER_SORT_OPTIONS}
        onChange={(opt) => onChange(opt.value)}
      />
    </div>
  );
};

export default SortControls;
