import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

interface Props {
  startDate: string;
  endDate: string;
  handleStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDarkMode: boolean;
}

const DatePickers: React.FC<Props> = ({
  startDate,
  endDate,
  handleStartDateChange,
  handleEndDateChange,
  isDarkMode,
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="block text-sm text-left">Start Date</label>
      <div className="relative">
        <FaCalendarAlt className="absolute top-3 left-3 text-gray-500" />
        <input
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          className={`w-full pl-10 px-3 py-2 border rounded-lg ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />
      </div>
    </div>
    <div>
      <label className="block text-sm text-left">End Date</label>
      <div className="relative">
        <FaCalendarAlt className="absolute top-3 left-3 text-gray-500" />
        <input
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          className={`w-full pl-10 px-3 py-2 border rounded-lg ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-black"
          }`}
        />
      </div>
    </div>
  </div>
);

export default DatePickers;
