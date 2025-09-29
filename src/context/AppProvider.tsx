// src/context/AppProvider.tsx
import React, { ReactNode } from "react";
import { ChatProvider } from "./ChatContext";
import { ThemeProvider, } from "./ThemeContext";
import { defaultTheme, defaultUIConfig } from "../defaultData";
import { ThemeType, UIConfig } from "../types";
import { UIConfigProvider } from "./UIConfigContext";

interface AppProviderProps {
  children: ReactNode;
  initialTheme?: ThemeType;
  uiConfig?: UIConfig;

}



export const AppProvider: React.FC<AppProviderProps> = ({ children, initialTheme, uiConfig }) => {
  return (
    <ThemeProvider initialTheme={initialTheme || defaultTheme}>
      <ChatProvider>
        <UIConfigProvider config={uiConfig || defaultUIConfig}>
          {children}
        </UIConfigProvider>
      </ChatProvider>
    </ThemeProvider>
  );
};





