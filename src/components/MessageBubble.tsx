import React from "react";
import { useTheme } from "../context/ThemeContext";
import { FaUser, FaRobot } from "react-icons/fa";
import { useFormatTimestamp } from "../hooks/useFormatTimeStamp";

interface MessageBubbleProps {
  text: string;
  sender: "user" | "bot";
  timestamp?: Date;
  showTimestamp?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  text,
  sender,
  timestamp,
  showTimestamp = false,
}) => {
  const { theme } = useTheme();
  const formatTimestamp = useFormatTimestamp();

  const getSenderIcon = (sender: "user" | "bot") => {
    switch (sender) {
      case "user":
        return <FaUser size={16} />;
      case "bot":
        return <FaRobot size={16} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ margin: "0.5rem 0", textAlign: sender === "user" ? "right" : "left" }}>
      <div
        style={{
          display: "flex",
          flexDirection: sender === "user" ? "row-reverse" : "row",
          alignItems: "center",
        }}
      >
        {/* Icon */}
        <div style={{ margin: "0 0.5rem" }}>{getSenderIcon(sender)}</div>

        {/* Message + timestamp container */}
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "70%" }}>
          <span
            style={{
              display: "inline-block",
              padding: "0.5rem 1rem",
              borderRadius: theme.borderRadius || "12px",
              backgroundColor: sender === "user" ? theme.userBg : theme.botBg,
              color: sender === "user" ? theme.userColor : theme.botColor,
              fontFamily: theme.fontFamily,
              wordWrap: "break-word",
            }}
          >
            {text}
          </span>

          {showTimestamp && timestamp && (
            <div
              style={{
                fontSize: "0.75rem",
                color: "#888",
                marginTop: "2px",
                textAlign: "right", // opsiyonel: user sağ, bot sol
              }}
            >
              {formatTimestamp(timestamp)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

