import { FC } from "react";
import { FieldErrors, UseFormSetValue } from "react-hook-form";
import { FaCalendarAlt } from "react-icons/fa";
import { BudgetFormData } from "../../schemas/addBudgetSchema.schema";

interface Props {
  startDate: string;
  endDate: string;
  setStartDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setEndDate: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setValue: UseFormSetValue<BudgetFormData>;
  errors: FieldErrors<BudgetFormData>;
  isDarkMode: boolean;
}

const BudgetDatePickers: FC<Props> = ({
  startDate,
  endDate,
  errors,
  setEndDate,
  setStartDate,
  setValue,
  isDarkMode,
}) => {
  const startDateError = errors.startDate?.message;
  const endDateError = errors.endDate?.message;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-left">Start Date</label>
        <div className="relative">
          <FaCalendarAlt className="absolute top-3 left-3 text-gray-500" />
          <input
            type="date"
            className={`w-full pl-10 px-3 py-2 border rounded-lg ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
            value={startDate}
            onChange={setStartDate}
          />
        </div>
        {startDateError && (
          <p className="text-red-500 text-sm text-left">*{startDateError}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-left">End Date</label>
        <div className="relative">
          <FaCalendarAlt className="absolute top-3 left-3 text-gray-500" />
          <input
            type="date"
            className={`w-full pl-10 px-3 py-2 border rounded-lg ${
              isDarkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-black"
            }`}
            value={endDate}
            onChange={setEndDate}
          />
        </div>
        {endDateError && (
          <p className="text-red-500 text-sm text-left">*{endDateError}</p>
        )}
      </div>
    </div>
  );
};

export default BudgetDatePickers;
