import React from "react";
import { ChatDrawer, ChatProvider } from "../../src";



function App() {
  return (
    <ChatProvider apiKey="YOUR_API_KEY" endpoint="YOUR_API_ENDPOINT">
      <div style={{ padding: "2rem" }}>
        <h1>ChatDrawer Test App</h1>
        <ChatDrawer />
      </div>
    </ChatProvider>
  );
}

export default App;

