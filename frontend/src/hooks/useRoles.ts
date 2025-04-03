import { useEffect, useState } from "react";
import useRolesService from "./useRolesService";
import { Roles as RolesType } from "../types/roles.types";
import { SortOrder } from "../types/sortTypes.types";
import { useDarkMode } from "./useDarkMode";
import { toast } from "react-toastify";

const useRoles = () => {
  const { getRoles } = useRolesService();
  const [roles, setRoles] = useState<RolesType[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState<SortOrder>(SortOrder.ASC);
  const [itemsPerPage, setItemsPerPage] = useState<number>(3);
  const [totalPages, setTotalPages] = useState<number>(1);

  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await getRoles({
          search: debouncedSearch,
          paginationArgs: {
            skip: (page - 1) * itemsPerPage,
            take: itemsPerPage === -1 ? undefined : itemsPerPage,
          },
          sortArgs: {
            sortBy,
            order,
          },
        });

        setRoles(response.roles.roles);
        setTotalPages(response.roles.totalPages);
      } catch (error: any) {
        toast.error("Failed to fetch roles", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [debouncedSearch, page, sortBy, order, itemsPerPage]);

  return {
    isDarkMode,
    search,
    setSearch,
    itemsPerPage,
    setItemsPerPage,
    sortBy,
    setSortBy,
    order,
    setOrder,
    loading,
    roles,
    totalPages,
    page,
    setPage,
  };
};

export default useRoles;
