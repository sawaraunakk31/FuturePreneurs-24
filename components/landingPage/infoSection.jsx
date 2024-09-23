'use client'

import React from 'react'
import Image from 'next/image'
import logoFP from '@/assests/assests/fp_logo_new.png'

export default function InfoSection() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] p-5 font-sans relative">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl mb-2 text-gray-700">THE ULTIMATE</h2>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Business Simulation Game</h1>
      </div>
      
      <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <Image src={logoFP} alt="FuturePreneurs Logo" width={300} height={300} className="max-w-full h-20px" />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left md:pl-8">
          <p className="text-lg md:text-xl mb-4 text-gray-700">
            Can you demonstrate a vision, which would allow you to navigate through the ebbing and flowing challenges of the event? Enroll in the crew, where discovery meets competition!
          </p>
          <p className="text-lg md:text-xl text-gray-700">
            Entrepreneurship Cell, VIT proudly presents Futurepreneurs 10.0, a dynamic Business Simulation Event! Elevate your business acumen by staying tuned to consumer preferences and current trends.
          </p>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="marquee-container overflow-hidden bg-white bg-opacity-80">
        <div className="marquee text-black text-lg">
          <div className="marquee-content">
            FUTUREPRENEURS 10.0 • WE BREED BUSINESS • FUTUREPRENEURS 10.0 • WE BREED BUSINESS •
          </div>
          <div className="marquee-content">
            FUTUREPRENEURS 10.0 • WE BREED BUSINESS • FUTUREPRENEURS 10.0 • WE BREED BUSINESS •
          </div>
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          position: absolute; /* Change to absolute positioning */
          bottom: -20px; /* Adjust this value to move the marquee down relative to the content */
          left: 0; /* Align to left */
          width: 100%; /* Full width */
          height: 50px; /* Adjust height as needed */
        }
        .marquee {
          display: flex; /* Use flex to align items horizontally */
          white-space: nowrap;
          animation: marquee 15s linear infinite; /* Adjust speed */
        }
        .marquee-content {
          padding-right: 50px; /* Space between duplicated content */
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0); /* Start position */
          }
          100% {
            transform: translateX(-50%); /* End position */
          }
        }
      `}</style>
    </div>
  )
}
