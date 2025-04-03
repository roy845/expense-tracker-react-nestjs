import AuthLayout from "../../layout/AuthLayout";
import ForgotPasswordHeader from "../../components/auth/forgotPassword/ForgotPasswordHeader";
import ForgotPasswordForm from "../../components/auth/forgotPassword/ForgotPasswordForm";
import ForgotPasswordBackLink from "../../components/auth/forgotPassword/ForgotPasswordBackLink";
import useForgotPassword from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const { isDarkMode, loading, register, errors, handleSubmit, onSubmit } =
    useForgotPassword();

  return (
    <AuthLayout title="Forgot Password">
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div
          className={`w-full max-w-md rounded-lg shadow-md p-6 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <ForgotPasswordHeader isDarkMode={isDarkMode} />
          <ForgotPasswordForm
            isDarkMode={isDarkMode}
            loading={loading}
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
          <ForgotPasswordBackLink isDarkMode={isDarkMode} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
