interface Props {
  isLoading: boolean;
}

const SubmitButton: React.FC<Props> = ({ isLoading }) => (
  <button
    type="submit"
    className="w-full p-2 mt-4 font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white"
    disabled={isLoading}
  >
    {isLoading ? "Updating..." : "Save Changes"}
  </button>
);

export default SubmitButton;
