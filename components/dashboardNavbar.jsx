'use client';
import React, { useState,useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import ecellLogo from '/assests/assests/ecell.jpg'; // Ensure the path is correct
import hamburgerIcon from '/assests/assests/Hamburger.jpg'; // Path to hamburger image
import closeIcon from '/assests/assests/close.jpg'; // Path to close image

const DashboardNavbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control mobile menu
  const heroSectionRef = useRef(null);
  const timelineRef = useRef(null);
  const galleryRef = useRef(null);
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
    if (status === "authenticated") {
      signOut(); // Log out if already authenticated
    } else {
      signIn("google"); // Log in if not authenticated
      router.push('/')
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle between open and close
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Ensure the menu closes
  };

  return (
    <div className="flex w-full h-[10vh] bg-white bg-opacity-85 fixed top-0 left-0 right-0 z-50 items-center px-10 justify-between">

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
      <div className="hidden md:flex items-center justify-center relative">
        {/* Box around navigation links */}
        <div className="absolute inset-0 w-full h-[7vh] bg-transparent border-[2px] border-gray-300 rounded-[25px] z-10"></div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 z-20 p-4">
          <Link href="/" onClick={closeMenu} scroll={false}>
            <div 
            ref={heroSectionRef}
            className="text-black text-sm md:text-base lg:text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer"
            onClick={()=>{
              const heroSection = document.querySelector('#heroSection');
              if (heroSection) {
                heroSection.scrollIntoView({ behavior:'smooth' });
              }
            }}
            >
              Home
            </div>
          </Link>
          <Link href="#timeline" onClick={closeMenu} scroll={false}>
            <div 
            ref={timelineRef}
            className="text-black text-sm md:text-base lg:text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer"
            onClick={()=>{
              const timeline = document.querySelector('#timeline');
              if (timeline) {
                timeline.scrollIntoView({ behavior:'smooth' });
              }
            }}
            >
              Timeline
            </div>
          </Link>
          <Link href="#gallery" onClick={closeMenu} scroll={false}>
            <div 
            ref={galleryRef}
            className="text-black text-sm md:text-base lg:text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer"
            onClick={()=>{
              const gallery = document.querySelector('#gallery');
              if (gallery) {
                gallery.scrollIntoView({ behavior:'smooth' });
              }
            }}
            >
              About
            </div>
          </Link>
          <Link href="#footer" onClick={closeMenu} scroll={false}>
            <div 
            ref={footerRef}
            className="text-black text-sm md:text-base lg:text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer"
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
          <Link href="/leaderDashboard" onClick={closeMenu}>
            <div className="text-black text-sm md:text-base lg:text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer">
              Dashboard
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu (only when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className="fixed top-16 right-0 w-3/5 py-2 bg-black bg-opacity-40 z-40 transition-transform transform duration-300 ease-in-out md:hidden border-gray-300 rounded-[25px] h-auto">
          <div className="flex flex-col items-center space-y-6 py-6">
            <Link href="/" onClick={closeMenu}>
              <div className="text-white text-xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer">
                Home
              </div>
            </Link>
            <Link href="#about" onClick={closeMenu}>
              <div className="text-white text-xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer">
                About
              </div>
            </Link>
            <Link href="#timeline" onClick={closeMenu}>
              <div className="text-white text-xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer">
                Timeline
              </div>
            </Link>
            <Link href="#contact" onClick={closeMenu}>
              <div className="text-white text-xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer">
                Contact Us
              </div>
            </Link>
            <Link href="/leaderDashboard" onClick={closeMenu}>
              <div className="text-white text-xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer">
                Dashboard
              </div>
            </Link>

            {/* Sign-in Button */}
            <button
              onClick={() => {
                closeMenu(); // Close the menu when signing in
                handleLoginClick();
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300 cursor-pointer text-xl"
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
