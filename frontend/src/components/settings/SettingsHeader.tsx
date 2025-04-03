interface Props {
  isDarkMode: boolean;
}

const SettingsHeader: React.FC<Props> = ({ isDarkMode }) => (
  <div className="mb-6 text-center">
    <h1 className="text-3xl font-bold mb-1">Application Settings</h1>
    <p
      className={`text-base ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
    >
      Customize how your app works for your preferences.
    </p>
  </div>
);

export default SettingsHeader;
