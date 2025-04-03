import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope, FaUser } from "react-icons/fa";
import AuthInput from "./AuthInput";
import PasswordInput from "./PasswordInput";
import SubmitButton from "./SubmitButton";
import {
  RegisterFormData,
  registerSchema,
} from "../../../schemas/register.schema";

interface RegisterFormProps {
  isDarkMode: boolean;
  onSuccess?: () => void;
  registerApi: (
    data: Omit<RegisterFormData, "confirmPassword">
  ) => Promise<any>;
}

const RegisterForm = ({
  isDarkMode,
  onSuccess,
  registerApi,
}: RegisterFormProps) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      const { confirmPassword, ...input } = data;
      const newUser = await registerApi(input);
      toast.success(`User ${newUser.username} registered successfully`);
      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <AuthInput
        id="username"
        label="Username"
        placeholder="Enter your username"
        icon={<FaUser />}
        isDarkMode={isDarkMode}
        {...register("username")}
        error={errors.username}
      />

      <AuthInput
        id="email"
        label="Email"
        placeholder="Enter your email"
        icon={<FaEnvelope />}
        type="email"
        isDarkMode={isDarkMode}
        {...register("email")}
        error={errors.email}
      />

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        isDarkMode={isDarkMode}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        register={register}
        error={errors.confirmPassword}
        isDarkMode={isDarkMode}
      />

      <SubmitButton
        loading={loading}
        loadingText="Registering..."
        buttonText="Register"
      />
    </form>
  );
};

export default RegisterForm;
