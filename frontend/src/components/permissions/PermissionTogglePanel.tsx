interface Props {
  permissions: string[];
  selectedPermissions: string[];
  onToggle: (permission: string) => void;
  onSelectAllToggle: () => void;
  onSave: () => void;
  isDarkMode: boolean;
}

const PermissionTogglePanel = ({
  permissions,
  selectedPermissions,
  onSelectAllToggle,
  onToggle,
  onSave,
  isDarkMode,
}: Props) => {
  const allSelected = permissions.every((p) => selectedPermissions.includes(p));

  return (
    <div className="md:w-2/3 w-full">
      <h3 className="text-lg font-bold mb-2">Permissions</h3>

      <div className="flex items-center gap-3 mb-4 p-2 rounded-md">
        <input
          type="checkbox"
          id="selectAll"
          checked={allSelected}
          onChange={onSelectAllToggle}
          className="w-5 h-5"
        />
        <label
          htmlFor="selectAll"
          className={`font-medium ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          {allSelected ? "Deselect All" : "Select All"}
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {permissions.map((perm) => {
          const isChecked = selectedPermissions.includes(perm);
          return (
            <label
              key={perm}
              className={`flex items-center gap-3 p-2 rounded-md transition cursor-pointer ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(perm)}
                className="w-5 h-5"
              />
              <span className={isDarkMode ? "text-gray-200" : "text-gray-800"}>
                {perm}
              </span>
            </label>
          );
        })}
      </div>

      <button
        onClick={onSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Save Permissions
      </button>
    </div>
  );
};

export default PermissionTogglePanel;
