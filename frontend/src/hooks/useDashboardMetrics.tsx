import { FIND_BUDGET_WITH_SPENT } from "../api/queries/budgetQueries";
import {
  GET_DASHBOARD_METRICS,
  GET_EXPENSE_BY_CATEGORY,
  GET_EXPENSE_TRENDS,
  GET_INCOME_SOURCES,
  GET_INCOME_VS_EXPENSES,
  GET_RECENT_TRANSACTIONS,
} from "../api/queries/dashboardMetrics.queries";
import { sendGraphQLPrivateRequest } from "../api/serverApi";
import { BudgetWithSpent } from "../types/budget.types";
import {
  DashboardMetrics,
  ExpenseCategoryResponse,
  ExpenseTrendsResponse,
  IncomeSourceType,
  IncomeVsExpensesType,
  RecentTransactionsResponse,
} from "../types/dashboardMetrics.types";
import useAxiosPrivate from "./useAxiosPrivate";

const useDashboardMetrics = () => {
  const axiosPrivate = useAxiosPrivate();
  // ✅ get Dashboard Metrics
  const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
    return sendGraphQLPrivateRequest<{ getDashboardMetrics: DashboardMetrics }>(
      axiosPrivate,
      GET_DASHBOARD_METRICS,
      {}
    ).then((res) => res.getDashboardMetrics);
  };

  // ✅ Fetch Expense By Category Per month
  const getExpenseByCategory = async (
    selectedMonth: string
  ): Promise<ExpenseCategoryResponse> => {
    return sendGraphQLPrivateRequest<{
      getExpenseByCategory: ExpenseCategoryResponse;
    }>(axiosPrivate, GET_EXPENSE_BY_CATEGORY, { month: selectedMonth }).then(
      (res) => res.getExpenseByCategory
    );
  };

  // ✅ Fetch Expense Trends for selected days
  const getExpenseTrends = async (
    days: number
  ): Promise<ExpenseTrendsResponse> => {
    return sendGraphQLPrivateRequest<{
      getExpenseTrends: ExpenseTrendsResponse;
    }>(axiosPrivate, GET_EXPENSE_TRENDS, { days }).then(
      (res) => res.getExpenseTrends
    );
  };

  const getRecentTransactions = async (
    limit: number
  ): Promise<RecentTransactionsResponse> => {
    return sendGraphQLPrivateRequest<{
      getRecentTransactions: RecentTransactionsResponse;
    }>(axiosPrivate, GET_RECENT_TRANSACTIONS, { limit }).then(
      (res) => res.getRecentTransactions
    );
  };
  // ✅ Fetch Income Sources
  const getIncomeSources = async (
    month: string
  ): Promise<IncomeSourceType[]> => {
    return sendGraphQLPrivateRequest<{ getIncomeSources: IncomeSourceType[] }>(
      axiosPrivate,
      GET_INCOME_SOURCES,
      { month }
    ).then((res) => res.getIncomeSources);
  };

  // ✅ Fetch Income vs Expenses
  const getIncomeVsExpenses = async (
    month: string
  ): Promise<IncomeVsExpensesType[]> => {
    return sendGraphQLPrivateRequest<{
      getIncomeVsExpenses: IncomeVsExpensesType[];
    }>(axiosPrivate, GET_INCOME_VS_EXPENSES, { month }).then(
      (res) => res.getIncomeVsExpenses
    );
  };

  return {
    getDashboardMetrics,
    getExpenseByCategory,
    getExpenseTrends,
    getRecentTransactions,
    getIncomeSources,
    getIncomeVsExpenses,
  };
};

export default useDashboardMetrics;
