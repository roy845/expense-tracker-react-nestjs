import { FaSearch } from "react-icons/fa";

interface Props {
  isDarkMode: boolean;
}

const RolesEmptyState = ({ isDarkMode }: Props) => (
  <div className="flex flex-col items-center justify-center py-16">
    <FaSearch
      size={48}
      className={`mb-4 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
    />
    <p
      className={`text-xl font-semibold ${
        isDarkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      No roles found
    </p>
    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
      Try adjusting your filters or search query.
    </p>
  </div>
);

export default RolesEmptyState;
