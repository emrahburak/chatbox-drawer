import React, { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
}

interface ChatContextProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
  sendMessage: (text: string) => Promise<void>;
  toggleDrawer: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  apiKey: string;
  endpoint: string;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children, apiKey, endpoint }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const sendMessage = async (text: string) => {
    const userMessage: Message = { id: Date.now().toString(), text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();

      const botMessage: Message = {
        id: Date.now().toString() + "-bot",
        text: data.reply ?? "No response",
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      setError(err.message || "Error sending message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, isLoading, error, isOpen, sendMessage, toggleDrawer }}>
      {children}
    </ChatContext.Provider>
  );
};

// Hook kullanımı
export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

