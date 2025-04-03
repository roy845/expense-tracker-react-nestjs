import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface DateInputProps {
  label: string;
  isDarkMode: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const DateInput = ({
  label,
  isDarkMode,
  register,
  error,
}: DateInputProps) => (
  <div>
    <label className="block font-medium text-left">{label}</label>
    <input
      type="date"
      {...register}
      className={`w-full px-4 py-2 rounded-md border appearance-none focus:outline-none cursor-pointer ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-gray-100 border-gray-300 text-black"
      }`}
    />
    {error && (
      <p className="text-red-500 text-sm text-left">*{error.message}</p>
    )}
  </div>
);
