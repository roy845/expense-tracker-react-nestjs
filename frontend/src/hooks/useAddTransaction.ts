import { toast } from "react-toastify";
import {
  Category,
  PaymentMethod,
  TransactionType,
} from "../types/transaction.types";
import {
  TransactionFormData,
  transactionSchema,
} from "../schemas/transactionSchema.schema";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDarkMode } from "./useDarkMode";
import useTransactionService from "./useTransactionService";
import useBudgetService from "./useBudgetService";
import { BudgetWithSpent } from "../types/budget.types";
import { useAppSelector } from "../app/hooks";
import { selectCurrency } from "../features/currencySlice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useAddTransaction = () => {
  const { isDarkMode } = useDarkMode();
  const { createTransaction } = useTransactionService();
  const { getBudgetByCategoryAndDate } = useBudgetService();
  const today = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState<BudgetWithSpent | null>(null);
  const [warning, setWarning] = useState("");
  const [tagInput, setTagInput] = useState("");

  const { currencySymbol } = useAppSelector(selectCurrency);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      type: TransactionType.Expense,
      description: "",
      category: Category.Groceries,
      date: today,
      paymentMethod: PaymentMethod.CREDIT_CARD,
      recurringTransaction: false,
      tags: [],
    },
  });

  const transactionType = watch("type", TransactionType.Expense);
  const category = watch("category");
  const amount = watch("amount");
  const date = watch("date", today);
  const isRecurring = watch("recurringTransaction", false);
  const tags = watch("tags", []);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const budgetData = await getBudgetByCategoryAndDate(category, date);
        setBudget(budgetData);

        if (!budgetData) {
          setWarning(`⚠️ No active budget for ${category} on this date.`);
          return;
        }

        if (
          amount > budgetData.remaining &&
          transactionType === TransactionType.Expense
        ) {
          setWarning(
            `🚨 This transaction exceeds the available budget remaining (${budgetData.remaining}).`
          );
        } else {
          setWarning("");
        }
      } catch (error) {
        console.error("Failed to fetch budget:", error);
      }
    };

    fetchBudget();
  }, [category, amount, date, transactionType]);

  const onSubmit = async (data: TransactionFormData) => {
    if (
      warning.includes("exceeds") &&
      transactionType === TransactionType.Expense &&
      !window.confirm(
        "⚠️ This transaction exceeds the available budget. Continue?"
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      await createTransaction({
        ...data,
        date: new Date(data.date).toISOString(),
      });
      toast.success("Transaction added successfully!");
      navigate("/transactions");
    } catch (err: any) {
      toast.error("Failed to add transaction: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() === "") return toast.warn("Cannot add an empty tag");
    setValue("tags", [...(tags as string[]), tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      (tags as string[]).filter((tag) => tag !== tagToRemove)
    );
  };
  return {
    warning,
    handleSubmit,
    onSubmit,
    isDarkMode,
    currencySymbol,
    errors,
    transactionType,
    setValue,
    register,
    tags,
    tagInput,
    setTagInput,
    addTag,
    removeTag,
    isRecurring,
    loading,
  };
};

export default useAddTransaction;
