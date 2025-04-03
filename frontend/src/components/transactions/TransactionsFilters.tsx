import { FaFileExcel, FaSearch, FaTrash } from "react-icons/fa";
import {
  TransactionType,
  Category,
  PaymentMethod,
  Transaction,
} from "../../types/transaction.types";

interface Props {
  isDarkMode: boolean;
  handleSearchChange: (value: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
  setPage: (page: number) => void;
  selectedType: TransactionType | "all";
  setSelectedType: (value: TransactionType | "all") => void;
  selectedCategory: Category | "all";
  setSelectedCategory: (value: Category | "all") => void;
  selectedPayment: PaymentMethod | "all";
  setSelectedPayment: (value: PaymentMethod | "all") => void;
  sortBy: "date" | "amount" | "description" | "category";
  setSortBy: (value: "date" | "amount" | "description" | "category") => void;
  order: "ASC" | "DESC";
  setOrder: (value: "ASC" | "DESC") => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  minAmount?: number;
  setMinAmount: (value: number | undefined) => void;
  maxAmount?: number;
  setMaxAmount: (value: number | undefined) => void;
  transactions: Transaction[];
  setIsDeleteAllModalOpen: (isOpen: boolean) => void;
  setIsExportModalOpen: (isOpen: boolean) => void;
}

const TransactionsFilters = ({
  isDarkMode,
  endDate,
  handleSearchChange,
  itemsPerPage,
  order,
  selectedCategory,
  selectedPayment,
  selectedType,
  setEndDate,
  setIsDeleteAllModalOpen,
  setIsExportModalOpen,
  setItemsPerPage,
  setMaxAmount,
  setMinAmount,
  setOrder,
  setPage,
  setSelectedCategory,
  setSelectedPayment,
  setSelectedType,
  setSortBy,
  setStartDate,
  sortBy,
  startDate,
  transactions,
  maxAmount,
  minAmount,
}: Props) => {
  return (
    <div className="flex gap-4 mb-4">
      {/* Search Input */}

      <div className="relative w-96">
        {" "}
        {/* Increased width */}
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search transactions..."
          className={`pl-10 pr-4 py-2 w-full rounded-lg border focus:outline-none ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300"
          }`}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      {/* Items Per Page Selection */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">Items per page:</label>
        <select
          className={`px-4 py-2 border rounded-lg focus:outline-none ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
          value={itemsPerPage}
          onChange={(e) => {
            const value = Number(e.target.value);
            setItemsPerPage(value);
            setPage(1);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
          <option value="35">35</option>
          <option value="40">40</option>
          <option value="45">45</option>
          <option value="50">50</option>
          <option value={-1}>All</option> {/* All Transactions */}
        </select>
      </div>

      {/* Type Select */}
      <select
        className={`px-4 py-2 rounded-lg border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
        value={selectedType}
        onChange={(e) =>
          setSelectedType(e.target.value as TransactionType | "all")
        }
      >
        <option value="all">All Types</option>
        <option value={TransactionType.Income}>Income</option>
        <option value={TransactionType.Expense}>Expense</option>
      </select>

      {/* Category Select */}
      <select
        className={`px-4 py-2 rounded-lg border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value as Category | "all")
        }
      >
        <option value="all">All Categories</option>
        {Object.values(Category).map((cat: Category) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Payment Select */}
      <select
        className={`px-4 py-2 rounded-lg border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
        value={selectedPayment}
        onChange={(e) =>
          setSelectedPayment(e.target.value as PaymentMethod | "all")
        }
      >
        <option value="all">All Payments</option>
        {Object.values(PaymentMethod).map((pay: PaymentMethod) => (
          <option key={pay} value={pay}>
            {pay}
          </option>
        ))}
      </select>

      {/* Sort By */}
      <select
        className={`px-4 py-2 rounded-lg border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
        value={sortBy}
        onChange={(e) =>
          setSortBy(
            e.target.value as "date" | "amount" | "description" | "category"
          )
        }
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
        <option value="description">Sort by Description (A-Z)</option>
        <option value="category">Sort by Category (A-Z)</option>
      </select>

      {/* Sort Order */}
      <select
        className={`px-4 py-2 rounded-lg border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
        value={order}
        onChange={(e) => setOrder(e.target.value as "ASC" | "DESC")}
      >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>

      {/* Date Range Filters */}
      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium">Start Date:</label>
        <input
          type="date"
          className={`px-4 py-2 border rounded-lg focus:outline-none ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <label className="text-sm font-medium">End Date:</label>
        <input
          type="date"
          className={`px-4 py-2 border rounded-lg focus:outline-none ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Amount Range Filters */}
      <div className="flex gap-4 items-center">
        <label className="text-sm font-medium">Min Amount:</label>
        <input
          type="number"
          min={0}
          placeholder="Min"
          className={`px-4 py-2 border rounded-lg focus:outline-none ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
          value={minAmount || ""}
          onChange={(e) =>
            setMinAmount(e.target.value ? Number(e.target.value) : undefined)
          }
        />

        <label className="text-sm font-medium">Max Amount:</label>
        <input
          type="number"
          placeholder="Max"
          className={`px-4 py-2 border rounded-lg focus:outline-none ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
          value={maxAmount || ""}
          min={0}
          onChange={(e) =>
            setMaxAmount(e.target.value ? Number(e.target.value) : undefined)
          }
        />
        {transactions.length > 0 && (
          <>
            <button
              onClick={() => setIsDeleteAllModalOpen(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-md ${
                isDarkMode
                  ? "bg-red-700 hover:bg-red-800 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
            >
              <FaTrash className="text-lg" size={20} />
            </button>

            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition-all"
            >
              <FaFileExcel className="text-lg" size={20} />
            </button>
          </>
        )}
      </div>

      {/* Reset Button */}
      {/* {(search ||
            sortBy !== "date" ||
            order !== "DESC" ||
            selectedType !== "all" ||
            selectedCategory !== "all" ||
            page !== 1) && (
            <button
              className=" bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 shadow-md"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          )} */}
    </div>
  );
};

export default TransactionsFilters;
