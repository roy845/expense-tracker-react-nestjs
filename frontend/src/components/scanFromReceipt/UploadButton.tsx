import { FaSpinner } from "react-icons/fa";

interface Props {
  onClick: () => void;
  loading: boolean;
}

const UploadButton: React.FC<Props> = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" />
          Scanning...
        </>
      ) : (
        "Upload & Scan"
      )}
    </button>
  );
};

export default UploadButton;
