interface Props {
  updating: boolean;
}

const EditUserSubmitButton = ({ updating }: Props) => (
  <button
    type="submit"
    className="w-full p-2 mt-4 font-semibold rounded bg-blue-600 hover:bg-blue-700 text-white"
    disabled={updating}
  >
    {updating ? "Updating..." : "Save Changes"}
  </button>
);

export default EditUserSubmitButton;
