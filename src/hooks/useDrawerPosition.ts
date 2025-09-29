// src/hooks/useDrawerPosition.ts
import {
  leftDrawerConfig,
  rightDrawerConfig,
  topDrawerConfig,
  bottomDrawerConfig,
  ChatDrawerConfig,
} from "../config";

type DrawerPosition = "left" | "right" | "top" | "bottom";

export function useDrawerPosition(position: DrawerPosition): ChatDrawerConfig {
  switch (position) {
    case "left":
      return leftDrawerConfig;
    case "right":
      return rightDrawerConfig;
    case "top":
      return topDrawerConfig;
    case "bottom":
      return bottomDrawerConfig;
    default:
      return rightDrawerConfig; // fallback
  }
}
