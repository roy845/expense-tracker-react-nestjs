import { UserRoles } from "./roles.types";

type Bio = {
  welcomeMessage: string;
  avatar: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  roles: UserRoles[];
  bio: Bio;
  createdAt: string;
  updatedAt: string;
};

export type UsersResponse = {
  findAllUsers: {
    users: User[];
    totalPages: number;
  };
};

export type DeleteAllUsersResponse = {
  deletedUsers: number;
  deletedTransactions: number;
  deletedBudgets: number;
};
