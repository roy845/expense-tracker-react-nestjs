import { Category } from "./transaction.types";

export type CreateBudget = {
  name: string;
  category: string;
  monthlyLimit: number;
  startDate: string;
  endDate: string;
};

export type Budget = {
  id: string;
  userId: string;
  name: string;
  category: Category;
  monthlyLimit: number;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type BudgetWithSpent = Budget & {
  spent: number;
  monthlyLimit: number;
  usedPercentage: number;
  remaining: number;
};

export type PaginatedBudgetResponse = {
  budgets: BudgetWithSpent[];
  totalPages: number;
};

export type TotalBudget = {
  totalBudget: number;
  totalSpent: number;
  budgetCount: number;
};
