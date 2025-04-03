import { Utils } from "../../utils/Utils";

interface Props {
  createdAt: string;
  updatedAt: string;
  isDarkMode: boolean;
}

const TimestampDetails: React.FC<Props> = ({
  createdAt,
  updatedAt,
  isDarkMode,
}) => (
  <div className="border-t pt-4">
    <h3 className="text-lg font-semibold">Timestamps</h3>
    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
      <strong>Joined:</strong> {Utils?.formatDateTime(createdAt)}
    </p>
    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
      <strong>Last Updated:</strong> {Utils?.formatDateTime(updatedAt)}
    </p>
  </div>
);

export default TimestampDetails;
