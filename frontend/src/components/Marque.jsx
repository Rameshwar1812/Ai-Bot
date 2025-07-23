import React from "react";

function Marque() {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed="0.2"
      className="w-full py-20 pb-40 bg-[#004D43] rounded-t-[30px]"
    >
      <div className="border-t-[1px] border-b-[1px] border-[#c6f0ea60]">
        <marquee behavior="scroll" direction="left" scrollamount="15">
          <h1 className="text-[19vw] leading-none uppercase font-semibold text-white">
            We are Luna We are Luna We are Luna We are Luna We are Luna We are Luna
          </h1>
        </marquee>
      </div>
    </div>
  );
}

export default Marque;
