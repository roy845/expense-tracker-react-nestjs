import { FaSave } from "react-icons/fa";
import { TransactionType } from "../../types/transaction.types";

interface Props {
  isLoading: boolean;
  transactionType: TransactionType;
}

const SubmitButton: React.FC<Props> = ({ isLoading, transactionType }) => (
  <button
    type="submit"
    disabled={isLoading}
    className={`w-full flex justify-center items-center gap-2 py-2 font-semibold rounded-lg transition-all ${
      isLoading ? "opacity-50 cursor-not-allowed" : ""
    } ${
      transactionType === TransactionType.Income
        ? "bg-green-500 hover:bg-green-600 text-white"
        : "bg-red-500 hover:bg-red-600 text-white"
    }`}
  >
    {isLoading ? "Updating..." : "Update Transaction"}
    <FaSave />
  </button>
);

export default SubmitButton;
