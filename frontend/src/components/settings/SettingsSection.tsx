import { ReactNode } from "react";

interface Props {
  title: string;
  icon: ReactNode;
  isOpen: boolean;
  toggleOpen: () => void;
  isDarkMode: boolean;
  children: ReactNode;
}

const SettingsSection: React.FC<Props> = ({
  title,
  icon,
  isOpen,
  toggleOpen,
  isDarkMode,
  children,
}) => (
  <div
    className={`p-4 mb-4 rounded-lg shadow-md transition-all duration-300 ${
      isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    }`}
  >
    <button
      className="w-full flex justify-between items-center text-left font-semibold text-lg focus:outline-none"
      onClick={toggleOpen}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
      <span>{isOpen ? "▲" : "▼"}</span>
    </button>
    {isOpen && <div className="mt-4">{children}</div>}
  </div>
);

export default SettingsSection;
