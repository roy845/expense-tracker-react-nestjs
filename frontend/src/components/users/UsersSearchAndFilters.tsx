import { FaSearch } from "react-icons/fa";
import { SortOrder } from "../../types/sortTypes.types";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (val: number) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  order: SortOrder;
  setOrder: (val: SortOrder) => void;
  startDate: string;
  setStartDate: (val: string) => void;
  endDate: string;
  setEndDate: (val: string) => void;
  isDarkMode: boolean;
}

const UsersSearchAndFilters = ({
  search,
  setSearch,
  itemsPerPage,
  setItemsPerPage,
  sortBy,
  setSortBy,
  order,
  setOrder,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isDarkMode,
}: Props) => (
  <div className="flex flex-wrap gap-4 items-center mb-4">
    <div className="relative w-96">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search users by username or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`pl-10 pr-4 py-2 w-full rounded-lg border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
      />
    </div>

    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Items per page:</label>
      <select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        className={`px-4 py-2 rounded-lg border ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
      >
        {[1, 2, 3, 5, 10, 15, 20, 25, 50, -1].map((val) => (
          <option key={val} value={val}>
            {val === -1 ? "All" : val}
          </option>
        ))}
      </select>
    </div>

    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Sort by:</label>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={`px-4 py-2 rounded-lg border ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
      >
        <option value="username">Username</option>
        <option value="email">Email</option>
        <option value="createdAt">Created At</option>
      </select>

      <label className="text-sm font-medium">Order:</label>
      <select
        value={order}
        onChange={(e) => setOrder(e.target.value as SortOrder)}
        className={`px-4 py-2 rounded-lg border ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
      >
        <option value="ASC">ASC</option>
        <option value="DESC">DESC</option>
      </select>
    </div>

    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">From:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className={`px-3 py-2 rounded-lg border ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
      />
      <label className="text-sm font-medium">To:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className={`px-3 py-2 rounded-lg border ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
      />
    </div>
  </div>
);

export default UsersSearchAndFilters;
