import React from "react";

function Intro() {
  return (
    <div className="flex flex-col items-start sm:items-center justify-center text-white">
      <p className="gradient-text text-7xl p-2 mb-2 ">Hi Iam Luna</p>
      <p className="gradient-text text-5xl p-2 mb-2">How can I help you?</p>
      <div className="flex flex-row flex-wrap sm:gap-4 my-4 mx-2">
        <div className="p-2 w-40 h-40 my-1  bg-zinc-800 text-wrap rounded-xl cursor-pointer hover:bg-zinc-700">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi harum
            blanditiis libero?
          </p>
        </div>
        <div className="p-2 w-40 h-40 my-1 ml-2 bg-zinc-800 text-wrap rounded-xl cursor-pointer hover:bg-zinc-700">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi harum
            blanditiis libero?
          </p>
        </div>
        <div className="p-2 w-40 h-40 my-1  bg-zinc-800 text-wrap rounded-xl cursor-pointer hover:bg-zinc-700">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi harum
            blanditiis libero?
          </p>
        </div>
      </div>
    </div>
  );
}

export default Intro;
