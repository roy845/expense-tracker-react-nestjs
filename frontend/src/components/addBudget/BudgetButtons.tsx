import { FC } from "react";

interface Props {
  onCancel: () => void;
  isDarkMode: boolean;
}

const BudgetButtons: FC<Props> = ({ onCancel, isDarkMode }) => (
  <div className="flex justify-end gap-2 mt-4">
    <button
      type="button"
      onClick={onCancel}
      className={`px-4 py-2 rounded-lg ${
        isDarkMode
          ? "bg-gray-700 text-white hover:bg-gray-600"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
    >
      Cancel
    </button>
    <button
      type="submit"
      className={`px-4 py-2 rounded-lg ${
        isDarkMode
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-blue-700 text-white hover:bg-blue-900"
      }`}
    >
      Create Budget
    </button>
  </div>
);

export default BudgetButtons;
