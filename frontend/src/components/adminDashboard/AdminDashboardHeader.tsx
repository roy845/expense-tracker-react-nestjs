import { FaTools } from "react-icons/fa";

const AdminDashboardHeader = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="mb-6 text-center">
    <div className="flex justify-center items-center gap-3 mb-1">
      <FaTools className="text-3xl text-blue-500" />
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    </div>
    <p
      className={`text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
    >
      Choose a section to manage.
    </p>
  </div>
);

export default AdminDashboardHeader;
