import React from "react";

interface Props {
  register: any;
  error?: string;
  isDarkMode: boolean;
}

const BudgetNameInput: React.FC<Props> = ({ register, error, isDarkMode }) => (
  <div>
    <label className="block text-sm text-left">Budget Name</label>
    <input
      {...register("name")}
      type="text"
      className={`w-full px-3 py-2 border rounded-lg ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-300 text-black"
      }`}
    />
    {error && <p className="text-red-500 text-sm text-left">*{error}</p>}
  </div>
);

export default BudgetNameInput;
