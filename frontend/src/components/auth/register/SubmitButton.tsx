import { BallTriangle } from "react-loader-spinner";

interface SubmitButtonProps {
  loading: boolean;
  loadingText: string;
  buttonText: string;
}

const SubmitButton = ({
  loading,
  loadingText,
  buttonText,
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
      disabled={loading}
    >
      {loading ? (
        <>
          <BallTriangle height={20} width={20} color="#fff" /> {loadingText}
        </>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default SubmitButton;
