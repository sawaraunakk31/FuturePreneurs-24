'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fixedPositions = [
  { top: '15%', left: '60%' },
  { top: '70%', left: '40%' },
  { top: '30%', left: '15%' },

  { top: '15%', left: '60%' },
  { top: '30%', left: '15%' },
  { top: '70%', left: '45%' },

  { top: '70%', left: '40%' },
  { top: '15%', left: '65%' },
  { top: '35%', left: '15%' },

  { top: '40%', left: '65%' },
  { top: '65%', left: '25%' },
  { top: '15%', left: '20%' },

  { top: '15%', left: '20%' },
  { top: '70%', left: '40%' },
  { top: '20%', left: '65%' },

  { top: '70%', left: '30%' },
  { top: '20%', left: '20%' },
  { top: '35%', left: '65%' },

  { top: '15%', left: '20%' },
  { top: '35%', left: '70%' },
  { top: '70%', left: '30%' }
];

const imageSets = [
  '/imgs/active/WhatsApp Image 2024-09-24 at 21.53.56.jpg',
  '/imgs/active/IMG_2119.jpg',
  '/imgs/active/new.jpg',
  '/imgs/active/IMG_2577.jpg',

  '/imgs/active/IMG_4066.jpg',
  '/imgs/active/IMG_6216.jpg',

  '/imgs/active/IMG_6245.jpg',
  '/imgs/active/new.jpg',
  '/imgs/active/new2.jpg',

  '/imgs/active/IMG_4066.jpg',
  '/imgs/active/IMG_2103.jpg',
  '/imgs/active/IMG_2119.jpg',

  '/imgs/active/IMG_2122.jpg',
  '/imgs/active/IMG_2133.jpg',
  '/imgs/active/IMG_2166.jpg',

  '/imgs/active/IMG_2577.jpg',
  '/imgs/active/IMG_2570.jpg',
  '/imgs/active/IMG_2258.jpg',

  '/imgs/active/WhatsApp Image 2024-09-24 at 21.53.56 (1).jpg',
  '/imgs/active/WhatsApp Image 2024-09-24 at 21.53.56.jpg',
  '/imgs/active/IMG_6245.jpg'
];

const LegacyComponent = () => {
  return (
    <div 
      className="flex items-center justify-center h-fit bg-white"
      id="gallery"
    >
      {/* Grid Container */}
      <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full max-w-4xl p-2">
        {/* Loop through the imageSets and place images around the center */}
        {imageSets.map((image, index) => (
          <div key={image} className={`w-full h-36 md:h-44 p-2`}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegacyComponent;


