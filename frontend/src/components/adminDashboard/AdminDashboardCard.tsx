import { useNavigate } from "react-router-dom";
import { AdminDashBoardCard } from "../../types/adminTypes.types";

interface Props {
  card: AdminDashBoardCard;
  isDarkMode: boolean;
}

const AdminDashboardCard = ({ card, isDarkMode }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(card.path)}
      className={`cursor-pointer p-6 rounded-xl shadow-md transition-all duration-300 hover:scale-[1.02] ${
        isDarkMode
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-gray-900 hover:bg-gray-100"
      }`}
    >
      <div className="flex items-center gap-4 mb-3">
        {card.icon}
        <h3 className="text-xl font-semibold">{card.title}</h3>
      </div>
      <p className="text-sm">{card.description}</p>
    </div>
  );
};

export default AdminDashboardCard;
