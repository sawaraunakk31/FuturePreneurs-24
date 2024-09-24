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
  { top: '15%', left: '65%' },
  { top: '35%', left: '15%' },
  { top: '50%', left: '30%' },
  { top: '80%', left: '20%' },
  { top: '45%', left: '70%' },
  { top: '15%', left: '10%' },
  { top: '55%', left: '20%' },
  { top: '30%', left: '65%' },
  { top: '65%', left: '25%' },
  { top: '10%', left: '10%' },
  { top: '35%', left: '65%' },
  { top: '20%', left: '20%' },
  { top: '40%', left: '60%' },
  { top: '65%', left: '25%' }
];

const imageSets = [
  '/imgs/active/IMG_2112.jpg',
  '/imgs/active/IMG_2171.jpg',
  '/imgs/active/IMG_2577.jpg',
  '/imgs/active/IMG_4066.jpg',
  '/imgs/active/IMG_6157.jpg',
  '/imgs/active/IMG_6216.jpg',
  '/imgs/active/IMG_6245.jpg',
  '/imgs/active/new.jpg',
  '/imgs/active/new2.jpg',
  '/imgs/active/IMG_2084(1).jpg',
  '/imgs/active/IMG_2103.jpg',
  '/imgs/active/IMG_2119.jpg',
  '/imgs/active/IMG_2122.jpg',
  '/imgs/active/IMG_2133.jpg',
  '/imgs/active/IMG_2166.jpg',
  '/imgs/active/IMG_2507.jpg',
  '/imgs/active/IMG_2570.jpg',
  '/imgs/active/IMG_2258.jpg',
  '/imgs/active/WhatsApp Image 2024-09-24 at 21.53.56 (1).jpg',
  '/imgs/active/WhatsApp Image 2024-09-24 at 21.53.56.jpg',
  '/imgs/active/IMG_6245.jpg'
];

const LegacyComponent = () => {
  const [activeSet, setActiveSet] = useState(0); // Tracks which set of 3 images is active
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
      setActiveSet((prevSet) => (prevSet + 1) % 7); // 7 sets of 3 images (21 images total)
    }, 3000);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const getCurrentImages = () => {
    const startIndex = activeSet * 3;
    return imageSets.slice(startIndex, startIndex + 3); // Get the current set of 3 images
  };

  return (
    <div 
      className="relative flex flex-col items-center justify-center h-screen bg-white overflow-hidden z-1" 
      id='gallery'
      ref={componentRef}
    >
      <motion.div
        className="absolute inset-0 z-2"
        style={{ scale }}
        initial={{ scale: 1 }}
        animate={{ scale }}
        transition={{ ease: 'easeInOut' }}
      >
        <img
          src={overlayImage}
          alt="Overlay"
          className="w-full h-full object-contain z-1"
        />
      </motion.div>

      <AnimatePresence>
        {getCurrentImages().map((image, index) => {
          const positionIndex = activeSet * 3 + index; // Calculate the position for each image in the current set
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
