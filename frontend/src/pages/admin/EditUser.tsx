import MainLayout from "../../layout/MainLayout";
import Spinner from "../../components/common/Spinner";
import useEditUser from "../../hooks/useEditUser";
import EditUserHeader from "../../components/editUser/EditUserHeader";
import EditUserInputField from "../../components/editUser/EditUserInputField";
import EditUserPasswordField from "../../components/editUser/EditUserPasswordField";
import EditUserTextarea from "../../components/editUser/EditUserTextarea";
import EditUserMetaInfo from "../../components/editUser/EditUserMetaInfo";
import EditUserSubmitButton from "../../components/editUser/EditUserSubmitButton";

const EditUser = () => {
  const {
    avatarUrl,
    error,
    errors,
    handleFileUpload,
    handleSubmit,
    isDarkMode,
    loading,
    onSubmit,
    previewImage,
    register,
    updating,
    user,
  } = useEditUser();

  if (loading)
    return (
      <MainLayout title="Edit User">
        <Spinner />
      </MainLayout>
    );

  if (error) return <MainLayout title="Edit User">Error: {error}</MainLayout>;

  return (
    <MainLayout title="Edit User">
      <div
        className={`max-w-3xl mx-auto p-6 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <EditUserHeader
          avatarSrc={previewImage || avatarUrl}
          onUpload={handleFileUpload}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <EditUserInputField
            label="Username"
            icon="user"
            register={register("username")}
            error={errors.username?.message}
            isDarkMode={isDarkMode}
          />

          <EditUserInputField
            label="Email"
            icon="envelope"
            type="email"
            register={register("email")}
            error={errors.email?.message}
            isDarkMode={isDarkMode}
          />

          <EditUserPasswordField
            register={register("password")}
            isDarkMode={isDarkMode}
          />

          <EditUserTextarea
            label="Welcome Message"
            icon="comment"
            register={register("bio.welcomeMessage")}
            error={errors?.bio?.welcomeMessage?.message}
            isDarkMode={isDarkMode}
          />

          <EditUserMetaInfo user={user} isDarkMode={isDarkMode} />

          <EditUserSubmitButton updating={updating} />
        </form>
      </div>
    </MainLayout>
  );
};

export default EditUser;
