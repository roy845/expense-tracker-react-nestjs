export enum UserRoles {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export type AllowedRoles = "admin" | "user" | "guest";

export type Roles = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type RolesResponse = {
  roles: {
    roles: Roles[];
    totalPages: number;
  };
};
