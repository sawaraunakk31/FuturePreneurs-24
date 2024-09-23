'use client';
import React from 'react';
import vid_bg from '@/assests/assests/vid_bg.mp4';
import HeroSection from './heroSection';
const VideoBackground = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden" id='heroSection'>
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover mix-blend-lighten blur-2xl opacity-50"
        >
            <source src={vid_bg} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        {/* Content overlay */}
        <div className="relative z-10 flex items-center justify-center h-full">
            <HeroSection />
        </div>
    </div>
    );
};

export default VideoBackground;