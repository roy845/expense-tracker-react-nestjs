import React from "react";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id?: string) => void;
  isDarkMode: boolean;
  prompt: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDarkMode,
  prompt,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`p-6 rounded-lg shadow-lg max-w-md ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p className="mb-4">{prompt}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-semibold ${
              isDarkMode
                ? "bg-gray-600 hover:bg-gray-700 text-white"
                : "bg-gray-300 hover:bg-gray-400 text-gray-900"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm()}
            className="px-4 py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
