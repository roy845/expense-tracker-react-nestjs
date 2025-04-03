import React from "react";
import { FieldErrors, UseFormRegister, UseFormWatch } from "react-hook-form";
import { BudgetFormData } from "../../schemas/addBudgetSchema.schema";
import BudgetNameInput from "./BudgetNameInput";
import CategorySelect from "./CategorySelect";
import MonthlyLimitInput from "./MonthlyLimitInput";
import DatePickers from "./DatePickers";
import FormButtons from "./FormButtons";

interface Props {
  register: UseFormRegister<BudgetFormData>;
  errors: FieldErrors<BudgetFormData>;
  watch: UseFormWatch<BudgetFormData>;
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  isDarkMode: boolean;
  currencySymbol: string;
  startDate: string;
  endDate: string;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalCategoryExpenses: number;
  onCancel: () => void;
}

const EditBudgetForm: React.FC<Props> = ({
  isDarkMode,
  currencySymbol,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  totalCategoryExpenses,
  onCancel,
  onSubmit,
  errors,
  register,
  watch,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4">
      <BudgetNameInput
        register={register}
        error={errors.name?.message}
        isDarkMode={isDarkMode}
      />
      <CategorySelect
        register={register}
        selectedCategory={watch("category")}
        totalCategoryExpenses={totalCategoryExpenses}
        monthlyLimit={watch("monthlyLimit")}
        error={errors.category?.message}
        isDarkMode={isDarkMode}
      />
      <MonthlyLimitInput
        register={register}
        error={errors.monthlyLimit?.message}
        isDarkMode={isDarkMode}
        currencySymbol={currencySymbol}
      />
      <DatePickers
        startDate={startDate}
        endDate={endDate}
        handleStartDateChange={onStartDateChange}
        handleEndDateChange={onEndDateChange}
        isDarkMode={isDarkMode}
      />
      <FormButtons onCancel={onCancel} />
    </form>
  );
};

export default EditBudgetForm;
