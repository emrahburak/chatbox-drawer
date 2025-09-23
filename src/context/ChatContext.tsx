import React, { createContext, useContext, useState, ReactNode } from "react";
import { sendMessageToProvider,Provider } from "../transports/transporterLayer";

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
  sendMockMessage?: (text: string) => Promise<void>;
  toggleDrawer: () => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  // .env üzerinden sabit provider ve apiKey alınıyor
  const provider = import.meta.env.VITE_PROVIDER as Provider;
  const apiKey = import.meta.env.VITE_AI_API_KEY;

  const sendMessage = async (text: string) => {
    const userMessage: Message = { id: Date.now().toString(), text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const reply = await sendMessageToProvider(provider, apiKey, text);

      const botMessage: Message = {
        id: Date.now().toString() + "-bot",
        text: reply,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      setError(err.message || "Error sending message");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMockMessage = async (text: string) => {
    const userMessage: Message = { id: crypto.randomUUID(), text, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: "Mock cevap: " + text.split("").reverse().join(""),
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 500);
  };

  return (
    <ChatContext.Provider
      value={{ messages, isLoading, error, isOpen, sendMessage, toggleDrawer, sendMockMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Hook kullanımı
export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};

