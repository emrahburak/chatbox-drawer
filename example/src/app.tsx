import React from "react";
import { ChatDrawer, ChatProvider } from "../../src";

function App() {
  return (
    <ChatProvider>
      <ChatAppWrapper />
    </ChatProvider>
  );
}

function ChatAppWrapper() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>ChatDrawer Test</h1>
      <ChatDrawer />
    </div>
  );
}

export default App;

