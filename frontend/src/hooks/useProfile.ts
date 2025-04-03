import { toast } from "react-toastify";
import { useDarkMode } from "./useDarkMode";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import useUserService from "./useUserService";
import { User } from "../types/user.types";
import { useEffect, useState } from "react";
import useLogout from "./useLogout";

const useProfile = () => {
  const { isDarkMode } = useDarkMode();
  const navigate: NavigateFunction = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { getProfile, removeUser } = useUserService();
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const logout = useLogout();

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const response = await getProfile(userId);
        setUser(response.user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleDelete = async () => {
    try {
      await removeUser(userId as string);
      await logout();
      navigate("/");
      toast.success(`User deleted successfully!`);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    loading,
    error,
    isDarkMode,
    user,
    navigate,
    userId,
    setShowDeleteModal,
    showDeleteModal,
    handleDelete,
  };
};

export default useProfile;
