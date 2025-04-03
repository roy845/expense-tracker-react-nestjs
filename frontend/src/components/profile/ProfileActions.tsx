import { AllowedRoles, UserRoles } from "../../types/roles.types";

interface Props {
  onEdit: () => void;
  onRemove: () => void;
  userId: string | undefined;
  userRoles: UserRoles[] | undefined;
  isDarkMode: boolean;
}

const ProfileActions: React.FC<Props> = ({
  onEdit,
  onRemove,
  userRoles,
  isDarkMode,
}) => {
  return (
    <div className="flex mt-4 gap-4 justify-center">
      <button
        onClick={onEdit}
        className={`px-4 py-2 rounded-lg font-semibold ${
          isDarkMode
            ? "bg-blue-500 hover:bg-blue-600 text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        Edit Profile
      </button>

      {!userRoles
        ?.map((role) => role.toLowerCase())
        ?.includes(UserRoles.ADMIN) && (
        <button
          onClick={onRemove}
          className={`px-4 py-2 rounded-lg font-semibold ${
            isDarkMode
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          Remove Profile
        </button>
      )}
    </div>
  );
};

export default ProfileActions;
