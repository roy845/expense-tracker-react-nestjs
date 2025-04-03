import { FaSearch } from "react-icons/fa";

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  isDarkMode: boolean;
}

const UserSearchAndFilters = ({
  searchTerm,
  setSearchTerm,
  pageSize,
  setPageSize,
  isDarkMode,
}: Props) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
    <div className="relative w-full md:w-96">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        placeholder="Search users by username or email..."
        className={`pl-10 pr-3 py-2 rounded border w-full ${
          isDarkMode
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-white text-black border-gray-300"
        }`}
      />
    </div>
    <select
      className={`px-2 py-2 rounded border ${
        isDarkMode
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-black border-gray-300"
      }`}
      value={pageSize}
      onChange={(e) => setPageSize(Number(e.target.value))}
    >
      {[1, 2, 3, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, -1].map((size) => (
        <option key={size} value={size}>
          {size === -1 ? "All" : size}
        </option>
      ))}
    </select>
  </div>
);

export default UserSearchAndFilters;
