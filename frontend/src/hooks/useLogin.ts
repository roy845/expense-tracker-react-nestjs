import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, NavigateOptions } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../api/serverApi";
import { useAuth } from "../context/authContext";
import { LoginFormData, loginSchema } from "../schemas/login.schema";
import useCustomNavigate from "./useCustomNavigate";
import { useDarkMode } from "./useDarkMode";
import useLocalStorage from "./useLocalStorage";

const useLogin = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isDarkMode } = useDarkMode();
  const { setAuth, setPersist, persist } = useAuth();
  const { setValue } = useLocalStorage();
  const [loading, setLoading] = useState<boolean>(false);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const location = useLocation();
  const customNavigate: (
    path: string,
    options?: NavigateOptions | undefined
  ) => void = useCustomNavigate();

  const from: string = location?.state?.from?.pathname || "/dashboard";

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const auth = await login(data);

      const match = auth.message.match(/User (\S+) logged in successfully/);
      const authObject = {
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
      };

      setAuth(authObject);
      customNavigate(from, { replace: true });

      toast.success(`Welcome back, ${match ? match[1] : "User"}!`);
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("persist", persist);
  }, [persist, setValue]);

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    showPassword,
    setShowPassword,
    loading,
    persist,
    togglePersist,
    isDarkMode,
  };
};

export default useLogin;
