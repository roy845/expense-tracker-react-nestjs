import { NavigateFunction, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";
import { logout } from "../api/serverApi";

const useLogout = () => {
  const { setAuth, setPersist } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  const logoutHandler = async (): Promise<void> => {
    setAuth(null);
    try {
      await logout();
      navigate("/");
      setPersist(false);
      toast.success(`User logged out successfully !`);
    } catch (error: any) {
      if (error?.message === "Network Error") {
        toast.error(error?.message);
      }
    }
  };

  return logoutHandler;
};

export default useLogout;
