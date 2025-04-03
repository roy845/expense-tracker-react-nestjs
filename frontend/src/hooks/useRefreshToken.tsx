import { refreshToken } from "../api/serverApi";
import { useAuth } from "../context/authContext";
import useLogout from "./useLogout";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const logout = useLogout();

  const refresh = async () => {
    try {
      const data = await refreshToken();
      const accessToken = data?.accessToken;
      const refreshTokenValue = data?.refreshToken ?? "";
      if (!accessToken) throw new Error("No access token received");

      setAuth((prev) => ({
        ...prev,
        accessToken,
        refreshToken: refreshTokenValue,
      }));

      return accessToken;
    } catch (error: any) {
      console.error("Refresh token error:", error);

      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  return refresh;
};

export default useRefreshToken;
