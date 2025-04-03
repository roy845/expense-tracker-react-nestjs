interface Props {
  onClick: () => void;
  isDarkMode: boolean;
}

const RemoveRolesButton = ({ onClick, isDarkMode }: Props) => (
  <button
    onClick={onClick}
    className={`w-full py-2 px-4 rounded-md font-semibold transition ${
      isDarkMode
        ? "bg-blue-700 hover:bg-blue-800 text-white"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }`}
  >
    Remove Roles
  </button>
);

export default RemoveRolesButton;
