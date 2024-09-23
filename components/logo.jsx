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
    <main className="flex ">
      <div className="md:flex  w-full  md:justify-between items-center ml-12 md:flex-row">
        <div
          className="flex flex-col  md:justify-center 7xl pn:text-7xl sm:text-9xl"
          style={{
            fontFamily: "TrapBlack",
            fontWeight: "800",
            lineHeight: "1",
          }}
        >
          <div>FUTURE</div>
          <div>PRENEURS</div>
        </div>
        <div className=" flex flex-row md:justify-around items-center">
          <div
            style={{ fontFamily: "TrapBlack", fontWeight: "800" }}
            className="relative flex flex-row md:justify-center"
          >
            {/* Relative container for X and TH */}
            <div className="text-[20rem] leading-none relative items-center align-middle mt-6">
              X{/* "TH" positioned on top-right inside "X" */}
              <span
                className="
                absolute top-0 right-0 
                text-white 
                text-sm
                transform -translate-x-[150%] translate-y-[85%] 
                md:-translate-x-[250%] md:translate-y-[75%]"
              >
                th
              </span>
            </div>
          </div>

          <div
            className="text-[rem] md:text-10rem] font-semibold flex flex-wrap transform -rotate-90 -ml-16 -mt-14"   
            style={{
              fontFamily: "TrapBlack",
              fontWeight: "800",
              letterSpacing: "1.2rem",
        
              display: "inline-block", // Ensures the span takes only the size of the content
            }}
          >
            EDITION
          </div>
        </div>
      </div>
    </main>
  );
}
