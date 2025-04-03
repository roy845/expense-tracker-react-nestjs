import { FaSearch } from "react-icons/fa";
import React from "react";
import { SortOrder } from "../../types/sortTypes.types";

interface BudgetsFiltersProps {
  isDarkMode: boolean;
  search: string;
  setSearch: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  order: SortOrder;
  setOrder: (val: SortOrder) => void;
  itemsPerPage: number;
  setItemsPerPage: (val: number) => void;
  startDate: string;
  setStartDate: (val: string) => void;
  endDate: string;
  setEndDate: (val: string) => void;
  searchRef: React.RefObject<HTMLInputElement>;
}

const BudgetsFilters = ({
  isDarkMode,
  search,
  setSearch,
  sortBy,
  setSortBy,
  order,
  setOrder,
  itemsPerPage,
  setItemsPerPage,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  searchRef,
}: BudgetsFiltersProps) => (
  <div className="flex gap-4 items-center mb-4 flex-wrap">
    <div className="relative w-96">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        ref={searchRef}
        type="text"
        placeholder="Search budgets by name or category..."
        className={`pl-10 pr-4 py-2 w-full rounded-lg border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

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
        }}
      >
        {[1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
        <option value={-1}>All</option>
      </select>
    </div>

    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={`px-4 py-2 border rounded-lg focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        <option value="createdAt">Created At</option>
        <option value="name">Name</option>
        <option value="category">Category</option>
      </select>

      <label className="text-sm font-medium">Order:</label>
      <select
        value={order}
        onChange={(e) => setOrder(e.target.value as SortOrder)}
        className={`px-4 py-2 border rounded-lg focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>

    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">From:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className={`px-3 py-2 rounded-lg border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      />
      <label className="text-sm font-medium">To:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className={`px-3 py-2 rounded-lg border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      />
    </div>
  </div>
);

export default BudgetsFilters;
