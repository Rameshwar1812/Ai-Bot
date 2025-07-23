import React, { useRef } from "react";
import { FiImage, FiMic, FiSend } from "react-icons/fi";
import { chatHandler } from "./../handler/chatHandler";
import "./dash.css";
import toast from "react-hot-toast";
import Tooltip from "./Tooltip";

function BottomDock() {
  const inputRef = useRef();
  const formRef = useRef();

  const { handleChatSubmit, loading, setLoading } = chatHandler();

  const handleSend = async (e) => {
    e.preventDefault();
    if (loading) {
      toast.error("Please wait for the previous message to send");
      return;
    }
    const message = inputRef.current.value;
    handleChatSubmit(inputRef);
  };

  return (
    <div className="dock fixed bottom-10 w-full text-white flex justify-center">
      <form
        ref={formRef}
        onSubmit={handleSend}
        className="text-white bg-zinc-800 rounded-full flex items-center justify-center"
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter Prompt Here..."
          className=" bg-zinc-800 rounded-full p-4 w-[80vw] sm:w-[45vw]"
          style={{ overflow: "auto", resize: "vertical", maxHeight: "300px" }}
        />
        <Tooltip tooltipText="Send">
          <button type="button" className="mx-4 text-xl" onClick={handleSend}>
            {loading ? (
              <img
                src="src/assets/ai.png"
                alt="avatar"
                className="max-w-6 max-h-6 animate-spin"
              />
            ) : (
              <FiSend />
            )}
          </button>
        </Tooltip>
      </form>
    </div>
  );
}

export default BottomDock;
