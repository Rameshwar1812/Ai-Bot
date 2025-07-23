import React, { useState } from "react";
import { FiClipboard, FiShare2, FiThumbsUp } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import toast from "react-hot-toast";
import "./dash.css";
import Tooltip from "./Tooltip";
import { useAuth } from "../context/AuthContext";

function ChatBubble({ chat }) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const auth = useAuth();

  const [like, setLike] = useState(false);
  const isLike = () => {
    setLike(!like);
  };
  const extractCode = (message) => {
    if (message.includes("```")) {
      const blocks = message.split("```");
      return blocks;
    }
  };

  const copyToClipboard = (text) => {
    return () => {
      navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    };
  };

  const share = (text) => {
    return () => {
      navigator.share({ text });
    };
  };

  const verifyResponse = (query) => {
    return () => {
      const url = `https://www.google.com/search?q=${query}`;
      window.open(url, "_blank");
    };
  };

  const isCodeBlock = (str) => {
    if (
      str.includes("=") ||
      str.includes(";") ||
      str.includes("[") ||
      str.includes("]") ||
      str.includes("{") ||
      str.includes("}") ||
      str.includes("#") ||
      str.includes("//")
    ) {
      return true;
    }
    return false;
  };

  const formatMarkdown = (text) => {
    // Bold (**)
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic (*)
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Bold-Italic (**_)
    text = text.replace(/\*\*(.*?)_.*?\*\*/g, "<strong><em>$1</em></strong>");
    // line break (*)
    text = text.replace(/\n/g, "<br>");
    // Inline code (`)
    text = text.replace(/`(.*?)`/g, "<code>$1</code>");
    // Link ([Link](url))
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
    // Image (![Alt](url))
    text = text.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

    return text;
  };

  const processBlocks = (blocks) => {
    return blocks.map((block, index) => {
      if (isCodeBlock(block)) {
        return (
          <SyntaxHighlighter
            key={index}
            style={coldarkDark}
            language="javascript"
            className="rounded-2xl p-4 m-1"
          >
            {block}
          </SyntaxHighlighter>
        );
      } else {
        return (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: formatMarkdown(block) }}
          />
        );
      }
    });
  };
  const codeBlocks = extractCode(chat.response);

  return (
    <div className="text-white flex items-center justify-center pb-12">
      <div className="flex flex-col lg:w-[60vw] md:w-[65vw] sm:w-[85vw] w-[85vw]">
        {/* query */}
        <div className="flex flex-col sm:flex-row-reverse gap-6 items-end sm:items-center py-4 px-4">
          <img
            src={auth.user?.profilePic}
            alt="avatar"
            className="rounded-full w-6 h-6"
          />
          <p className="border-r-2 p-2">{chat.query}</p>
        </div>
        {/* response */}
        <div className="flex flex-col sm:flex-row gap-6 items-startpy-6 px-4">
          <img
            src="src/assets/ai.png"
            alt="avatar"
            className="rounded-full max-w-6 max-h-6"
          />
          {/* <p>{chat.response}</p> */}
          {/* <p
            dangerouslySetInnerHTML={{ __html: formatMarkdown(chat.response) }}
          /> */}

          <div className="border-l-2 p-2">
            {codeBlocks ? (
              processBlocks(codeBlocks)
            ) : (
              <p
                dangerouslySetInnerHTML={{
                  __html: formatMarkdown(chat.response),
                }}
              />
            )}
          </div>
          {/* <p>{chat.response}</p> */}
        </div>
        {/* options */}
        <div className="flex gap-4 p-4 m-0 sm:ml-14">
          <Tooltip tooltipText="Like">
            <button onClick={isLike} className="text-white text-xl p-2">
              {like ? (
                <div className="text-red-600">
                  <FiThumbsUp />
                </div>
              ) : (
                <FiThumbsUp />
              )}
            </button>
          </Tooltip>

          <Tooltip tooltipText="Copy to clipboard">
            <button
              onClick={copyToClipboard(chat.response)}
              className="text-white text-xl p-2"
            >
              <FiClipboard />
            </button>
          </Tooltip>
          <Tooltip tooltipText="Share">
            <button
              className="text-white text-xl p-2"
              onClick={share(chat.response)}
            >
              <FiShare2 />
            </button>
          </Tooltip>
          <Tooltip tooltipText="Verify Response">
            <button
              className="bg-zinc-800 rounded-lg p-2 hover:bg-zinc-700"
              onClick={verifyResponse(chat.query)}
            >
              <img
                src="src/assets/google.png"
                alt=""
                className="max-w-5 max-h-5"
              />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default ChatBubble;
