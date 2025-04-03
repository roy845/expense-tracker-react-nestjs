import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  label: string;
  placeholder: string;
  isDarkMode: boolean;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const TextInput = ({
  label,
  isDarkMode,
  register,
  error,
  placeholder,
}: TextInputProps) => (
  <div>
    <label className="block font-medium text-left">{label}</label>
    <input
      placeholder={placeholder}
      type="text"
      {...register}
      className={`w-full px-4 py-2 rounded-md border focus:outline-none ${
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
