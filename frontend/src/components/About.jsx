import React from "react";
function About() {
  return (
    <div
      data-scroll
      data-scroll-section
      data-scroll-speed="-0.4"
      className="w-full py-20 bg-[#CDEA68] rounded-t-[30px] text-black"
    >
      <p className="px-4 sm:px-[5vw] pb-20 font-[Poppins] text-[3vw] mt-[4vw] mr-[5vw] leading-[3.5vw]">
        Luna Ai is an Ai based Chat Bot platform that helps you to increase your
        productivity by 10X.
      </p>
      <div className="flex justify-between gap-2 sm:gap-20 p-4 sm:p-20 border-t-[1px] border-b-[1px] border-[#74747466]">
        <p>What can you Expect from us:</p>
        <p className="max-w-[50vw]">
          Luna Ai is a Ai based platform that helps you to increase your
          productivity and upgrade your existing work culture.
        </p>
      </div>
    </div>
  );
}

export default About;
