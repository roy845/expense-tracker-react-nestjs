import { AxiosInstance } from "axios";
import {
  Auth,
  ForgotPasswordDto,
  LoginDto,
  RefreshTokenResponse,
  ResetPasswordDto,
  SignupDto,
} from "../types/auth.types";
import { User } from "../types/user.types";
import { axiosInstance, axiosPrivate } from "./api";
import {
  FORGOT_PASSWORD_MUTATION,
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  RESET_PASSWORD_MUTATION,
} from "./mutations/authMutations.mutations";
import {
  LOGOUT_QUERY,
  REFRESH_TOKEN_QUERY,
} from "./queries/authQueries.queries";
import { GET_PERMISSIONS_BY_USER_QUERY } from "./queries/userQueries.queries";

const sendGraphQLRequest = async <T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await axiosInstance.post<{ data: T; errors?: any[] }>("", {
      query,
      variables,
    });

    if (response.data.errors && response.data.errors.length > 0) {
      console.error("GraphQL Errors:", response.data.errors);

      throw new Error(
        response.data.errors[0].message || "GraphQL request failed"
      );
    }

    return response.data.data;
  } catch (error: any) {
    console.error("Axios Request Error:", error);

    if (error.response) {
      console.error("Server Response Data:", error.response.data);
      throw new Error(error.response.data.message || "Server error occurred");
    }

    throw error;
  }
};

export const sendGraphQLPrivateRequest = async <T>(
  axiosPrivateInstance: AxiosInstance,
  query: string,
  variables?: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await axiosPrivateInstance.post<{
      data: T;
      errors?: any[];
    }>("", {
      query,
      variables,
    });

    // ✅ Check if GraphQL errors exist
    if (response.data.errors && response.data.errors.length > 0) {
      console.error("GraphQL Errors:", response.data.errors);

      // Throw the first GraphQL error
      throw new Error(
        response.data.errors[0].message || "GraphQL request failed"
      );
    }

    return response.data.data;
  } catch (error: any) {
    console.error("Axios Request Error:", error);

    // ✅ If error has a response, log the full response
    if (error.response) {
      console.error("Server Response Data:", error.response.data);
      throw new Error(error.response.data.message || "Server error occurred");
    }

    throw error;
  }
};

export const registerUser = async (signupDto: SignupDto): Promise<User> => {
  const data = await sendGraphQLRequest<{ register: User }>(REGISTER_MUTATION, {
    registerInput: signupDto,
  });
  return data.register;
};

export const login = async (loginDto: LoginDto): Promise<Auth> => {
  const data = await sendGraphQLRequest<{ login: Auth }>(LOGIN_MUTATION, {
    loginInput: loginDto,
  });

  return data.login;
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const data = await sendGraphQLPrivateRequest<{
    refreshToken: RefreshTokenResponse;
  }>(axiosPrivate, REFRESH_TOKEN_QUERY);

  return data.refreshToken;
};

export const logout = async (): Promise<void> => {
  await sendGraphQLRequest<{ logout: boolean }>(LOGOUT_QUERY);
};

export const forgotPassword = async (
  forgotPasswordDto: ForgotPasswordDto
): Promise<string> => {
  const data = await sendGraphQLRequest<{ forgotPassword: string }>(
    FORGOT_PASSWORD_MUTATION,
    {
      forgotPasswordInput: forgotPasswordDto,
    }
  );

  return data.forgotPassword;
};

export const resetPassword = async (
  resetPasswordDto: ResetPasswordDto
): Promise<string> => {
  const data = await sendGraphQLRequest<{ resetPassword: string }>(
    RESET_PASSWORD_MUTATION,
    {
      resetPasswordInput: resetPasswordDto,
    }
  );

  return data.resetPassword;
};

export const getPermissionsByUser = async (
  axiosPrivate: AxiosInstance
): Promise<{
  getPermissionsByUser: string[];
}> => {
  return sendGraphQLPrivateRequest<{ getPermissionsByUser: string[] }>(
    axiosPrivate,
    GET_PERMISSIONS_BY_USER_QUERY
  );
};
