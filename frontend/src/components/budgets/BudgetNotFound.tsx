import { Link } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import MainLayout from "../../layout/MainLayout";

const BudgetNotFound = () => {
  return (
    <MainLayout title="Budget Not Found">
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <FaExclamationTriangle className="text-yellow-400 text-6xl mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Oops! Budget not found.</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          The budget you're looking for doesn't exist or may have been deleted.
          Please check the URL or return to your budget list.
        </p>
        <Link
          to="/budgets"
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Budgets
        </Link>
      </div>
    </MainLayout>
  );
};

export default BudgetNotFound;
