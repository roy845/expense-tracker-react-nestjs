import { useAppSelector } from "../../app/hooks";
import { selectCurrency } from "../../features/currencySlice";
import { useDarkMode } from "../../hooks/useDarkMode";

const CustomTooltip = ({ active, payload, label }: any) => {
  const { isDarkMode } = useDarkMode();
  const { currencySymbol } = useAppSelector(selectCurrency);

  if (active && payload && payload.length) {
    return (
      <div
        className={`p-2 rounded-md shadow-md text-sm ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
        }`}
      >
        <p className="font-semibold">{label}</p>
        <p>
          Expense: {currencySymbol}
          {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
