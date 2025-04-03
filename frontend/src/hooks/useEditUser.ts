import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { useDarkMode } from "./useDarkMode";
import useUserService from "./useUserService";
import { useEffect, useState } from "react";
import { User } from "../types/user.types";
import { useForm } from "react-hook-form";
import {
  updateUserSchema,
  UpdateUserSchema,
} from "../schemas/update-user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

const useEditUser = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate: NavigateFunction = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { getProfile, updateUser } = useUserService();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        navigate("/admin/user-not-found");
        setError(err.message);
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

      navigate(`/admin/users`);
      toast.success(`User ${updatedUser.username} updated successfully !`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUpdating(false);
    }
  };
  return {
    loading,
    error,
    isDarkMode,
    previewImage,
    avatarUrl,
    handleFileUpload,
    handleSubmit,
    onSubmit,
    register,
    errors,
    user,
    updating,
  };
};

export default useEditUser;
