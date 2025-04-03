import React from "react";

interface Props {
  onCancel: () => void;
}

const FormButtons: React.FC<Props> = ({ onCancel }) => (
  <div className="flex justify-end gap-2 mt-4">
    <button
      type="button"
      onClick={onCancel}
      className="px-4 py-2 bg-gray-500 text-white rounded-lg"
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Update Budget
    </button>
  </div>
);

export default FormButtons;
