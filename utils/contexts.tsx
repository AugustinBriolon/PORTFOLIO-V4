'use client'
import { ReactNode, createContext, useContext, useMemo, useState } from 'react'

type AppContextType = {
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}

const AppContext = createContext<AppContextType>({
  isDarkMode: false,
  setIsDarkMode: () => {}
});


export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isDarkMode") === "true";
    }
    return false;
  });
  

  return (
    <AppContext.Provider value={
      useMemo(() => ({ isDarkMode, setIsDarkMode }), [isDarkMode])
    }>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};