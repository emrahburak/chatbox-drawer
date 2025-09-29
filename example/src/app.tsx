// example/src/app.tsx
import React from "react";
import { ChatDrawer, AppProvider, ThemeType } from "../../src";

// Developer kendi theme'ini tanımlıyor
const myCustomTheme: ThemeType = {
  mode: "dark",
  userBg: "#6C63FF",        // canlı mor
  userColor: "#FFFFFF",     // beyaz
  botBg: "#1A1B1E",         // koyu arka plan
  botColor: "#EAEAEA",      // açık gri
  fontFamily: "Inter, sans-serif",
  borderRadius: "14px",
};

function App() {
  return (
    <AppProvider initialTheme={myCustomTheme} uiConfig={{ loadingText: "Yükleniyor",locale:"tr-Tr" }}>
      <ChatAppWrapper />
    </AppProvider>
  );
}

function ChatAppWrapper() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>ChatDrawer Test</h1>
      <ChatDrawer position="right" />
    </div>
  );
}

export default App;

