import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { sendMessageToProvider, Provider } from "../transports/transporterLayer";




interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date; // <-- yeni alan

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
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());

  const toggleDrawer = () => setIsOpen((prev) => !prev);

  // İlk mesaj yüklemesi
  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };


  // .env üzerinden sabit provider ve apiKey alınıyor
  const provider = import.meta.env.VITE_PROVIDER as Provider;
  const apiKey = import.meta.env.VITE_AI_API_KEY;





  const sendMessage = async (text: string) => {
    const now = new Date();
    const userMessage: Message = { id: now.getTime().toString(), text, sender: "user", timestamp: now };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const reply = await sendMessageToProvider(provider, apiKey, text, { sessionId });

      const botMessage: Message = {
        id: (Date.now() + 1).toString() + "-bot", // benzersiz id
        text: reply,
        sender: "bot",
        timestamp: new Date(), // bot mesajı zaman damgası
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      setError(err.message || "Error sending message");
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
        addMessage
      }}
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

