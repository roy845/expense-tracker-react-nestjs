import { useState } from "react";
import { useDarkMode } from "./useDarkMode";
import useCustomNavigate from "./useCustomNavigate";
import { RegisterFormData, registerSchema } from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/serverApi";
import { toast } from "react-toastify";

const useAddUser = () => {
  const { isDarkMode } = useDarkMode();
  const [loading, setLoading] = useState(false);
  const navigate = useCustomNavigate();

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
      const { confirmPassword, ...registerInput } = data;
      const newUser = await registerUser(registerInput);
      toast.success(`User ${newUser.username} Registered successfully`);
      navigate("/admin");
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  return { isDarkMode, handleSubmit, onSubmit, register, errors, loading };
};

export default useAddUser;
