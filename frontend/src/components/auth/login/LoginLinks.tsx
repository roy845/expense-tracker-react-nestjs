import { Link } from "react-router-dom";
import { FaKey, FaUserPlus } from "react-icons/fa";

interface Props {
  isDarkMode: boolean;
}

const LoginLinks = ({ isDarkMode }: Props) => (
  <div className="mt-4 flex justify-between text-sm">
    <Link
      to="/register"
      className={`flex items-center gap-1 ${
        isDarkMode
          ? "text-blue-400 hover:text-blue-300"
          : "text-blue-500 hover:underline"
      }`}
    >
      <FaUserPlus /> Create an account
    </Link>

    <Link
      to="/forgot-password"
      className={`flex items-center gap-1 ${
        isDarkMode
          ? "text-blue-400 hover:text-blue-300"
          : "text-blue-500 hover:underline"
      }`}
    >
      <FaKey /> Forgot password?
    </Link>
  </div>
);

export default LoginLinks;
