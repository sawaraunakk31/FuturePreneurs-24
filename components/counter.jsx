'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import grad from "@/assests/assests/Ellipse 44.png";
/*import grad from "@/assests/assests/timerbg.svg";*/
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
    <div >
      <LoadFont />

      <div className="bottom-0 right-0 absolute w-[80%] h-[50%] sm:w-[60%] sm:h-[40%] md:w-[50%] md:h-[35%] lg:w-[50%] lg:h-[50%]">
        <Image
          src={grad}
          alt="Background Image"
          layout="fill"
          className="absolute inset-0 rounded-lg blur-lg"
        />
      </div>

      <div className="absolute bottom-0 right-0 lg:mr-7 lg:mb-7 md:mr-5 md:mb-5 sm:mr-6 sm:mb-6 flex flex-col text-bold space-y-2">
        <div className="text-md font-bold pr-2 text-white sm:text-sm md:text-xl">
          Registration Closes In:
        </div>

        <div className="flex space-x-1">

          <div className="flex flex-col items-center">
            <div
              style={{
                fontFamily: "'GothamBlack', sans-serif",
                background: "linear-gradient(102deg, #E1ECF8 5.98%, rgba(255, 255, 255, 0.70) 34.07%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-4xl font-bold text-white bg-clip-text text-transparent sm:text-6xl md:text-8xl"
            >
              {formatNumber(timeLeft.days)}:
            </div>
            <span className="text-sm text-white sm:text-xs md:text-lg">DAYS</span>
          </div>

          <div className="flex flex-col items-center">
            <div
              style={{
                fontFamily: "'GothamBlack', sans-serif",
                background: "linear-gradient(75deg, rgba(255, 255, 255, 0.70) 40.83%, #D48CFB 97.96%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-4xl font-bold text-white bg-clip-text text-transparent sm:text-6xl md:text-8xl"
            >
              {formatNumber(timeLeft.hours)}
            </div>
            <span className="text-xs text-white sm:text-xs md:text-lg">HOURS</span>
          </div>

          <div className="flex flex-col items-center">
            <div
              style={{
                fontFamily: "'GothamBlack', sans-serif",
                background: "linear-gradient(81deg, rgba(255, 255, 255, 0.70) 69.39%, #F2CEFE 95.46%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="text-4xl font-bold text-white bg-clip-text text-transparent sm:text-6xl md:text-8xl"
            >
              :{formatNumber(timeLeft.minutes)}
            </div>
            <span className="text-xs text-white sm:text-xs md:text-lg">MINUTES</span>
          </div>
        </div>
      </div>

    </div>
  );
}
