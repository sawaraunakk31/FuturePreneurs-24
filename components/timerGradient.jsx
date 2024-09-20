import React from "react";

function TimerGradient() {
  return (
    <div className="box relative">
      <div
        className="ellipse fixed bottom-[-5rem] right-[10rem] w-[32rem] h-[18rem] transform rotate-[-11deg] flex-shrink-0 blur-[6.25rem]"
        style={{
          background:
            "linear-gradient(239deg, #E383FF 26.1%, #71B2E1 64.23%, #00E0C2 87.65%)",
        }}
      />
    </div>
  );
}

export default TimerGradient;
