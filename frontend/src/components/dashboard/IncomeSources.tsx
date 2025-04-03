import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { IncomeSourceType } from "../../types/dashboardMetrics.types";
import { useState, useEffect } from "react";
import MonthSelector from "./MonthSelector";
import { useDarkMode } from "../../hooks/useDarkMode";
import Spinner from "../common/Spinner";
import useDashboardMetrics from "../../hooks/useDashboardMetrics";
import { FaInfoCircle } from "react-icons/fa";
import TooltipComponent from "../common/Tooltip";
import { useAppSelector } from "../../app/hooks";
import { selectCurrency } from "../../features/currencySlice";
import { Utils } from "../../utils/Utils";

// Category Colors
const categoryColors: Record<string, string> = {
  // 💼 Work & Business
  Work: "#0f766e",
  Freelance: "#0f766e",
  Salary: "#0f766e",
  Investments: "#0f766e",
  OFFICE_SUPPLIES: "#0f766e",
  WORK_TRAVEL: "#0f766e",
  BUSINESS_SOFTWARE: "#0f766e",
  PROFESSIONAL_SERVICES: "#0f766e",
  MARKETING_ADVERTISING: "#0f766e",

  // 🍽️ Food & Dining
  Groceries: "#16a34a",
  Restaurants: "#16a34a",
  FOOD: "#16a34a",
  FAST_FOOD: "#16a34a",
  COFFEE_SHOPS: "#16a34a",
  ALCOHOL_BARS: "#16a34a",

  // 🚗 Transportation
  Transportation: "#ef4444",
  PUBLIC_TRANSPORT: "#ef4444",
  RIDE_SHARING: "#ef4444",
  CAR_PAYMENT: "#ef4444",
  CAR_INSURANCE: "#ef4444",
  FUEL_GAS: "#ef4444",
  VEHICLE_MAINTENANCE: "#ef4444",

  // 🏠 Essential Living Expenses
  Housing: "#f59e0b",
  RENT_MORTGAGE: "#f59e0b",
  PROPERTY_TAX: "#f59e0b",
  HOME_MAINTENANCE: "#f59e0b",
  Utilities: "#3b82f6",
  GAS_ELECTRICITY: "#3b82f6",
  WATER_SEWAGE: "#3b82f6",
  INTERNET_CABLE: "#3b82f6",
  PHONE_BILL: "#3b82f6",

  // 📚 Education & Self-Improvement
  Education: "#6366f1",
  ONLINE_COURSES: "#6366f1",
  BOOKS_LEARNING: "#6366f1",
  WORKSHOPS_TRAINING: "#6366f1",
  Subscriptions: "#6366f1",

  // 🏥 Health & Wellness
  Healthcare: "#d946ef",
  MEDICAL_BILLS: "#d946ef",
  HEALTH_INSURANCE: "#d946ef",
  DENTAL_CARE: "#d946ef",
  VISION_CARE: "#d946ef",
  FITNESS_GYM: "#d946ef",
  MENTAL_HEALTH_THERAPY: "#d946ef",

  // 🎉 Entertainment & Leisure
  Entertainment: "#f97316",
  MOVIES_STREAMING: "#f97316",
  CONCERTS_EVENTS: "#f97316",
  VIDEO_GAMES: "#f97316",
  HOBBIES_CRAFTS: "#f97316",
  OUTDOOR_ACTIVITIES: "#f97316",

  // 🎁 Personal & Shopping
  Personal: "#db2777",
  CLOTHING_FASHION: "#db2777",
  BEAUTY_COSMETICS: "#db2777",
  ELECTRONICS_GADGETS: "#db2777",
  JEWELRY_ACCESSORIES: "#db2777",
  GIFTS_DONATIONS: "#db2777",

  // 🛡️ Insurance & Financial
  LIFE_INSURANCE: "#9333ea",
  CAR_INSURANCE_FINANCIAL: "#9333ea",
  HOME_INSURANCE: "#9333ea",
  RETIREMENT_SAVINGS: "#9333ea",
  INVESTMENTS_STOCKS: "#9333ea",

  // 🐶 Pets
  Pets: "#22d3ee",
  PET_FOOD_SUPPLIES: "#22d3ee",
  VETERINARY_CARE: "#22d3ee",
  PET_GROOMING_TRAINING: "#22d3ee",

  // ✈️ Travel & Vacation
  Travel: "#0ea5e9",
  Flights: "#0ea5e9",
  HOTELS_ACCOMMODATION: "#0ea5e9",
  CAR_RENTAL: "#0ea5e9",
  TRAVEL_INSURANCE: "#0ea5e9",
  TOURIST_ACTIVITIES: "#0ea5e9",

  // 🆕 Miscellaneous
  CHARITY_DONATIONS: "#6b7280",
  BANK_FEES_CHARGES: "#6b7280",
  LOTTERY_GAMBLING: "#6b7280",
  TAXES_GOVERNMENT_FEES: "#6b7280",
  EMERGENCY_FUND: "#6b7280",
  Other: "#6b7280",
};

