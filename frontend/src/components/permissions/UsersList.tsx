import { User } from "../../types/user.types";
import { FaSearchMinus } from "react-icons/fa";

interface Props {
  users: User[];
  selectedUserId: string | null;
  onUserSelect: (id: string) => void;
  isDarkMode: boolean;
}

const UsersList = ({
  users,
  selectedUserId,
  onUserSelect,
  isDarkMode,
}: Props) => {
  if (users.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center text-center py-8 px-4 rounded-md border ${
          isDarkMode
            ? "text-gray-300 border-gray-700 bg-gray-800"
            : "text-gray-600 border-gray-300 bg-gray-100"
        }`}
      >
        <FaSearchMinus className="text-4xl mb-3" />
        <p className="text-lg font-medium">No users found.</p>
        <p className="text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {users.map((user) => {
        const isSelected = selectedUserId === user._id;
        return (
          <li
            key={user._id}
            onClick={() => onUserSelect(user._id)}
            className={`cursor-pointer px-3 py-2 rounded border transition-all ${
              isSelected
                ? isDarkMode
                  ? "bg-blue-500 text-white"
                  : "bg-blue-600 text-white"
                : isDarkMode
                ? "bg-gray-800 text-gray-200"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            {user.username}
            <br />
            <span
              className={`text-sm ${
                isSelected
                  ? "text-white"
                  : isDarkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              {user.email}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default UsersList;
