import { useEffect, useRef, useState } from "react";
import { useDarkMode } from "./useDarkMode";
import useRolesService from "./useRolesService";
import useUserService from "./useUserService";
import { User } from "../types/user.types";
import { UserRoles } from "../types/roles.types";
import { debounce } from "lodash";
import { toast } from "react-toastify";

const useRemoveRoles = () => {
  const { isDarkMode } = useDarkMode();
  const { getUsers } = useUserService();
  const { removeRolesFromUser } = useRolesService();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<UserRoles[]>([]);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const [skip, setSkip] = useState(0);
  const take = 3;
  const [hasMore, setHasMore] = useState(true);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  const rolesOptions: UserRoles[] = Object.values(UserRoles);

  const fetchUsers = async (searchTerm: string, reset = false) => {
    if (reset) {
      setSkip(0);
      setUsers([]);
      setHasMore(true);
    }

    setLoadingUsers(true);
    try {
      const res = await getUsers({
        search: searchTerm,
        paginationArgs: { skip: reset ? 0 : skip, take },
        sortArgs: { sortBy: "createdAt", order: "DESC" },
      });

      const fetchedUsers = res.findAllUsers.users;
      const totalFetched = reset ? fetchedUsers : [...users, ...fetchedUsers];

      setUsers(totalFetched);
      setHasMore(fetchedUsers.length === take);
      setSkip((prev) => (reset ? take : prev + take));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const debouncedFetch = debounce((val: string) => {
    fetchUsers(val, true);
  }, 300);

  useEffect(() => {
    debouncedFetch(search);
    return () => debouncedFetch.cancel();
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(e.target as Node)
      ) {
        setIsRoleDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleRole = (role: UserRoles) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = async () => {
    if (!selectedUser) return toast.error("Select a user.");
    if (selectedRoles.length === 0) return toast.error("No roles selected");

    try {
      const uppercasedRoles: UserRoles[] = selectedRoles.map(
        (role) => role.toUpperCase() as UserRoles
      );
      await removeRolesFromUser(selectedUser._id, uppercasedRoles);
      toast.success(`Roles ${selectedRoles.join(", ")} removed successfully!`);
    } catch (error: any) {
      const message =
        error?.response?.data?.errors?.[0]?.message ||
        error?.message ||
        "Failed to remove roles.";
      toast.error("Error removing roles: " + message);
    }
  };

  return {
    isDarkMode,
    userDropdownRef,
    search,
    setSearch,
    users,
    selectedUser,
    setSelectedUser,
    loadingUsers,
    isUserDropdownOpen,
    hasMore,
    fetchUsers,
    setIsUserDropdownOpen,
    roleDropdownRef,
    rolesOptions,
    selectedRoles,
    toggleRole,
    isRoleDropdownOpen,
    setIsRoleDropdownOpen,
    handleSubmit,
  };
};

export default useRemoveRoles;
