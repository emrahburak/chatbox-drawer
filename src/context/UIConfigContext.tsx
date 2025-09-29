import React, { createContext, useContext, ReactNode } from "react";
import { UIConfig } from "../types";
import { defaultUIConfig } from "../defaultData";


const UIConfigContext = createContext<UIConfig>(defaultUIConfig);

interface UIConfigProviderProps {
  config?: Partial<UIConfig>;
  children: ReactNode;
}

export const UIConfigProvider: React.FC<UIConfigProviderProps> = ({ config, children }) => {
  const mergedConfig: UIConfig = { ...defaultUIConfig, ...config };
  return (
    <UIConfigContext.Provider value={mergedConfig}>
      {children}
    </UIConfigContext.Provider>
  );
};

export const useUIConfig = () => {
  const context = useContext(UIConfigContext);
  if (!context) throw new Error("useUIConfig must be used within UIConfigProvider");
  return context;
};

