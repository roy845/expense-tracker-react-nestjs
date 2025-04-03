import { createContext, useState, useEffect, ReactNode } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const { getValue, setValue } = useLocalStorage();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedDarkMode = getValue("isDarkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    setValue("isDarkMode", isDarkMode);
  }, [isDarkMode, setValue]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
