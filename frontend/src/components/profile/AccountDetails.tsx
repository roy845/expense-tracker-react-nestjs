interface Props {
  email: string;
  roles: string[];
  isDarkMode: boolean;
}

const AccountDetails: React.FC<Props> = ({ email, roles, isDarkMode }) => (
  <div className="border-t pt-4">
    <h3 className="text-lg font-semibold">Account Details</h3>
    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
      <strong>Email:</strong> {email}
    </p>
    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>
      <strong>Roles:</strong>{" "}
      {roles?.length ? roles?.join(", ") : "No roles assigned"}
    </p>
  </div>
);

export default AccountDetails;
