import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeType } from "../types";



interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme: Partial<ThemeType>) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode; initialTheme?: ThemeType }> = ({ children, initialTheme }) => {
  const [theme, setThemeState] = useState<ThemeType>(initialTheme || {});

  const setTheme = (newTheme: Partial<ThemeType>) => setThemeState(prev => ({ ...prev, ...newTheme }));

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

