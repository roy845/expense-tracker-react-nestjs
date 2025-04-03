import { FaTrash } from "react-icons/fa";

interface BudgetsHeaderProps {
  isDarkMode: boolean;
  showDelete: boolean;
  onDeleteAll: () => void;
}

const BudgetsHeader = ({
  isDarkMode,
  showDelete,
  onDeleteAll,
}: BudgetsHeaderProps) => (
  <div className="mb-6 flex items-center">
    <div className="w-full text-center">
      <h1 className="text-3xl font-bold">Budgets</h1>
      <p
        className={`text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
      >
        Manage your monthly spending limits
      </p>
    </div>
    {showDelete && (
      <button
        onClick={onDeleteAll}
        className="ml-auto flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
      >
        <FaTrash />
      </button>
    )}
  </div>
);

export default BudgetsHeader;
