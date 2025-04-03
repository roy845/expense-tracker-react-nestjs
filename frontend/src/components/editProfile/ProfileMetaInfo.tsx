import { FaIdBadge, FaUserShield, FaCalendarAlt } from "react-icons/fa";
import { Utils } from "../../utils/Utils";
import { User } from "../../types/user.types";

interface Props {
  user: User;
  isDarkMode: boolean;
}

const ProfileMetaInfo: React.FC<Props> = ({ user, isDarkMode }) => {
  const textColor = isDarkMode ? "text-gray-300" : "text-gray-500";

  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold">Account Info</h3>
      <p className={`flex items-center text-sm ${textColor}`}>
        <FaIdBadge className="mr-2" />
        User ID: {user._id}
      </p>
      <p className={`flex items-center text-sm ${textColor}`}>
        <FaUserShield className="mr-2" />
        Roles: {user.roles.join(", ")}
      </p>
      <p className={`flex items-center text-sm ${textColor}`}>
        <FaCalendarAlt className="mr-2" /> Created At:{" "}
        {Utils.formatDateTime(user.createdAt)}
      </p>
      <p className={`flex items-center text-sm ${textColor}`}>
        <FaCalendarAlt className="mr-2" /> Updated At:{" "}
        {Utils.formatDateTime(user.updatedAt)}
      </p>
    </div>
  );
};

export default ProfileMetaInfo;
