import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectCurrency } from "../features/currencySlice";
import { useDarkMode } from "./useDarkMode";
import useTransactionService from "./useTransactionService";
import {
  Category,
  PaymentMethod,
  Transaction,
  TransactionType,
} from "../types/transaction.types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { format } from "date-fns";
import * as XLSX from "xlsx";

const useTransactions = () => {
  const { isDarkMode } = useDarkMode();
  const { currencySymbol } = useAppSelector(selectCurrency);

  const navigate = useNavigate();
  const { getTransactionsByUser, removeTransaction, removeAllTransactions } =
    useTransactionService();

  // 🔹 State Management
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<
    "date" | "amount" | "description" | "category"
  >("date");
  const [order, setOrder] = useState<"ASC" | "DESC">("DESC");

  const [selectedType, setSelectedType] = useState<TransactionType | "all">(
    "all"
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(
    "all"
  );

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | "all">(
    "all"
  );

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(
    null
  );

  const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false);

  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [filename, setFilename] = useState("Transactions");

  const { permissions } = useAppSelector((state) => state.userPermissions);

  // 🔹 Handle Delete All Transactions
  const confirmDeleteAll = async () => {
    try {
      await removeAllTransactions();
      toast.success("All transactions deleted successfully!");
      setTransactions([]); // Clear transactions from state
    } catch (error: any) {
      toast.error("Failed to delete all transactions: " + error.message);
    } finally {
      setIsDeleteAllModalOpen(false);
    }
  };

  const formattedStartDate = startDate
    ? new Date(startDate).toISOString()
    : undefined;
  const formattedEndDate = endDate
    ? new Date(endDate).toISOString()
    : undefined;

  // 🔹 Fetch Transactions
  useEffect(() => {
    if (
      minAmount !== undefined &&
      maxAmount !== undefined &&
      minAmount > maxAmount
    ) {
      toast.warn("Minimum amount cannot be greater than maximum amount.");
      return;
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      toast.warn("Start date cannot be later than end date.");
      return;
    }

    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await getTransactionsByUser({
          search,
          skip: (page - 1) * itemsPerPage,
          take: itemsPerPage === -1 ? undefined : itemsPerPage,
          sortBy,
          order,
          type: selectedType !== "all" ? selectedType : undefined,
          category: selectedCategory !== "all" ? selectedCategory : undefined,
          paymentMethod:
            selectedPayment !== "all" ? selectedPayment : undefined,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          minAmount: minAmount !== undefined ? minAmount : undefined,
          maxAmount: maxAmount !== undefined ? maxAmount : undefined,
        });

        setTransactions(response.transactions);
        setTotalPages(response.totalPages);
      } catch (error: any) {
        toast.error("Failed to load transactions: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [
    search,
    sortBy,
    order,
    page,
    itemsPerPage,
    selectedType,
    selectedCategory,
    selectedPayment,
    startDate,
    endDate,
    minAmount,
    maxAmount,
  ]);

  // 🔹 Search with Debounce
  const handleSearchChange = debounce((value) => {
    setSearch(value);
    setPage(1);
  }, 500);

  // 🔹 Reset Filters
  const resetFilters = () => {
    setSearch("");
    setSortBy("date");
    setOrder("DESC");
    setSelectedType("all");
    setSelectedCategory("all");
    setSelectedPayment("all");
    setPage(1);
  };

  const handleDeleteClick = (id: string) => {
    setTransactionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!transactionToDelete) return;

    try {
      await removeTransaction(transactionToDelete);
      toast.success("Transaction deleted successfully!");
      setTransactions(
        transactions.filter((t) => t._id !== transactionToDelete)
      );
    } catch (error: any) {
      toast.error("Failed to delete transaction: " + error.message);
    } finally {
      setTransactionToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  const exportToExcel = () => {
    if (transactions.length === 0) {
      toast.warn("No transactions available to export.");
      return;
    }

    if (!filename) {
      toast.error("Filename is empty!");
      return;
    }

    const data = transactions.map((t, index) => ({
      "#": index + 1,
      Description: t.description,
      Amount: t.amount,
      Category: t.category,
      Type: t.type,
      PaymentMethod: t.paymentMethod,
      Date: format(new Date(t.date), "dd/MM/yyyy"),
      Recurring: t.recurringTransaction ? "Yes" : "No",
      Tags: t.tags?.join(", ") || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    XLSX.writeFile(workbook, `${filename}.xlsx`);

    setIsExportModalOpen(false);
  };
  return {
    isDarkMode,
    endDate,
    handleSearchChange,
    itemsPerPage,
    order,
    selectedCategory,
    selectedPayment,
    selectedType,
    setEndDate,
    setIsDeleteAllModalOpen,
    setIsExportModalOpen,
    setItemsPerPage,
    setMaxAmount,
    setMinAmount,
    setOrder,
    setPage,
    setSelectedCategory,
    setSelectedPayment,
    setSelectedType,
    setSortBy,
    setStartDate,
    sortBy,
    startDate,
    transactions,
    maxAmount,
    minAmount,
    currencySymbol,
    handleDeleteClick,
    loading,
    navigate,
    permissions,
    page,
    totalPages,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    confirmDelete,
    isDeleteAllModalOpen,
    confirmDeleteAll,
    isExportModalOpen,
    filename,
    setFilename,
    exportToExcel,
  };
};

export default useTransactions;
