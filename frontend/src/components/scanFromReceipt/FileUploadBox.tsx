import { FaCloudUploadAlt } from "react-icons/fa";

interface Props {
  file: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDarkMode: boolean;
}

const FileUploadBox: React.FC<Props> = ({ file, onChange, isDarkMode }) => {
  return (
    <label
      className={`cursor-pointer flex flex-col items-center justify-center gap-2 border-2 border-dashed p-6 rounded-lg transition
      ${
        isDarkMode
          ? "bg-gray-800 text-white border-gray-500 hover:bg-gray-700 hover:border-blue-300"
          : "bg-white text-gray-900 border-gray-400 hover:bg-gray-100 hover:border-blue-400"
      }`}
    >
      <FaCloudUploadAlt className="text-4xl text-blue-500" />
      <span
        className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
      >
        {file ? file.name : "Click to Upload Receipt"}
      </span>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
};

export default FileUploadBox;
