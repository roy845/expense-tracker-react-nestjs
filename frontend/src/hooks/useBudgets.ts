import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import useBudgetService from "./useBudgetService";
import { BudgetWithSpent } from "../types/budget.types";
import { useDarkMode } from "./useDarkMode";
import { SortOrder } from "../types/sortTypes.types";

const useBudgets = () => {
  const { isDarkMode } = useDarkMode();
  const [loading, setLoading] = useState<boolean>(false);
  const [budgets, setBudgets] = useState<BudgetWithSpent[]>([]);
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [budgetCount, setBudgetCount] = useState<number>(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<SortOrder>(SortOrder.ASC);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const searchRef = useRef<HTMLInputElement>(null);

  const { findBudgetsWithSpent, getTotalBudget, removeAllBudgetsByUser } =
    useBudgetService();

  useEffect(() => {
    const fetchBudgets = async () => {
      setLoading(true);
      try {
        const response = await findBudgetsWithSpent({
          search,
          startDate,
          endDate,
          skip: (page - 1) * itemsPerPage,
          take: itemsPerPage === -1 ? undefined : itemsPerPage,
          sortBy,
          order,
        });
        setBudgets(response.budgets);
        setTotalPages(response.totalPages);
      } catch (error: any) {
        toast.error("Failed to load budgets: " + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBudgets();
  }, [debouncedSearch, page, sortBy, order, itemsPerPage, startDate, endDate]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset to page 1 on search
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    fetchTotalBudget();
  }, []);

  const fetchTotalBudget = async () => {
    try {
      const data = await getTotalBudget();
      setTotalBudget(data.totalBudget);
      setTotalSpent(data.totalSpent);
      setBudgetCount(data.budgetCount);
    } catch (error) {
      console.error("Error fetching total budget:", error);
    }
  };

  const removeBudgetFromList = (budgetId: string) => {
    setBudgets((prevBudgets) => prevBudgets.filter((b) => b.id !== budgetId));
    fetchTotalBudget();
  };

  const handleDeleteAllBudgets = async () => {
    try {
      await removeAllBudgetsByUser();
      setBudgets([]);
      setTotalBudget(0);
      setTotalSpent(0);
      setBudgetCount(0);
      toast.success("All budgets deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete budgets: " + error.message);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return {
    isDarkMode,
    budgets,
    setIsDeleteModalOpen,
    totalBudget,
    totalSpent,
    budgetCount,
    search,
    setSearch,
    sortBy,
    setSortBy,
    order,
    setOrder,
    itemsPerPage,
    setItemsPerPage,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchRef,
    loading,
    removeBudgetFromList,
    totalPages,
    page,
    setPage,
    isDeleteModalOpen,
    handleDeleteAllBudgets,
  };
};

export default useBudgets;
