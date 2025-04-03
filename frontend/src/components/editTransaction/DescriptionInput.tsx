interface Props {
  register: any;
  error?: string;
  isDarkMode: boolean;
}

const DescriptionInput: React.FC<Props> = ({ register, error, isDarkMode }) => (
  <div>
    <label className="block font-medium text-left">Description</label>
    <input
      type="text"
      {...register("description")}
      className={`w-full px-4 py-2 rounded-md border focus:outline-none ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-gray-100 border-gray-300 text-black"
      }`}
    />
    {error && <p className="text-red-500 text-sm text-left">*{error}</p>}
  </div>
);

export default DescriptionInput;
