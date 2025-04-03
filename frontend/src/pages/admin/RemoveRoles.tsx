import MainLayout from "../../layout/MainLayout";
import RemoveRolesHeader from "../../components/removeRoles/RemoveRolesHeader";
import UserSearchDropdown from "../../components/removeRoles/UserSearchDropdown";
import RolesMultiSelectDropdown from "../../components/removeRoles/RolesMultiSelectDropdown";
import RemoveRolesButton from "../../components/removeRoles/RemoveRolesButton";
import useRemoveRoles from "../../hooks/useRemoveRoles";

const RemoveRoles = () => {
  const {
    fetchUsers,
    handleSubmit,
    hasMore,
    isDarkMode,
    isRoleDropdownOpen,
    isUserDropdownOpen,
    loadingUsers,
    roleDropdownRef,
    rolesOptions,
    search,
    selectedRoles,
    selectedUser,
    setIsRoleDropdownOpen,
    setSearch,
    setSelectedUser,
    toggleRole,
    userDropdownRef,
    users,
    setIsUserDropdownOpen,
  } = useRemoveRoles();

  return (
    <MainLayout title="Remove Roles">
      <div
        className={`max-w-xl mx-auto p-6 rounded-2xl shadow-xl ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <RemoveRolesHeader />

        <UserSearchDropdown
          refProp={userDropdownRef}
          search={search}
          setSearch={setSearch}
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          loading={loadingUsers}
          dropdownOpen={isUserDropdownOpen}
          setDropdownOpen={setIsUserDropdownOpen}
          hasMore={hasMore}
          onLoadMore={() => fetchUsers(search)}
          isDarkMode={isDarkMode}
        />

        <RolesMultiSelectDropdown
          refProp={roleDropdownRef}
          options={rolesOptions}
          selected={selectedRoles}
          toggle={toggleRole}
          dropdownOpen={isRoleDropdownOpen}
          setDropdownOpen={setIsRoleDropdownOpen}
          isDarkMode={isDarkMode}
        />

        <RemoveRolesButton onClick={handleSubmit} isDarkMode={isDarkMode} />
      </div>
    </MainLayout>
  );
};

export default RemoveRoles;
