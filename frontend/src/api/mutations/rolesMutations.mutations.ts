export const ASSIGN_ROLES_TO_USER_MUTATION = `
mutation AssignRolesToUser($userId: String!, $roles: [UserRoles!]!) {
  assignRolesToUser(userId: $userId, roles: $roles) {
    _id
    username
    email
    roles
    bio {
      welcomeMessage
      avatar
    }
    createdAt
    updatedAt
  }
}
`;

export const REMOVE_ROLES_FROM_USER_MUTATION = `
mutation RemoveRolesFromUser($userId: String!, $roles: [UserRoles!]!) {
  removeRolesFromUser(userId: $userId, roles: $roles) {
    _id
    username
    email
    roles
    bio {
      welcomeMessage
      avatar
    }
    createdAt
    updatedAt
  }
}
`;
