import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

type AppContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const AppContext = createContext<AppContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedPreference = localStorage.getItem("isDarkMode");
      if (storedPreference !== null) {
        setIsDarkMode(storedPreference === "true");
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setIsDarkMode(prefersDark);
        localStorage.setItem("isDarkMode", prefersDark.toString());
      }

      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && isInitialized) {
      localStorage.setItem("isDarkMode", isDarkMode.toString());

      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [isDarkMode, isInitialized]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const contextValue = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode,
    }),
    [isDarkMode],
  );

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
