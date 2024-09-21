'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fixedPositions = [
  { top: '15%', left: '25%' },
  { top: '65%', left: '15%' },
  { top: '55%', left: '65%' },
  { top: '15%', left: '60%' },
  { top: '35%', left: '15%' },
  { top: '65%', left: '45%' },
  { top: '70%', left: '40%' },
  { top: '15%', left: '75%' },
  { top: '35%', left: '15%' },
];

const imageSets = [
  ['/imgs/active/img1.jpg', '/imgs/active/img2.jpg', '/imgs/active/img3.jpg'],
  ['/imgs/active/img4.jpg', '/imgs/active/img5.jpeg', '/imgs/active/img6.jpeg'],
  ['/imgs/active/img7.jpeg', '/imgs/active/img8.jpeg', '/imgs/active/img9.jpeg'],
];

const LegacyComponent = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSet, setActiveSet] = useState(0);

  useEffect(() => {
    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 1000);

    const interval = setInterval(() => {
      setActiveSet((prevSet) => (prevSet + 1) % imageSets.length);
    }, 3000); // Change set every 3 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(introTimer);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            className="absolute inset-0 flex flex-col items-center justify-center bg-white z-30"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-serif text-black text-9xl">10 Years</div>
            <div className="flex items-center my-4">
              <hr className="border-t border-black w-32" />
              <span className="mx-4 font-sans text-black text-4xl">Of</span>
              <hr className="border-t border-black w-32" />
            </div>
            <div className="font-mono text-black text-9xl">FuturePreneurs</div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showIntro && (
        <>
          <motion.h1
            key="heading"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center justify-center z-10"
          >
            <div className="font-serif text-black text-4xl">10 Years</div>
            <div className="flex items-center my-4">
              <hr className="border-t border-black w-32" />
              <span className="mx-4 font-sans text-black text-2xl">Of</span>
              <hr className="border-t border-black w-32" />
            </div>
            <div className="font-mono text-black text-4xl">FuturePreneurs</div>
          </motion.h1>

          <AnimatePresence>
            {imageSets[activeSet].map((image, index) => {
              const positionIndex = activeSet * 3 + index;
              return (
                <motion.div
                  key={image}
                  className="absolute w-[300px] h-[200px] overflow-hidden rounded-lg will-change-transform"
                  style={{
                    top: fixedPositions[positionIndex]?.top,
                    left: fixedPositions[positionIndex]?.left,
                  }}
                  initial={{ opacity: 0, scale: 0.75 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.75 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                >
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default LegacyComponent;