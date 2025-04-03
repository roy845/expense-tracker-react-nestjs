import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import {
  BudgetFormData,
  budgetSchema,
} from "../../schemas/addBudgetSchema.schema";
import { toast } from "react-toastify";
import { useDarkMode } from "../../hooks/useDarkMode";
import useBudgetService from "../../hooks/useBudgetService";
import { useAppSelector } from "../../app/hooks";
import { selectCurrency } from "../../features/currencySlice";
import BudgetNameInput from "./BudgetNameInput";
import BudgetCategorySelect from "./BudgetCategorySelect";
import MonthlyLimitInput from "./MonthlyLimitInput";
import BudgetDatePickers from "./BudgetDatePickers";
import BudgetButtons from "./BudgetButtons";

const AddBudgetForm = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const { createBudget, getTotalExpensesByCategory } = useBudgetService();
  const { currencySymbol } = useAppSelector(selectCurrency);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCategoryExpenses, setTotalCategoryExpenses] = useState(0);

  const selectedCategory = watch("category");

  useEffect(() => {
    const fetchCategoryExpenses = async () => {
      if (!selectedCategory || !startDate || !endDate) return;

      try {
        const totalExpenses = await getTotalExpensesByCategory(
          selectedCategory,
          startDate,
          endDate
        );
        setTotalCategoryExpenses(totalExpenses);
      } catch {
        toast.error("Failed to fetch category expenses.");
      }
    };

    fetchCategoryExpenses();
  }, [selectedCategory, startDate, endDate]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    setValue("startDate", e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
    setValue("endDate", e.target.value);
  };

  useEffect(() => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      toast.warn("Start date cannot be later than end date.");
    }
  }, [startDate, endDate]);

  const onSubmit = async (data: BudgetFormData) => {
    if (totalCategoryExpenses > data.monthlyLimit) {
      toast.warn(
        `Warning: Your existing expenses ($${totalCategoryExpenses}) exceed this budget.`
      );
    }

    try {
      await createBudget(data);
      toast.success("Budget added successfully!");
      navigate("/budgets");
    } catch (error: any) {
      toast.error("Failed to create budget: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <BudgetNameInput
        register={register}
        error={errors.name}
        isDarkMode={isDarkMode}
      />
      <BudgetCategorySelect
        register={register}
        error={errors.category}
        isDarkMode={isDarkMode}
        totalCategoryExpenses={totalCategoryExpenses}
        selectedCategory={selectedCategory}
        monthlyLimit={watch("monthlyLimit")}
      />
      <MonthlyLimitInput
        register={register}
        error={errors.monthlyLimit}
        isDarkMode={isDarkMode}
        currencySymbol={currencySymbol}
      />
      <BudgetDatePickers
        startDate={startDate}
        endDate={endDate}
        setStartDate={handleStartDateChange}
        setEndDate={handleEndDateChange}
        setValue={setValue}
        errors={errors}
        isDarkMode={isDarkMode}
      />
      <BudgetButtons
        isDarkMode={isDarkMode}
        onCancel={() => navigate("/budgets")}
      />
    </form>
  );
};

export default AddBudgetForm;
