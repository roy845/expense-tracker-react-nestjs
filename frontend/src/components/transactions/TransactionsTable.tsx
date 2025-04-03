import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa6";
import { Transaction, TransactionType } from "../../types/transaction.types";
import Spinner from "../common/Spinner";
import { format } from "date-fns";
import { FaEdit } from "react-icons/fa";
import {
  PERMISSION_EDIT_TRANSACTION,
  PERMISSION_REMOVE_TRANSACTION,
} from "../../constants/permissionsConstants";
import TransactionsNotFound from "./TransactionsNotFound";

interface Props {
  loading: boolean;
  transactions: Transaction[];
  isDarkMode: boolean;
  setSortBy: (field: "date" | "amount" | "description" | "category") => void;
  currencySymbol: string;
  permissions: string[];
  navigate: (path: string) => void;
  handleDeleteClick: (id: string) => void;
}

const TransactionsTable = ({
  currencySymbol,
  handleDeleteClick,
  isDarkMode,
  loading,
  navigate,
  permissions,
  setSortBy,
  transactions,
}: Props) => {
  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner />
        </div>
      ) : transactions.length === 0 ? (
        <TransactionsNotFound />
      ) : (
        <table
          className={`w-full border-collapse border ${
            isDarkMode ? "border-gray-600" : "border-gray-300"
          }`}
        >
          {/* Table Header */}
          <thead
            className={`text-left ${
              isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}
          >
            <tr>
              <th className="p-2 text-center">#</th>
              <th
                className="p-2 text-center cursor-pointer"
                onClick={() => setSortBy("description")}
              >
                Description
              </th>
              <th
                className="p-2 text-center cursor-pointer"
                onClick={() => setSortBy("amount")}
              >
                Amount
              </th>
              <th
                className="p-2 text-center cursor-pointer"
                onClick={() => setSortBy("category")}
              >
                Category
              </th>
              <th className="p-2 text-center">Type</th>
              <th className="p-2 text-center">Payment</th>
              <th
                className="p-2 text-center cursor-pointer"
                onClick={() => setSortBy("date")}
              >
                Date
              </th>
              <th className="p-2 text-center">Recurring</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {transactions.map((transaction: Transaction, index) => (
              <tr
                key={transaction._id}
                className={`border-t transition-all duration-200 cursor-pointer ${
                  isDarkMode
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">
                  {transaction.description}
                  <div className="flex flex-wrap justify-center items-center mt-1 gap-1">
                    {transaction.tags?.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-blue-200 text-blue-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-2 flex items-center justify-center gap-2 font-bold">
                  {transaction.type === TransactionType.Income ? (
                    <FaArrowUp className="text-green-500 mt-4" />
                  ) : (
                    <FaArrowDown className="text-red-500 mt-4" />
                  )}
                  <span
                    className={
                      transaction.type === TransactionType.Income
                        ? "text-green-500 mt-4"
                        : "text-red-500 mt-4"
                    }
                  >
                    {currencySymbol} {transaction.amount.toFixed(2)}
                  </span>
                </td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      isDarkMode
                        ? "bg-gray-600 text-gray-200"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {transaction.category}
                  </span>
                </td>
                <td
                  className={`p-2 font-bold ${
                    transaction.type === TransactionType.Income
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.type}
                </td>
                <td className="p-2">{transaction.paymentMethod}</td>
                <td className="p-2">
                  {format(new Date(transaction.date), "dd/MM/yyyy")}
                </td>
                <td className="p-2 text-center">
                  {transaction.recurringTransaction ? (
                    <span className="px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">
                      Yes
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded-full">
                      No
                    </span>
                  )}
                </td>
                <td className="p-2 w-full h-full flex justify-center items-center gap-2">
                  {permissions.includes(PERMISSION_EDIT_TRANSACTION) && (
                    <button
                      className="text-blue-500"
                      onClick={() =>
                        navigate(`/edit-transaction/${transaction._id}`)
                      }
                    >
                      <FaEdit />
                    </button>
                  )}
                  {permissions.includes(PERMISSION_REMOVE_TRANSACTION) && (
                    <button
                      className="text-red-500"
                      onClick={() => handleDeleteClick(transaction._id)}
                    >
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsTable;
