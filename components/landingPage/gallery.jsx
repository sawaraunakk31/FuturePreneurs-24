'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fixedPositions = [
  { top: '15%', left: '25%' },
  { top: '65%', left: '15%' },
  { top: '55%', left: '65%' },
  { top: '15%', left: '60%' },
  { top: '35%', left: '15%' },
  { top: '65%', left: '45%' },
  { top: '70%', left: '40%' },
  { top: '15%', left: '55%' },
  { top: '35%', left: '15%' },
];

const imageSets = [
  ['/imgs/active/img1.jpg', '/imgs/active/img2.jpg', '/imgs/active/img3.jpg'],
  ['/imgs/active/img4.jpg', '/imgs/active/img5.jpeg', '/imgs/active/img6.jpeg'],
  ['/imgs/active/img7.jpeg', '/imgs/active/img8.jpeg', '/imgs/active/img9.jpeg'],
];

const LegacyComponent = () => {
  const [activeSet, setActiveSet] = useState(0);
  const [scale, setScale] = useState(1);
  const [overlayImage, setOverlayImage] = useState('/imgs/10-Years-Of-FP.png');
  const componentRef = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      if (componentRef.current && componentRef.current.contains(event.target)) {
        const deltaY = event.deltaY;
        setScale((prevScale) => {
          const newScale = prevScale - Math.abs(deltaY) * 0.02;
          if (newScale <= 0.25) {
            setOverlayImage('/imgs/10_Years_Of_FP.png');
          }
          return Math.max(Math.min(newScale, 1), 0.25);
        });
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    const interval = setInterval(() => {
      setActiveSet((prevSet) => (prevSet + 1) % imageSets.length);
    }, 3000);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      className="relative flex flex-col items-center justify-center h-screen bg-gray-100  overflow-hidden" 
      id='gallery'
      ref={componentRef}
    >
      <motion.div
        className="absolute inset-0 z-10"
        style={{ scale }}
        initial={{ scale: 1 }}
        animate={{ scale }}
        transition={{ ease: 'easeInOut' }}
      >
        <img
          src={overlayImage}
          alt="Overlay"
          className="w-full h-full object-contain"
        />
      </motion.div>

      <AnimatePresence>
        {imageSets[activeSet].map((image, index) => {
          const positionIndex = activeSet * 3 + index;
          return (
            <motion.div
              key={image}
              className="absolute w-[130px] h-[100px] md:w-[300px] md:h-[200px] overflow-hidden rounded-lg will-change-transform"
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
    </div>
  );
};

export default LegacyComponent;
