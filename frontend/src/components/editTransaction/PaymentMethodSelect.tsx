import { PaymentMethod } from "../../types/transaction.types";

interface Props {
  register: any;
  isDarkMode: boolean;
}

const PaymentMethodSelect: React.FC<Props> = ({ register, isDarkMode }) => (
  <div>
    <label className="block font-medium text-left">Payment Method</label>
    <select
      {...register("paymentMethod")}
      className={`w-full px-4 py-2 rounded-md border focus:outline-none cursor-pointer ${
        isDarkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-gray-100 border-gray-300 text-black"
      }`}
    >
      {Object.values(PaymentMethod).map((method) => (
        <option key={method} value={method}>
          {method}
        </option>
      ))}
    </select>
  </div>
);

export default PaymentMethodSelect;
