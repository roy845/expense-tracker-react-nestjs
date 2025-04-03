import { TransactionType } from "../../types/transaction.types";

interface Props {
  value: TransactionType;
  onChange: (type: TransactionType) => void;
}

const TransactionTypeToggle = ({ value, onChange }: Props) => (
  <div>
    <label className="block font-medium text-left">Transaction Type</label>
    <div className="flex space-x-4">
      {Object.values(TransactionType).map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`flex-1 py-2 rounded-md font-semibold transition-all ${
            value === type
              ? type === TransactionType.Expense
                ? "bg-red-500 text-white"
                : "bg-green-500 text-white"
              : "bg-gray-300 text-gray-700"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  </div>
);

export default TransactionTypeToggle;
