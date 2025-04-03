import { FC } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { BudgetFormData } from "../../schemas/addBudgetSchema.schema";

interface Props {
  register: UseFormRegister<BudgetFormData>;
  error?: FieldError;
  isDarkMode: boolean;
}

const BudgetNameInput: FC<Props> = ({ register, error, isDarkMode }) => (
  <div>
    <label className="block text-sm text-left">Budget Name</label>
    <input
      {...register("name")}
      type="text"
      placeholder="e.g. Monthly Groceries"
      className={`w-full px-3 py-2 border rounded-lg ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-300 text-black"
      }`}
    />
    {error && (
      <p className="text-red-500 text-sm text-left">*{error.message}</p>
    )}
  </div>
);

export default BudgetNameInput;
