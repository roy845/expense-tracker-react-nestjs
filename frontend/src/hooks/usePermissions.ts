import { useEffect, useState } from "react";
import { User } from "../types/user.types";
import { useDarkMode } from "./useDarkMode";
import useUserService from "./useUserService";
import { toast } from "react-toastify";
import { ALL_PERMISSIONS } from "../constants/adminConstants";

const usePermissions = () => {
  const { getUsers, getUserPermissions, updateUserPermissions } =
    useUserService();
  const { isDarkMode } = useDarkMode();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [userPermissions, setUserPermissions] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [pageSize, setPageSize] = useState(3);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      const response = await getUsers({
        search: debouncedSearchTerm,
        paginationArgs: {
          skip: (page - 1) * pageSize,
          take: pageSize === -1 ? undefined : pageSize,
        },
        sortArgs: {},
        filterArgs: {},
      });
      setUsers(response.findAllUsers.users);
      setTotalPages(response.findAllUsers.totalPages);
    };
    loadUsers();
  }, [debouncedSearchTerm, page, pageSize]);

  const handleUserSelect = async (userId: string) => {
    setSelectedUserId(userId);
    try {
      const response = await getUserPermissions(userId);
      setUserPermissions(response.getUserPermissions);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handlePermissionToggle = (permission: string) => {
    setUserPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSelectAllToggle = () => {
    const allSelected = ALL_PERMISSIONS.every((p) =>
      userPermissions.includes(p)
    );
    setUserPermissions(allSelected ? [] : ALL_PERMISSIONS);
  };

  const handleSave = async () => {
    if (!selectedUserId) return;
    await updateUserPermissions(selectedUserId, userPermissions);
    toast.success("Permissions updated!");
  };
  return {
    isDarkMode,
    searchTerm,
    setSearchTerm,
    pageSize,
    setPageSize,
    users,
    selectedUserId,
    handleUserSelect,
    totalPages,
    page,
    setPage,
    userPermissions,
    handlePermissionToggle,
    handleSelectAllToggle,
    handleSave,
  };
};

export default usePermissions;
