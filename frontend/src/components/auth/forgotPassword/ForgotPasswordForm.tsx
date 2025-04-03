import { BallTriangle } from "react-loader-spinner";
import { FaEnvelope } from "react-icons/fa";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { ForgotPasswordFormData } from "../../../schemas/forgotPassword.schema";

interface Props {
  isDarkMode: boolean;
  loading: boolean;
  register: UseFormRegister<ForgotPasswordFormData>;
  errors: FieldErrors<ForgotPasswordFormData>;
  handleSubmit: UseFormHandleSubmit<ForgotPasswordFormData>;
  onSubmit: (data: ForgotPasswordFormData) => void;
}

const ForgotPasswordForm = ({
  isDarkMode,
  loading,
  register,
  errors,
  handleSubmit,
  onSubmit,
}: Props) => (
  <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
    {/* Email Input */}
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

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? (
        <>
          <BallTriangle height={20} width={20} color="#fff" /> Sending...
        </>
      ) : (
        "Send Reset Link"
      )}
    </button>
  </form>
);

export default ForgotPasswordForm;
