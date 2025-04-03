import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FieldError } from "react-hook-form";

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder?: string;
  register: any;
  error?: FieldError;
  isDarkMode?: boolean;
}

const PasswordInput = ({
  id,
  label,
  placeholder,
  register,
  error,
  isDarkMode,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <label htmlFor={id} className="flex items-center gap-2 font-medium">
        <FaLock /> {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className={`w-full mt-1 p-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            isDarkMode ? "bg-gray-700 text-white" : ""
          }`}
          {...register(id)}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          onClick={() => setShow(!show)}
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-1 text-left">*{error.message}</p>
      )}
    </div>
  );
};

export default PasswordInput;
