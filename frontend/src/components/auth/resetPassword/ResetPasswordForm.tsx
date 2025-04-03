import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BallTriangle } from "react-loader-spinner";
import { FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDarkMode } from "../../../hooks/useDarkMode";
import useCustomNavigate from "../../../hooks/useCustomNavigate";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "../../../schemas/resetPassword.schema";
import { resetPassword } from "../../../api/serverApi";

const ResetPasswordForm = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useCustomNavigate();
  const { token } = useParams<string>();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setLoading(true);
      const dataToSubmit = {
        newPassword: data.newPassword,
        token: token as string,
      };

      await resetPassword(dataToSubmit);
      toast.success("Password reset successfully. You can now log in.");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {/* New Password */}
      <div className="relative">
        <label htmlFor="newPassword" className="flex items-center gap-2">
          <FaLock /> New Password
        </label>
        <div className="relative">
          <input
            id="newPassword"
            type={showPassword ? "text" : "password"}
            className={`w-full mt-1 p-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              isDarkMode ? "bg-gray-700 text-white" : ""
            }`}
            placeholder="Enter new password"
            {...register("newPassword")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1 text-left">
            *{errors.newPassword.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <label htmlFor="confirmPassword" className="flex items-center gap-2">
          <FaLock /> Confirm Password
        </label>
        <div className="relative">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className={`w-full mt-1 p-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              isDarkMode ? "bg-gray-700 text-white" : ""
            }`}
            placeholder="Confirm new password"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1 text-left">
            *{errors.confirmPassword.message}
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
            <BallTriangle height={20} width={20} color="#fff" />
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
