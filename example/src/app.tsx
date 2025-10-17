// example/src/app.tsx
import React from "react";
import { ChatDrawer, AppProvider, ThemeType } from "../../src";

// Developer kendi theme'ini tanımlıyor
const myCustomLightTheme: ThemeType = {
  userBg: "#F2682A",        // turuncu
  userColor: "#FFFFFF",      // beyaz
  botBg: "#5B9A42",          // yeşil
  botColor: "#EFC429",       // sarı
  drawerBg: "#f0f0ec",      // açık arka plan
  headerBg: "#ffffff",       // header beyaz
  fontFamily: "Inter, sans-serif",
  borderRadius: "14px",
};

const myCustomDarkTheme: ThemeType = {
  userBg: "#6C63FF",         // canlı mor
  userColor: "#fff",         // beyaz
  botBg: "#303030",          // koyu gri
  botColor: "#EAEAEA",       // açık gri
  drawerBg: "#181818",       // koyu arka plan
  headerBg: "#303030",       // koyu header
  fontFamily: "Inter, sans-serif",
  borderRadius: "14px",
};


function App() {
  const isDarkMode = false; // true olursa dark theme

  return (
    <AppProvider initialTheme={isDarkMode ? myCustomDarkTheme : myCustomLightTheme} uiConfig={{ loadingText: "Yükleniyor", locale: "tr-Tr" }}>
      <ChatAppWrapper />
    </AppProvider>
  );
}

function ChatAppWrapper() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>ChatDrawer Test</h1>
      <ChatDrawer
        position="right"
        initialMessage="Merhaba! Sana nasıl yardımcı olabilirim?"
        showInitialMessage={true}
        title="otto-chat-bot"
        titleDescription="Açıklama alanı "
      />
    </div>
  );
}

export default App;

