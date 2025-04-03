import { Category } from "../../types/transaction.types";

interface Props {
  register: any;
  isDarkMode: boolean;
}

const CategorySelect: React.FC<Props> = ({ register, isDarkMode }) => (
  <div>
    <label className="block font-medium text-left">Category</label>
    <select
      {...register("category")}
      className={`w-full px-4 py-2 rounded-md border focus:outline-none cursor-pointer ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-gray-100 border-gray-300 text-black"
      }`}
    >
      {Object.values(Category).map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
);

export default CategorySelect;
