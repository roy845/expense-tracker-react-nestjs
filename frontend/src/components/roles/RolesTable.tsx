import { Roles as RolesType } from "../../types/roles.types";

interface Props {
  roles: RolesType[];
  isDarkMode: boolean;
}

const RolesTable = ({ roles, isDarkMode }: Props) => (
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
          <th className="p-3 text-center">ID</th>
          <th className="p-3 text-center">Name</th>
          <th className="p-3 text-center">Created At</th>
        </tr>
      </thead>
      <tbody>
        {roles.map((role) => (
          <tr
            key={role._id}
            className={`border-t transition-all duration-200 cursor-pointer ${
              isDarkMode
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            <td className="p-3">{role._id}</td>
            <td className="p-3">{role.name}</td>
            <td className="p-3">
              {new Date(role.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RolesTable;
