import { format } from "date-fns";
import { useDarkMode } from "../../hooks/useDarkMode";
import { useAppSelector } from "../../app/hooks";
import { selectCurrency } from "../../features/currencySlice";

type TotalBudgetProps = {
  totalBudget: number;
  totalSpent: number;
  budgetCount: number;
};

const TotalBudget = ({
  totalBudget,
  totalSpent,
  budgetCount,
}: TotalBudgetProps) => {
  const { isDarkMode } = useDarkMode();
  const percentageSpent =
    totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  // 🔹 Ensure the progress bar does not exceed 100%
  const progressBarWidth = Math.min(100, percentageSpent);
  const isOverBudget = totalSpent > totalBudget;

  const currentMonth = format(new Date(), "MMMM yyyy");
  const { currencySymbol } = useAppSelector(selectCurrency);

  return (
    <div
      className={`mb-4 p-6 border rounded-lg shadow-sm ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-300 text-gray-900"
      }`}
    >
      {/* 🔹 Header */}
      <h2 className="text-lg font-semibold">Total Budget</h2>
      <p className="text-3xl font-bold">
        {currencySymbol} {totalBudget.toFixed(2)}
      </p>
      <p className={`text-sm ${isDarkMode ? "text-white" : "text-gray-500"}`}>
        for this month
      </p>

      {/* 🔹 Active Budgets Count */}
      <p className={`text-sm ${isDarkMode ? "text-white" : "text-gray-500"}`}>
        {budgetCount} active budgets
      </p>

      {/* 🔹 Progress Bar Info */}
      <div className="flex justify-between items-center mt-3">
        <span
          className={`text-sm ${isDarkMode ? "text-white" : "text-gray-600"}`}
        >
          {currencySymbol}
          {totalSpent.toFixed(2)} spent of {currencySymbol}
          {totalBudget.toFixed(2)}
        </span>
      </div>

      {/* 🔹 Progress Bar */}
      <div className="mt-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full relative">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: `${progressBarWidth}%`,
            backgroundColor: isOverBudget ? "red" : "blue", // ✅ Change to red when over budget
          }}
        ></div>

        {/* 🔹 Show Warning When Over Budget */}
        <span
          className={`absolute left-0 -bottom-5 text-sm font-semibold ${
            isOverBudget
              ? "text-red-500 dark:text-red-400"
              : "text-blue-600 dark:text-blue-400"
          }`}
        >
          {isOverBudget
            ? "🚨 Over Budget!"
            : `${Math.min(100, percentageSpent).toFixed(0)}% used`}
        </span>
      </div>

      {/* 🔹 Current Month */}
      <p
        className={`text-sm mt-4 ${
          isDarkMode ? "text-white" : "text-gray-500"
        }`}
      >
        Current month: {currentMonth}
      </p>
    </div>
  );
};

export default TotalBudget;
