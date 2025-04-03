import AuthLayout from "../../layout/AuthLayout";
import { useDarkMode } from "../../hooks/useDarkMode";
import ResetPasswordForm from "../../components/auth/resetPassword/ResetPasswordForm";

const ResetPassword = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <AuthLayout title="Reset Password">
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div
          className={`w-full max-w-md ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          } rounded-lg shadow-md p-6`}
        >
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          <p
            className={`text-center mt-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Enter a new password to reset your account.
          </p>
          <ResetPasswordForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
