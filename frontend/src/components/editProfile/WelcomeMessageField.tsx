import { FaCommentDots } from "react-icons/fa";

interface Props {
  register: any;
  error?: string;
  inputStyle: string;
}

const WelcomeMessageField: React.FC<Props> = ({
  register,
  error,
  inputStyle,
}) => (
  <div>
    <label className="flex items-center text-sm font-semibold">
      <FaCommentDots className="mr-2" /> Welcome Message
    </label>
    <textarea {...register("bio.welcomeMessage")} className={inputStyle} />
    {error && <p className="text-red-500 text-sm mt-1">*{error}</p>}
  </div>
);

export default WelcomeMessageField;
