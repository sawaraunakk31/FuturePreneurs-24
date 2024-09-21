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
    <div className="bottom-0 right-0 w-[50%] h-[40%] sm:w-[90%] sm:h-[30%] md:w-[70%] md:h-[35%]">
      <LoadFont />

      {/* Background image with blur effect and gradient */}
      <div className="bottom-0 right-0 absolute w-[50%] h-[50%]">
        <Image
          src={grad}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 rounded-lg"
          style={{
            filter: "blur(2rem)",
          }}
        />
        {/* <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, rgba(255, 255, 255, 0) 100%, rgba(255, 255, 255, 0.5) 100%, rgba(255, 255, 255, 1) 100%)",
          }}
        /> */}
      </div>

      {/* Registration text and timer container */}
      <div className="absolute bottom-0 right-0 mr-9 mb-7 flex flex-col items-center space-y-4">
        {/* Registration Text */}
        <div className="text-xl font-bold text-white sm:text-lg md:text-xl">
          Registration Closes In:
        </div>

        {/* Timer */}
        <div className="flex space-x-1">

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
              className="text-8xl font-bold text-white bg-clip-text text-transparent sm:text-4xl md:text-6xl"
            >
              {formatNumber(timeLeft.days)}:
            </div>
            <span className="text-sm text-white sm:text-xs md:text-sm">DAYS</span>
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
              className="text-8xl font-bold text-white bg-clip-text text-transparent sm:text-4xl md:text-6xl"
            >
              {formatNumber(timeLeft.hours)}
            </div>
            <span className="text-sm text-white sm:text-xs md:text-sm">HOURS</span>
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
              className="text-8xl font-bold text-white bg-clip-text text-transparent sm:text-4xl md:text-6xl"
            >
              :{formatNumber(timeLeft.minutes)}
            </div>
            <span className="text-sm text-white sm:text-xs md:text-sm">MINUTES</span>
          </div>
        </div>
      </div>
    </div>
  );
}