import React, { useState } from 'react';

type DropdownProps = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export const Dropdown = ({ options, selected, onSelect }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 border bg-white rounded shadow"
      >
        {selected} ▾
      </button>
      {open && (
        <ul className="absolute mt-2 bg-white border rounded shadow w-full z-10">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
