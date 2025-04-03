import { useEffect, useState } from "react";
import { useDarkMode } from "./useDarkMode";
import useDashboardMetrics from "./useDashboardMetrics";
import { format, subMonths } from "date-fns";

const useDashboard = () => {
  const { isDarkMode } = useDarkMode();
  const { getDashboardMetrics } = useDashboardMetrics();

  // State for dashboard metrics
  const [metrics, setMetrics] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
    monthlyChange: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentMonth = format(new Date(), "MMMM yyyy");
  const prevMonth = format(subMonths(new Date(), 1), "MMMM yyyy");

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await getDashboardMetrics();
        setMetrics(data);
      } catch (err) {
        console.error("Failed to fetch dashboard metrics:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return {
    loading,
    error,
    isDarkMode,
    metrics,
    currentMonth,
    prevMonth,
  };
};

export default useDashboard;
