'use client';
import React, { useEffect } from 'react';

const Logo = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @font-face {
        font-family: 'TrapBlack';
        src: url('/fonts/Trap-Black.otf') format('opentype');
        font-weight: 800; /* Adjust weight as needed */
        font-style: normal;
      }
      body {
        overflow: hidden; /* Disable scrolling */
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex flex-wrap flex-direction-row items-center justify-center space-x-[0.75rem] min-h-screen">
      <div className="text-left text-black">
        <h1 className="text-[8.125rem] font-bold leading-none" 
        style={{ fontFamily: 'TrapBlack', fontWeight: '800' }}>
          FUTURE
        </h1>
        <h1 className="text-[8.125rem] font-bold leading-none mt-[-1.875rem] mb-[6.25rem] mr-[7.5rem]" 
        style={{ fontFamily: 'TrapBlack', fontWeight: '800' }}>
          PRENEURS
        </h1>
      </div>

      <div className="relative flex items-center text-black mb-[5rem]"> 
        <h1 className="ml-[1.25rem] text-[17.5rem] font-bold leading-none relative" 
        style={{ fontFamily: 'TrapBlack', fontWeight: '800' }}>
          X
        </h1>
        <div className="absolute -top-[1rem] left-[11.25rem] bottom-[5rem] mt-[2.1875rem] text-[0.75rem] font-bold text-white z-1" 
        style={{ fontFamily: 'TrapBlack', fontWeight: '800' }}>
          <span>th</span>
        </div>
        <span className="text-[2rem] sm-text-[1rem] font-semibold tracking-widest transform -rotate-90 mb-[4.0625rem] ml-[-5.625rem]" 
        style={{ fontFamily: 'TrapBlack', fontWeight: '800', letterSpacing: '0.75rem' }}>
          EDITION
        </span>
      </div>
    </div>
  );
};

export default Logo;