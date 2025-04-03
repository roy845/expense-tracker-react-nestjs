export const GET_BUDGET_BY_ID = `
query Query($findBudgetId: String!) {
  findBudget(id: $findBudgetId) {
    _id
    userId
    name
    updatedAt
    createdAt
    endDate
    startDate
    monthlyLimit
    category
  }
}
`;

export const GET_BUDGETS_BY_USER = `
  query GetBudgetsByUser {
    getBudgetsByUser {
      _id
      name
      category
      monthlyLimit
      startDate
      endDate
    }
  }
`;

export const FIND_BUDGET_WITH_SPENT_FOR_DASHBOARD = `
 query GetBudgetWithSpentAmountForDashboard($month: String!, $limit: Float!) {
  getBudgetWithSpentAmountForDashboard(month: $month, limit: $limit) {
    id
    name
    category
    monthlyLimit
    spent
    remaining
    usedPercentage
    startDate
    endDate
  }
}
`;

export const FIND_BUDGET_WITH_SPENT = `
  query FindBudgetsWithSpent($endDate: String, $startDate: String, $order: SortOrder, $sortBy: String, $search: String, $take: Int, $skip: Int) {
  findBudgetsWithSpent(endDate: $endDate, startDate: $startDate, order: $order, sortBy: $sortBy, search: $search, take: $take, skip: $skip) {
    budgets {
      id
      name
      category
      monthlyLimit
      spent
      remaining
      usedPercentage
      startDate
      endDate
    }
    totalPages
  }
}
`;

export const GET_TOTAL_BUDGET = `
 query Query {
  getTotalBudget {
    totalBudget
    totalSpent
    budgetCount
  }
}
`;

export const GET_TOTAL_EXPENSES_BY_CATEGORY = `
query Query($category: String!, $startDate: String!, $endDate: String!) {
  getTotalExpensesByCategory(category: $category, startDate: $startDate, endDate: $endDate)
}
`;

export const GET_BUDGET_BY_CATEGORY_AND_DATE = `
query Query($category: String!, $date: String!) {
  getBudgetWithSpentAmount(category: $category, date: $date) {
    id
    userId
    name
    category
    monthlyLimit
    spent
    remaining
    usedPercentage
    startDate
    endDate
  }
}
`;
