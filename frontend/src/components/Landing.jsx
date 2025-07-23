import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div
      data-scroll
      data-scroll-speed="-.2"
      className="w-full h-screen bg-zinc-900 pt-1"
    >
      <div className="textstructure mt-40 px-[10vw] sm:px-20">
        {["Try Next", "Generation", "of ChatBots"].map((text, index) => {
          return (
            <div key={index} className="masker">
              <div className="flex items-center">
                {index === 1 && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "8vw" }}
                    transition={{ ease: [0.6, 0.01, -0.05, 0.9], duration: 1 }}
                    className="w-[8vw] h-[5.1vw] mt-[0.9vw] rounded-[8px] bg-red-500 mb-3.5"
                  ></motion.div>
                )}
                <h1 className="uppercase text-[7.5vw] leading-[6.5vw] tracking-tighter font-bold">
                  {text}
                </h1>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center px-20 py-5 border-t-[1px] border-zinc-600 mt-32">
        {["For Students and Corporates", ""].map((text, index) => {
          return (
            <p
              key={index}
              className="text-md font-light tracking-tight leading-none"
            >
              {text}
            </p>
          );
        })}
        <div className="flex items-center start">
          <Link
            to="/login"
            className="border-2 border-zinc-400 rounded-full px-4 py-2"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="arrowIcon border-2 border-zinc-400 rounded-full p-3 ml-2 rotate-[45deg]"
          >
            <FaArrowUp />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
