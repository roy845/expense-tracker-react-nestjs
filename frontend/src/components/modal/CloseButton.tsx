import { IoIosClose } from "react-icons/io";
import { useAppDispatch } from "../../app/hooks";
import { closeModal } from "../../features/modalSlice";

const CloseButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(closeModal())}
      className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
    >
      <IoIosClose size={32} />
    </button>
  );
};

export default CloseButton;
