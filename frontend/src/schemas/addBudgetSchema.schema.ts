import { z } from "zod";
import { Category } from "../types/transaction.types";

export const budgetSchema = z.object({
  name: z.string().min(1, "Budget name is required"),
  category: z.enum(Object.values(Category) as [string, ...string[]], {
    required_error: "Category is required",
  }),
  monthlyLimit: z
    .number()
    .min(0, "Monthly limit must be at least 0")
    .max(100000, "Monthly limit is too high"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

export type BudgetFormData = z.infer<typeof budgetSchema>;
