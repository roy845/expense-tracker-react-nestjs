import { useEffect, useState } from "react";
import { parseISO } from "date-fns";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BudgetWithSpent } from "../../types/budget.types";
import { useDarkMode } from "../../hooks/useDarkMode";
import useBudgetService from "../../hooks/useBudgetService";
import { useAppSelector } from "../../app/hooks";
import { selectCurrency } from "../../features/currencySlice";
import {
  PERMISSION_EDIT_BUDGET,
  PERMISSION_REMOVE_BUDGET,
} from "../../constants/permissionsConstants";
import ConfirmDeleteModal from "../modal/ConfirmDeleteModal";

type BudgetCardProps = {
  budget: BudgetWithSpent;
  removeBudgetFromList: (budgetId: string) => void;
};

const BudgetCard = ({ budget, removeBudgetFromList }: BudgetCardProps) => {
  const { isDarkMode } = useDarkMode();
  const { removeBudget, getTotalExpensesByCategory } = useBudgetService();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);

  const budgetStartDate = parseISO(budget.startDate);
  const budgetEndDate = parseISO(budget.endDate);

  const { currencySymbol } = useAppSelector(selectCurrency);
  const { permissions } = useAppSelector((state) => state.userPermissions);

  useEffect(() => {
    const fetchTotalExpenses = async () => {
      try {
        setLoading(true);
        const expenses = await getTotalExpensesByCategory(
          budget.category,
          budget.startDate,
          budget.endDate
        );
        setTotalSpent(expenses);
      } catch (error) {
        toast.error("Failed to fetch total expenses.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalExpenses();
  }, [budget.category, budget.startDate, budget.endDate]);

  const usedPercentage = Math.min(
    100,
    (totalSpent / budget.monthlyLimit) * 100
  );
  const isOverBudget = totalSpent > budget.monthlyLimit;

  return (
    <div
      className={`max-w-md w-full p-4 border rounded-lg shadow-sm relative flex flex-col gap-2 ${
        isDarkMode
          ? "bg-gray-800 border-gray-700 text-white"
          : "bg-white border-gray-300 text-gray-900"
      }`}
    >
      {/* Header Row */}
      <div className="flex justify-between items-start mb-1">
        <div>
          <h2 className="text-base font-semibold leading-snug">
            {budget.category} Budget
          </h2>
          <p
            className={`text-sm font-medium mt-0.5 ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {budget.name}
          </p>
        </div>

        {/* Icons */}
        <div className="flex gap-2">
          {permissions.includes(PERMISSION_EDIT_BUDGET) && (
            <button
              className="p-1 rounded-md"
              title="Edit Budget"
              onClick={() => navigate(`/edit-budget/${budget.id}`)}
            >
              <FaEdit
                className={`text-gray-400 hover:scale-110 transition-transform ${
                  isDarkMode ? "hover:text-blue-400" : "hover:text-blue-500"
                }`}
              />
            </button>
          )}
          {permissions.includes(PERMISSION_REMOVE_BUDGET) && (
            <button
              className="p-1 rounded-md"
              title="Delete Budget"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <FaTrash
                className={`text-gray-400 hover:scale-110 transition-transform ${
                  isDarkMode ? "hover:text-red-400" : "hover:text-red-500"
                }`}
              />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-4">Loading expenses...</p>
      ) : (
        <>
          {/* Amounts */}
          <div className="flex justify-between items-center text-sm font-medium">
            <span>
              Spent: {currencySymbol}
              {totalSpent.toFixed(2)}
            </span>
            <span>
              Limit: {currencySymbol}
              {budget.monthlyLimit.toFixed(2)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 rounded-full bg-gray-300 dark:bg-gray-600 mt-1 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${usedPercentage}%`,
                backgroundColor: isOverBudget ? "#ef4444" : "#3b82f6",
              }}
            />
          </div>

          {/* Usage Summary */}
          <div className="flex justify-between items-center text-sm mt-1">
            <span
              className={`font-medium ${
                isOverBudget
                  ? "text-red-500 dark:text-red-400"
                  : "text-blue-600 dark:text-blue-400"
              }`}
            >
              {isOverBudget
                ? "🚨 Over Budget!"
                : `${usedPercentage.toFixed(0)}% used`}
            </span>
            <span>
              {currencySymbol}
              {Math.max(0, budget.monthlyLimit - totalSpent).toFixed(2)}{" "}
              remaining
            </span>
          </div>

          {/* Dates */}
          <div
            className={`flex justify-between items-center text-xs pt-1 border-t mt-3 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <span>Start: {budgetStartDate.toLocaleDateString("en-GB")}</span>
            <span>End: {budgetEndDate.toLocaleDateString("en-GB")}</span>
          </div>
        </>
      )}

      {/* Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          await removeBudget(budget.id);
          removeBudgetFromList(budget.id);
        }}
        isDarkMode={isDarkMode}
        prompt="Are you sure you want to delete this budget? This action cannot be undone."
      />
    </div>
  );
};

export default BudgetCard;
