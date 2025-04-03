import { useDarkMode } from "../../hooks/useDarkMode";
import { Utils } from "../../utils/Utils";
import Tooltip from "../common/Tooltip";
import { FaInfoCircle } from "react-icons/fa";

interface MonthSelectorProps {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
}

const MonthSelector = ({
  selectedMonth,
  setSelectedMonth,
}: MonthSelectorProps) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="flex justify-center items-center gap-2 relative">
      <Tooltip content="Select a month to filter the data displayed on the charts and tables.">
        <FaInfoCircle className="text-blue-500 cursor-pointer" />
      </Tooltip>
      <label className="text-sm font-medium flex items-center gap-1">
        Select Month:
      </label>
      <select
        className={`px-3 py-1 border rounded-md transition-all duration-200 cursor-pointer focus:outline-none focus:ring ${
          isDarkMode
            ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600 focus:ring-blue-500"
            : "bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200 focus:ring-blue-300"
        }`}
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {Utils.getLast12Months().map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelector;
