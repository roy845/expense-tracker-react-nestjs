import React from "react";

interface Props {
  selected: string;
  onChange: (value: string) => void;
  currencies: string[];
  isDarkMode: boolean;
}

const CurrencySelector: React.FC<Props> = ({
  selected,
  onChange,
  currencies,
  isDarkMode,
}) => (
  <select
    value={selected}
    onChange={(e) => onChange(e.target.value)}
    className={`p-3 border rounded-lg focus:ring-2 ${
      isDarkMode
        ? "bg-gray-700 text-white border-gray-600 focus:ring-blue-400"
        : "bg-gray-100 border-gray-300 focus:ring-blue-600"
    }`}
  >
    {currencies.map((currency) => (
      <option key={currency} value={currency}>
        {currency}
      </option>
    ))}
  </select>
);

export default CurrencySelector;
