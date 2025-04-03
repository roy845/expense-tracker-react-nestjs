import { useEffect, useState } from "react";
import { useDarkMode } from "./useDarkMode";
import useUserService from "./useUserService";
import { User } from "../types/user.types";
import { SortOrder } from "../types/sortTypes.types";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format } from "date-fns";
import * as XLSX from "xlsx";

const useUsers = () => {
  const { isDarkMode } = useDarkMode();
  const { getUsers } = useUserService();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<SortOrder>(SortOrder.ASC);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [showDeleteUserModal, setShowDeleteUserModal] =
    useState<boolean>(false);
  const [showDeleteAllUsersModal, setShowDeleteAllUsersModal] =
    useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { removeUser, removeAllUsers } = useUserService();

  const navigate: NavigateFunction = useNavigate();

  const handleDeleteUser = async (userId: string) => {
    try {
      await removeUser(userId as string);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(`User deleted successfully!`);
      setShowDeleteUserModal(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const [isExportModalOpen, setExportModalOpen] = useState(false);
  const [filename, setFilename] = useState("Users");

  const openExportExcelModal = () => setExportModalOpen(true);
  const closeExportExcelModal = () => setExportModalOpen(false);

  const handleExport = () => {
    if (users.length === 0) {
      toast.error("No users available to export.");
      return;
    }

    if (!filename) {
      toast.error("Filename is empty!");
      return;
    }

    const data = users.map((user, index) => ({
      "#": index + 1,
      Username: user.username,
      Email: user.email,
      Roles: user.roles?.join(", ") || "",
      "Created At": format(new Date(user.createdAt), "dd/MM/yyyy HH:mm"),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

    XLSX.writeFile(workbook, `${filename}.xlsx`);

    closeExportExcelModal();
  };

  const handleDeleteAllUsers = async () => {
    try {
      await removeAllUsers();

      setUsers([]);
      toast.success(`All Users deleted successfully!`);
      setShowDeleteAllUsersModal(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      toast.warn("Start date cannot be later than end date.");
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getUsers({
          search,
          paginationArgs: {
            skip: (page - 1) * itemsPerPage,
            take: itemsPerPage === -1 ? undefined : itemsPerPage,
          },
          sortArgs: { sortBy, order },
          filterArgs: {
            startDate: startDate || undefined,
            endDate: endDate || undefined,
          },
        });

        setUsers(response.findAllUsers.users);
        setTotalPages(response.findAllUsers.totalPages);
      } catch (err: any) {
        toast.error("Failed to load users: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, page, sortBy, order, itemsPerPage, startDate, endDate]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset to page 1 on search
    }, 500); // 500ms delay

    return () => clearTimeout(handler);
  }, [search]);

  return {
    error,
    userId,
    navigate,
    loading,
    isDarkMode,
    search,
    setSearch,
    itemsPerPage,
    setItemsPerPage,
    sortBy,
    setSortBy,
    order,
    setOrder,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    users,
    setShowDeleteAllUsersModal,
    openExportExcelModal,
    isExportModalOpen,
    closeExportExcelModal,
    filename,
    setFilename,
    handleExport,
    setUserId,
    setShowDeleteUserModal,
    totalPages,
    page,
    setPage,
    showDeleteUserModal,
    handleDeleteUser,
    showDeleteAllUsersModal,
    handleDeleteAllUsers,
  };
};

export default useUsers;
