import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { BallTriangle } from "react-loader-spinner";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { LoginFormData } from "../../../schemas/login.schema";

interface Props {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  onSubmit: (data: LoginFormData) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  isDarkMode: boolean;
  loading: boolean;
  persist: boolean;
  togglePersist: () => void;
}

const LoginForm = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  showPassword,
  setShowPassword,
  isDarkMode,
  loading,
  persist,
  togglePersist,
}: Props) => (
  <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
    {/* Email */}
    <div>
      <label htmlFor="email" className="flex items-center gap-2">
        <FaEnvelope /> Email
      </label>
      <input
        id="email"
        type="email"
        className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
          isDarkMode ? "bg-gray-700 text-white" : ""
        }`}
        placeholder="Enter your email"
        {...register("email")}
      />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1 text-left">
          *{errors.email.message}
        </p>
      )}
    </div>

    {/* Password */}
    <div>
      <label htmlFor="password" className="flex items-center gap-2">
        <FaLock /> Password
      </label>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          className={`w-full mt-1 p-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            isDarkMode ? "bg-gray-700 text-white" : ""
          }`}
          placeholder="Enter your password"
          {...register("password")}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {errors.password && (
        <p className="text-red-500 text-sm mt-1 text-left">
          *{errors.password.message}
        </p>
      )}
    </div>

    {/* Trust this device */}
    <div className="flex items-center gap-2 mt-2">
      <input
        type="checkbox"
        id="persist"
        onChange={togglePersist}
        checked={persist}
        className="w-4 h-4 accent-blue-600 rounded cursor-pointer focus:ring focus:ring-blue-400"
      />
      <label htmlFor="persist" className="text-sm cursor-pointer">
        Trust This Device
      </label>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? (
        <>
          <BallTriangle height={20} width={20} color="#fff" />
          Logging in...
        </>
      ) : (
        "Login"
      )}
    </button>
  </form>
);

export default LoginForm;
