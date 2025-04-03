import MainLayout from "../layout/MainLayout";
import {
  Category,
  PaymentMethod,
  TransactionType,
} from "../types/transaction.types";
import AmountInput from "../components/addTransaction/AmountInput";
import TransactionTypeToggle from "../components/addTransaction/TransactionTypeToggle";
import TagInput from "../components/addTransaction/TagInput";
import RecurringSwitch from "../components/addTransaction/RecurringSwitch";
import { TextInput } from "../components/common/TextInput";
import { SelectInput } from "../components/common/SelectInput";
import { DateInput } from "../components/common/DateInput";
import { SubmitButton } from "../components/common/SubmitButton";
import AddTransactionHeader from "../components/addTransaction/AddTransactionHeader";
import useAddTransaction from "../hooks/useAddTransaction";

const AddTransaction = () => {
  const {
    warning,
    addTag,
    currencySymbol,
    errors,
    handleSubmit,
    isDarkMode,
    isRecurring,
    loading,
    onSubmit,
    register,
    removeTag,
    setTagInput,
    setValue,
    tagInput,
    tags,
    transactionType,
  } = useAddTransaction();

  return (
    <MainLayout title="Add Transaction">
      <div
        className={`max-w-lg mx-auto p-6 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <AddTransactionHeader />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AmountInput
            isDarkMode={isDarkMode}
            currencySymbol={currencySymbol}
            register={register("amount", { valueAsNumber: true })}
            error={errors.amount}
          />

          <TransactionTypeToggle
            value={transactionType}
            onChange={(type) => setValue("type", type)}
          />

          <TextInput
            label="Description"
            placeholder="Enter Transaction Description"
            isDarkMode={isDarkMode}
            register={register("description")}
            error={errors.description}
          />

          <SelectInput
            label="Category"
            isDarkMode={isDarkMode}
            register={register("category")}
            options={Object.values(Category)}
          />

          {warning && transactionType === TransactionType.Expense && (
            <p className="text-red-500 text-sm">{warning}</p>
          )}

          <DateInput
            label="Date"
            isDarkMode={isDarkMode}
            register={register("date")}
            error={errors.date}
          />

          <SelectInput
            label="Payment Method"
            isDarkMode={isDarkMode}
            register={register("paymentMethod")}
            options={Object.values(PaymentMethod)}
          />

          <TagInput
            isDarkMode={isDarkMode}
            tags={tags}
            tagInput={tagInput}
            onTagInputChange={setTagInput}
            onAddTag={addTag}
            onRemoveTag={removeTag}
          />

          <RecurringSwitch
            value={isRecurring}
            onChange={(value) => setValue("recurringTransaction", value)}
          />

          <SubmitButton
            loading={loading}
            transactionType={transactionType}
            label="Add Transaction"
          />
        </form>
      </div>
    </MainLayout>
  );
};

export default AddTransaction;