const IncomeSources: React.FC = () => {
  const { isDarkMode } = useDarkMode();
  const { getIncomeSources } = useDashboardMetrics();
  const [selectedMonth, setSelectedMonth] = useState(Utils.getCurrentMonth());
  const [incomeSources, setIncomeSources] = useState<IncomeSourceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { currencySymbol } = useAppSelector(selectCurrency);

  useEffect(() => {
    const fetchIncomeSources = async () => {
      try {
        setLoading(true);
        const data = await getIncomeSources(selectedMonth);

        // Assign colors to each entry
        const dataWithColors = data.map((entry) => ({
          ...entry,
          color: categoryColors[entry.name] || "#8884d8",
        }));

        setIncomeSources(dataWithColors);
      } catch (err) {
        console.error("Failed to fetch income sources:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeSources();
  }, [selectedMonth]);

  const totalIncome = incomeSources.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any[];
  }) => {
    if (active && payload && payload.length) {
      const { name, value, color } = payload[0].payload;
      return (
        <div
          className={`p-2 rounded-md shadow-md text-sm ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
          }`}
          style={{ border: `1px solid ${color}` }}
        >
          <p className="text-sm font-semibold" style={{ color }}>
            {name}: {currencySymbol}
            {value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div
      className={`p-4 rounded-lg shadow-md transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-800 text-white hover:bg-gray-700"
          : "bg-white text-gray-900 hover:bg-gray-100"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1">
          <h3 className="text-lg font-semibold">Income Sources</h3>
          <TooltipComponent content="This chart displays the breakdown of your income sources for the selected month.">
            <FaInfoCircle className="text-blue-400 cursor-pointer text-sm" />
          </TooltipComponent>
        </div>
        <MonthSelector
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
      </div>

      {/* Content */}
      {incomeSources.length === 0 ? (
        <p className="text-gray-500 text-center">
          No data available for this month.
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-center mt-4">
          {/* Chart + Total */}
          <div className="w-full max-w-sm h-96 flex flex-col items-center">
            {/* Total Above Chart */}
            <div className="flex flex-col items-center mb-4">
              <span
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-black"
                }`}
              >
                Total
              </span>
              <span className="text-2xl font-bold">
                {currencySymbol}
                {totalIncome.toFixed(2)}
              </span>
            </div>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={incomeSources}
                  dataKey="value"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                >
                  {incomeSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Custom Scrollable Legend */}
          <div className="w-full max-w-xs h-96 overflow-y-auto border-l pl-4">
            {incomeSources.map((entry, index) => (
              <div key={index} className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>{entry.name}</span>
                </div>
                <span className="font-semibold">
                  {currencySymbol}
                  {entry.value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default IncomeSources;
