import React, { useState } from "react";
import { FaSave, FaTimes, FaLock, FaLockOpen, FaCheck } from "react-icons/fa";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  filename: string;
  onFilenameChange: (value: string) => void;
  onExport: () => void;
  title?: string;
  isDarkMode?: boolean;
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  filename,
  onFilenameChange,
  onExport,
  title = "Export Data",
  isDarkMode = false,
}) => {
  const [isLocked, setIsLocked] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  if (!isOpen) return null;

  const bgClass = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const inputBg = isDarkMode
    ? "bg-gray-800 text-white border-gray-700"
    : "bg-white text-gray-900 border-gray-300";
  const cancelBtn = isDarkMode
    ? "bg-gray-700 hover:bg-gray-600 text-white"
    : "bg-gray-300 hover:bg-gray-400 text-black";

  const handleSave = () => {
    setShowCheck(true);
    onExport();

    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div
        className={`rounded-xl shadow-xl w-full max-w-md p-6 space-y-4 ${bgClass}`}
      >
        <h2 className="text-xl font-semibold flex justify-center items-center">
          {title}
          <button
            onClick={() => setIsLocked((prev) => !prev)}
            className="text-lg ml-4"
            title={isLocked ? "Unlock filename input" : "Lock filename input"}
          >
            {isLocked ? <FaLock /> : <FaLockOpen />}
          </button>
        </h2>

        <div className="space-y-2">
          <label className="text-sm">File Name</label>
          <input
            type="text"
            value={filename}
            disabled={isLocked}
            onChange={(e) => onFilenameChange(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md ${inputBg} ${
              isLocked ? "opacity-60 cursor-not-allowed" : ""
            }`}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className={`flex items-center gap-2 px-4 py-2 rounded-md ${cancelBtn}`}
          >
            <FaTimes /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
          >
            {showCheck && filename ? <FaCheck /> : <FaSave />} Save & Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
