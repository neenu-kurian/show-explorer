import { SortDropdownProps } from "../types";

const DropDown = ({ options, onDropDownChange }: SortDropdownProps) => {
  return (
    <div className="mt-2">
      <select name="sort" className="bg-white p-4 rounded-md" onChange={onDropDownChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
