import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

function eyes() {
  return (
    <div className="w-full h-screen bg-white">
      <div className="relative w-full h-full bg-cover bg-center bg-[url('https://ochi.design/wp-content/uploads/2022/05/Top-Viewbbcbv-1-1440x921.jpg')]">
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-white text-center">
            <h1 className="text-4xl font-bold">Eyes</h1>
            <p className="text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              nec odio. Praesent libero. Sed cursus ante dapibus diam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default eyes;
