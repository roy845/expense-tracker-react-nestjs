import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDarkMode } from "../hooks/useDarkMode";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../app/hooks";
import useUserService from "../hooks/useUserService";
import { setCurrency } from "../features/currencySlice";

type LayoutProps = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
};

export default function MainLayout({
  children,
  title = "Expense Tracker",
  description = "Manage your expenses efficiently",
  keywords = "expense, tracker, finance, budget",
  author = "Your Name",
}: LayoutProps): JSX.Element {
  const { isDarkMode } = useDarkMode();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { getCurrencySymbol } = useUserService();

  useEffect(() => {
    const fetchCurrencySymbol = async () => {
      try {
        const response = await getCurrencySymbol();
        if (response.getCurrencySymbol) {
          dispatch(setCurrency(response.getCurrencySymbol));
        }
      } catch (error) {
        console.error("Failed to fetch currency symbol:", error);
      }
    };

    fetchCurrencySymbol();
  }, [dispatch, getCurrencySymbol]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        />

        {/* Main Content */}
        <div
          className={`flex-grow min-h-screen flex flex-col items-center transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-900 text-gray-200"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <Header
            title="Expense Tracker"
            toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />
          <main className="flex-grow p-6 w-full">{children}</main>
        </div>
      </div>
    </>
  );
}
