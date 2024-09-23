"use client";
import { useEffect } from "react";

export default function Logo2() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @font-face {
        font-family: 'TrapBlack';
        src: url('/fonts/Trap-Black.otf') format('opentype');
        font-weight: 800;
        font-style: normal;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <div className="flex flex-row w-full justify-evenly items-center">
        <div
          className="flex flex-col justify-center text-4xl md:text-8xl"
          style={{
            fontFamily: "TrapBlack",
            fontWeight: "800",
            lineHeight: "1",
          }}
        >
          <div>FUTURE</div>
          <div>PRENEURS</div>
        </div>
        <div className=" flex flex-row">
          <div
            style={{ fontFamily: "TrapBlack", fontWeight: "800" }}
            className="relative flex flex-row justify-center"
          >
            {/* Relative container for X and TH */}
            <div className="text-8xl md:text-[15rem] leading-none relative">
              X{/* "TH" positioned on top-right inside "X" */}
              <span
                className="
                absolute top-0 right-0 
                text-white 
                text-[0.5rem] md:text-sm
                transform -translate-x-[150%] translate-y-[85%] 
                md:-translate-x-[250%] md:translate-y-[75%]"
              >
                th
              </span>
            </div>
          </div>

          <span
            className="text-[1rem] md:text-[1.5rem] font-semibold transform "
            style={{
              fontFamily: "TrapBlack",
              fontWeight: "800",
              letterSpacing: "0.75rem",
            //   display: "inline-block", // Ensures the span takes only the size of the content
            }}
          >
            EDITION
          </span>
        </div>
      </div>
    </main>
  );
}
