import { AdminDashBoardCard } from "../../types/adminTypes.types";
import AdminDashboardCard from "./AdminDashboardCard";

const AdminDashboardGrid = ({
  cards,
  isDarkMode,
}: {
  cards: AdminDashBoardCard[];
  isDarkMode: boolean;
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {cards.map((card, index) => (
      <AdminDashboardCard key={index} card={card} isDarkMode={isDarkMode} />
    ))}
  </div>
);

export default AdminDashboardGrid;
