import Select from "react-select";

const SortControls = ({
  value,
  onChange,
  options,
  defaultValue,
  disabled = false,
}) => {
  const selected =
    options.find((opt) => opt.value === value) ||
    options.find((opt) => opt.value === defaultValue) ||
    options[0];

  return (
    <div className="sort-controls">
      <Select
        inputId="sort-select"
        unstyled
        classNamePrefix="rs"
        className="sort-select"
        isSearchable={false}
        isDisabled={disabled}
        value={selected}
        options={options}
        onChange={(opt) => onChange(opt.value)}
      />
    </div>
  );
};

export default SortControls;
