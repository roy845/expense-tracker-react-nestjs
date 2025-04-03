import {
  FaUsers,
  FaUserShield,
  FaKey,
  // FaClipboardList,
  // FaChartBar,
  // FaCreditCard,
  // FaToggleOn,
  // FaFileAlt,
  // FaHeartbeat,
  // FaSyncAlt,
  // FaLock,
  FaCog,
} from "react-icons/fa";
import { AdminDashBoardCard } from "../types/adminTypes.types";

export const ALL_PERMISSIONS: string[] = [
  "Home",
  "Transactions",
  "Add Transaction",
  "Remove Transaction",
  "Edit Transaction",
  "Budgets",
  "Add Budget",
  "Remove Budget",
  "Edit Budget",
  "Scan From receipt",
  "Currency Converter",
  "Profile",
  "Settings",
];

export const cards: AdminDashBoardCard[] = [
  {
    title: "Users",
    description: "Manage application users, edit profiles and permissions.",
    icon: <FaUsers className="text-3xl" />,
    path: "/admin/users",
  },
  {
    title: "Roles",
    description: "Create and assign roles to control access.",
    icon: <FaUserShield className="text-3xl" />,
    path: "/admin/roles",
  },
  {
    title: "Permissions",
    description: "Define granular access control across resources.",
    icon: <FaKey className="text-3xl" />,
    path: "/admin/permissions",
  },
  // {
  //   title: "Audit Logs",
  //   description: "View system-wide user activity logs.",
  //   icon: <FaClipboardList className="text-3xl" />,
  //   path: "/admin/audit-logs",
  // },
  // {
  //   title: "Analytics",
  //   description: "Monitor usage, trends, and user engagement.",
  //   icon: <FaChartBar className="text-3xl" />,
  //   path: "/admin/analytics",
  // },
  // {
  //   title: "Payments & Invoices",
  //   description: "Track billing, view payments and invoices.",
  //   icon: <FaCreditCard className="text-3xl" />,
  //   path: "/admin/payments",
  // },
  // {
  //   title: "Feature Flags",
  //   description: "Toggle features for specific users or globally.",
  //   icon: <FaToggleOn className="text-3xl" />,
  //   path: "/admin/features",
  // },
  // {
  //   title: "Content Pages",
  //   description: "Manage static content like Terms and About.",
  //   icon: <FaFileAlt className="text-3xl" />,
  //   path: "/admin/pages",
  // },
  // {
  //   title: "System Health",
  //   description: "Check system uptime and background services.",
  //   icon: <FaHeartbeat className="text-3xl" />,
  //   path: "/admin/health",
  // },
  // {
  //   title: "Background Jobs",
  //   description: "Monitor and retry failed background jobs.",
  //   icon: <FaSyncAlt className="text-3xl" />,
  //   path: "/admin/jobs",
  // },
  // {
  //   title: "Security Settings",
  //   description: "Control 2FA, IP whitelist, and session policies.",
  //   icon: <FaLock className="text-3xl" />,
  //   path: "/admin/security",
  // },
  {
    title: "App Settings",
    description: "Configure general application preferences.",
    icon: <FaCog className="text-3xl" />,
    path: "/settings",
  },
];
