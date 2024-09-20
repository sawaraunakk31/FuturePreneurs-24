'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import grad from "@/assests/assests/Ellipse 44.png";
import '../app/globals.css';

export default function CountdownTimer({ targetDate }) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
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

  const LoadFont = () => (
    <style>
      {`
        @font-face {
          font-family: ${"GothamBlack"};
          src: url(${"../public/fonts/Gotham-Black.ttf"}) format(${"truetype"});
          font-weight: bold;
          font-style: normal;
        }
      `}
    </style>
  );

  return (
    <div className="fixed bottom-0 right-0 w-[50%] h-[40%]">
      <LoadFont />

      {/* Background image with blur effect and gradient */}
      <div className="relative w-full h-full">
        <Image
          src={grad}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-lg"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0.5) 100%, rgba(255, 255, 255, 1) 100%)",
          }}
        />
      </div>

      {/* Registration text */}
      <div className="absolute bottom-[50%] right-[30%] text-xl font-bold text-transparent text-white ">
        Registration Closes In:
      </div>

      {/* Flex container for counter */}
      <div className="flex absolute bottom-0 right-5 space-x-1 mb-5 mr-7">

        {/* Days Section */}
        <div className="flex flex-col items-center">
          <div
            style={{
              fontFamily: "'GothamBlack', sans-serif",
              background:
                "linear-gradient(102deg, #E1ECF8 5.98%, rgba(255, 255, 255, 0.70) 34.07%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-8xl font-bold text-white bg-clip-text text-transparent"
          >
            {formatNumber(timeLeft.days)}:
          </div>
          <span className="text-sm text-white ">DAYS</span>
        </div>

        {/* Hours Section */}
        <div className="flex flex-col items-center">
          <div
            style={{
              fontFamily: "'GothamBlack', sans-serif",
              background:
                "linear-gradient(75deg, rgba(255, 255, 255, 0.70) 40.83%, #D48CFB 97.96%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-8xl font-bold text-white bg-clip-text text-transparent "
          >
            {formatNumber(timeLeft.hours)}
          </div>
          <span className="text-sm text-white ">HOURS</span>
        </div>

        {/* Minutes Section */}
        <div className="flex flex-col items-center">
          <div
            style={{
              fontFamily: "'GothamBlack', sans-serif",
              background:
                "linear-gradient(81deg, rgba(255, 255, 255, 0.70) 69.39%, #F2CEFE 95.46%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            className="text-8xl font-bold text-white bg-clip-text text-transparent "
          >
            :{formatNumber(timeLeft.minutes)}
          </div>
          <span className="text-sm text-white ">MINUTES</span>
        </div>
      </div>
    </div>
  );
}
