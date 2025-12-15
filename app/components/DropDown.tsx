import { SortDropdownProps } from "../types";

const DropDown = ({ options, onDropDownChange }: SortDropdownProps) => {
  return (
    <div className="mt-2">
      <select aria-label="Sort shows" name="sort" className="bg-gray-100 p-4 rounded-md" onChange={onDropDownChange}>
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
