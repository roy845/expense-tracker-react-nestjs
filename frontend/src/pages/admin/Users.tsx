import MainLayout from "../../layout/MainLayout";
import Spinner from "../../components/common/Spinner";
import ConfirmDeleteModal from "../../components/modal/ConfirmDeleteModal";
import ExportModal from "../../components/modal/ExportModal";
import UsersPagination from "../../components/users/UsersPagination";
import UsersTable from "../../components/users/UsersTable";
import UsersEmptyState from "../../components/users/UsersEmptyState";
import UsersActions from "../../components/users/UsersActions";
import UsersSearchAndFilters from "../../components/users/UsersSearchAndFilters";
import UsersHeader from "../../components/users/UsersHeader";
import useUsers from "../../hooks/useUsers";

const Users = () => {
  const {
    loading,
    navigate,
    userId,
    closeExportExcelModal,
    endDate,
    error,
    filename,
    handleDeleteAllUsers,
    handleDeleteUser,
    handleExport,
    isDarkMode,
    isExportModalOpen,
    itemsPerPage,
    openExportExcelModal,
    order,
    page,
    search,
    setEndDate,
    setFilename,
    setItemsPerPage,
    setOrder,
    setPage,
    setSearch,
    setShowDeleteAllUsersModal,
    setShowDeleteUserModal,
    setSortBy,
    setStartDate,
    setUserId,
    showDeleteAllUsersModal,
    showDeleteUserModal,
    sortBy,
    startDate,
    totalPages,
    users,
  } = useUsers();

  if (error)
    return <MainLayout title="Users - Error">Error: {error}</MainLayout>;

  return (
    <MainLayout title="Users">
      <UsersHeader isDarkMode={isDarkMode} />
      <div className="flex items-start gap-4">
        {" "}
        <UsersSearchAndFilters
          search={search}
          setSearch={setSearch}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          sortBy={sortBy}
          setSortBy={setSortBy}
          order={order}
          setOrder={setOrder}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          isDarkMode={isDarkMode}
        />
        <UsersActions
          users={users}
          isDarkMode={isDarkMode}
          onDeleteAll={() => setShowDeleteAllUsersModal(true)}
          onExport={openExportExcelModal}
        />
      </div>

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={closeExportExcelModal}
        filename={filename}
        onFilenameChange={setFilename}
        onExport={handleExport}
        title="Export Users to Excel"
        isDarkMode={isDarkMode}
      />

      {loading ? (
        <Spinner />
      ) : users.length === 0 ? (
        <UsersEmptyState isDarkMode={isDarkMode} />
      ) : (
        <UsersTable
          users={users}
          isDarkMode={isDarkMode}
          onEdit={(id) => navigate(`/admin/users/edit-user/${id}`)}
          onDelete={(id) => {
            setUserId(id);
            setShowDeleteUserModal(true);
          }}
        />
      )}

      {totalPages > 1 && itemsPerPage !== -1 && (
        <UsersPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          isDarkMode={isDarkMode}
        />
      )}

      <ConfirmDeleteModal
        isOpen={showDeleteUserModal}
        onClose={() => setShowDeleteUserModal(false)}
        onConfirm={() => handleDeleteUser(userId)}
        isDarkMode={isDarkMode}
        prompt="Are you sure you want to delete this user? This action cannot be undone."
      />

      <ConfirmDeleteModal
        isOpen={showDeleteAllUsersModal}
        onClose={() => setShowDeleteAllUsersModal(false)}
        onConfirm={handleDeleteAllUsers}
        isDarkMode={isDarkMode}
        prompt="Are you sure you want to delete ALL users? This action cannot be undone."
      />
    </MainLayout>
  );
};

export default Users;
