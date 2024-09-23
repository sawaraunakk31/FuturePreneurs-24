'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import ecellLogo from '/assests/assests/ecell.jpg'; // Ensure the path is correct
import hamburgerIcon from '/assests/assests/Hamburger.jpg'; // Path to hamburger image
import closeIcon from '/assests/assests/close.jpg'; // Path to close image

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control mobile menu

  const handleLoginClick = () => {
    if (status === "authenticated") {
      signIn('google'); // Redirect to dashboard if logged in
    } else {
      signOut(); // Redirect to login if not logged in
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu open/close
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Close the menu
  };

  return (
    <div className="flex w-full h-[10vh] bg-white bg-opacity-85 fixed top-0 left-0 right-0 z-50  items-center px-10 justify-between">

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
          {!isMenuOpen ? (
            // Hamburger icon when the menu is closed
            <Image
              src={hamburgerIcon}
              alt="Hamburger Icon"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          ) : (
            // Close icon when the menu is open
            <Image
              src={closeIcon}
              alt="Close Icon"
              width={40}
              height={40}
              className="cursor-pointer"
              onClick={closeMenu} // Ensure close button closes the menu
            />
          )}
        </button>
      </div>

      {/* Navigation Links for desktop */}
      <div className="hidden md:flex relative items-center justify-center">
        {/* Box around navigation links */}
        <div className="relative align-middle w-[60vw] lg:w-[70vw] h-[7vh] bg-transparent border-[3px] border-gray-300 rounded-[25px] opacity-100 z-10">
          {/* Navigation Links */}
          <div className="flex items-center align-middle justify-center h-full">
            <Link href="/">
              <div className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer px-[1vw] md:px-[2vw] lg:px-[3vw]">
                Home
              </div>
            </Link>
            <Link href="#timeline">
              <div className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer px-[1vw] md:px-[2vw] lg:px-[3vw]">
                Timeline
              </div>
            </Link>
            <Link href="#about">
              <div className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer px-[1vw] md:px-[2vw] lg:px-[3vw]">
                About
              </div>
            </Link>
            <Link href="#contact">
              <div className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer px-[1vw] md:px-[2vw] lg:px-[3vw]">
                Contact Us
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu (only when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className="fixed top-16 right-0 h-1/2 w-3/5 py-2 bg-black bg-opacity-40 z-40 transition-transform transform duration-300 ease-in-out md:hidden border-gray-300 rounded-[25px]">
          <div className="flex flex-col items-center space-y-10 py-12 pt-16">
            <Link href="/" onClick={closeMenu}>
              <div className="text-white text-2xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer">
                Home
              </div>
            </Link>
            <Link href="#about" onClick={closeMenu}>
              <div className="text-white text-2xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer">
                About
              </div>
            </Link>
            <Link href="#timeline" onClick={closeMenu}>
              <div className="text-white text-2xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer">
                Timeline
              </div>
            </Link>
            <Link href="#contact" onClick={closeMenu}>
              <div className="text-white text-2xl font-bold uppercase hover:text-blue-400 active:text-blue-400 transition duration-300 cursor-pointer">
                Contact Us
              </div>
            </Link>

            {/* Sign-in Button */}
            <button
              onClick={() => {
                closeMenu(); // Close the menu when signing in
                handleLoginClick();
              }}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300 cursor-pointer text-2xl"
            >
              {status === "authenticated" ? "LogOut" : "Login"}
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
          {status === "authenticated" ? "LogOut" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;