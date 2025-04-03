import { UserRoles } from "../../types/roles.types";

interface Props {
  refProp: React.RefObject<HTMLDivElement>;
  options: UserRoles[];
  selected: UserRoles[];
  toggle: (role: UserRoles) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  isDarkMode: boolean;
}

const RolesMultiSelectDropdown = ({
  refProp,
  options,
  selected,
  toggle,
  dropdownOpen,
  setDropdownOpen,
  isDarkMode,
}: Props) => (
  <div className="mb-6 relative" ref={refProp}>
    <label className="block text-sm font-medium mb-1">Select Roles</label>
    <div
      onClick={() => setDropdownOpen(!dropdownOpen)}
      className={`w-full px-4 py-2 rounded-lg border cursor-pointer ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-300 text-black"
      }`}
    >
      {selected.length > 0 ? selected.join(", ") : "Select roles..."}
    </div>

    {dropdownOpen && (
      <div
        className={`absolute z-10 w-full mt-1 max-h-52 overflow-y-auto border rounded-md shadow-md ${
          isDarkMode
            ? "bg-gray-700 border-zinc-700 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        {options.map((role) => {
          const isSelected = selected.includes(role);
          return (
            <div
              key={role}
              onClick={() => toggle(role)}
              className={`px-3 py-2 cursor-pointer transition-colors flex justify-between ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                  ? "hover:bg-gray-800"
                  : "hover:bg-gray-200"
              }`}
            >
              <span className="capitalize">{role.toLowerCase()}</span>
              {isSelected && <span>✓</span>}
            </div>
          );
        })}
      </div>
    )}
  </div>
);

export default RolesMultiSelectDropdown;
