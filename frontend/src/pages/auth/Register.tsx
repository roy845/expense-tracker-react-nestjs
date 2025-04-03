import AuthLayout from "../../layout/AuthLayout";
import { useDarkMode } from "../../hooks/useDarkMode";
import { registerUser } from "../../api/serverApi";
import useCustomNavigate from "../../hooks/useCustomNavigate";
import RegisterForm from "../../components/auth/register/RegisterForm";
import AuthRedirect from "../../components/auth/register/AuthRedirect";

const Register = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useCustomNavigate();

  return (
    <AuthLayout title="Register">
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
          <h2 className="text-2xl font-bold text-center">Register</h2>
          <RegisterForm
            isDarkMode={isDarkMode}
            registerApi={registerUser}
            onSuccess={() => navigate("/")}
          />
          <AuthRedirect isDarkMode={isDarkMode} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
