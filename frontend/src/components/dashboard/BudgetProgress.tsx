import { useEffect, useState } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";
import { motion } from "framer-motion";
import Spinner from "../common/Spinner";
import Tooltip from "../common/Tooltip";
import { FaInfoCircle } from "react-icons/fa";
import { BudgetWithSpent } from "../../types/budget.types";
import useBudgetService from "../../hooks/useBudgetService";
import { useAppSelector } from "../../app/hooks";
import { selectCurrency } from "../../features/currencySlice";
import { Utils } from "../../utils/Utils";

const BudgetProgress = () => {
  const { isDarkMode } = useDarkMode();
  const { findBudgetsWithSpentForDashboard } = useBudgetService();
  const [budgetData, setBudgetData] = useState<BudgetWithSpent[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(5);
  const [month, setMonth] = useState(Utils.getLast12Months()[0].value);

  const { currencySymbol } = useAppSelector(selectCurrency);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await findBudgetsWithSpentForDashboard(month, limit);
        setBudgetData(data);
      } catch (err) {
        console.error("Failed to fetch budget progress:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [month, limit]);

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div
      className={`p-4 rounded-lg shadow-md transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-gray-900 hover:bg-gray-100"
      }`}
    >
      <div className="flex justify-between items-center mb-2 flex-wrap gap-2">
        <h3 className="text-lg font-semibold flex items-center gap-1">
          Budget Progress
          <Tooltip content="This section shows your budget progress, including how much you've spent and the remaining budget for each category.">
            <FaInfoCircle className="text-blue-500 cursor-pointer" />
          </Tooltip>
        </h3>

        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <label htmlFor="monthSelect" className="font-medium">
              Month:
            </label>
            <select
              id="monthSelect"
              value={month}
              onChange={handleMonthChange}
              className={`px-2 py-1 rounded-md border ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-gray-900 border-gray-300"
              }`}
            >
              {Utils.getLast12Months().map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <label htmlFor="limitSelect" className="font-medium">
              Show Last:
            </label>
            <select
              id="limitSelect"
              value={limit}
              onChange={handleLimitChange}
              className={`px-2 py-1 rounded-md border ${
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-gray-900 border-gray-300"
              }`}
            >
              <option value={5}>5 Budgets</option>
              <option value={10}>10 Budgets</option>
              <option value={15}>15 Budgets</option>
            </select>
          </div>
        </div>
      </div>

      {/* No data */}
      {budgetData?.length === 0 ? (
        <p className="text-gray-500 text-center">No budget data available.</p>
      ) : (
        <div className="mt-2 space-y-4">
          {budgetData?.map((item: BudgetWithSpent) => (
            <div key={item.category}>
              <div className="flex justify-between text-sm">
                <span>{item.category}</span>
                <span>
                  {currencySymbol}
                  {item.spent} / {currencySymbol}
                  {item.monthlyLimit}
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-1 overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.usedPercentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetProgress;
