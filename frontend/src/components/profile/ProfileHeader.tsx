interface Props {
  username: string;
  avatar: string;
  welcomeMessage: string;
  isDarkMode: boolean;
}

const ProfileHeader: React.FC<Props> = ({
  username,
  avatar,
  welcomeMessage,
  isDarkMode,
}) => (
  <div className="flex items-center space-x-4">
    <img
      src={avatar}
      alt="User Avatar"
      className="w-20 h-20 rounded-full border-2 border-gray-300"
    />
    <div>
      <h2 className="text-2xl font-bold">{username}</h2>
      <p
        className={`flex items-center text-sm ${
          isDarkMode ? "text-gray-300" : "text-gray-500"
        }`}
      >
        {welcomeMessage || "Welcome to your profile!"}
      </p>
    </div>
  </div>
);

export default ProfileHeader;
