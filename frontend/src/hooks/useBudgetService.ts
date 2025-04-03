import { AxiosInstance } from "axios";
import useAxiosPrivate from "./useAxiosPrivate";
import { sendGraphQLPrivateRequest } from "../api/serverApi";
import {
  FIND_BUDGET_WITH_SPENT,
  FIND_BUDGET_WITH_SPENT_FOR_DASHBOARD,
  GET_BUDGET_BY_CATEGORY_AND_DATE,
  GET_BUDGET_BY_ID,
  GET_BUDGETS_BY_USER,
  GET_TOTAL_BUDGET,
  GET_TOTAL_EXPENSES_BY_CATEGORY,
} from "../api/queries/budgetQueries";
import {
  CREATE_BUDGET,
  REMOVE_BUDGET,
  REMOVE_ALL_BUDGETS_BY_USER,
  REMOVE_ALL_BUDGETS,
  UPDATE_BUDGET,
} from "../api/mutations/budgetMutations";
import {
  Budget,
  BudgetWithSpent,
  CreateBudget,
  TotalBudget,
} from "../types/budget.types";
import { SortOrder } from "../types/sortTypes.types";

const useBudgetService = () => {
  const axiosPrivate: AxiosInstance = useAxiosPrivate();

  // ✅ Create Budget
  const createBudget = async (budgetData: CreateBudget) => {
    return sendGraphQLPrivateRequest<{
      createBudget: CreateBudget;
    }>(axiosPrivate, CREATE_BUDGET, { input: budgetData }).then(
      (res) => res.createBudget
    );
  };

  // ✅ Get a single Budget by ID
  const getBudgetById = async (id: string) => {
    return sendGraphQLPrivateRequest<{
      findBudget: Budget;
    }>(axiosPrivate, GET_BUDGET_BY_ID, { findBudgetId: id }).then(
      (res) => res.findBudget
    );
  };

  // ✅ Get all Budgets for the authenticated User
  const getBudgetsByUser = async () => {
    return sendGraphQLPrivateRequest<{
      getBudgetsByUser: Budget[];
    }>(axiosPrivate, GET_BUDGETS_BY_USER).then((res) => res.getBudgetsByUser);
  };

  // ✅ Update Budget
  const updateBudget = async (id: string, budgetData: CreateBudget) => {
    return sendGraphQLPrivateRequest<{
      updateBudget: Budget;
    }>(axiosPrivate, UPDATE_BUDGET, {
      updateBudgetId: id,
      input: budgetData,
    }).then((res) => res.updateBudget);
  };

  // ✅ Remove a single Budget by ID
  const removeBudget = async (id: string) => {
    return sendGraphQLPrivateRequest<{ removeBudget: boolean }>(
      axiosPrivate,
      REMOVE_BUDGET,
      { removeBudgetId: id }
    ).then((res) => res.removeBudget);
  };

  // ✅ Remove all Budgets for the authenticated User
  const removeAllBudgetsByUser = async () => {
    return sendGraphQLPrivateRequest<{ deleteAllBudgetsByUser: boolean }>(
      axiosPrivate,
      REMOVE_ALL_BUDGETS_BY_USER
    ).then((res) => res.deleteAllBudgetsByUser);
  };

  // ✅ Remove all Budgets (Admin only)
  const removeAllBudgets = async () => {
    return sendGraphQLPrivateRequest<{ removeAllBudgets: boolean }>(
      axiosPrivate,
      REMOVE_ALL_BUDGETS
    ).then((res) => res.removeAllBudgets);
  };

  const findBudgetsWithSpentForDashboard = async (
    month: string,
    limit: number
  ): Promise<BudgetWithSpent[]> => {
    return sendGraphQLPrivateRequest<{
      getBudgetWithSpentAmountForDashboard: BudgetWithSpent[];
    }>(
      axiosPrivate,
      FIND_BUDGET_WITH_SPENT_FOR_DASHBOARD,
      { month, limit } // 👈 pass variables here
    ).then((res) => res.getBudgetWithSpentAmountForDashboard);
  };

  const findBudgetsWithSpent = async (filters: {
    search?: string;
    startDate?: string;
    endDate?: string;
    skip?: number;
    take?: number;
    sortBy: string;
    order: SortOrder;
  }) => {
    return sendGraphQLPrivateRequest<{
      findBudgetsWithSpent: {
        budgets: BudgetWithSpent[];
        totalPages: number;
      };
    }>(axiosPrivate, FIND_BUDGET_WITH_SPENT, filters).then(
      (res) => res.findBudgetsWithSpent
    );
  };

  // ✅ Fetch Total Budget
  const getTotalBudget = async () => {
    return sendGraphQLPrivateRequest<{
      getTotalBudget: TotalBudget;
    }>(axiosPrivate, GET_TOTAL_BUDGET).then((res) => res.getTotalBudget);
  };

  const getTotalExpensesByCategory = async (
    category: string,
    startDate: string,
    endDate: string
  ) => {
    return sendGraphQLPrivateRequest<{ getTotalExpensesByCategory: number }>(
      axiosPrivate,
      GET_TOTAL_EXPENSES_BY_CATEGORY,
      { category, startDate, endDate }
    ).then((res) => res.getTotalExpensesByCategory);
  };

  const getBudgetByCategoryAndDate = async (category: string, date: string) => {
    return sendGraphQLPrivateRequest<{
      getBudgetWithSpentAmount: BudgetWithSpent | null;
    }>(axiosPrivate, GET_BUDGET_BY_CATEGORY_AND_DATE, { category, date }).then(
      (res) => res.getBudgetWithSpentAmount
    );
  };

  return {
    createBudget,
    getBudgetById,
    getBudgetsByUser,
    removeBudget,
    removeAllBudgetsByUser,
    removeAllBudgets,
    findBudgetsWithSpent,
    findBudgetsWithSpentForDashboard,
    getTotalBudget,
    updateBudget,
    getTotalExpensesByCategory,
    getBudgetByCategoryAndDate,
  };
};

export default useBudgetService;
