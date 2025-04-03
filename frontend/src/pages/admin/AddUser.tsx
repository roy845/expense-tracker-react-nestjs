import MainLayout from "../../layout/MainLayout";
import { FaEnvelope, FaUser } from "react-icons/fa";
import FormInput from "../../components/addUser/FormInput";
import PasswordInput from "../../components/addUser/PasswordInput";
import SubmitButton from "../../components/addUser/SubmitButton";
import Subheader from "../../layout/Subheader";
import useAddUser from "../../hooks/useAddUser";

const AddUser = () => {
  const { errors, handleSubmit, isDarkMode, loading, onSubmit, register } =
    useAddUser();

  return (
    <MainLayout title="Add User">
      <div
        className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <div
          className={`w-full max-w-md rounded-lg shadow-md p-6 transition-colors duration-300 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
          }`}
        >
          <Subheader title="Add New User" />

          <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              id="username"
              label={
                <>
                  <FaUser /> Username
                </>
              }
              placeholder="Enter your username"
              register={register("username")}
              error={errors.username}
              darkMode={isDarkMode}
            />
            <FormInput
              id="email"
              label={
                <>
                  <FaEnvelope /> Email
                </>
              }
              placeholder="Enter your email"
              register={register("email")}
              error={errors.email}
              darkMode={isDarkMode}
            />
            <PasswordInput
              id="password"
              label="Password"
              register={register("password")}
              error={errors.password}
              darkMode={isDarkMode}
            />
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              register={register("confirmPassword")}
              error={errors.confirmPassword}
              darkMode={isDarkMode}
            />
            <SubmitButton loading={loading} label="Add User" />
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddUser;
