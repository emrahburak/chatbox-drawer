// src/Components/ChatInput.tsx
import { useRef } from "react";
import { GrSend } from "react-icons/gr";

interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  handleSend: () => Promise<void> | void;
}

export default function ChatInput({ input, setInput, handleSend }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        borderTop: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        gap: "0.5rem",
      }}
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onInput={onInput}
        onKeyDown={(e) =>
          e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())
        }
        style={{
          flex: 1,
          padding: "0.5rem",
          resize: "none",
          overflow: "hidden",
          lineHeight: "1.4",
          borderRadius: "4px",
          border: "1px solid #ccc",
          maxHeight: "120px",
        }}
        rows={1}
        placeholder="Mesajınızı yazın..."
      />
      <button
        onClick={handleSend}
        style={{
          padding: "0.5rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GrSend />
      </button>
    </div>
  );
}

