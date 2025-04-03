import { SortOrder } from "../../types/sortTypes.types";
import { FaSearch } from "react-icons/fa";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  itemsPerPage: number;
  setItemsPerPage: (val: number) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  order: SortOrder;
  setOrder: (val: SortOrder) => void;
  isDarkMode: boolean;
}

const RolesSearchAndFilters = ({
  search,
  setSearch,
  itemsPerPage,
  setItemsPerPage,
  sortBy,
  setSortBy,
  order,
  setOrder,
  isDarkMode,
}: Props) => (
  <div className="flex flex-wrap gap-4 items-center mb-4">
    {/* Search */}
    <div className="relative w-96">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search roles by name..."
        className={`pl-10 pr-4 py-2 w-full rounded-lg border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300"
        }`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* Items per page */}
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Items per page:</label>
      <select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        className={`px-4 py-2 border rounded-lg focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        {[1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, -1].map((val) => (
          <option key={val} value={val}>
            {val === -1 ? "All" : val}
          </option>
        ))}
      </select>
    </div>

    {/* Sorting */}
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
        <option value="name">Name</option>
        <option value="createdAt">Created At</option>
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
  </div>
);

export default RolesSearchAndFilters;
