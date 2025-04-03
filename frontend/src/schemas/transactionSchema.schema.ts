import { z } from "zod";
import {
  TransactionType,
  PaymentMethod,
  Category,
} from "../types/transaction.types";

// ✅ Define Transaction Schema with Enums
export const transactionSchema = z.object({
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .positive("Amount must be positive"),
  type: z.nativeEnum(TransactionType), // ✅ Enum for transaction type
  description: z.string().min(3, "Description must be at least 3 characters"),
  category: z.nativeEnum(Category), // ✅ Enum for category
  date: z.string().nonempty("Please select a date"),
  paymentMethod: z.nativeEnum(PaymentMethod), // ✅ Enum for payment method
  recurringTransaction: z.boolean().default(false), // ✅ Switch for recurring transactions
  tags: z.array(z.string()).optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
