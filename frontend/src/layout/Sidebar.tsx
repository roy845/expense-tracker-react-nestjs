import { useDarkMode } from "../hooks/useDarkMode";
import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaPlusCircle,
} from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { FaShield } from "react-icons/fa6";
import { useAuth } from "../context/authContext";
import { DecodedToken } from "../types/auth.types";
import decodeToken from "../utils/decodeToken";
import { UserRoles } from "../types/roles.types";
import { LuDollarSign } from "react-icons/lu";
import { AiOutlinePieChart } from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoScan } from "react-icons/io5";
import { MdCurrencyExchange } from "react-icons/md";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  PERMISSION_ADD_BUDGET,
  PERMISSION_ADD_TRANSACTION,
  PERMISSION_BUDGETS,
  PERMISSION_CURRENCY_CONVERTER,
  PERMISSION_HOME,
  PERMISSION_PROFILE,
  PERMISSION_SCAN_FROM_RECEIPT,
  PERMISSION_SETTINGS,
  PERMISSION_TRANSACTIONS,
} from "../constants/permissionsConstants";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchUserPermissions } from "../features/permissionsSlice";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  const { auth } = useAuth();
  const decodedToken: DecodedToken | null = decodeToken(auth?.accessToken);
  const logout = useLogout();
  const { isDarkMode } = useDarkMode();
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const permissions = useAppSelector(
    (state) => state.userPermissions.permissions
  );
  const permissionStatus = useAppSelector(
    (state) => state.userPermissions.status
  );
  const error = useAppSelector((state) => state.userPermissions.error);

  useEffect(() => {
    if (permissionStatus === "loading") {
      dispatch(fetchUserPermissions(axiosPrivate));
    }
  }, [dispatch, permissionStatus]);

  useEffect(() => {
    if (permissionStatus === "failed") {
      toast.error(error);
    }
  }, [permissionStatus, error]);
  return (
    <aside
      className={`z-50 h-screen w-64 p-5 flex flex-col justify-between fixed left-0 top-0 transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-64"
      } ${
        isDarkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
      } shadow-lg`}
    >
      {/* Header with Back Button */}
      <div className="flex items-center justify-between py-4 px-2">
        {/* Back Button */}
        <button
          onClick={toggleSidebar}
          className="text-2xl focus:outline-none transition-transform duration-300 hover:scale-110"
        >
          <FiArrowLeft />
        </button>

        {/* Logo */}
        <div className="text-xl font-bold">💰 Expense Tracker</div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4">
        {permissions.includes(PERMISSION_HOME) && (
          <SidebarLink
            to="/dashboard"
            icon={<FaHome />}
            text="Home"
            isDarkMode={isDarkMode}
          />
        )}

        {permissions.includes(PERMISSION_ADD_TRANSACTION) && (
          <SidebarLink
            to="/add-transaction"
            icon={<FaPlusCircle />}
            text="Add Transaction"
            isDarkMode={isDarkMode}
          />
        )}

        {permissions.includes(PERMISSION_TRANSACTIONS) && (
          <SidebarLink
            to="/transactions"
            icon={<LuDollarSign />}
            text="Transactions"
            isDarkMode={isDarkMode}
          />
        )}
        {permissions.includes(PERMISSION_ADD_BUDGET) && (
          <SidebarLink
            to="/add-budget"
            icon={<IoIosAddCircleOutline />}
            text="Add Budget"
            isDarkMode={isDarkMode}
          />
        )}
        {permissions.includes(PERMISSION_BUDGETS) && (
          <SidebarLink
            to="/budgets"
            icon={<AiOutlinePieChart />}
            text="Budgets"
            isDarkMode={isDarkMode}
          />
        )}
        {permissions.includes(PERMISSION_SCAN_FROM_RECEIPT) && (
          <SidebarLink
            to="/scan-from-receipt"
            icon={<IoScan />}
            text="Scan From Receipt"
            isDarkMode={isDarkMode}
          />
        )}

        {permissions.includes(PERMISSION_CURRENCY_CONVERTER) && (
          <SidebarLink
            to="/currency-converter"
            icon={<MdCurrencyExchange />}
            text="Currency Converter"
            isDarkMode={isDarkMode}
          />
        )}

        {permissions.includes(PERMISSION_PROFILE) && (
          <SidebarLink
            to={`/profile/${decodedToken?._id}`}
            icon={<FaUser />}
            text="Profile"
            isDarkMode={isDarkMode}
          />
        )}

        {permissions.includes(PERMISSION_SETTINGS) && (
          <SidebarLink
            to="/settings"
            icon={<FaCog />}
            text="Settings"
            isDarkMode={isDarkMode}
          />
        )}

        {decodedToken?.roles.includes(UserRoles.ADMIN) && (
          <SidebarLink
            to="/admin"
            icon={<FaShield />}
            text="Admin"
            isDarkMode={isDarkMode}
          />
        )}
      </nav>

      {/* Logout Button */}
      <button
        onClick={() => {
          logout();
        }}
        className={`flex items-center space-x-2 w-full py-2 px-4 rounded-lg transition-all duration-200 ${
          isDarkMode
            ? "hover:bg-red-600 text-red-400 hover:text-white"
            : "hover:bg-red-500 text-red-500 hover:text-white"
        }`}
      >
        <FaSignOutAlt className="text-lg" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({
  to,
  icon,
  text,
  isDarkMode,
}: {
  to: string;
  icon: React.ReactNode;
  text: string;
  isDarkMode: boolean;
}) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 py-2 px-4 rounded-lg transition-all duration-200 ${
      isDarkMode
        ? "hover:bg-gray-700 hover:text-white"
        : "hover:bg-gray-200 hover:text-gray-900"
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span>{text}</span>
  </Link>
);

export default Sidebar;
