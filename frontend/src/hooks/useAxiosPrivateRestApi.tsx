import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { HttpStatusCode } from "axios";
import { useAuth } from "../context/authContext";
import { axiosPrivateRestApi } from "../api/api";

const useAxiosPrivateRestApi = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {
    const requestIntercept = axiosPrivateRestApi.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivateRestApi.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (
          error?.response?.status === HttpStatusCode.Unauthorized ||
          (error?.response?.status === HttpStatusCode.Forbidden &&
            !prevRequest?.sent)
        ) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();

          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivateRestApi(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivateRestApi.interceptors.request.eject(requestIntercept);
      axiosPrivateRestApi.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivateRestApi;
};

export default useAxiosPrivateRestApi;
