import { Link } from "react-router-dom";
import { FaUserSlash } from "react-icons/fa";
import MainLayout from "../../layout/MainLayout";

const UserNotFound = () => {
  return (
    <MainLayout title="User Not Found">
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <FaUserSlash className="text-red-500 text-6xl mb-4" />
        <h2 className="text-2xl font-semibold mb-2">User not found</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          The user you're looking for does not exist or might have been removed.
          Please check the URL or return to the user list.
        </p>
        <Link
          to="/admin/users"
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Users
        </Link>
      </div>
    </MainLayout>
  );
};

export default UserNotFound;
