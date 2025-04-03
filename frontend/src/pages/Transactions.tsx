import MainLayout from "../layout/MainLayout";
import ConfirmDeleteModal from "../components/modal/ConfirmDeleteModal";
import ExportModal from "../components/modal/ExportModal";
import TransactionsHeader from "../components/transactions/TransactionsHeader";
import TransactionsFilters from "../components/transactions/TransactionsFilters";
import TransactionsTable from "../components/transactions/TransactionsTable";
import TransactionsPagination from "../components/transactions/TransactionsPagination";
import useTransactions from "../hooks/useTransactions";

const Transactions = () => {
  const {
    confirmDelete,
    confirmDeleteAll,
    currencySymbol,
    endDate,
    exportToExcel,
    filename,
    handleDeleteClick,
    handleSearchChange,
    isDarkMode,
    isDeleteAllModalOpen,
    isDeleteModalOpen,
    isExportModalOpen,
    itemsPerPage,
    loading,
    maxAmount,
    minAmount,
    navigate,
    order,
    page,
    permissions,
    selectedCategory,
    selectedPayment,
    selectedType,
    setEndDate,
    setFilename,
    setIsDeleteAllModalOpen,
    setIsDeleteModalOpen,
    setIsExportModalOpen,
    setItemsPerPage,
    setMaxAmount,
    setMinAmount,
    setOrder,
    setPage,
    setSelectedCategory,
    setSelectedPayment,
    setSelectedType,
    setSortBy,
    setStartDate,
    sortBy,
    startDate,
    totalPages,
    transactions,
  } = useTransactions();

  return (
    <MainLayout title="Transactions">
      <TransactionsHeader isDarkMode={isDarkMode} />

      <div className="w-full px-6 mx-auto p-6">
        {/* 🔹 Filters & Search */}
        <TransactionsFilters
          endDate={endDate}
          handleSearchChange={handleSearchChange}
          isDarkMode={isDarkMode}
          itemsPerPage={itemsPerPage}
          order={order}
          selectedCategory={selectedCategory}
          selectedPayment={selectedPayment}
          selectedType={selectedType}
          setEndDate={setEndDate}
          setIsDeleteAllModalOpen={setIsDeleteAllModalOpen}
          setIsExportModalOpen={setIsExportModalOpen}
          setItemsPerPage={setItemsPerPage}
          setMaxAmount={setMaxAmount}
          setMinAmount={setMinAmount}
          setOrder={setOrder}
          setPage={setPage}
          setSelectedCategory={setSelectedCategory}
          setSelectedPayment={setSelectedPayment}
          setSelectedType={setSelectedType}
          setSortBy={setSortBy}
          setStartDate={setStartDate}
          sortBy={sortBy}
          startDate={startDate}
          transactions={transactions}
          maxAmount={maxAmount}
          minAmount={minAmount}
        />

        <TransactionsTable
          currencySymbol={currencySymbol}
          handleDeleteClick={handleDeleteClick}
          isDarkMode={isDarkMode}
          loading={loading}
          navigate={navigate}
          permissions={permissions}
          setSortBy={setSortBy}
          transactions={transactions}
        />

        {/* Pagination Controls */}
        <TransactionsPagination
          isDarkMode={isDarkMode}
          itemsPerPage={itemsPerPage}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>

      {/* 🔹 Delete Single Transaction Confirmation Modal */}
      <ConfirmDeleteModal
        isDarkMode={isDarkMode}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        prompt="Are you sure you want to delete this transaction? This action
          cannot be undone."
      />

      {/* 🔹 Delete All Confirmation Modal */}
      <ConfirmDeleteModal
        isDarkMode={isDarkMode}
        isOpen={isDeleteAllModalOpen}
        onClose={() => setIsDeleteAllModalOpen(false)}
        onConfirm={confirmDeleteAll}
        prompt="Are you sure you want to delete ALL transactions? This action cannot be undone."
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        filename={filename}
        onFilenameChange={setFilename}
        onExport={exportToExcel}
        title="Export Transactions to Excel"
        isDarkMode={isDarkMode}
      />
    </MainLayout>
  );
};

export default Transactions;
