import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

interface Props {
  isDarkMode: boolean;
}

const ForgotPasswordBackLink = ({ isDarkMode }: Props) => (
  <div className="mt-4 text-center">
    <Link
      to="/"
      className={`flex items-center justify-center gap-1 text-sm ${
        isDarkMode
          ? "text-blue-400 hover:text-blue-300"
          : "text-blue-500 hover:underline"
      }`}
    >
      <FaArrowLeft /> Back to Login
    </Link>
  </div>
);

export default ForgotPasswordBackLink;
