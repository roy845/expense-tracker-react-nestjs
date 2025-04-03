import React from "react";
import { Category } from "../../types/transaction.types";

interface Props {
  register: any;
  error?: string;
  isDarkMode: boolean;
  selectedCategory: string;
  totalCategoryExpenses: number;
  monthlyLimit: number;
}

const CategorySelect: React.FC<Props> = ({
  register,
  error,
  isDarkMode,
  selectedCategory,
  totalCategoryExpenses,
  monthlyLimit,
}) => (
  <div>
    <label className="block text-sm text-left">Category</label>
    <select
      {...register("category")}
      className={`w-full px-3 py-2 border rounded-lg ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-300 text-black"
      }`}
    >
      {Object.values(Category).map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    {totalCategoryExpenses > monthlyLimit && (
      <p className="text-red-500 text-sm mt-1">
        🚨 Warning: This category already has $
        {totalCategoryExpenses.toFixed(2)} in expenses.
      </p>
    )}
    {error && <p className="text-red-500 text-sm text-left">*{error}</p>}
  </div>
);

export default CategorySelect;
