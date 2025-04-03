import { UserRoles } from "../../types/roles.types";
import { RefObject } from "react";

interface Props {
  selectedRoles: UserRoles[];
  toggleRole: (role: UserRoles) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  options: UserRoles[];
  isDarkMode: boolean;
  refProp: RefObject<HTMLDivElement>;
}

const RolesMultiSelectDropdown = ({
  selectedRoles,
  toggleRole,
  isOpen,
  setIsOpen,
  options,
  isDarkMode,
  refProp,
}: Props) => (
  <div className="mb-6 relative" ref={refProp}>
    <label className="block text-sm font-medium mb-1">Select Roles</label>
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`w-full px-4 py-2 rounded-lg border cursor-pointer ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-300 text-black"
      }`}
    >
      {selectedRoles.length > 0 ? selectedRoles.join(", ") : "Select roles..."}
    </div>
    {isOpen && (
      <div
        className={`absolute z-10 w-full mt-1 max-h-52 overflow-y-auto border rounded-md shadow-md ${
          isDarkMode
            ? "bg-gray-700 border-zinc-700 text-white"
            : "bg-white border-gray-300 text-black"
        }`}
      >
        {options.map((role) => {
          const isSelected = selectedRoles.includes(role);
          return (
            <div
              key={role}
              onClick={() => toggleRole(role)}
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
