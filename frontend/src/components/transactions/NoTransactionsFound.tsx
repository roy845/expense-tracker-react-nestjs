import { LuDollarSign } from "react-icons/lu";

const NoTransactionsFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-gray-500 py-6">
      <LuDollarSign className="w-10 h-10 mb-2" />
      <p>No transactions found.</p>
    </div>
  );
};

export default NoTransactionsFound;
