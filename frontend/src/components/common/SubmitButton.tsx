interface SubmitButtonProps {
  loading: boolean;
  transactionType: string;
  label: string;
}

export const SubmitButton = ({
  loading,
  transactionType,
  label,
}: SubmitButtonProps) => (
  <button
    type="submit"
    disabled={loading}
    className={`w-full flex justify-center items-center gap-2 py-2 text-center font-semibold rounded-lg transition-all ${
      transactionType === "Income"
        ? "bg-green-500 hover:bg-green-600 text-white"
        : "bg-red-500 hover:bg-red-600 text-white"
    } ${loading && "opacity-50 cursor-not-allowed"}`}
  >
    {loading ? "Adding..." : label}
  </button>
);
