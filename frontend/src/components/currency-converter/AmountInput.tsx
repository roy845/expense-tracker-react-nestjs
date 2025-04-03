import React from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
  isDarkMode: boolean;
}

const AmountInput: React.FC<Props> = ({ value, onChange, isDarkMode }) => (
  <input
    type="number"
    value={value}
    onChange={(e) => onChange(parseFloat(e.target.value))}
    min="1"
    className={`w-full md:w-1/3 p-3 border rounded-lg focus:ring-2 ${
      isDarkMode
        ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400"
        : "bg-gray-100 border-gray-300 focus:ring-blue-600"
    }`}
  />
);

export default AmountInput;
