import Spinner from "../common/Spinner";
import { User } from "../../types/user.types";

interface Props {
  search: string;
  setSearch: (val: string) => void;
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  isLoading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
  isDarkMode: boolean;
  refProp: React.RefObject<HTMLDivElement>;
}

const UserSearchDropdown = ({
  search,
  setSearch,
  users,
  selectedUser,
  setSelectedUser,
  isOpen,
  setIsOpen,
  isLoading,
  onLoadMore,
  hasMore,
  isDarkMode,
  refProp,
}: Props) => (
  <div className="mb-6 relative" ref={refProp}>
    <label className="block text-sm font-medium mb-1">Select User</label>
    <input
      type="text"
      placeholder="Search by username or email"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setIsOpen(true);
      }}
      onFocus={() => setIsOpen(true)}
      className={`w-full px-4 py-2 rounded-lg border focus:outline-none ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-300 text-black"
      }`}
    />
    {isOpen && (
      <div
        className={`absolute z-10 w-full mt-1 max-h-52 overflow-y-auto border rounded-md shadow-md ${
          isDarkMode
            ? "bg-gray-700 border-zinc-700 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        {isLoading ? (
          <div className="p-3">
            <Spinner />
          </div>
        ) : (
          <>
            {users.map((user) => (
              <div
                key={user._id}
                className={`px-3 py-2 cursor-pointer transition-colors ${
                  selectedUser?._id === user._id
                    ? "bg-blue-600 text-white"
                    : isDarkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-200"
                }`}
                onClick={() => {
                  setSelectedUser(user);
                  setSearch(`${user.username} (${user.email})`);
                  setIsOpen(false);
                }}
              >
                {user.username} ({user.email})
              </div>
            ))}
            {hasMore && !isLoading && (
              <button
                onClick={onLoadMore}
                className={`w-full px-3 py-2 text-sm font-medium text-center ${
                  isDarkMode
                    ? "bg-gray-800 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                Load More
              </button>
            )}
          </>
        )}
      </div>
    )}
  </div>
);

export default UserSearchDropdown;
