'use client';
import React, { useState,useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import ecellLogo from '/assests/assests/ecell.jpg'; // Ensure the path is correct
import hamburgerIcon from '/assests/assests/Hamburger.jpg'; // Path to hamburger image
import closeIcon from '/assests/assests/close.jpg'; // Path to close image
import LoadingScreen from './LoadingScreen';

const DashboardNavbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control mobile menu
  const [loading,setLoading] = useState(false)
  const heroSectionRef = useRef(null);
  const timelineRef = useRef(null);
  const storyBehindRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const currentUrl = window.location.href;

    if (currentUrl.endsWith('/#timeline') && timelineRef.current) {
      timelineRef.current.click();
    } else if (currentUrl.endsWith('/#gallery') && galleryRef.current) {
      galleryRef.current.click();
    } else if (currentUrl.endsWith('/#footer') && footerRef.current) {
      footerRef.current.click();
    } else {
      heroSectionRef.current.scrollIntoView({ behavior:'smooth' }); // Scroll to hero section on page load
    }
  }, []);

  const handleLoginClick = () => {
    setLoading(true)
    if (status === "authenticated") {
      signOut(); // Log out if already authenticated
      // router.push('/')
      setLoading(false)
    } else {
      signIn("google"); // Log in if not authenticated
      setLoading(false)
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle between open and close
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Ensure the menu closes
  };

  return (
    <div className="flex w-full h-[10vh] bg-white fixed top-0 left-0 right-0 z-50 items-center px-10 justify-between bg-opacity-0">

      {loading && <LoadingScreen/>}
      {/* ECELL Logo */}
      <div className="flex items-center">
        <Image
          src={ecellLogo}
          alt="ECELL Logo"
          width={100}
          height={50}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
      </div>

      {/* Hamburger icon for mobile view */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          <Image
            src={isMenuOpen ? closeIcon : hamburgerIcon} // Switch between icons
            alt="Menu Icon"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </button>
      </div>

      {/* Navigation Links for desktop */}
      <div className="hidden md:flex relative items-center justify-center">
        {/* Box around navigation links */}
        <div className="relative align-middle w-[60vw] max-w-[600px] h-[7vh] bg-transparent border-[3px] border-gray-300 rounded-[25px] opacity-100 z-10 bg-white">

          {/* Navigation Links */}
          <div className="flex items-center align-middle justify-center h-full">
            <Link href="/" scroll={false}>
              <div 
                ref={heroSectionRef}
                className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer px-[1vw] md:px-[2vw]"
                onClick={() => {
                  const heroSection = document.querySelector('#heroSection');
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Home
              </div>
            </Link>
            <Link href="/#timeline" scroll={false}>
              <div
                ref={timelineRef}
                className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer px-[1vw] md:px-[2vw]"
                onClick={() => {
                  const timeline = document.querySelector('#timeline');
                  if (timeline) {
                    timeline.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Timeline
              </div>
            </Link>
            <Link href="/#storyBehind" scroll={false}>
              <div
                ref={storyBehindRef}
                className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer px-[1vw] md:px-[2vw]"
                onClick={() => {
                  const storyBehind = document.querySelector('#storyBehind');
                  if (storyBehind) {
                    storyBehind.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                About
              </div>
            </Link>
            <Link href="/#footer" scroll={false}>
              <div
                ref={footerRef}
                className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer px-[1vw] md:px-[2vw]"
                onClick={() => {
                  const footer = document.querySelector('#footer');
                  if (footer) {
                    footer.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact Us
              </div>
            </Link>
            
            <Link href="/leaderDashboard">
              <div
                className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer px-[1vw] md:px-[2vw]"
              >
                Dashboard
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu (only when isMenuOpen is true) */}
      {isMenuOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-85 backdrop-blur-sm transition-transform transform duration-300 ease-in-out md:hidden h-full w-full z-[9999]">
    <div className="flex flex-col items-center space-y-10 py-12 pt-16 h-full justify-center relative">

      {/* Close Button */}
      <button
        onClick={closeMenu}
        className="text-white text-3xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer"
      >
        &times;
      </button>

      {/* Navigation Links for mobile */}
      <Link href="/" onClick={closeMenu} scroll={false}>
        <div
          ref={heroSectionRef}
          className="text-white text-2xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer"
          onClick={() => {
            closeMenu();
            const heroSection = document.querySelector('#heroSection');
            if (heroSection) {
              heroSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Home
        </div>
      </Link>
      <Link href="#timeline" onClick={closeMenu} scroll={false}>
        <div
          ref={timelineRef}
          className="text-white text-2xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer"
          onClick={() => {
            closeMenu();
            const timeline = document.querySelector('#timeline');
            if (timeline) {
              timeline.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Timeline
        </div>
      </Link>
      <Link href="#about" onClick={closeMenu} scroll={false}>
        <div
          ref={storyBehindRef}
          className="text-white text-2xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer"
          onClick={() => {
            closeMenu();
            const storyBehind = document.querySelector('#storyBehind');
            if (storyBehind) {
              storyBehind.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          About
        </div>
      </Link>
      <Link href="#footer" onClick={closeMenu} scroll={false}>
        <div
          ref={footerRef}
          className="text-white text-2xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer"
          onClick={() => {
            closeMenu();
            const footer = document.querySelector('#footer');
            if (footer) {
              footer.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Contact Us
        </div>
      </Link>
      
      <Link href="/leaderDashboard" onClick={closeMenu}>
        <div
          className="text-white text-2xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer"
          onClick={() => {
            closeMenu();
          }}
        >
          Dashboard
        </div>
      </Link>

      {/* Sign-in Button */}
      <button
        onClick={() => {
          closeMenu();
          handleLoginClick();
        }}
        className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300 cursor-pointer text-2xl"
      >
        {status === "authenticated" ? "Logout" : "Login"}
      </button>
    </div>
  </div>
)}

      {/* Login Button for desktop */}
      <div className="hidden md:block">
        <button
          onClick={handleLoginClick}
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-blue-500 transition duration-300 cursor-pointer"
        >
          {status === "authenticated" ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;