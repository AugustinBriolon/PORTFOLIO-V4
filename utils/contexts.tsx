import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

type AppContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const AppContext = createContext<AppContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {}
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Synchronisation initiale avec localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedDarkMode = localStorage.getItem('isDarkMode') === 'true';
      setIsDarkMode(storedDarkMode);

      // Ajoute ou retire la classe 'dark' à <html>
      document.documentElement.classList.toggle('dark', storedDarkMode);
    }
  }, []);

  // Met à jour localStorage et la classe `dark` sur <html>
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isDarkMode', isDarkMode.toString());
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode]);

  const contextValue = useMemo(
    () => ({
      isDarkMode,
      toggleDarkMode: () => setIsDarkMode((prev) => !prev),
    }),
    [isDarkMode]
  );

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
