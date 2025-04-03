import BudgetProgress from "../components/dashboard/BudgetProgress";
import MainLayout from "../layout/MainLayout";
import Spinner from "../components/common/Spinner";
import Tooltip from "../components/common/Tooltip";
import { FaInfoCircle } from "react-icons/fa";
import AppInfoModal from "../components/modal/AppInfoModal";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardCard from "../components/dashboard/DashboardCard";
import ExpenseTrends from "../components/dashboard/ExpenseTrends";
import ExpenseByCategory from "../components/dashboard/ExpenseByCategory";
import IncomeSources from "../components/dashboard/IncomeSources";
import IncomeVsExpenses from "../components/dashboard/IncomeVsExpenses";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import useDashboard from "../hooks/useDashboard";

const Dashboard = () => {
  const { loading, error, isDarkMode, currentMonth, metrics, prevMonth } =
    useDashboard();

  if (loading) {
    return (
      <MainLayout title="Dashboard">
        <Spinner />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout title="Dashboard">
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg text-red-500">{error}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Dashboard">
      <AppInfoModal />
      <div
        className={`space-y-6 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
        } p-6 rounded-lg transition-colors duration-300`}
      >
        {/* Header */}
        <DashboardHeader />

        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Income Card */}
          <DashboardCard
            title={
              <span className="flex items-center gap-1">
                Income
                <Tooltip content="Total amount of money earned from all income sources.">
                  <FaInfoCircle className="text-blue-500 cursor-pointer" />
                </Tooltip>
              </span>
            }
            amount={metrics.income}
            type="income"
          />

          {/* Expenses Card */}
          <DashboardCard
            title={
              <span className="flex items-center gap-1">
                Expenses
                <Tooltip content="Total amount of money spent on all expenses.">
                  <FaInfoCircle className="text-blue-500 cursor-pointer" />
                </Tooltip>
              </span>
            }
            amount={metrics.expenses}
            type="expenses"
          />

          {/* Balance Card */}
          <DashboardCard
            title={
              <span className="flex items-center gap-1">
                Balance
                <Tooltip content="Remaining money after subtracting expenses from income.">
                  <FaInfoCircle className="text-blue-500 cursor-pointer" />
                </Tooltip>
              </span>
            }
            amount={metrics.balance}
            type="balance"
          />

          {/* Monthly Change Card */}
          <DashboardCard
            title={
              <span className="flex items-center gap-1">
                Monthly Change
                <Tooltip
                  content={`Comparison of ${currentMonth} balance to ${prevMonth}. A positive value means you're saving more, while a negative value means you're spending more.`}
                >
                  <FaInfoCircle className="text-blue-500 cursor-pointer" />
                </Tooltip>
              </span>
            }
            amount={metrics.monthlyChange}
            type="change"
          />
        </div>
        {/* Charts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ExpenseTrends />
          <ExpenseByCategory />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <IncomeVsExpenses />
          <IncomeSources />
        </div>
        {/* Transactions & Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RecentTransactions />
          <BudgetProgress />
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
