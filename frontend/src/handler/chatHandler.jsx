import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  sendChatRequest,
  getUserChats,
  deleteUserChats,
} from "../helpers/api-communicator";
import { ChatContext } from "./ChatProvider";

export const chatHandler = () => {
  const { chatMessages, setChatMessages } = useContext(ChatContext);
  const { loading, setLoading } = useContext(ChatContext);

  const auth = useAuth();

  const handleChatSubmit = async (inputRef) => {
    setLoading(true);
    const content = inputRef.current?.value;

    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage = { role: "user", content };
    
    try {
      const res = await sendChatRequest(content);
      setChatMessages((prev) => [...prev, ...res.chats]);
      getUserChats().then((data) => {
        setChatMessages([...data.chats]);
      }
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to send or recive chat");
    }
    setLoading(false);
  };

  const handleDeleteChats = async () => {
    setLoading(true);
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deletechats" });
    }
    setLoading(false);
  };

  useEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading("Loading Chats", { id: "loadchats" });
      getUserChats()
        .then((data) => {
          setChatMessages([...data.chats]);
          toast.success("Successfully loaded chats", { id: "loadchats" });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Loading Failed", { id: "loadchats" });
        });
    }
  }, [auth]);

  return {
    handleChatSubmit,
    chatMessages,
    handleDeleteChats,
    loading,
    setLoading,
  };
};
