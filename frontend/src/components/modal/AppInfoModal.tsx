import React from "react";
import { IoIosClose, IoIosInformationCircle } from "react-icons/io";
import CloseButton from "./CloseButton";
import { closeModal, toggleDoNotShowAgain } from "../../features/modalSlice";
import useAppInfoModal from "../../hooks/useAppInfoModal";
import { useAuth } from "../../context/authContext";
import { DecodedToken } from "../../types/auth.types";
import decodeToken from "../../utils/decodeToken";
import { UserRoles } from "../../types/roles.types";

const AppInfoModal: React.FC = () => {
  const { auth } = useAuth();
  const decodedToken: DecodedToken | null = decodeToken(auth?.accessToken);
  const { isOpen, doNotShowAgain, isDarkMode, dispatch } = useAppInfoModal();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div
        className={`relative rounded-lg w-3/4 max-w-lg p-6 shadow-lg ${
          isDarkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-900"
        }`}
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <CloseButton />

        <h2 className="text-center text-2xl font-bold mb-4 flex items-center justify-center gap-2">
          About Expense Tracker
          <IoIosInformationCircle size={28} />
        </h2>
        <p className="mb-4">
          <strong>Expense Tracker</strong> is a personal finance management app
          that helps you gain full control over your income, spending, and
          savings.
        </p>

        <h3 className="text-xl font-semibold mb-2">How to Use the App</h3>
        <ul className="list-disc list-outside pl-5 mb-4">
          <li>Add, view, and manage your daily expenses and incomes.</li>
          <li>Track your monthly balance and financial changes over time.</li>
          <li>Visualize expenses by category with interactive graphs.</li>
          <li>Create budgets and monitor how well you're sticking to them.</li>
          <li>Scan receipts to automatically extract and log expenses.</li>
          <li>Convert currencies using the built-in currency converter.</li>
          <li>
            Analyze income sources and expense trends for better planning.
          </li>
          {decodedToken?.roles.includes(UserRoles.ADMIN) && (
            <li>Use the admin panel for advanced controls and settings.</li>
          )}
          <li>Toggle between dark and light modes based on your preference.</li>
        </ul>

        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="doNotShowAgain"
            checked={doNotShowAgain}
            onChange={() => dispatch(toggleDoNotShowAgain())}
            className={`h-5 w-5 border-2 rounded-md cursor-pointer transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isDarkMode
                ? "bg-gray-700 text-gray-300 border-gray-600 focus:ring-blue-400"
                : "bg-white text-gray-700 border-gray-300 focus:ring-blue-500"
            }`}
          />
          <label
            htmlFor="doNotShowAgain"
            className={`ml-2 cursor-pointer select-none ${
              isDarkMode ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Do not show this again
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => dispatch(closeModal())}
            className={`px-4 py-2 rounded transition flex items-center gap-2 ${
              isDarkMode
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Close
            <IoIosClose size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppInfoModal;
