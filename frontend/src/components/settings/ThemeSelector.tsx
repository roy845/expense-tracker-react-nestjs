interface Props {
  isDarkMode: boolean;
  onChange: (mode: "light" | "dark") => void;
}

const ThemeSelector: React.FC<Props> = ({ isDarkMode, onChange }) => (
  <>
    <p className="text-sm mb-4">Choose between light and dark mode.</p>
    <select
      className={`border p-2 rounded w-full ${
        isDarkMode
          ? "bg-gray-700 text-white border-gray-600"
          : "bg-white text-black border-gray-300"
      }`}
      value={isDarkMode ? "dark" : "light"}
      onChange={(e) => onChange(e.target.value as "light" | "dark")}
    >
      <option value="light">Light Mode</option>
      <option value="dark">Dark Mode</option>
    </select>
  </>
);

export default ThemeSelector;
