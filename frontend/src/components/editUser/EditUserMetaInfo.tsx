import { User } from "../../types/user.types";
import { FaIdBadge, FaUserShield, FaCalendarAlt } from "react-icons/fa";
import { Utils } from "../../utils/Utils";

interface Props {
  user: User | null;
  isDarkMode: boolean;
}

const EditUserMetaInfo = ({ user, isDarkMode }: Props) => {
  const textStyle = `flex items-center text-sm ${
    isDarkMode ? "text-gray-300" : "text-gray-500"
  }`;

  return (
    <div className="border-t pt-4">
      <h3 className="text-lg font-semibold">Account Info</h3>
      <p className={textStyle}>
        <FaIdBadge className="mr-2" />
        User ID: {user?._id}
      </p>
      <p className={textStyle}>
        <FaUserShield className="mr-2" />
        Roles: {user?.roles.join(", ")}
      </p>
      <p className={textStyle}>
        <FaCalendarAlt className="mr-2" />
        Created At: {Utils.formatDateTime(user?.createdAt || "")}
      </p>
      <p className={textStyle}>
        <FaCalendarAlt className="mr-2" />
        Updated At: {Utils.formatDateTime(user?.updatedAt || "")}
      </p>
    </div>
  );
};

export default EditUserMetaInfo;
