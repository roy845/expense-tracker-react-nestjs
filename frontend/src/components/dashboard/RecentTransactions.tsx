import { useEffect, useState } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";
import CountUp from "react-countup";
import useDashboardMetrics from "../../hooks/useDashboardMetrics";
import Spinner from "../common/Spinner";
import TooltipComponent from "../common/Tooltip";
import { FaInfoCircle } from "react-icons/fa";
import { RecentTransactionsResponse } from "../../types/dashboardMetrics.types";
import { Transaction, TransactionType } from "../../types/transaction.types";
import { Utils } from "../../utils/Utils";
import { useAppSelector } from "../../app/hooks";
import { selectCurrency } from "../../features/currencySlice";

const transactionOptions = [
  { label: "Last 5 transactions", value: 5 },
  { label: "Last 10 transactions", value: 10 },
  { label: "Last 15 transactions", value: 15 },
];

const RecentTransactions = () => {
  const { isDarkMode } = useDarkMode();

  const { currencySymbol } = useAppSelector(selectCurrency);

  const { getRecentTransactions } = useDashboardMetrics();
  const [transactions, setTransactions] = useState<Transaction[]>(
    [] as Transaction[]
  );
  const [selectedCount, setSelectedCount] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const { transactions }: RecentTransactionsResponse =
          await getRecentTransactions(selectedCount);
        setTransactions(transactions);
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
        setError("Failed to load transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedCount]);

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
        <h3 className="text-lg font-semibold flex items-center gap-1">
          Recent Transactions
          <TooltipComponent content="View your most recent financial transactions.">
            <FaInfoCircle className="text-blue-500 cursor-pointer" />
          </TooltipComponent>
        </h3>

        {/* Dropdown for selecting number of transactions */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Show:</label>
          <select
            className={`px-3 py-1 border rounded-md cursor-pointer focus:outline-none transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                : "bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
            }`}
            value={selectedCount}
            onChange={(e) => setSelectedCount(Number(e.target.value))}
          >
            {transactionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions List */}
      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center">
          No recent transactions available.
        </p>
      ) : (
        <ul className="space-y-3">
          {transactions.map((tx: Transaction) => (
            <li
              key={tx._id}
              className="flex justify-between items-center border-b pb-2 last:border-none"
            >
              {/* Left Side: Transaction Name & Date */}
              <div>
                <p className="font-medium">{tx.description}</p>
                <p
                  className={`text-sm text-left ${
                    isDarkMode ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {Utils.formatDate(tx.date)}
                </p>
              </div>

              {/* Right Side: Amount & Type */}
              <div className="flex items-center space-x-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-md ${
                    tx.type === TransactionType.Income
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {tx.type === TransactionType.Income ? "Income" : "Expense"}
                </span>
                <span
                  className={`font-semibold text-lg ${
                    tx.type === TransactionType.Income
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {/* Animated Number */}
                  <CountUp
                    start={0}
                    end={Math.abs(tx.amount)}
                    duration={1.5}
                    separator=","
                    prefix={
                      tx.type === TransactionType.Expense
                        ? `-${currencySymbol}`
                        : `+${currencySymbol}`
                    }
                    decimals={2}
                  />
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;
