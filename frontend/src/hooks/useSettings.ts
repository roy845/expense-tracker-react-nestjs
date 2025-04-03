import { toast } from "react-toastify";
import { selectCurrency, setCurrency } from "../features/currencySlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useDarkMode } from "./useDarkMode";
import useUserService from "./useUserService";

const useSettings = () => {
  const [loadingCurrency, setLoadingCurrency] = useState<boolean>(true);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState<boolean>(false);
  const [isThemeOpen, setIsThemeOpen] = useState<boolean>(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const dispatch = useAppDispatch();
  const { selectedCurrency } = useAppSelector(selectCurrency);
  const { getCurrencySymbol, updateCurrencySymbol } = useUserService();

  useEffect(() => {
    const fetchCurrencySymbol = async () => {
      try {
        const response = await getCurrencySymbol();
        if (response.getCurrencySymbol) {
          dispatch(setCurrency(response.getCurrencySymbol));
        }
      } catch (error) {
        console.error("Failed to fetch currency symbol:", error);
      } finally {
        setLoadingCurrency(false);
      }
    };

    fetchCurrencySymbol();
  }, [dispatch, getCurrencySymbol]);

  const handleCurrencyChange = async (currency: string) => {
    dispatch(setCurrency(currency));

    try {
      await updateCurrencySymbol(currency);
      toast.success(`Currency ${currency} updated in your account!`);
    } catch (error) {
      toast.error(`Failed to update currency in account`);
      console.error("GraphQL Currency Update Error:", error);
    }
  };

  const handleThemeChange = (mode: string) => {
    if ((mode === "dark" && !isDarkMode) || (mode === "light" && isDarkMode)) {
      toggleDarkMode();
    }
  };

  return {
    isDarkMode,
    isCurrencyOpen,
    setIsCurrencyOpen,
    selectedCurrency,
    loadingCurrency,
    handleCurrencyChange,
    isThemeOpen,
    setIsThemeOpen,
    handleThemeChange,
  };
};

export default useSettings;
