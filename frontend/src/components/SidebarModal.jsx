// import React, { useContext, useState } from "react";
// import {
//   FiHelpCircle,
//   FiMenu,
//   FiPlus,
//   FiRotateCcw,
//   FiSettings,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { chatHandler } from "../handler/chatHandler";
// import "./dash.css";
// import { ChatContext } from "../handler/ChatProvider";

// function SidebarModal({ chat }) {
//   const { handleDeleteChats } = chatHandler();
//   const handleDelete = async () => {
//     handleDeleteChats();
//   };
//   const { modal, handleModal } = useContext(ChatContext);
//   const handleSideBarToggle = () => {
//     handleModal();
//     console.log("modal", modal);
//   };
// }
// return (
//   <div className="h-screen w-full flex flex-row z-10 fixed">
//     <div className="h-screen w-[200px] flex flex-col items-start justify-between bg-zinc-800 p-2 text-white">
//       <div className="flex flex-col items-start">
//         <button
//           className="p-3 rounded-full text-xl hover:bg-zinc-600"
//           onClick={handleSideBarToggle}
//         >
//           <FiMenu />
//         </button>
//         <button className="flex items-center p-3 mt-10 rounded-full text-xl bg-zinc-900 hover:bg-zinc-700">
//           <FiPlus />
//           <p className="text-[14px] ml-2 whitespace-nowrap">New Chat</p>
//         </button>
//       </div>

//       {/* history */}
//       <div className="max-h-[35vh] overflow-hidden overflow-y-auto w-full">
//         <div>
//           <p className="text-[24px] ml-2">History</p>
//         </div>

//         {chat.map((chat, index) => (
//           <p className="text-[14px] ml-2 p-1 text-gray-300 whitespace-nowrap overflow-hidden overflow-ellipsis rounded-full cursor-pointer hover:bg-zinc-500">
//             {chat.query}
//           </p>
//         ))}
//       </div>

//       <div className="flex flex-col gap-1">
//         <button
//           className="flex items-center p-3 rounded-full text-xl hover:bg-zinc-600"
//           onClick={handleDelete}
//         >
//           <FiRotateCcw />
//           <p className="text-[14px] ml-2">Clear History</p>
//         </button>
//         <button className="flex items-center p-3 rounded-full text-xl hover:bg-zinc-600">
//           <FiHelpCircle />
//           <p className="text-[14px] ml-2">Help</p>
//         </button>
//         <button className="flex items-center p-3 mb-2 rounded-full text-xl hover:bg-zinc-600">
//           <FiSettings />

//           <p className="text-[14px] ml-2">Settings</p>
//         </button>
//         <p className="text-[13px] text-gray-300 my-2 whitespace-nowrap">
//           Developed by Abhishek ❤️
//         </p>
//       </div>
//     </div>
//     <div className="w-full bg-[#0000005f]"></div>
//   </div>
// );

// export default SidebarModal;
