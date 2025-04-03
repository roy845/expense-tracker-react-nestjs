import MainLayout from "../../layout/MainLayout";
import AdminDashboardHeader from "../../components/adminDashboard/AdminDashboardHeader";
import AdminDashboardSearchBar from "../../components/adminDashboard/AdminDashboardSearchBar";
import AdminDashboardActions from "../../components/adminDashboard/AdminDashboardActions";
import AdminDashboardGrid from "../../components/adminDashboard/AdminDashboardGrid";
import AdminDashboardEmptyState from "../../components/adminDashboard/AdminDashboardEmptyState";
import AdminDashboardLoader from "../../components/adminDashboard/AdminDashboardLoader";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";

const AdminDashboard = () => {
  const { filteredCards, isDarkMode, isSearching, search, setSearch } =
    useAdminDashboard();
  return (
    <MainLayout title="Admin Dashboard">
      <AdminDashboardHeader isDarkMode={isDarkMode} />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <AdminDashboardSearchBar
          search={search}
          setSearch={setSearch}
          isDarkMode={isDarkMode}
        />
        <AdminDashboardActions isDarkMode={isDarkMode} />
      </div>

      {isSearching ? (
        <AdminDashboardLoader />
      ) : filteredCards.length === 0 ? (
        <AdminDashboardEmptyState isDarkMode={isDarkMode} />
      ) : (
        <AdminDashboardGrid cards={filteredCards} isDarkMode={isDarkMode} />
      )}
    </MainLayout>
  );
};

export default AdminDashboard;
