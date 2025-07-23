import React, { useEffect, useRef, useContext } from "react";
import SideNav from "./../components/SideNav";
import BottomDock from "../components/BottomDock";
import DashBoardNav from "../components/DashBoardNav";
import ChatBubble from "../components/ChatBubble";
import { chatHandler } from "../handler/chatHandler";
import { ChatContext } from "../handler/ChatProvider";
import "../components/dash.css";
import Intro from "../components/Intro";

function Dashboard() {
  // const { chatMessages } = chatHandler();
  const { chatMessages, setChatMessages } = useContext(ChatContext);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages]);

  return (
    <div className="flex flex-row overflow-hidden">
      <div className="sidenav h-screen hidden md:flex">
        <SideNav chat={chatMessages} />
      </div>
      <div className="w-full h-screen bg-zinc-900 flex flex-col">
        <DashBoardNav chat={chatMessages} />
        {/* gemini responses */}
        <div className="flex flex-col overflow-auto gap-4 p-4 h-screen">
          {chatMessages.length === 0 ? (
            <Intro />
          ) : (
            chatMessages.map((chat, index) => (
              <ChatBubble key={index} chat={chat} />
            ))
          )}

          <div className="h-[20vh] w-[2vw]"></div>
          <div ref={messagesEndRef} />
          {/* empty space so that only latest chat is visible */}
        </div>

        {/* bootom search dock */}
        <BottomDock />
      </div>
    </div>
  );
}

export default Dashboard;
