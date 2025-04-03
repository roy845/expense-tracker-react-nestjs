export const UPDATE_USER_MUTATION = `
mutation Mutation($updateUserId: String!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $updateUserId, updateUserInput: $updateUserInput) {
    _id
    username
    email
  }
}
`;

export const REMOVE_USER_MUTATION = `
mutation RemoveUser($removeUserId: String!) {
  removeUser(id: $removeUserId) {
    _id
    username
    email
  }
}
`;

export const REMOVE_ALL_USERS_MUTATION = `
  mutation RemoveAllUsers {
  removeAllUsers {
    deletedUsers
    deletedTransactions
    deletedBudgets
  }
}
`;

export const UPDATE_CURRENCY_SYMBOL_MUTATION = `
  mutation UpdateCurrencySymbol($currencySymbol: String!) {
  updateCurrencySymbol(currencySymbol: $currencySymbol) {
    currencySymbol
  }
}
`;

export const UPDATE_USER_PERMISSIONS_MUTATION = `
  mutation UpdateUserPermissions($id: String!, $permissions: [String!]!) {
    updateUserPermissions(id: $id, permissions: $permissions)
  }
`;
