import { useDarkMode } from "../hooks/useDarkMode";
import { FaSun, FaMoon } from "react-icons/fa6";

const AuthHeader = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="absolute top-4 right-6">
      <button
        onClick={toggleDarkMode}
        className="flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-800 rounded-full shadow-md transition hover:bg-gray-300 dark:hover:bg-gray-700"
      >
        {isDarkMode ? (
          <FaSun className="text-yellow-400" size={20} />
        ) : (
          <FaMoon className="text-gray-700 dark:text-gray-300" size={20} />
        )}
      </button>
    </header>
  );
};

export default AuthHeader;
