import React from "react";
import Select from "react-select";

export default function SelectUi({
  options,
  onChange,
  filterValue,
  placeholder,
}: {
  options: readonly any[];
  onChange: (selectedOption: any) => void;
  filterValue: number;
  placeholder: string;
}) {
  return (
    <Select
      name="category"
      required={true}
      placeholder={placeholder}
      isSearchable={false}
      options={options}
      onChange={onChange}
      value={options.find(
        (option: { value: number; label: string }) =>
          option.value === filterValue
      )}
      className="react-select-container rounded-3xl max-w-sm"
    />
  );
}
