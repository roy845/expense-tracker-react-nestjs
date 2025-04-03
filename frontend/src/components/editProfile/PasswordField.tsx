import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  register: any;
  showPassword: boolean;
  togglePassword: () => void;
  inputStyle: string;
}

const PasswordField: React.FC<Props> = ({
  register,
  showPassword,
  togglePassword,
  inputStyle,
}) => (
  <div>
    <label className="flex items-center text-sm font-semibold">
      <FaLock className="mr-2" /> Password (leave blank to keep the same)
    </label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        {...register("password")}
        className={`${inputStyle} pr-10`}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
        onClick={togglePassword}
      >
        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
      </button>
    </div>
  </div>
);

export default PasswordField;
