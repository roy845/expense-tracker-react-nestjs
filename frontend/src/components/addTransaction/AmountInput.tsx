import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface AmountInputProps {
  isDarkMode: boolean;
  currencySymbol: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const AmountInput = ({
  isDarkMode,
  currencySymbol,
  register,
  error,
}: AmountInputProps) => (
  <div>
    <label className="block font-medium text-left">Amount</label>
    <div className="relative">
      <span
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-bold ${
          isDarkMode ? "text-white" : "text-gray-600"
        }`}
      >
        {currencySymbol}
      </span>
      <input
        type="number"
        step="any"
        {...register}
        className={`w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-gray-100 border-gray-300 text-black"
        }`}
      />
    </div>
    {error && (
      <p className="text-red-500 text-sm text-left">*{error.message}</p>
    )}
  </div>
);

export default AmountInput;
