import React from "react";
import rip from "@/assests/assests/Vector 27.png";

export const Box = () => {
  return (
    <div className="w-[89px] h-[299px]">
      <img className="fixed w-[92px] h-[259px] top-10 left-10" alt="Vector" src={rip.src} />
    </div>
  );
};
