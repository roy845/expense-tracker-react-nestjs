import { BudgetWithSpent } from "../../types/budget.types";
import BudgetCard from "./BudgetCard";

type BudgetsListProps = {
  budgets: BudgetWithSpent[];
  removeBudgetFromList: (budgetId: string) => void;
};

const BudgetsList = ({ budgets, removeBudgetFromList }: BudgetsListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {budgets.map((budget: BudgetWithSpent) => (
        <BudgetCard
          key={budget.id}
          budget={budget}
          removeBudgetFromList={removeBudgetFromList}
        />
      ))}
    </div>
  );
};

export default BudgetsList;
