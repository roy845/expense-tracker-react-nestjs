import MainLayout from "../../layout/MainLayout";
import { ALL_PERMISSIONS } from "../../constants/adminConstants";
import PermissionsHeader from "../../components/permissions/PermissionsHeader";
import UserSearchAndFilters from "../../components/permissions/UserSearchAndFilters";
import UsersList from "../../components/permissions/UsersList";
import UsersPagination from "../../components/permissions/UsersPagination";
import PermissionTogglePanel from "../../components/permissions/PermissionTogglePanel";
import usePermissions from "../../hooks/usePermissions";

const Permissions = () => {
  const {
    handlePermissionToggle,
    handleSave,
    handleSelectAllToggle,
    handleUserSelect,
    isDarkMode,
    page,
    pageSize,
    searchTerm,
    selectedUserId,
    setPage,
    setPageSize,
    setSearchTerm,
    totalPages,
    userPermissions,
    users,
  } = usePermissions();
  return (
    <MainLayout title="Permissions">
      <PermissionsHeader isDarkMode={isDarkMode} />

      <div className="flex flex-col md:flex-row gap-6 p-4">
        {/* Left: Users Panel */}
        <div className="md:w-1/3 w-full">
          <UserSearchAndFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isDarkMode={isDarkMode}
          />

          <UsersList
            users={users}
            selectedUserId={selectedUserId}
            onUserSelect={handleUserSelect}
            isDarkMode={isDarkMode}
          />

          {totalPages > 1 && pageSize !== -1 && (
            <UsersPagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              isDarkMode={isDarkMode}
            />
          )}
        </div>

        {/* Right: Permissions Panel */}
        {selectedUserId && (
          <PermissionTogglePanel
            permissions={ALL_PERMISSIONS}
            selectedPermissions={userPermissions}
            onToggle={handlePermissionToggle}
            onSelectAllToggle={handleSelectAllToggle}
            onSave={handleSave}
            isDarkMode={isDarkMode}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default Permissions;
