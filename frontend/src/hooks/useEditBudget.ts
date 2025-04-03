import { toast } from "react-toastify";
import {
  BudgetFormData,
  budgetSchema,
} from "../schemas/addBudgetSchema.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectCurrency } from "../features/currencySlice";
import useBudgetService from "./useBudgetService";
import { useDarkMode } from "./useDarkMode";

const useEditBudget = () => {
  const { budgetId } = useParams();

  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { getBudgetById, updateBudget, getTotalExpensesByCategory } =
    useBudgetService();

  const [loading, setLoading] = useState<boolean>(true);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [totalCategoryExpenses, setTotalCategoryExpenses] = useState<number>(0);
  const today = new Date().toISOString().split("T")[0];
  const { currencySymbol } = useAppSelector(selectCurrency);

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      name: "",
      category: "Other",
      monthlyLimit: 0,
      startDate: "",
      endDate: "",
    },
  });

  // Function to fetch total expenses for the selected category
  const fetchCategoryExpenses = async (category: string) => {
    try {
      if (!category || !startDate || !endDate) return;
      const expenses = await getTotalExpensesByCategory(
        category,
        startDate,
        endDate
      );
      setTotalCategoryExpenses(expenses);
    } catch (error) {
      console.error("Failed to fetch category expenses:", error);
      setTotalCategoryExpenses(0);
    }
  };

  // When category changes, fetch the total expenses
  useEffect(() => {
    if (watch("category") && startDate && endDate) {
      fetchCategoryExpenses(watch("category"));
    }
  }, [watch("category"), startDate, endDate]);

  // Fetch the existing budget details
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        if (!budgetId) return;
        setLoading(true);
        const budget = await getBudgetById(budgetId);
        console.log(budget);
        if (!budget) {
          toast.error("Budget not found.");

          return;
        }

        // ✅ Convert ISO to YYYY-MM-DD for input fields
        const formattedStartDate = budget.startDate
          ? new Date(budget.startDate).toISOString().split("T")[0]
          : "";
        const formattedEndDate = budget.endDate
          ? new Date(budget.endDate).toISOString().split("T")[0]
          : "";

        // ✅ Set the values in the form
        setValue("name", budget.name);
        setValue("category", budget.category);
        setValue("monthlyLimit", budget.monthlyLimit);
        setValue("startDate", formattedStartDate);
        setValue("endDate", formattedEndDate);

        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);
      } catch (error: any) {
        toast.error("Failed to fetch budget: " + error.message);
        navigate("/budget-not-found");
      } finally {
        setLoading(false);
      }
    };

    fetchBudget();
  }, [budgetId]);

  useEffect(() => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      toast.warn("Start date cannot be later than end date.");
      return;
    }
  }, [startDate, endDate]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    setValue("startDate", e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    setValue("endDate", e.target.value);
  };

  const onSubmit = async (data: BudgetFormData) => {
    try {
      if (!budgetId) return;

      if (totalCategoryExpenses > data.monthlyLimit) {
        toast.warn(
          `Warning: Your existing expenses ($${totalCategoryExpenses}) exceed this budget limit.`
        );
      }

      const formattedStartDate = data.startDate
        ? new Date(data.startDate).toISOString()
        : "";
      const formattedEndDate = data.endDate
        ? new Date(data.endDate).toISOString()
        : "";

      await updateBudget(budgetId, {
        ...data,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      toast.success("Budget updated successfully!");
      navigate("/budgets");
    } catch (error: any) {
      toast.error("Failed to update budget: " + error.message);
    }
  };

  return {
    isDarkMode,
    loading,
    register,
    errors,
    watch,
    handleSubmit,
    onSubmit,
    currencySymbol,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    totalCategoryExpenses,
    navigate,
  };
};

export default useEditBudget;
