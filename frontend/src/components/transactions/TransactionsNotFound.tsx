import { FaMoneyBillWave } from "react-icons/fa6";

const TransactionsNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
      <FaMoneyBillWave className="text-red-500 text-6xl mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Transaction(s) Not Found</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        We couldn't find the transaction(s) you're looking for. It might have
        been deleted or the link is broken.
      </p>
    </div>
  );
};

export default TransactionsNotFound;
