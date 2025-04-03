import { AxiosInstance } from "axios";
import useAxiosPrivate from "./useAxiosPrivate";
import { sendGraphQLPrivateRequest } from "../api/serverApi";
import { GET_ROLES_QUERY } from "../api/queries/rolesQueries.queries";
import { RolesResponse, UserRoles } from "../types/roles.types";
import { User } from "../types/user.types";
import {
  ASSIGN_ROLES_TO_USER_MUTATION,
  REMOVE_ROLES_FROM_USER_MUTATION,
} from "../api/mutations/rolesMutations.mutations";

const useRolesService = () => {
  const axiosPrivate: AxiosInstance = useAxiosPrivate();

  const getRoles = async ({
    search,
    paginationArgs,
    sortArgs,
  }: {
    search: string;
    paginationArgs: { skip?: number; take?: number };
    sortArgs: { sortBy?: string; order?: string };
  }) => {
    return sendGraphQLPrivateRequest<RolesResponse>(
      axiosPrivate,
      GET_ROLES_QUERY,
      {
        search,
        skip: paginationArgs.skip,
        take: paginationArgs.take,
        sortBy: sortArgs.sortBy,
        order: sortArgs.order,
      }
    );
  };

  const assignRolesToUser = async (userId: string, roles: UserRoles[]) => {
    return sendGraphQLPrivateRequest<{ assignRolesToUser: User }>(
      axiosPrivate,
      ASSIGN_ROLES_TO_USER_MUTATION,
      {
        userId,
        roles,
      }
    );
  };

  const removeRolesFromUser = async (userId: string, roles: UserRoles[]) => {
    return sendGraphQLPrivateRequest<{ removeRolesFromUser: User }>(
      axiosPrivate,
      REMOVE_ROLES_FROM_USER_MUTATION,
      {
        userId,
        roles,
      }
    );
  };

  return { getRoles, assignRolesToUser, removeRolesFromUser };
};

export default useRolesService;
