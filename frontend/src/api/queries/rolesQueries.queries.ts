export const GET_ROLES_QUERY = `
query Roles($search: String, $skip: Int, $take: Int, $sortBy: String, $order: SortOrder) {
  roles(search: $search, skip: $skip, take: $take, sortBy: $sortBy, order: $order) {
    roles {
      _id
      name
      createdAt
      updatedAt
    }
    totalPages
  }
}
`;
