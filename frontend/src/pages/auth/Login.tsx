import AuthLayout from "../../layout/AuthLayout";
import LoginHeader from "../../components/auth/login/LoginHeader";
import LoginForm from "../../components/auth/login/LoginForm";
import LoginLinks from "../../components/auth/login/LoginLinks";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const {
    errors,
    handleSubmit,
    isDarkMode,
    loading,
    onSubmit,
    persist,
    register,
    setShowPassword,
    showPassword,
    togglePersist,
  } = useLogin();

  return (
    <AuthLayout title="Login">
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
          <LoginHeader />

          <LoginForm
            register={register}
            errors={errors}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isDarkMode={isDarkMode}
            loading={loading}
            persist={persist}
            togglePersist={togglePersist}
          />

          <LoginLinks isDarkMode={isDarkMode} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
