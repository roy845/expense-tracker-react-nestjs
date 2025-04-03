import { UseFormRegisterReturn } from "react-hook-form";

interface SelectInputProps {
  label: string;
  isDarkMode: boolean;
  register: UseFormRegisterReturn;
  options: string[];
}

export const SelectInput = ({
  label,
  isDarkMode,
  register,
  options,
}: SelectInputProps) => (
  <div>
    <label className="block font-medium text-left">{label}</label>
    <select
      {...register}
      className={`w-full px-4 py-2 rounded-md border focus:outline-none cursor-pointer ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-gray-100 border-gray-300 text-black"
      }`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
