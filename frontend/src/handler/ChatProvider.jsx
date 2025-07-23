import { createContext, useState } from "react";

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <ChatContext.Provider value={{ chatMessages, setChatMessages, loading, setLoading }}>
      {children}
    </ChatContext.Provider>
  );
};


