"use client";
import React, { useState, useEffect } from "react";

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
      timeLeft = { days: 0, hours: 0, minutes: 0};
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000); // Update every second

    return () => clearInterval(timer); // Clean up the interval on unmount
  }, [targetDate]);

  return (
    <div className="absolute w-[643px] h-[109px] top-[75px] left-[100px] bg-gradient-to-r from-white to-purple-300 flex items-center justify-center rounded-lg shadow-lg">
      <div className="text-3xl font-bold text-gray-800">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
      </div>
      {Object.values(timeLeft).every((value) => value === 0)}
    </div>
  );
}
