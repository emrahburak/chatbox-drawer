export interface UIConfig {
  loadingText?: string;
  errorText?: string;
  emptyStateText?: string;
  sendButtonLabel?: string;
  locale?: string;
}

export interface ThemeType {
  mode?: "light" | "dark";
  userBg?: string;
  userColor?: string;
  botBg?: string;
  botColor?: string;
  drawerBg?: string; // drawer arka planı
  headerBg?: string; // header arka planı
  fontFamily?: string;
  borderRadius?: string;
}
