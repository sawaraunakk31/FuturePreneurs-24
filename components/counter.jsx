"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import grad from "@/assests/assests/Ellipse 44.png";

export default function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date(); // Difference between now and target date in milliseconds
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const formatNumber = (number) => String(number).padStart(2, '0');

  const fontStyle = {
    fontFamily: "'MyCustomFont', Trap-Black",
    background: 'white',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  return (
    <div className=" fixed bottom-0 right-0 w-[60rem] h-[25rem]">
      {/* Background image */}
      <Image src={grad} alt="Background Image" layout="fill" objectFit="cover" className="rounded-lg shadow-lg" />
      <div className="absolute bottom-44 right-56 text-xl font-bold text-white">
          Registration Closes In:
        </div>

      <div style={fontStyle} className="fixed bottom-0 right-72 text-8xl font-bold mb-7 mr-7 text-white bg-clip-text text-transparent ">
        <div className="flex flex-col items-center justify-center">
          {formatNumber(timeLeft.days)}:
          <span className="text-sm ">DAYS</span>
        </div>
      </div>
      <div style={fontStyle} className="fixed bottom-0 right-40 text-8xl font-bold mb-7 mr-7 text-white bg-clip-text text-transparent ">
        <div className="flex flex-col items-center justify-center">
          {formatNumber(timeLeft.hours)}:
          <span className="text-sm">HOURS</span>
        </div>
      </div>

      <div style={fontStyle} className="fixed bottom-0 right-10 text-8xl font-bold mb-7 mr-7 text-white 100 bg-clip-text text-transparent ">
        <div className="flex flex-col items-center justify-center">
          {formatNumber(timeLeft.minutes)}
          <span className="text-sm ">MINUTES</span>
        </div>
      </div>
      {Object.values(timeLeft).every((value) => value === 0)}
      </div>
  );
}