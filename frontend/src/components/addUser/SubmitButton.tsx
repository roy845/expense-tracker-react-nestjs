import React from "react";
import { BallTriangle } from "react-loader-spinner";

interface SubmitButtonProps {
  loading: boolean;
  label: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, label }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
  >
    {loading ? (
      <>
        <BallTriangle height={20} width={20} color="#fff" />
        Registering...
      </>
    ) : (
      label
    )}
  </button>
);

export default SubmitButton;
