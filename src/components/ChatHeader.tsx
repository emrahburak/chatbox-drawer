import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";


interface ChatHeaderProps {
  title?: string;
  titleDescription?: string;
  onClose?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ title, titleDescription, onClose }) => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div>
        {title && <h2 style={{ margin: 0, fontSize: "1.2rem", fontFamily: theme.fontFamily }}>{title}</h2>}
        {titleDescription && (
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#555", fontFamily: theme.fontFamily }}>{titleDescription}</p>
        )}
      </div>

      {onClose && (
        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: "1.2rem",
          }}
        >
          <IoCloseCircleOutline style={{ width: "1.5rem", height: "1.5rem" }} />
        </button>
      )}
    </div>
  );
};
