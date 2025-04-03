interface Props {
  isDarkMode: boolean;
}

const ForgotPasswordHeader = ({ isDarkMode }: Props) => (
  <>
    <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
    <p
      className={`text-center mt-2 ${
        isDarkMode ? "text-gray-400" : "text-gray-600"
      }`}
    >
      Enter your email address to receive a password reset link.
    </p>
  </>
);

export default ForgotPasswordHeader;
