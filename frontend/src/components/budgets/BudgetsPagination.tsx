import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface BudgetsPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  isDarkMode: boolean;
}

const BudgetsPagination = ({
  page,
  totalPages,
  setPage,
  isDarkMode,
}: BudgetsPaginationProps) => (
  <div className="mt-6 flex justify-between items-center space-x-4">
    <button
      onClick={() => setPage(page - 1)}
      disabled={page === 1}
      className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 shadow-md ${
        page === 1
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      <FaArrowLeft className="text-lg" />
    </button>
    <span
      className={`px-4 py-2 rounded-lg font-bold text-lg ${
        isDarkMode ? "text-gray-300" : "text-gray-700"
      }`}
    >
      {page} / {totalPages}
    </span>
    <button
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
      className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 shadow-md ${
        page === totalPages
          ? "bg-gray-400 text-gray-200 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
    >
      <FaArrowRight className="text-lg" />
    </button>
  </div>
);

export default BudgetsPagination;
