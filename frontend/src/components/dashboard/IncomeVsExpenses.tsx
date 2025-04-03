import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";
import MonthSelector from "./MonthSelector";
import { IncomeVsExpensesType } from "../../types/dashboardMetrics.types";
import { useDarkMode } from "../../hooks/useDarkMode";
import Spinner from "../common/Spinner";
import useDashboardMetrics from "../../hooks/useDashboardMetrics";
import { FaInfoCircle } from "react-icons/fa";
import TooltipComponent from "../common/Tooltip";
import { useAppSelector } from "../../app/hooks";
import { selectCurrency } from "../../features/currencySlice";
import { Utils } from "../../utils/Utils";

const IncomeVsExpenses: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { getIncomeVsExpenses } = useDashboardMetrics();
  const [selectedMonth, setSelectedMonth] = useState(Utils.getCurrentMonth());
  const [data, setData] = useState<IncomeVsExpensesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { currencySymbol } = useAppSelector(selectCurrency);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-2 rounded-md shadow-md text-sm ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
          }`}
        >
          <p className="font-semibold mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="capitalize">
              {entry.name}: {currencySymbol}
              {entry.value}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getIncomeVsExpenses(selectedMonth);
        setData(response);
      } catch (err) {
        console.error("Failed to fetch Income vs Expenses:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

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
      {/* Header with Tooltip */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1">
          <h3 className="text-lg font-semibold">Income vs Expenses</h3>
          <TooltipComponent content="This chart compares your total income and expenses for the selected month.">
            <FaInfoCircle className="text-blue-400 cursor-pointer text-sm" />
          </TooltipComponent>
        </div>

        <MonthSelector
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div>

      {/* Show message if no data is available */}
      {data.length === 0 ? (
        <p className="text-gray-500 text-center">
          No data available for this month.
        </p>
      ) : (
        <div className="w-full flex justify-center items-center min-h-[350px]">
          <BarChart width={500} height={300} data={data} className="mx-auto">
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? "#4B5563" : "#E5E7EB"}
            />
            <XAxis dataKey="date" stroke={isDarkMode ? "#E5E7EB" : "#374151"} />
            <YAxis stroke={isDarkMode ? "#E5E7EB" : "#374151"} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="income" fill="#16a34a" />
            <Bar dataKey="expenses" fill="#ef4444" />
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default IncomeVsExpenses;
