import MainLayout from "../layout/MainLayout";
import Spinner from "../components/common/Spinner";
import SubmitButton from "../components/editTransaction/SubmitButton";
import RecurringSwitch from "../components/editTransaction/RecurringSwitch";
import TagsInput from "../components/editTransaction/TagsInput";
import PaymentMethodSelect from "../components/editTransaction/PaymentMethodSelect";
import DateInput from "../components/editTransaction/DateInput";
import WarningMessage from "../components/editTransaction/WarningMessage";
import CategorySelect from "../components/editTransaction/CategorySelect";
import DescriptionInput from "../components/editTransaction/DescriptionInput";
import TransactionTypeToggle from "../components/editTransaction/TransactionTypeToggle";
import AmountInput from "../components/editTransaction/AmountInput";
import EditTransactionHeader from "../components/editTransaction/EditTransactionHeader";
import useEditTransaction from "../hooks/useEditTransaction";

const EditTransaction = () => {
  const {
    addTag,
    currencySymbol,
    errors,
    isRecurring,
    fetching,
    handleSubmit,
    isDarkMode,
    loading,
    onSubmit,
    register,
    removeTag,
    setTagInput,
    setValue,
    tagInput,
    tags,
    transactionType,
    warning,
  } = useEditTransaction();

  return (
    <MainLayout title="Edit Transaction">
      <div
        className={`max-w-lg mx-auto p-6 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <EditTransactionHeader />

        {fetching ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AmountInput
              register={register}
              error={errors.amount?.message}
              currencySymbol={currencySymbol}
              isDarkMode={isDarkMode}
            />

            <TransactionTypeToggle
              value={transactionType}
              onChange={(val) => setValue("type", val)}
            />

            <DescriptionInput
              register={register}
              error={errors.description?.message}
              isDarkMode={isDarkMode}
            />

            <CategorySelect register={register} isDarkMode={isDarkMode} />

            <WarningMessage message={warning} />

            <DateInput register={register} isDarkMode={isDarkMode} />

            <PaymentMethodSelect register={register} isDarkMode={isDarkMode} />

            <TagsInput
              value={tagInput}
              tags={tags}
              onChange={(e) => setTagInput(e.target.value)}
              onAdd={addTag}
              onRemove={removeTag}
              isDarkMode={isDarkMode}
            />

            <RecurringSwitch
              value={isRecurring}
              onChange={(val) => setValue("recurringTransaction", val)}
            />

            <SubmitButton
              isLoading={loading}
              transactionType={transactionType}
            />
          </form>
        )}
      </div>
    </MainLayout>
  );
};

export default EditTransaction;
