import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../hooks/useDarkMode";
import { FiMenu, FiX } from "react-icons/fi";
import Clock from "./Clock";
import { useAuth } from "../context/authContext";

type HeaderProps = {
  title: string;
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

function Header({ title, toggleSidebar, isSidebarOpen }: HeaderProps) {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { auth, persist } = useAuth();

  return (
    <header
      className={`py-6 px-4 w-full flex items-center shadow transition-all duration-300 ${
        isDarkMode ? "bg-blue-900 text-white" : "bg-blue-600 text-white"
      }`}
    >
      {/* Hamburger Menu Button (Left) */}
      <button
        onClick={toggleSidebar}
        className="text-3xl focus:outline-none transition-transform duration-300"
      >
        {isSidebarOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Centered Content */}
      <div className="flex-1 flex justify-center items-center space-x-8">
        {/* Title */}
        <h1
          className="text-3xl font-bold cursor-pointer"
          onClick={() =>
            navigate(!auth?.accessToken && !persist ? "/" : "/dashboard")
          }
        >
          {title}
        </h1>

        {/* Clock */}
        <Clock />

        {/* Dark Mode Toggle */}
        <div
          onClick={toggleDarkMode}
          className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer relative transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-700 hover:shadow-[0_0_10px_3px_rgba(255,255,255,0.7)]"
              : "bg-gray-300 hover:shadow-[0_0_10px_3px_rgba(0,0,0,0.5)]"
          }`}
        >
          <span className="absolute left-1 text-yellow-400">☀️</span>
          <span className="absolute right-1 text-gray-200">🌙</span>

          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
              isDarkMode ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
