import { FaUser, FaEnvelope } from "react-icons/fa";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  type?: string;
  icon: "user" | "envelope";
  register: UseFormRegisterReturn;
  error?: string;
  isDarkMode: boolean;
}

const iconMap = {
  user: <FaUser className="mr-2" />,
  envelope: <FaEnvelope className="mr-2" />,
};

const EditUserInputField = ({
  label,
  type = "text",
  icon,
  register,
  error,
  isDarkMode,
}: Props) => {
  const inputStyle = `w-full p-2 border rounded ${
    isDarkMode ? "bg-gray-700 text-white border-gray-500" : "bg-white"
  }`;

  return (
    <div>
      <label className="flex items-center text-sm font-semibold">
        {iconMap[icon]} {label}
      </label>
      <input {...register} type={type} className={inputStyle} />
      {error && <p className="text-red-500 text-sm mt-1 text-left">*{error}</p>}
    </div>
  );
};

export default EditUserInputField;
