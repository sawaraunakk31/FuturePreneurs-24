'use client';

import React from 'react';
import Image from 'next/image';
import logoFP from '@/assests/assests/fp_logo_new.png';

export default function InfoSection() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] p-10 md:p-20 font-sans relative">
      <div className="flex-grow flex flex-col justify-center items-center text-center mb-8">
        <h2 className="text-xl md:text-4xl mb-2 text-gray-700">THE ULTIMATE</h2>
        <h1 className="text-3xl md:text-7xl font-bold mb-6 text-black">Business Simulation Game</h1>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto flex-grow">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <Image src={logoFP} alt="FuturePreneurs Logo" width={350} height={350} className="max-w-full h-auto" />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left md:pl-8">
          <p className="text-lg md:text-3xl mb-6 text-gray-700">
            Can you demonstrate a vision, which would allow you to navigate through the ebbing and flowing challenges of the event? Enroll in the crew, where discovery meets competition!
          </p>
          <p className="text-lg md:text-3xl text-gray-700">
            Entrepreneurship Cell, VIT proudly presents Futurepreneurs 10.0, a dynamic Business Simulation Event! Elevate your business acumen by staying tuned to consumer preferences and current trends.
          </p>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="marquee-container overflow-hidden bg-white absolute bottom-0 left-0 w-full">
        <div className="marquee text-black text-lg md:text-2xl font-bold py-4">
          <div className="marquee-content">
            {/* Duplicating enough to ensure no gap */}
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
            <span>FUTUREPRENEURS 10.0 • WE BREED BUSINESS •</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          height: 80px; 
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .marquee {
          display: flex;
          white-space: nowrap;
        }
        .marquee-content {
          display: flex;
          animation: marquee 75s linear infinite;
        }
        .marquee-content span {
          padding-right: 50px;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
