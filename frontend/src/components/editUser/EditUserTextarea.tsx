import { FaCommentDots } from "react-icons/fa";
import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  icon: "comment";
  register: UseFormRegisterReturn;
  error?: string;
  isDarkMode: boolean;
}

const EditUserTextarea = ({
  label,
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
        <FaCommentDots className="mr-2" /> {label}
      </label>
      <textarea {...register} className={inputStyle} />
      {error && <p className="text-red-500 text-sm mt-1 text-left">*{error}</p>}
    </div>
  );
};

export default EditUserTextarea;
