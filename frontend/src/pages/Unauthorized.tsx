import { FaLock } from "react-icons/fa";
import useDocumentTitle from "../hooks/useDocumentTitle";
import useGoBack from "../hooks/useGoBack";
import AuthHeader from "../layout/AuthHeader";
import { useDarkMode } from "../hooks/useDarkMode";

const Unauthorized: React.FC = () => {
  useDocumentTitle("Unauthorized");
  const goBack: () => void = useGoBack();
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <AuthHeader />
      <FaLock className="text-red-500 text-6xl mb-4" />
      <h1
        className={`text-4xl font-bold mb-2 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        Unauthorized
      </h1>
      <p
        className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        You do not have the necessary permissions to access this page.
      </p>
      <button
        onClick={goBack}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
