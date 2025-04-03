export const GET_PROFILE_QUERY = `
  query Query($userId: String!) {
    user(id: $userId) {
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

export const GET_CURRENCY_SYMBOL_QUERY = `
  query GetCurrencySymbol {
    getCurrencySymbol
  }
`;

export const GET_USERS_QUERY = `
query FindAllUsers($search: String, $skip: Int, $take: Int, $sortBy: String, $order: SortOrder, $startDate: String, $endDate: String) {
  findAllUsers(search: $search, skip: $skip, take: $take, sortBy: $sortBy, order: $order, startDate: $startDate, endDate: $endDate) {
    users {
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
    totalPages
  }
}`;

export const GET_USER_PERMISSIONS_QUERY = `
  query GetUserPermissions($id: String!) {
    getUserPermissions(id: $id)
  }
`;

export const GET_PERMISSIONS_BY_USER_QUERY = `
 query Query {
  getPermissionsByUser
}
`;
