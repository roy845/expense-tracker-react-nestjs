import { FaSearch } from "react-icons/fa";

interface Props {
  isDarkMode: boolean;
}

const UsersEmptyState = ({ isDarkMode }: Props) => (
  <div className="flex flex-col items-center justify-center py-20">
    <FaSearch
      className={`text-6xl mb-4 ${
        isDarkMode ? "text-gray-500" : "text-gray-400"
      }`}
    />
    <p
      className={`text-lg font-medium ${
        isDarkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      No users found matching your criteria.
    </p>
  </div>
);

export default UsersEmptyState;
