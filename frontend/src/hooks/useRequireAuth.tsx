import { useLocation } from "react-router-dom";
import { AllowedRoles } from "../types/roles.types";
import { useAuth } from "../context/authContext";
import { DecodedToken } from "../types/auth.types";
import decodeToken from "../utils/decodeToken";

const useRequireAuth = () => {
  const { auth } = useAuth();
  const { pathname } = useLocation();

  const decodedToken: DecodedToken | null = auth?.accessToken
    ? decodeToken<DecodedToken>(auth?.accessToken)
    : null;

  const roles: AllowedRoles[] = decodedToken?.roles || [];

  return { roles, auth, pathname };
};

export default useRequireAuth;
