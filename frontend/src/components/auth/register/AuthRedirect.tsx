import { Link } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const AuthRedirect = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <div className="mt-4 text-center">
    <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
      Already have an account?
      <Link
        to="/"
        className={`${
          isDarkMode ? "text-blue-400" : "text-blue-600"
        } hover:underline flex items-center justify-center gap-1 mt-1`}
      >
        <FaSignInAlt /> Log in
      </Link>
    </p>
  </div>
);

export default AuthRedirect;
