import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  id: string;
  label: React.ReactNode;
  placeholder?: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  darkMode?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  register,
  error,
  darkMode = false,
}) => (
  <div>
    <label htmlFor={id} className="flex items-center gap-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      {...register}
      className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
        darkMode ? "bg-gray-700 text-white" : ""
      }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">*{error.message}</p>}
  </div>
);

export default FormInput;
