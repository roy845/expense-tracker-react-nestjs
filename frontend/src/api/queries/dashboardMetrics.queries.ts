export const GET_DASHBOARD_METRICS = `
 query GetDashboardMetrics {
  getDashboardMetrics {
    income
    expenses
    balance
    monthlyChange
  }
}
`;

export const GET_EXPENSE_BY_CATEGORY = `
  query GetExpenseByCategory($month: String!) {
    getExpenseByCategory(month: $month) {
      categories {
        name
        value
        color
      }
    }
  }
`;

export const GET_EXPENSE_TRENDS = `
  query GetExpenseTrends($days: Int!) {
    getExpenseTrends(days: $days) {
      expenses {
        date
        expense
      }
    }
  }
`;

export const GET_RECENT_TRANSACTIONS = `
  query GetRecentTransactions($limit: Int!) {
    getRecentTransactions(limit: $limit) {
      transactions {
        _id
        description
        amount
        type
        date
      }
    }
  }
`;

export const GET_INCOME_SOURCES = `
 query Query($month: String!) {
  getIncomeSources(month: $month) {
    name
    value
    color
  }
}
`;

export const GET_INCOME_VS_EXPENSES = `
 query GetIncomeVsExpenses($month: String!) {
  getIncomeVsExpenses(month: $month) {
    date
    income
    expenses
  }
}
`;
