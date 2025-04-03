import { useEffect, useState } from "react";
import { cards } from "../constants/adminConstants";
import { useDarkMode } from "./useDarkMode";

export const useAdminDashboard = () => {
  const { isDarkMode } = useDarkMode();
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredCards, setFilteredCards] = useState(cards);

  useEffect(() => {
    setIsSearching(true);
    const delayDebounce = setTimeout(() => {
      const filtered = cards.filter((card) =>
        card.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCards(filtered);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return {
    search,
    isDarkMode,
    setSearch,
    isSearching,
    filteredCards,
  };
};
