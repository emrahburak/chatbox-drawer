import { ThemeType, UIConfig } from "./types";

export const defaultTheme: ThemeType = {
  mode: "light",
  userBg: "#007bff",
  userColor: "#fff",
  botBg: "#e5e5e5",
  botColor: "#000",
  fontFamily: "Arial, sans-serif",
  borderRadius: "12px",
};

export const defaultUIConfig: UIConfig = {
  loadingText: "Loading...",
  errorText: "Something went wrong.",
  emptyStateText: "No messages yet.",
  sendButtonLabel: "Send",
  locale: "en-US",
};
