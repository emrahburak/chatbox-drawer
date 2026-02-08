// src/context/AppProvider.tsx
import React, { ReactNode } from "react";
import { ChatProvider } from "./ChatContext";
import { ThemeProvider } from "./ThemeContext";
import { defaultTheme, defaultUIConfig } from "../defaultData";
import { ChatConfig, ThemeType, UIConfig } from "../types";
import { UIConfigProvider } from "./UIConfigContext";

interface AppProviderProps {
  children: ReactNode;
  initialTheme?: ThemeType;
  uiConfig?: UIConfig;
  chatConfig: ChatConfig;
}

export const AppProvider: React.FC<AppProviderProps> = ({
  children,
  initialTheme,
  uiConfig,
  chatConfig,
}) => {
  return (
    <ThemeProvider initialTheme={initialTheme || defaultTheme}>
      <ChatProvider chatConfig={chatConfig}>
        <UIConfigProvider config={uiConfig || defaultUIConfig}>{children}</UIConfigProvider>
      </ChatProvider>
    </ThemeProvider>
  );
};
