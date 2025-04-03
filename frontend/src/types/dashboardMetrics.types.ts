import { s } from "framer-motion/dist/types.d-B50aGbjN";
import { Transaction } from "./transaction.types";

export type DashboardMetrics = {
  income: number;
  expenses: number;
  balance: number;
  monthlyChange: number;
};

export type ExpenseCategory = {
  name: string; // Category name (e.g., "Utilities")
  value: number; // Total expense amount for that category
  color: string; // Chart color for the category
};

export type ExpenseCategoryResponse = {
  categories: ExpenseCategory[];
};

export type ExpenseTrendsType = {
  date: string;
  expense: number;
};

export type ExpenseTrendsResponse = {
  expenses: ExpenseTrendsType[];
};

export type TimeRanges = {
  label: string;
  value: number;
};

export type RecentTransactionsResponse = {
  transactions: Transaction[];
};

export type IncomeVsExpensesType = {
  date: string;
  income: number;
  expenses: number;
};

export type IncomeSourceType = {
  name: string;
  value: number;
  color: string;
};
