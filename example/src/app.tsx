// example/src/app.tsx
import React, { useEffect, useState } from "react";
import { ChatDrawer, AppProvider, ThemeType, useChat } from "../../src";
import { ChatDrawerConfig } from "../../src/config";

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

const strictModeAutoOpenConfig: ChatDrawerConfig = {
  position: "right",
  width: "418px",
  behavior: {
    autoOpen: true,
    closeOnEsc: true,
  },
  toggleButton: {
    top: "50%",
    left: "-2.5rem",
    transform: "translateY(-50%)",
  },
};

function App() {
  const isDarkMode = false; // true olursa dark theme

  return (
    <AppProvider initialTheme={isDarkMode ? myCustomDarkTheme : myCustomLightTheme} uiConfig={{ loadingText: "Yükleniyor", locale: "tr-Tr" }}>
      <ChatAppWrapper />
    </AppProvider>
  );
}

function StrictModeAutoOpenCheck() {
  const { isOpen } = useChat();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setChecked(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  if (!checked) return null;

  return (
    <p style={{ marginTop: "1rem", color: isOpen ? "green" : "red" }}>
      StrictMode autoOpen check: {isOpen ? "PASS" : "FAIL"}
    </p>
  );
}

function ChatAppWrapper() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>ChatDrawer Test</h1>
      <ChatDrawer
        config={strictModeAutoOpenConfig}
        initialMessage="Merhaba! Sana nasıl yardımcı olabilirim?"
        showInitialMessage={true}
        title="otto-chat-bot"
        titleDescription="Açıklama alanı "
      />
      <StrictModeAutoOpenCheck />
    </div>
  );
}

export default App;
