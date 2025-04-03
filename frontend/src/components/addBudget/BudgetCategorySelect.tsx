import { FC } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { BudgetFormData } from "../../schemas/addBudgetSchema.schema";
import { Category } from "../../types/transaction.types";

interface Props {
  register: UseFormRegister<BudgetFormData>;
  error?: FieldError;
  selectedCategory: string;
  totalCategoryExpenses: number;
  monthlyLimit: number;
  isDarkMode: boolean;
}

const BudgetCategorySelect: FC<Props> = ({
  register,
  error,
  selectedCategory,
  totalCategoryExpenses,
  monthlyLimit,
  isDarkMode,
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
        🚨 This category already has ${totalCategoryExpenses.toFixed(2)} in
        expenses.
      </p>
    )}

    {error && (
      <p className="text-red-500 text-sm text-left">*{error.message}</p>
    )}
  </div>
);

export default BudgetCategorySelect;
