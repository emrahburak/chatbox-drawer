// src/Components/ChatDrawer.tsx
import React, { useState, useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { ChatDrawerConfig } from "../config";
import { useDrawerPosition } from "../hooks/useDrawerPosition";
import { useUIConfig } from "../context/UIConfigContext";
import { useTheme } from "../context/ThemeContext";

import { BsRobot } from "react-icons/bs";
import ChatInput from "./ChatInput";
import MessageBubble from "./MessageBubble";

interface ChatDrawerProps {
  config?: ChatDrawerConfig;
  position?: "left" | "right" | "top" | "bottom";
  initialMessage?: string;
  showInitialMessage?: boolean;
}


export const ChatDrawer: React.FC<ChatDrawerProps> = ({ config, position = "right", initialMessage, showInitialMessage = true }) => {
  const drawerConfig = config || useDrawerPosition(position); // pozisyon, width, height, toggleButton
  const { isOpen, toggleDrawer, messages, sendMessage, isLoading, error, addMessage } = useChat();
  const { theme } = useTheme(); // theme artık context üzerinden alınıyor
  const [input, setInput] = useState("");
  const { loadingText, errorText } = useUIConfig();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    if (drawerConfig.behavior.autoOpen) toggleDrawer();
  }, []);


  // Sole-source initial message injection
  useEffect(() => {
    if (!initialMessage || !showInitialMessage) return;
    if (isOpen && messages.length === 0) {
      addMessage({
        id: `init-${Date.now()}`,
        text: initialMessage,
        sender: "bot",
        timestamp: new Date(),
      });
    }
  }, [isOpen, initialMessage, showInitialMessage, messages.length, addMessage]);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  const { position: pos, width, height, toggleButton } = drawerConfig;

  return (
    <div
      style={{
        position: "fixed",
        top: pos === "top" ? 0 : pos === "bottom" ? undefined : 0,
        bottom: pos === "bottom" ? 0 : undefined,
        left: pos === "left" ? 0 : pos === "right" ? undefined : 0,
        right: pos === "right" ? 0 : undefined,
        display: "flex",
        flexDirection: pos === "left" || pos === "right" ? "column" : "row",
        alignItems: "center",
        zIndex: 1000,
        height: pos === "left" || pos === "right" ? "100%" : height,
        width: pos === "top" || pos === "bottom" ? "100%" : width,
      }}
    >
      {/* Drawer */}
      <div
        style={{
          position: "relative",
          width: pos === "left" || pos === "right" ? width : "100%",
          height: pos === "top" || pos === "bottom" ? height : "100%",
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(0,0,0,0.3)",
          display: "flex",
          flexDirection: "column",
          transition: "0.3s",
          transform:
            pos === "left"
              ? isOpen
                ? "translateX(0)"
                : `translateX(-${width})`
              : pos === "right"
                ? isOpen
                  ? "translateX(0)"
                  : `translateX(${width})`
                : pos === "top"
                  ? isOpen
                    ? "translateY(0)"
                    : `translateY(-${height})`
                  : isOpen
                    ? "translateY(0)"
                    : `translateY(${height})`,
        }}
      >
        {/* Toggle Button */}
        <button
          style={{
            position: "absolute",
            ...toggleButton,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.2rem",
            cursor: "pointer"
          }}
          onClick={toggleDrawer}
        >
          <BsRobot style={{ width: "1.5rem", height: "1.5rem" }} />
        </button>

        {/* Chat messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              text={msg.text}
              sender={msg.sender}
              timestamp={msg.timestamp}      // eğer timestamp göstermek istiyorsan
              showTimestamp={true}           // opsiyonel
            />
          ))}
          {isLoading && <div>{loadingText}</div>}
          {error && <div style={{ color: "red" }}>{errorText}</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput input={input} setInput={setInput} handleSend={handleSend} />
      </div>
    </div>
  );
};

