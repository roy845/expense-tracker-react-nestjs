interface Props {
  isDarkMode: boolean;
}

const UsersHeader = ({ isDarkMode }: Props) => (
  <div className="mb-6 text-center">
    <h1 className="text-3xl font-bold mb-1">Users Management</h1>
    <p
      className={`text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
    >
      View, search and manage all users.
    </p>
  </div>
);

export default UsersHeader;
