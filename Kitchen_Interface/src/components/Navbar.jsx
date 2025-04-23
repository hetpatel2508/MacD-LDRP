import React from "react";

export default function Navbar() {
  return (
    <div className="w-full h-[80px]  fixed top-0 bg-white z-10 flex items-center justify-center">
      <div className="w-[250px] h-[70px] flex justify-center items-center bg-black">
        <div className="w-full h-16 flex items-center px-8 bg-yellow-400  text-2xl font-bold">
          <div>🍔 McDonald's</div>
        </div>
      </div>
    </div>
  );
}
