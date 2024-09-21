'use client';
import React, { useEffect } from 'react';
import Navbar from './navbar';

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
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="flex flex-row items-center justify-center space-x-[0.75rem] py-[23%]">
      <div className="text-left text-black">
        <Navbar/>
        {/* FUTURE Text */}
        <h1 className="text-5 
          text-[2rem]       /* Small */
          sm:text-[4rem]    /* Medium */
          md:text-[6rem]    /* Large */
          lg:text-[8.125rem] /* Extra Large */
          font-bold leading-none mt-[-1.875rem] mb-[3rem] mr-[2rem]" 
          style={{ fontFamily: 'TrapBlack', fontWeight: '800' }}>
          FUTURE
        </h1>
        {/* PRENEURS Text */}
        <h1 className="text-5 
          text-[2rem]       /* Small */
          sm:text-[4rem]    /* Medium */
          md:text-[6rem]    /* Large */
          lg:text-[8.125rem] /* Extra Large */
          font-bold leading-none mt-[-1.875rem] mb-[3rem] mr-[2rem]" 
          style={{ fontFamily: 'TrapBlack', fontWeight: '800' }}>
          PRENEURS
        </h1>
      </div>

      {/* Xth Edition Section */}
      <div className="flex items-center text-black mb-[5rem]"> 
        {/* X Text */}
        <h1 className="ml-[1.25rem] 
          text-[5rem]        /* Small */
          sm:text-[7rem]     /* Medium */
          md:text-[10rem]    /* Large */
          lg:text-[17.5rem]  /* Extra Large */
          font-bold leading-none relative" 
          style={{ fontFamily: 'TrapBlack', fontWeight: '800' }}>
          X
        </h1>
        {/* "th" Superscript */}
        <div className="absolute -top-[1rem] 
          left-[4rem] sm:left-[6rem] md:left-[8rem] lg:left-[11.25rem] 
          bottom-[5rem] mt-[2.1875rem] text-[0.75rem] font-bold text-white z-1" 
          style={{ fontFamily: 'TrapBlack', fontWeight: '800' }}>
          <span>th</span>
        </div>
        {/* EDITION Text */}
        <span className="
          text-[1rem]        /* Small */
          sm:text-[1.5rem]   /* Medium */
          md:text-[2rem]     /* Large */
          lg:text-[2rem]     /* Extra Large */
          font-semibold tracking-widest transform -rotate-90 mb-[4.0625rem] ml-[-2rem] md:ml-[-3rem] lg:ml-[-5.625rem]" 
          style={{ fontFamily: 'TrapBlack', fontWeight: '800', letterSpacing: '0.75rem' }}>
          EDITION
        </span>
      </div>
    </div>
  );
};

export default Logo;