import React, { useState } from "react";
import {
  FiHelpCircle,
  FiMenu,
  FiPlus,
  FiRotateCcw,
  FiSettings,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { chatHandler } from "../handler/chatHandler";
import "./dash.css";

function SideNav({ chat }) {
  const { handleDeleteChats } = chatHandler();
  const handleDelete = async () => {
    handleDeleteChats();
  };

  const [sideBar, setSideBar] = useState(false);
  const handleSideBarToggle = () => {
    setSideBar(!sideBar);
  };
  const variants = {
    open: { width: "200px", transition: { duration: 0.3 } },
    closed: { width: "60px", transition: { duration: 0.3 } },
  };
  const translateY = {
    open: { y: -40, transition: { duration: 0.3 } },
    closed: { y: 0, transition: { duration: 0.3 } },
  };
  const fadeIn = {
    open: { opacity: 1, transition: { duration: 0.5, delay: 0.5 } },
    closed: { opacity: 0, transition: { duration: 0.5 } },
  };
  const buttonVariants = {
    open: { padding: "20px", transition: { duration: 0.2 } },
    closed: { padding: "10px", transition: { duration: 0.2 } },
  };
  return (
    <motion.div
      className=" flex flex-col items-start justify-between bg-zinc-800 p-2 text-white"
      animate={sideBar ? "open" : "closed"}
      variants={variants}
    >
      <div className="flex flex-col items-start">
        <button
          className="p-3 rounded-full text-xl hover:bg-zinc-600"
          onClick={handleSideBarToggle}
        >
          <FiMenu />
        </button>
        <motion.button
          className="flex items-center p-3 mt-10 rounded-full text-xl bg-zinc-900 hover:bg-zinc-700"
          animate={sideBar ? "open" : "closed"}
          variants={buttonVariants}
          onClick={handleDelete}
        >
          <FiPlus />
          {sideBar && (
            <p className="text-[14px] ml-2 whitespace-nowrap">New Chat</p>
          )}
        </motion.button>
      </div>

      {/* history */}
      {sideBar && (
        <div className="max-h-[35vh] overflow-hidden overflow-y-auto w-full">
          <div>
            <p className="text-[24px] ml-2">History</p>
          </div>

          {chat.map((chat, index) => (
            <p className="text-[14px] ml-2 p-1 text-gray-300 whitespace-nowrap overflow-hidden overflow-ellipsis rounded-full cursor-pointer hover:bg-zinc-500">
              {chat.query}
            </p>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <motion.button
          className="flex items-center p-3 rounded-full text-xl hover:bg-zinc-600"
          animate={sideBar ? "open" : "closed"}
          variants={translateY}
          onClick={handleDelete}
        >
          <FiRotateCcw />
          {sideBar && (
            <motion.p
              className="text-[14px] ml-2"
              animate={sideBar ? "open" : "closed"}
              variants={fadeIn}
            >
              Clear History
            </motion.p>
          )}
        </motion.button>
        <motion.button
          className="flex items-center p-3 rounded-full text-xl hover:bg-zinc-600"
          animate={sideBar ? "open" : "closed"}
          variants={translateY}
          onClick={window.open.bind(
            null,
            "https://ai.google.dev/gemini-api/docs"
          )}
        >
          <FiHelpCircle />
          {sideBar && <p className="text-[14px] ml-2">Help</p>}
        </motion.button>
        <motion.button
          className="flex items-center p-3 mb-2 rounded-full text-xl hover:bg-zinc-600"
          animate={sideBar ? "open" : "closed"}
          variants={translateY}
        >
          <FiSettings />

          {sideBar && <p className="text-[14px] ml-2">Settings</p>}
        </motion.button>
        {sideBar && (
          <motion.p
            className="text-[13px] text-gray-300 my-2 whitespace-nowrap"
            animate={sideBar ? "open" : "closed"}
            variants={fadeIn}
          >
            Developed by Abhishek ❤️
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

export default SideNav;
