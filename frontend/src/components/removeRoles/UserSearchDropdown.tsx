import { User } from "../../types/user.types";
import Spinner from "../common/Spinner";

interface Props {
  refProp: React.RefObject<HTMLDivElement>;
  search: string;
  setSearch: (val: string) => void;
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  loading: boolean;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  isDarkMode: boolean;
}

const UserSearchDropdown = ({
  refProp,
  search,
  setSearch,
  users,
  selectedUser,
  setSelectedUser,
  loading,
  dropdownOpen,
  setDropdownOpen,
  hasMore,
  onLoadMore,
  isDarkMode,
}: Props) => (
  <div className="mb-6 relative" ref={refProp}>
    <label className="block text-sm font-medium mb-1">Select User</label>
    <input
      type="text"
      placeholder="Search by username or email"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setDropdownOpen(true);
      }}
      onFocus={() => setDropdownOpen(true)}
      className={`w-full px-4 py-2 rounded-lg border focus:outline-none ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-300 text-black"
      }`}
    />
    {dropdownOpen && (
      <div
        className={`absolute z-10 w-full mt-1 max-h-52 overflow-y-auto border rounded-md shadow-md ${
          isDarkMode
            ? "bg-gray-700 border-zinc-700 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        {loading ? (
          <div className="p-3">
            <Spinner />
          </div>
        ) : (
          <>
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  setSearch(`${user.username} (${user.email})`);
                  setDropdownOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer transition-colors ${
                  selectedUser?._id === user._id
                    ? "bg-blue-600 text-white"
                    : isDarkMode
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-200"
                }`}
              >
                {user.username} ({user.email})
              </div>
            ))}
            {hasMore && (
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
