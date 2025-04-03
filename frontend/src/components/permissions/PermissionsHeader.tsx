interface Props {
  isDarkMode: boolean;
}

const PermissionsHeader = ({ isDarkMode }: Props) => (
  <div className="mb-6 px-4">
    <h1
      className={`text-2xl font-bold ${
        isDarkMode ? "text-white" : "text-gray-900"
      }`}
    >
      Manage User Permissions
    </h1>
    <p
      className={`text-sm mt-1 ${
        isDarkMode ? "text-gray-400" : "text-gray-600"
      }`}
    >
      Select a user from the list to view and modify their permissions.
    </p>
  </div>
);

export default PermissionsHeader;
