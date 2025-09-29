// src/config.ts
export interface ToggleButtonConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
}

export interface ChatDrawerConfig {
  position: "left" | "right" | "top" | "bottom";
  width: string;
  height?: string; // top/bottom için
  behavior: {
    autoOpen: boolean;
    closeOnEsc: boolean;
  };
  toggleButton?: ToggleButtonConfig; // button stili artık config içinde
}

// Sol drawer
export const leftDrawerConfig: ChatDrawerConfig = {
  position: "left",
  width: "418px",
  behavior: {
    autoOpen: false,
    closeOnEsc: true,
  },
  toggleButton: {
    top: "50%",
    right: "-2.5rem",
    transform: "translateY(-50%)",
  },
};

// Sağ drawer
export const rightDrawerConfig: ChatDrawerConfig = {
  ...leftDrawerConfig,
  position: "right",
  toggleButton: {
    top: "50%",
    left: "-2.5rem",
    transform: "translateY(-50%)",
  },
};

// Üst drawer
export const topDrawerConfig: ChatDrawerConfig = {
  position: "top",
  height: "300px",
  width: "100%",
  behavior: {
    autoOpen: false,
    closeOnEsc: true,
  },
  toggleButton: {
    bottom: "-2.5rem",
    left: "50%",
    transform: "translateX(-50%)",
  },
};

// Alt drawer
export const bottomDrawerConfig: ChatDrawerConfig = {
  position: "bottom",
  height: "300px",
  width: "100%",
  behavior: {
    autoOpen: false,
    closeOnEsc: true,
  },
  toggleButton: {
    top: "-2.5rem",
    left: "50%",
    transform: "translateX(-50%)",
  },
};

// Default export
export const chatDrawerConfig = rightDrawerConfig;
// Default export
