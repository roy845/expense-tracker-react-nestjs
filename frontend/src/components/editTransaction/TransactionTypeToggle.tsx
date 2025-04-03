import { TransactionType } from "../../types/transaction.types";

interface Props {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
}

const TransactionTypeToggle: React.FC<Props> = ({ value, onChange }) => (
  <div>
    <label className="block font-medium text-left">Transaction Type</label>
    <div className="flex space-x-4">
      <button
        type="button"
        onClick={() => onChange(TransactionType.Expense)}
        className={`flex-1 py-2 rounded-md font-semibold ${
          value === TransactionType.Expense
            ? "bg-red-500 text-white"
            : "bg-gray-300 text-gray-700"
        }`}
      >
        Expense
      </button>
      <button
        type="button"
        onClick={() => onChange(TransactionType.Income)}
        className={`flex-1 py-2 rounded-md font-semibold ${
          value === TransactionType.Income
            ? "bg-green-500 text-white"
            : "bg-gray-300 text-gray-700"
        }`}
      >
        Income
      </button>
    </div>
  </div>
);

export default TransactionTypeToggle;
