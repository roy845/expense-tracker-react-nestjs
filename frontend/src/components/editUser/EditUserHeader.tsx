import { FaUpload } from "react-icons/fa";

interface Props {
  avatarSrc: string | null | undefined;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditUserHeader = ({ avatarSrc, onUpload }: Props) => (
  <div className="flex flex-col items-center space-y-4 mb-6">
    <h2 className="text-2xl font-bold">Edit Profile</h2>
    <img
      src={avatarSrc as string | undefined}
      alt="User Avatar"
      className="w-28 h-28 rounded-full border-4 border-gray-300"
    />
    <label className="flex items-center cursor-pointer text-blue-500 hover:text-blue-600">
      <FaUpload className="mr-2" />
      <span>Upload New Avatar</span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onUpload}
      />
    </label>
  </div>
);

export default EditUserHeader;
