import { toast } from "react-toastify";
import {
  updateUserSchema,
  UpdateUserSchema,
} from "../schemas/update-user.schema";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { User } from "../types/user.types";
import { useDarkMode } from "./useDarkMode";
import useUserService from "./useUserService";
import useLogout from "./useLogout";

const useEditProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate: NavigateFunction = useNavigate();
  const { isDarkMode } = useDarkMode();

  const { getProfile, updateUser } = useUserService();
  const logout = useLogout();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // State for profile image preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      bio: {
        welcomeMessage: "",
        avatar: "",
      },
    },
  });

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const response = await getProfile(userId);
        setUser(response?.user);
        setValue("username", response?.user.username);
        setValue("email", response?.user.email);
        setValue(
          "bio.welcomeMessage",
          response?.user?.bio?.welcomeMessage || ""
        );
        setValue(
          "bio.avatar",
          response?.user?.bio?.avatar || "/default-avatar.png"
        );
      } catch (err: any) {
        navigate(`/profile-not-found`);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Watch for avatar URL changes
  const avatarUrl = watch("bio.avatar");

  // Handle file upload & convert to base64
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        setValue("bio.avatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const onSubmit = async (formData: UpdateUserSchema) => {
    try {
      setUpdating(true);

      // Create a new object and remove the password field if it's empty
      const { password, ...rest } = formData;
      const cleanedData = password ? { ...rest, password } : rest;

      const { updateUser: updatedUser } = await updateUser(
        userId as string,
        cleanedData
      );

      logout();
      toast.success(`User ${updatedUser.username} updated successfully !`);
      toast.success(`Pleast login again`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };

  // Input field styling for dark mode
  const inputStyle = `w-full p-2 border rounded ${
    isDarkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white"
  }`;

  return {
    loading,
    error,
    avatarUrl,
    previewImage,
    handleFileUpload,
    handleSubmit,
    onSubmit,
    register,
    errors,
    inputStyle,
    showPassword,
    setShowPassword,
    user,
    isDarkMode,
    updating,
  };
};

export default useEditProfile;
