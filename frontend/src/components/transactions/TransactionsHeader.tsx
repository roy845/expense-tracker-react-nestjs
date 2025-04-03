interface Props {
  isDarkMode: boolean;
}

const TransactionsHeader = ({ isDarkMode }: Props) => {
  return (
    <div className="mb-6 text-center">
      <h1
        className={`text-3xl font-bold ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Transactions
      </h1>
      <p
        className={`text-lg ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
      >
        Manage your financial transactions
      </p>
    </div>
  );
};

export default TransactionsHeader;
