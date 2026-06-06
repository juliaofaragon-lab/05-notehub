import type { ChangeEventHandler } from "react";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search notes"
      aria-label="Search notes"
    />
  );
};

export default SearchBox;
