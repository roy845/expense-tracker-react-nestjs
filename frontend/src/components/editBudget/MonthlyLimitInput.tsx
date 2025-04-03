import React from "react";

interface Props {
  register: any;
  error?: string;
  isDarkMode: boolean;
  currencySymbol: string;
}

const MonthlyLimitInput: React.FC<Props> = ({
  register,
  error,
  isDarkMode,
  currencySymbol,
}) => (
  <div>
    <label className="block text-sm text-left">Monthly Limit</label>
    <div className="relative">
      <span
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-bold ${
          isDarkMode ? "text-white" : "text-gray-600"
        }`}
      >
        {currencySymbol}
      </span>
      <input
        {...register("monthlyLimit", { valueAsNumber: true })}
        type="number"
        step="any"
        className={`w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-gray-100 border-gray-300 text-black"
        }`}
      />
    </div>
    {error && <p className="text-red-500 text-sm text-left">*{error}</p>}
  </div>
);

export default MonthlyLimitInput;
