import { useState, useEffect } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDashboardMetrics from "../../hooks/useDashboardMetrics";
import Spinner from "../common/Spinner";
import {
  ExpenseTrendsType,
  TimeRanges,
} from "../../types/dashboardMetrics.types";
import { FaInfoCircle } from "react-icons/fa";
import TooltipComponent from "../common/Tooltip";
import CustomTooltip from "./CustomTooltip";

const timeRanges = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
  { label: "Last 3 months", value: 90 },
  { label: "Last 6 months", value: 180 },
  { label: "Last year", value: 365 },
];

const ExpenseTrends = () => {
  const { isDarkMode } = useDarkMode();
  const { getExpenseTrends } = useDashboardMetrics();
  const [selectedRange, setSelectedRange] = useState(30);
  const [expenseData, setExpenseData] = useState<ExpenseTrendsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getExpenseTrends(selectedRange);
        setExpenseData(data.expenses);
      } catch (err) {
        console.error("Failed to fetch expense trends:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedRange]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div
      className={`p-4 rounded-lg shadow-md transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-gray-900 hover:bg-gray-100"
      }`}
    >
      {/* Title & Tooltip */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          Expense Trends
          <TooltipComponent content="This chart shows how your expenses have changed over time based on the selected period. Use it to track spending trends and identify any unusual spikes.">
            <FaInfoCircle className="text-blue-500 cursor-pointer" />
          </TooltipComponent>
        </h3>

        {/* Dropdown & Tooltip */}
        <div className="relative flex items-center gap-2">
          <select
            className={`px-3 py-1 border rounded-md cursor-pointer focus:outline-none ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
            }`}
            value={selectedRange}
            onChange={(e) => setSelectedRange(Number(e.target.value))}
          >
            {timeRanges.map((range: TimeRanges) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>

          {/* ✅ Tooltip is now ONLY on the info icon, NOT on select */}
          <TooltipComponent content="Select a time range to view your expense trends over different periods.">
            <FaInfoCircle className="text-blue-500 cursor-pointer" />
          </TooltipComponent>
        </div>
      </div>

      {/* Expense Chart */}
      <div className="mt-20 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={expenseData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? "#4B5563" : "#E5E7EB"}
            />
            <XAxis dataKey="date" stroke={isDarkMode ? "#E5E7EB" : "#374151"} />
            <YAxis stroke={isDarkMode ? "#E5E7EB" : "#374151"} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseTrends;
