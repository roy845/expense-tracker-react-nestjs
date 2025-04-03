import MainLayout from "../layout/MainLayout";
import Spinner from "../components/common/Spinner";
import EditBudgetForm from "../components/editBudget/EditBudgetForm";
import EditBudgetHeader from "../components/editBudget/EditBudgetHeader";
import useEditBudget from "../hooks/useEditBudget";

const EditBudget = () => {
  const {
    currencySymbol,
    endDate,
    errors,
    handleEndDateChange,
    handleStartDateChange,
    handleSubmit,
    isDarkMode,
    loading,
    navigate,
    onSubmit,
    register,
    startDate,
    totalCategoryExpenses,
    watch,
  } = useEditBudget();

  return (
    <MainLayout title="Edit Budget">
      <div
        className={`max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <EditBudgetHeader />

        {loading ? (
          <Spinner />
        ) : (
          <EditBudgetForm
            register={register}
            errors={errors}
            watch={watch}
            onSubmit={handleSubmit(onSubmit)}
            isDarkMode={isDarkMode}
            currencySymbol={currencySymbol}
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            totalCategoryExpenses={totalCategoryExpenses}
            onCancel={() => navigate("/budgets")}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default EditBudget;
