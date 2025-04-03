import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PasswordInputProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  darkMode?: boolean;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  register,
  error,
  darkMode = false,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="flex items-center gap-2">
        <FaLock /> {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          {...register}
          placeholder={label}
          className={`w-full mt-1 p-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            darkMode ? "bg-gray-700 text-white" : ""
          }`}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">*{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
