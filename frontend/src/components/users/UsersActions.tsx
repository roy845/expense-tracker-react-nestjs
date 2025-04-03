import { FaFileExcel, FaTrash } from "react-icons/fa";
import { User } from "../../types/user.types";

interface Props {
  users: User[];
  isDarkMode: boolean;
  onDeleteAll: () => void;
  onExport: () => void;
}

const UsersActions = ({ users, isDarkMode, onDeleteAll, onExport }: Props) => {
  if (users.length === 0) return null;

  return (
    <div className="flex gap-4 items-center mt-1">
      <button
        onClick={onDeleteAll}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 shadow-md ${
          isDarkMode
            ? "bg-red-700 hover:bg-red-800 text-white"
            : "bg-red-500 hover:bg-red-600 text-white"
        }`}
      >
        <FaTrash size={20} />
      </button>

      <button
        onClick={onExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition-all"
      >
        <FaFileExcel size={20} />
      </button>
    </div>
  );
};

export default UsersActions;
