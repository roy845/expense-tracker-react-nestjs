export const CREATE_BUDGET = `
 mutation Mutation($input: CreateBudgetInput!) {
  createBudget(input: $input) {
    _id
    name
    category
    monthlyLimit
    startDate
    endDate
    createdAt
    updatedAt
  }
}
`;

export const REMOVE_BUDGET = `
  mutation Mutation($removeBudgetId: String!) {
  removeBudget(id: $removeBudgetId) {
    _id
    userId
    name
    category
    monthlyLimit
    startDate
    endDate
    createdAt
    updatedAt
  }
}
`;

export const REMOVE_ALL_BUDGETS_BY_USER = `
mutation Mutation {
  deleteAllBudgetsByUser
}
`;

export const REMOVE_ALL_BUDGETS = `
  mutation RemoveAllBudgets {
    removeAllBudgets
  }
`;

export const UPDATE_BUDGET = `
mutation UpdateBudget($input: UpdateBudgetInput!, $updateBudgetId: String!) {
  updateBudget(input: $input, id: $updateBudgetId) {
    _id
    userId
    name
    category
    monthlyLimit
    startDate
    endDate
    createdAt
    updatedAt
  }
}
`;
