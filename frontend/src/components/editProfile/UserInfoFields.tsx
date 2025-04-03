import { FaUser, FaEnvelope } from "react-icons/fa";

interface Props {
  register: any;
  errors: any;
  inputStyle: string;
}

const UserInfoFields: React.FC<Props> = ({ register, errors, inputStyle }) => (
  <>
    <div>
      <label className="flex items-center text-sm font-semibold">
        <FaUser className="mr-2" /> Username
      </label>
      <input {...register("username")} className={inputStyle} />
      {errors.username && (
        <p className="text-red-500 text-sm mt-1">*{errors.username.message}</p>
      )}
    </div>

    <div>
      <label className="flex items-center text-sm font-semibold">
        <FaEnvelope className="mr-2" /> Email
      </label>
      <input {...register("email")} type="email" className={inputStyle} />
      {errors.email && (
        <p className="text-red-500 text-sm mt-1">*{errors.email.message}</p>
      )}
    </div>
  </>
);

export default UserInfoFields;
