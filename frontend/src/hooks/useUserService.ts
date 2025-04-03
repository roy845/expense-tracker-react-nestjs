import { AxiosInstance } from "axios";
import { sendGraphQLPrivateRequest } from "../api/serverApi";
import {
  DeleteAllUsersResponse,
  User,
  UsersResponse,
} from "../types/user.types";
import useAxiosPrivate from "./useAxiosPrivate";
import { UpdateUserSchema } from "../schemas/update-user.schema";
import {
  GET_CURRENCY_SYMBOL_QUERY,
  GET_PERMISSIONS_BY_USER_QUERY,
  GET_PROFILE_QUERY,
  GET_USER_PERMISSIONS_QUERY,
  GET_USERS_QUERY,
} from "../api/queries/userQueries.queries";
import {
  REMOVE_ALL_USERS_MUTATION,
  REMOVE_USER_MUTATION,
  UPDATE_CURRENCY_SYMBOL_MUTATION,
  UPDATE_USER_MUTATION,
  UPDATE_USER_PERMISSIONS_MUTATION,
} from "../api/mutations/userMutations.mutations";

const useUserService = () => {
  const axiosPrivate: AxiosInstance = useAxiosPrivate();

  const getProfile = async (userId: string) => {
    return sendGraphQLPrivateRequest<{ user: User }>(
      axiosPrivate,
      GET_PROFILE_QUERY,
      {
        userId,
      }
    );
  };

  const getUsers = async ({
    search,
    paginationArgs,
    sortArgs,
    filterArgs,
  }: {
    search: string;
    paginationArgs: { skip?: number; take?: number };
    sortArgs: { sortBy?: string; order?: string };
    filterArgs?: { startDate?: string; endDate?: string };
  }) => {
    return sendGraphQLPrivateRequest<UsersResponse>(
      axiosPrivate,
      GET_USERS_QUERY,
      {
        search,
        skip: paginationArgs.skip,
        take: paginationArgs.take,
        sortBy: sortArgs.sortBy,
        order: sortArgs.order,
        startDate: filterArgs?.startDate,
        endDate: filterArgs?.endDate,
      }
    );
  };

  const updateUser = async (
    userId: string,
    updateUserInput: UpdateUserSchema
  ) => {
    return sendGraphQLPrivateRequest<{ updateUser: User }>(
      axiosPrivate,
      UPDATE_USER_MUTATION,
      {
        updateUserId: userId,
        updateUserInput,
      }
    );
  };

  const removeUser = async (userId: string) => {
    return sendGraphQLPrivateRequest<{ user: User }>(
      axiosPrivate,
      REMOVE_USER_MUTATION,
      {
        removeUserId: userId,
      }
    );
  };

  const removeAllUsers = async () => {
    return sendGraphQLPrivateRequest<DeleteAllUsersResponse>(
      axiosPrivate,
      REMOVE_ALL_USERS_MUTATION
    );
  };

  const updateCurrencySymbol = async (currencySymbol: string) => {
    return sendGraphQLPrivateRequest<{ updateCurrencySymbol: User }>(
      axiosPrivate,
      UPDATE_CURRENCY_SYMBOL_MUTATION,
      {
        currencySymbol,
      }
    );
  };

  const getCurrencySymbol = async () => {
    return sendGraphQLPrivateRequest<{ getCurrencySymbol: string }>(
      axiosPrivate,
      GET_CURRENCY_SYMBOL_QUERY
    );
  };

  const getUserPermissions = async (userId: string) => {
    return sendGraphQLPrivateRequest<{ getUserPermissions: string[] }>(
      axiosPrivate,
      GET_USER_PERMISSIONS_QUERY,
      { id: userId }
    );
  };

  const getPermissionsByUser = async () => {
    return sendGraphQLPrivateRequest<{ getPermissionsByUser: string[] }>(
      axiosPrivate,
      GET_PERMISSIONS_BY_USER_QUERY
    );
  };

  const updateUserPermissions = async (
    userId: string,
    permissions: string[]
  ) => {
    return sendGraphQLPrivateRequest<{ updateUserPermissions: string[] }>(
      axiosPrivate,
      UPDATE_USER_PERMISSIONS_MUTATION,
      { id: userId, permissions }
    );
  };

  return {
    getProfile,
    getUsers,
    updateUser,
    removeUser,
    removeAllUsers,
    updateCurrencySymbol,
    getCurrencySymbol,
    getUserPermissions,
    updateUserPermissions,
    getPermissionsByUser,
  };
};

export default useUserService;
