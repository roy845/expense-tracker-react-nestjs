import MainLayout from "../layout/MainLayout";
import Spinner from "../components/common/Spinner";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import ProfileActions from "../components/profile/ProfileActions";
import TimestampDetails from "../components/profile/TimestampDetails";
import AccountDetails from "../components/profile/AccountDetails";
import ProfileHeader from "../components/profile/ProfileHeader";
import useProfile from "../hooks/useProfile";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const {
    error,
    handleDelete,
    isDarkMode,
    loading,
    navigate,
    setShowDeleteModal,
    showDeleteModal,
    user,
    userId,
  } = useProfile();

  if (loading)
    return (
      <MainLayout title="Profile">
        <Spinner />
      </MainLayout>
    );

  if (error) return <Navigate to={"/profile-not-found"} />;

  return (
    <MainLayout title="Profile">
      <div
        className={`max-w-3xl mx-auto p-6 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <ProfileHeader
          username={user.username}
          avatar={user?.bio?.avatar || "/default-avatar.png"}
          welcomeMessage={user?.bio?.welcomeMessage || ""}
          isDarkMode={isDarkMode}
        />

        <div className="mt-6 space-y-4">
          <AccountDetails
            email={user.email}
            roles={user?.roles}
            isDarkMode={isDarkMode}
          />

          <TimestampDetails
            createdAt={user.createdAt}
            updatedAt={user.updatedAt}
            isDarkMode={isDarkMode}
          />

          <ProfileActions
            onEdit={() => navigate(`/editProfile/${userId}`)}
            onRemove={() => setShowDeleteModal(true)}
            userId={userId}
            userRoles={user?.roles}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        isDarkMode={isDarkMode}
        prompt="Are you sure you want to delete your profile? This action cannot be undone."
      />
    </MainLayout>
  );
};

export default Profile;
