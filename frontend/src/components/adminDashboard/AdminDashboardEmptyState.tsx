import { MdSearchOff } from "react-icons/md";

const AdminDashboardEmptyState = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="flex flex-col justify-center items-center min-h-[200px] gap-2">
    <MdSearchOff
      className={`text-4xl ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}
    />
    <p
      className={`text-lg font-medium ${
        isDarkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      No results found.
    </p>
  </div>
);

export default AdminDashboardEmptyState;
