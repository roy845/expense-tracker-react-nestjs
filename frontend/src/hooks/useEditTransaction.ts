import { toast } from "react-toastify";
import { TransactionType } from "../types/transaction.types";
import {
  TransactionFormData,
  transactionSchema,
} from "../schemas/transactionSchema.schema";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../app/hooks";
import { selectCurrency } from "../features/currencySlice";
import { useDarkMode } from "./useDarkMode";
import useTransactionService from "./useTransactionService";
import useBudgetService from "./useBudgetService";
import { BudgetWithSpent } from "../types/budget.types";
import { useNavigate, useParams } from "react-router-dom";

const useEditTransaction = () => {
  const { isDarkMode } = useDarkMode();
  const { getTransactionById, updateTransaction } = useTransactionService();
  const { getBudgetByCategoryAndDate } = useBudgetService();
  const [budget, setBudget] = useState<BudgetWithSpent | null>(null);
  const navigate = useNavigate();
  const { transactionId } = useParams<{ transactionId: string }>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [tagInput, setTagInput] = useState("");
  const [warning, setWarning] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const { currencySymbol } = useAppSelector(selectCurrency);

  // Initialize form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
  });

  // Fetch transaction data
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const transaction = await getTransactionById(transactionId as string);
        if (transaction) {
          // ✅ Convert ISO to YYYY-MM-DD for input fields
          const formattedDate = transaction.date
            ? new Date(transaction.date).toISOString().split("T")[0]
            : "";

          reset({
            ...transaction,
            date: formattedDate, // ✅ Set properly formatted date
          });
        }
      } catch (error: any) {
        toast.error("Failed to load transaction: " + error.message);
        navigate("/transaction-not-found");
      } finally {
        setFetching(false);
      }
    };

    if (transactionId) fetchTransaction();
  }, [transactionId]);

  const transactionType = watch("type", TransactionType.Expense);
  const category = watch("category");
  const amount = watch("amount");
  const date = watch("date", today);
  const isRecurring = watch("recurringTransaction", false);
  const tags = watch("tags", []);

  // 🔹 Fetch budget for the selected category **and date**
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const budgetData = await getBudgetByCategoryAndDate(category, date);
        setBudget(budgetData);

        if (!budgetData) {
          setWarning(`⚠️ No active budget for ${category} on this date.`);
          return;
        }

        // 🚀 **Fix: Only warn when amount is strictly greater than available budget**
        if (
          amount > budgetData.remaining &&
          transactionType === TransactionType.Expense
        ) {
          setWarning(
            `🚨 This transaction exceeds the available budget (${budgetData.remaining}).`
          );
        } else {
          setWarning(""); // ✅ Clear warning if within budget
        }
      } catch (error) {
        console.error("Failed to fetch budget:", error);
      }
    };

    fetchBudget();
  }, [category, amount, date, transactionType]);

  // Handle form submission
  const onSubmit = async (data: TransactionFormData) => {
    try {
      if (
        warning.includes("exceeds") &&
        transactionType === TransactionType.Expense &&
        !toast.warn("⚠️ This transaction exceeds the available budget.")
      ) {
      }

      setLoading(true);

      // ✅ Convert 'YYYY-MM-DD' format back to ISO string before saving
      const formattedDate = data.date ? new Date(data.date).toISOString() : "";

      await updateTransaction(transactionId as string, {
        ...data,
        date: formattedDate,
      });

      toast.success("Transaction updated successfully!");
      navigate("/transactions");
    } catch (err: any) {
      toast.error("Failed to update transaction: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding tags
  const addTag = () => {
    if (tagInput.trim() !== "") {
      setValue("tags", [...(tags as string[]), tagInput.trim()]);
      setTagInput("");
    } else {
      return toast.warn("Cannot add an empty tag");
    }
  };

  // Handle removing tags
  const removeTag = (index: number) => {
    setValue(
      "tags",
      (tags as string[]).filter((_, i) => i !== index)
    );
  };

  return {
    isDarkMode,
    isRecurring,
    fetching,
    handleSubmit,
    onSubmit,
    register,
    errors,
    currencySymbol,
    transactionType,
    setValue,
    warning,
    tagInput,
    tags,
    setTagInput,
    addTag,
    removeTag,
    loading,
  };
};

export default useEditTransaction;
