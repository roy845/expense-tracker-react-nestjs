import { FaPlus, FaTimes } from "react-icons/fa";

interface TagInputProps {
  isDarkMode: boolean;
  tags: string[] | undefined;
  tagInput: string;
  onTagInputChange: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

const TagInput = ({
  isDarkMode,
  tags,
  tagInput,
  onTagInputChange,
  onAddTag,
  onRemoveTag,
}: TagInputProps) => (
  <div>
    <label className="block font-medium text-left">Tags</label>
    <div className="flex gap-2">
      <input
        type="text"
        value={tagInput}
        onChange={(e) => onTagInputChange(e.target.value)}
        className={`w-full px-4 py-2 rounded-md border focus:outline-none ${
          isDarkMode
            ? "bg-gray-700 border-gray-600 text-white"
            : "bg-gray-100 border-gray-300 text-black"
        }`}
      />
      <button
        type="button"
        onClick={onAddTag}
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
          <FaTimes
            className="cursor-pointer"
            onClick={() => onRemoveTag(tag)}
          />
        </span>
      ))}
    </div>
  </div>
);

export default TagInput;
