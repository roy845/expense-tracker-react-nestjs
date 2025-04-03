import { User } from "../../types/user.types";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  users: User[];
  isDarkMode: boolean;
  onEdit: (userId: string) => void;
  onDelete: (userId: string) => void;
}

const UsersTable = ({ users, isDarkMode, onEdit, onDelete }: Props) => (
  <div className="overflow-x-auto">
    <table
      className={`w-full border-collapse border ${
        isDarkMode ? "border-gray-600" : "border-gray-300"
      }`}
    >
      <thead
        className={`text-left ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <tr>
          <th className="p-3 text-center">Username</th>
          <th className="p-3 text-center">Email</th>
          <th className="p-3 text-center">Created At</th>
          <th className="p-3 text-center">Roles</th>
          <th className="p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={user._id}
            className={`border-t transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            <td className="p-3 flex items-center gap-3">
              <img
                src={user.bio?.avatar}
                alt={user.username}
                className="w-10 h-10 rounded-full border object-cover"
              />
              <span>{user.username}</span>
            </td>
            <td className="p-3">{user.email}</td>
            <td className="p-3">
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td className="p-3">{user.roles.join(", ")}</td>
            <td className="p-2">
              <div className="flex justify-center items-center gap-3">
                <button
                  className="text-blue-500"
                  onClick={() => onEdit(user._id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => onDelete(user._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UsersTable;
