import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";

const AdminDashboardActions = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-3 items-center">
      <button
        onClick={() => navigate("/admin/users/new")}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
          isDarkMode
            ? "bg-blue-600 text-white hover:bg-blue-500"
            : "bg-blue-100 text-blue-900 hover:bg-blue-200"
        }`}
      >
        <FaPlus /> Add User
      </button>
      <button
        onClick={() => navigate("/admin/roles/assign")}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
          isDarkMode
            ? "bg-purple-600 text-white hover:bg-purple-500"
            : "bg-purple-100 text-purple-900 hover:bg-purple-200"
        }`}
      >
        <FaPlus /> Assign Role(s)
      </button>
      <button
        onClick={() => navigate("/admin/roles/remove")}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
          isDarkMode
            ? "bg-red-600 text-white hover:bg-red-500"
            : "bg-red-100 text-red-900 hover:bg-red-200"
        }`}
      >
        <FaMinus /> Remove Role(s)
      </button>
    </div>
  );
};

export default AdminDashboardActions;
