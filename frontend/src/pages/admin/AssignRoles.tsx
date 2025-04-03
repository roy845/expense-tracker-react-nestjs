import MainLayout from "../../layout/MainLayout";
import AssignRolesHeader from "../../components/assignRoles/AssignRolesHeader";
import UserSearchDropdown from "../../components/assignRoles/UserSearchDropdown";
import RolesMultiSelectDropdown from "../../components/assignRoles/RolesMultiSelectDropdown";
import AssignButton from "../../components/assignRoles/AssignButton";
import useAssignRoles from "../../hooks/useAssignRoles";

const AssignRoles = () => {
  const {
    fetchUsers,
    handleSubmit,
    hasMore,
    isDarkMode,
    isRoleDropdownOpen,
    isUserDropdownOpen,
    loadingUsers,
    roleDropdownRef,
    search,
    selectedRoles,
    selectedUser,
    setIsRoleDropdownOpen,
    setIsUserDropdownOpen,
    setSearch,
    setSelectedUser,
    toggleRole,
    userDropdownRef,
    rolesOptions,
    users,
  } = useAssignRoles();

  return (
    <MainLayout title="Assign Roles">
      <div
        className={`max-w-xl mx-auto p-6 rounded-2xl shadow-xl ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <AssignRolesHeader />

        <UserSearchDropdown
          search={search}
          setSearch={setSearch}
          users={users}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          isOpen={isUserDropdownOpen}
          setIsOpen={setIsUserDropdownOpen}
          isLoading={loadingUsers}
          onLoadMore={() => fetchUsers(search)}
          hasMore={hasMore}
          isDarkMode={isDarkMode}
          refProp={userDropdownRef}
        />

        <RolesMultiSelectDropdown
          selectedRoles={selectedRoles}
          toggleRole={toggleRole}
          isOpen={isRoleDropdownOpen}
          setIsOpen={setIsRoleDropdownOpen}
          options={rolesOptions}
          isDarkMode={isDarkMode}
          refProp={roleDropdownRef}
        />

        <AssignButton onClick={handleSubmit} isDarkMode={isDarkMode} />
      </div>
    </MainLayout>
  );
};

export default AssignRoles;
