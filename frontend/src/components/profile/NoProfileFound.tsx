import { Link } from "react-router-dom";
import { FaUserSlash } from "react-icons/fa";
import MainLayout from "../../layout/MainLayout";
import { useAuth } from "../../context/authContext";
import decodeToken from "../../utils/decodeToken";
import { DecodedToken } from "../../types/auth.types";

const NoProfileFound = () => {
  const { auth } = useAuth();
  const decodedToken: DecodedToken | null = decodeToken(auth?.accessToken);
  return (
    <MainLayout title="Profile Not Found">
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <FaUserSlash className="text-red-500 text-6xl mb-4" />
        <h2 className="text-2xl font-semibold mb-2">No Profile Found</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          We couldn't find a profile associated with this account. It may have
          been deleted or never created.
        </p>
        <Link
          to={`/profile/${decodedToken?._id}`}
          className="inline-block px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Back to Profile
        </Link>
      </div>
    </MainLayout>
  );
};

export default NoProfileFound;
