'use client';
import React from 'react';
import Image from 'next/image';
import Navbar from '/components/Navbar'; // Ensure this import path is correct
import RegisterButton from '@/components/registerButton';
import CountdownTimer from '@/components/counter';
import Header from '/components/Header/Header';
import vid_bg from '/assests/assests/vid_bg.mp4';
import HeroSection from './heroSection';
import noiseTexture from '/assests/assests/noiseTexture.png';
const VideoBackground = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover mix-blend-lighten blur-3xl"
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