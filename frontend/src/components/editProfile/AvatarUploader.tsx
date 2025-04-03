import { FaUpload } from "react-icons/fa";

interface Props {
  avatarUrl: string | undefined;
  previewImage: string | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarUploader: React.FC<Props> = ({
  avatarUrl,
  previewImage,
  onFileUpload,
}) => (
  <div className="flex flex-col items-center space-y-4 mb-6">
    <h2 className="text-2xl font-bold">Edit Your Profile</h2>
    <img
      src={previewImage || avatarUrl}
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
        onChange={onFileUpload}
      />
    </label>
  </div>
);

export default AvatarUploader;
