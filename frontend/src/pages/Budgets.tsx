import MainLayout from "../layout/MainLayout";
import Spinner from "../components/common/Spinner";
import TotalBudget from "../components/budgets/TotalBudget";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import BudgetsHeader from "../components/budgets/BudgetsHeader";
import BudgetsFilters from "../components/budgets/BudgetsFilters";
import BudgetsPagination from "../components/budgets/BudgetsPagination";
import NoBudgetsFound from "../components/budgets/NoBudgetsFound";
import useBudgets from "../hooks/useBudgets";
import BudgetsList from "../components/budgets/BudgetsList";

const Budgets = () => {
  const {
    budgetCount,
    budgets,
    endDate,
    handleDeleteAllBudgets,
    isDarkMode,
    isDeleteModalOpen,
    itemsPerPage,
    loading,
    order,
    page,
    removeBudgetFromList,
    search,
    searchRef,
    setEndDate,
    setIsDeleteModalOpen,
    setItemsPerPage,
    setOrder,
    setPage,
    setSearch,
    setSortBy,
    setStartDate,
    sortBy,
    startDate,
    totalBudget,
    totalPages,
    totalSpent,
  } = useBudgets();

  return (
    <MainLayout title="Budgets">
      <BudgetsHeader
        isDarkMode={isDarkMode}
        showDelete={budgets.length > 0}
        onDeleteAll={() => setIsDeleteModalOpen(true)}
      />

      <TotalBudget
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        budgetCount={budgetCount}
      />

      <BudgetsFilters
        isDarkMode={isDarkMode}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        order={order}
        setOrder={setOrder}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        searchRef={searchRef}
      />

      {loading ? (
        <Spinner />
      ) : budgets.length > 0 ? (
        <>
          <BudgetsList
            budgets={budgets}
            removeBudgetFromList={removeBudgetFromList}
          />
          {totalPages > 1 && itemsPerPage !== -1 && (
            <BudgetsPagination
              page={page}
              totalPages={totalPages}
              setPage={setPage}
              isDarkMode={isDarkMode}
            />
          )}
        </>
      ) : (
        <NoBudgetsFound />
      )}

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAllBudgets}
        isDarkMode={isDarkMode}
        prompt="Are you sure you want to delete all budgets? This action cannot be undone."
      />
    </MainLayout>
  );
};

export default Budgets;
