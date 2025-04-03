import MainLayout from "../layout/MainLayout";
import Spinner from "../components/common/Spinner";
import AvatarUploader from "../components/editProfile/AvatarUploader";
import UserInfoFields from "../components/editProfile/UserInfoFields";
import PasswordField from "../components/editProfile/PasswordField";
import WelcomeMessageField from "../components/editProfile/WelcomeMessageField";
import ProfileMetaInfo from "../components/editProfile/ProfileMetaInfo";
import SubmitButton from "../components/editProfile/SubmitButton";
import useEditProfile from "../hooks/useEditProfile";

const EditProfile = () => {
  const {
    avatarUrl,
    error,
    errors,
    handleFileUpload,
    handleSubmit,
    inputStyle,
    isDarkMode,
    loading,
    onSubmit,
    previewImage,
    register,
    setShowPassword,
    showPassword,
    updating,
    user,
  } = useEditProfile();

  if (loading)
    return (
      <MainLayout title="Edit Profile">
        <Spinner />
      </MainLayout>
    );

  return (
    <MainLayout title="Edit Profile">
      <div
        className={`max-w-3xl mx-auto p-6 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <AvatarUploader
          avatarUrl={avatarUrl}
          previewImage={previewImage}
          onFileUpload={handleFileUpload}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <UserInfoFields
            register={register}
            errors={errors}
            inputStyle={inputStyle}
          />

          <PasswordField
            register={register}
            showPassword={showPassword}
            togglePassword={() => setShowPassword((prev) => !prev)}
            inputStyle={inputStyle}
          />

          <WelcomeMessageField
            register={register}
            error={errors.bio?.welcomeMessage?.message}
            inputStyle={inputStyle}
          />

          {user && <ProfileMetaInfo user={user} isDarkMode={isDarkMode} />}

          <SubmitButton isLoading={updating} />
        </form>
      </div>
    </MainLayout>
  );
};

export default EditProfile;
