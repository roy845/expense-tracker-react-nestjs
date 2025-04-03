import { FaArrowUp, FaArrowDown, FaDollarSign } from "react-icons/fa";
import { useDarkMode } from "../../hooks/useDarkMode";
import CountUp from "react-countup";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectCurrency, setCurrency } from "../../features/currencySlice";
import useUserService from "../../hooks/useUserService";

type DashboardCardProps = {
  title: ReactNode;
  amount: number;
  type: string;
};

const DashboardCard = ({ title, amount, type }: DashboardCardProps) => {
  const { isDarkMode } = useDarkMode();
  const { currencySymbol } = useAppSelector(selectCurrency);

  const numericAmount = parseFloat(amount.toString());

  const icon =
    type === "income" ? (
      <FaArrowUp className="text-green-500" />
    ) : type === "expenses" ? (
      <FaArrowDown className="text-red-500" />
    ) : type === "change" ? (
      numericAmount < 0 ? (
        <FaArrowDown className="text-red-500" />
      ) : (
        <FaArrowUp className="text-green-500" />
      )
    ) : (
      <FaDollarSign className="text-blue-500" />
    );

  return (
    <div
      className={`p-4 rounded-lg shadow-md flex items-center justify-between transition-all duration-300
      ${
        isDarkMode
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-gray-900 hover:bg-gray-100"
      }`}
    >
      <div>
        <h3 className="text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="text-2xl font-semibold">
          {/* Animated Number */}
          <CountUp
            start={0}
            end={+amount}
            duration={1.5}
            separator=","
            prefix={`${currencySymbol}`}
            decimals={2}
          />
        </p>
      </div>
      {icon}
    </div>
  );
};

export default DashboardCard;
