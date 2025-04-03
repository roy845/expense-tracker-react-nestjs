import MainLayout from "../../layout/MainLayout";
import Spinner from "../../components/common/Spinner";
import RolesHeader from "../../components/roles/RolesHeader";
import RolesSearchAndFilters from "../../components/roles/RolesSearchAndFilters";
import RolesTable from "../../components/roles/RolesTable";
import RolesEmptyState from "../../components/roles/RolesEmptyState";
import RolesPagination from "../../components/roles/RolesPagination";
import useRoles from "../../hooks/useRoles";

const Roles = () => {
  const {
    isDarkMode,
    itemsPerPage,
    loading,
    order,
    page,
    roles,
    search,
    setItemsPerPage,
    setOrder,
    setPage,
    setSearch,
    setSortBy,
    sortBy,
    totalPages,
  } = useRoles();

  return (
    <MainLayout title="Roles">
      <RolesHeader isDarkMode={isDarkMode} />

      <RolesSearchAndFilters
        search={search}
        setSearch={setSearch}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
        isDarkMode={isDarkMode}
      />

      {loading ? (
        <Spinner />
      ) : roles.length === 0 ? (
        <RolesEmptyState isDarkMode={isDarkMode} />
      ) : (
        <RolesTable roles={roles} isDarkMode={isDarkMode} />
      )}

      {totalPages > 1 && (
        <RolesPagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
          isDarkMode={isDarkMode}
        />
      )}
    </MainLayout>
  );
};

export default Roles;
