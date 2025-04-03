import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/auth/Register";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Unauthorized from "../pages/Unauthorized";
import Dashboard from "../pages/Dashboard";
import { UserRoles } from "../types/roles.types";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import AddTransaction from "../pages/AddTransaction";
import Transactions from "../pages/Transactions";
import EditTransaction from "../pages/EditTransaction";
import AddBudget from "../pages/AddBudget";
import Budgets from "../pages/Budgets";
import EditBudget from "../pages/EditBudget";
import CurrencyConverter from "../pages/CurrencyConverter";
import ScanFromReceipt from "../pages/ScanFromReceipt";
import Settings from "../pages/Settings";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddUser from "../pages/admin/AddUser";
import Users from "../pages/admin/Users";
import Roles from "../pages/admin/Roles";
import EditUser from "../pages/admin/EditUser";
import AssignRoles from "../pages/admin/AssignRoles";
import RemoveRoles from "../pages/admin/RemoveRoles";
import Permissions from "../pages/admin/Permissions";
import PersistLogin from "../components/auth/PersistLogin";
import RequireAuth from "../components/auth/RequireAuth";
import BudgetNotFound from "../components/budgets/BudgetNotFound";
import UserNotFound from "../components/users/UserNotFound";
import NoProfileFound from "../components/profile/NoProfileFound";
import TransactionNotFound from "../components/transactions/TransactionNotFound";

const useRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/reset-password/:token",
      element: <ResetPassword />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
    {
      element: <PersistLogin />,
      children: [
        {
          element: <RequireAuth allowedRoles={[UserRoles.USER]} />,
          children: [
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/profile/:userId", element: <Profile /> },
            { path: "/editProfile/:userId", element: <EditProfile /> },
            { path: "/profile-not-found", element: <NoProfileFound /> },
            { path: "/add-transaction", element: <AddTransaction /> },
            { path: "/transactions", element: <Transactions /> },
            {
              path: "/transaction-not-found",
              element: <TransactionNotFound />,
            },
            {
              path: "/edit-transaction/:transactionId",
              element: <EditTransaction />,
            },
            { path: "/add-budget", element: <AddBudget /> },
            { path: "/budget-not-found", element: <BudgetNotFound /> },
            { path: "/budgets", element: <Budgets /> },
            { path: "/edit-budget/:budgetId", element: <EditBudget /> },
            { path: "/currency-converter", element: <CurrencyConverter /> },
            { path: "/scan-from-receipt", element: <ScanFromReceipt /> },
            { path: "/settings", element: <Settings /> },
          ],
        },
        {
          element: <RequireAuth allowedRoles={[UserRoles.ADMIN]} />,
          children: [
            {
              path: "/admin",
              children: [
                { index: true, element: <AdminDashboard /> },
                { path: "users", element: <Users /> },
                { path: "users/new", element: <AddUser /> },
                { path: "users/edit-user/:userId", element: <EditUser /> },
                { path: "user-not-found", element: <UserNotFound /> },
                { path: "roles", element: <Roles /> },
                { path: "roles/assign", element: <AssignRoles /> },
                { path: "roles/remove", element: <RemoveRoles /> },
                { path: "permissions", element: <Permissions /> },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return router;
};

export default useRoutes;
