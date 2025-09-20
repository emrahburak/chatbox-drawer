// src/components/ChatDrawer/ChatDrawer.tsx
import React, { useState } from "react";
import { useChat } from "../context/ChatContext";

interface ChatDrawerProps {
  position?: "left" | "right"; // drawer konumu
  width?: string; // örn: "300px"
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ position = "right", width = "300px" }) => {
  const { isOpen, toggleDrawer, messages, sendMessage, isLoading, error } = useChat();
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        style={{
          position: "fixed",
          top: "50%",
          [position]: 0,
          zIndex: 1000,
        }}
        onClick={toggleDrawer}
      >
        Chat
      </button>

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          [position]: isOpen ? 0 : `-${width}`,
          height: "100%",
          width,
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          transition: "0.3s",
          display: "flex",
          flexDirection: "column",
          zIndex: 999,
        }}
      >
        {/* Chat messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "0.5rem 0" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  borderRadius: "12px",
                  backgroundColor: msg.sender === "user" ? "#007bff" : "#e5e5e5",
                  color: msg.sender === "user" ? "#fff" : "#000",
                }}
              >
                {msg.text}
              </span>
            </div>
          ))}
          {isLoading && <div>Loading...</div>}
          {error && <div style={{ color: "red" }}>{error}</div>}
        </div>

        {/* Input */}
        <div style={{ padding: "1rem", borderTop: "1px solid #ccc" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ width: "70%", padding: "0.5rem" }}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

