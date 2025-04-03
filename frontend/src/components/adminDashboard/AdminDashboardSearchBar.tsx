import { FaSearch } from "react-icons/fa";

interface AdminDashboardSearchBarProps {
  search: string;
  setSearch: (val: string) => void;
  isDarkMode: boolean;
}

const AdminDashboardSearchBar = ({
  search,
  setSearch,
  isDarkMode,
}: AdminDashboardSearchBarProps) => (
  <div className="relative w-full sm:w-1/2">
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    <input
      type="text"
      placeholder="Search modules..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className={`w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none transition-all ${
        isDarkMode
          ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
          : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
      }`}
    />
  </div>
);

export default AdminDashboardSearchBar;
