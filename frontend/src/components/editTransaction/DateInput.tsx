interface Props {
  register: any;
  isDarkMode: boolean;
}

const DateInput: React.FC<Props> = ({ register, isDarkMode }) => (
  <div>
    <label className="block font-medium text-left">Date</label>
    <input
      type="date"
      {...register("date")}
      className={`w-full px-4 py-2 rounded-md border focus:outline-none cursor-pointer ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-gray-100 border-gray-300 text-black"
      }`}
    />
  </div>
);

export default DateInput;
