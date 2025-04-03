import AddBudgetForm from "../components/addBudget/AddBudgetForm";
import AddBudgetHeader from "../components/addBudget/AddBudgetHeader";
import { useDarkMode } from "../hooks/useDarkMode";
import MainLayout from "../layout/MainLayout";

const AddBudget = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <MainLayout title="Add Budget">
      <div
        className={`max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <AddBudgetHeader />
        <AddBudgetForm />
      </div>
    </MainLayout>
  );
};

export default AddBudget;
