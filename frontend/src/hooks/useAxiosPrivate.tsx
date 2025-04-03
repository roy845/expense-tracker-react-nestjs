import { useEffect } from "react";
import { axiosPrivate } from "../api/api";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../context/authContext";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      async (response) => {
        // GraphQL can return a 200 status but still contain errors
        if (response.data?.errors?.length) {
          const firstError = response.data.errors[0];

          if (firstError.extensions?.code === "UNAUTHENTICATED") {
            try {
              const newAccessToken = await refresh();

              if (!newAccessToken) {
                return Promise.reject(firstError);
              }

              // Retry the failed request with new token
              const prevRequest = response.config;
              prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return axiosPrivate(prevRequest);
            } catch (refreshError) {
              return Promise.reject(refreshError);
            }
          }
        }

        return response;
      },
      async (error) => {
        console.error("❌ Axios Error:", error);

        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          console.warn("🔴 HTTP 401 - Refreshing Token...");
          prevRequest.sent = true;

          try {
            const newAccessToken = await refresh();
            console.log("🆕 New Access Token:", newAccessToken);

            if (!newAccessToken) {
              console.error("❌ Token Refresh Failed");
              return Promise.reject(error);
            }

            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            return axiosPrivate(prevRequest);
          } catch (refreshError) {
            console.error("❌ Refresh Token Error:", refreshError);
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh, setAuth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
