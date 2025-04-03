import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  register: UseFormRegisterReturn;
  isDarkMode: boolean;
}

const EditUserPasswordField = ({ register, isDarkMode }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputStyle = `w-full p-2 border rounded pr-10 ${
    isDarkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white"
  }`;

  return (
    <div>
      <label className="flex items-center text-sm font-semibold">
        <FaLock className="mr-2" />
        Password (leave blank to keep the same)
      </label>
      <div className="relative">
        <input
          {...register}
          type={showPassword ? "text" : "password"}
          className={inputStyle}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default EditUserPasswordField;
