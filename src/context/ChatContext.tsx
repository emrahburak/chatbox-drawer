import React, { createContext, useContext, useState, ReactNode } from "react";
import { sendMessageToProvider } from "../transports/transporterLayer";
import type { ChatConfig } from "../types";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}


interface ChatContextProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  isOpen: boolean;
  sendMessage: (text: string) => Promise<void>;
  toggleDrawer: () => void;
  addMessage: (msg: Message) => void;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
  chatConfig: ChatConfig;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children, chatConfig }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const validateChatConfig = () => {
    const { provider, apiKey, url } = chatConfig;

    if (!provider) {
      throw new Error("Chat provider is required");
    }

    if ((provider === "openai" || provider === "gemini") && !apiKey) {
      throw new Error(`${provider} requires an apiKey`);
    }

    if (provider === "webhook" && !url) {
      throw new Error("webhook requires a url");
    }
  };

  const sendMessage = async (text: string) => {
    const now = new Date();
    const userMessage: Message = { id: now.getTime().toString(), text, sender: "user", timestamp: now };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      validateChatConfig();

      const { provider, apiKey, url } = chatConfig;
      const credentials = provider === "webhook" ? url : apiKey;
      const reply = await sendMessageToProvider(provider, credentials!, text, { sessionId });

      const botMessage: Message = {
        id: `${Date.now() + 1}-bot`,
        text: reply,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error sending message";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        error,
        isOpen,
        sendMessage,
        toggleDrawer,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within a ChatProvider");
  return context;
};
