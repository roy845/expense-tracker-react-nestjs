import { useState } from "react";
import { useDarkMode } from "./useDarkMode";
import { useForm } from "react-hook-form";
import {
  ForgotPasswordFormData,
  forgotPasswordSchema,
} from "../schemas/forgotPassword.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "../api/serverApi";
import { toast } from "react-toastify";

const useForgotPassword = () => {
  const { isDarkMode } = useDarkMode();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setLoading(true);
      const message = await forgotPassword(data);
      toast.success(message);
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return { isDarkMode, loading, register, errors, handleSubmit, onSubmit };
};

export default useForgotPassword;
