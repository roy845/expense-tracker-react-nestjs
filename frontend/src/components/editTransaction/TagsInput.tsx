import { FaPlus, FaTimes } from "react-icons/fa";

interface Props {
  value: string;
  tags: string[] | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
  isDarkMode: boolean;
}

const TagsInput: React.FC<Props> = ({
  value,
  tags,
  onChange,
  onAdd,
  onRemove,
  isDarkMode,
}) => (
  <div>
    <label className="block font-medium text-left">Tags</label>
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 rounded-md border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-gray-100 border-gray-300 text-black"
        }`}
      />
      <button
        type="button"
        onClick={onAdd}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        <FaPlus />
      </button>
    </div>
    <div className="flex flex-wrap gap-2 mt-2">
      {(tags as string[]).map((tag, index) => (
        <span
          key={index}
          className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-sm rounded-md"
        >
          {tag}
          <FaTimes className="cursor-pointer" onClick={() => onRemove(index)} />
        </span>
      ))}
    </div>
  </div>
);

export default TagsInput;
