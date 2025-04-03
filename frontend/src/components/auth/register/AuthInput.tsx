import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon: JSX.Element;
  error?: FieldError;
  isDarkMode?: boolean;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({ id, label, icon, error, isDarkMode, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="flex items-center gap-2 font-medium">
          {icon} {label}
        </label>
        <input
          id={id}
          className={`w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            isDarkMode ? "bg-gray-700 text-white" : ""
          }`}
          ref={ref}
          {...rest}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1 text-left">
            *{error.message}
          </p>
        )}
      </div>
    );
  }
);

export default AuthInput;
