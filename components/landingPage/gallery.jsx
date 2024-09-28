'use client';

import React from 'react';

const imageSets = [
  '/imgs/active/WhatsApp Image 2024-09-24 at 21.53.56.jpg',
  '/imgs/active/IMG_2119.jpg',
  '/imgs/active/new.jpg',
  '/imgs/active/IMG_2577.jpg',
  '/imgs/10-Years-Of-FP.png',
  '/imgs/active/IMG_4066.jpg',
  '/imgs/active/IMG_6216.jpg',
  '/imgs/active/IMG_6245.jpg',
  '/imgs/active/IMG_6157.jpg'
];

const LegacyComponent = () => {
  return (
    <div 
      className="flex items-center justify-center pb-12 h-fit bg-white"
      id="gallery"
    >
      {/* Grid Container */}
      <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full max-w-4xl mb-12">
        {/* Loop through the imageSets and place images around the center */}
        {imageSets.map((image, index) => (
          <div key={image} className={`w-full h-36 md:h-44 p-3`}>
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