"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";
import ecellLogo from "/assests/assests/ecell.jpg"; // Ensure the path is correct
import vitLogo from "/assests/assests/vit logo.png";
import swLogo from "/assests/assests/sw.png";
import hamburgerIcon from "/assests/assests/Hamburger.jpg"; // Path to hamburger image
import closeIcon from "/assests/assests/close.jpg"; // Path to close image

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control mobile menu
  const [visible, setVisible] = useState(true);
  const { scrollYProgress } = useScroll(); 
  const heroSectionRef = useRef(null);
  const timelineRef = useRef(null);
  const storyBehindRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const currentUrl = window.location.href;

    if (currentUrl.endsWith("/#timeline") && timelineRef.current) {
      timelineRef.current.click();
    } else if (currentUrl.endsWith("/#storyBehind") && storyBehindRef.current) {
      storyBehindRef.current.click();
    } else if (currentUrl.endsWith("/#footer") && footerRef.current) {
      footerRef.current.click();
    } else {
      heroSectionRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to hero section on page load
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const handleLoginClick = () => {
    if (status === "authenticated") {
      router.push('/');
      signOut();
    } else {
      signIn(); // Redirect to login if not logged in
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle between open and close
  };

  const closeMenu = () => {
    setIsMenuOpen(false); // Close the menu
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();
      if (scrollYProgress.get() < 0.05) {
        setVisible(true); // Show navbar when at the top
      } else {
        if (direction < 0 || direction === 1) {
          setVisible(true); // Show navbar when scrolling up
        } else {
          setVisible(false); // Hide navbar when scrolling down
        }
      }
    }
  });

  return (
    <div className={`flex w-full h-[10vh] bg-white fixed top-0 left-0 right-0 z-50 items-center px-10 justify-between bg-opacity-100 transition-transform duration-300 ${
    visible?"translate-y-0":"-translate-y-full"
    } `}>
      {/* ECELL Logo */}
      

      {/* Hamburger icon for mobile view */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          {!isMenuOpen ? (
            <Image
              src={hamburgerIcon}
              alt="Hamburger Icon"
              width={40}
              height={40}
              className="cursor-pointer"
            />
          ) : (
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
      <div className="hidden md:flex pl-4 relative items-center justify-center">
        {/* Box around navigation links */}
        <div className="relative align-middle w-[60vw] max-w-[600px] h-[7vh] bg-transparent border-[3px] border-gray-300 rounded-[25px] opacity-100 z-10 bg-white">
          {/* Navigation Links */}
          <div className="flex items-center align-middle justify-center h-full">
            <Link href="/" scroll={false}>
              <div
                ref={heroSectionRef}
                className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer px-[1vw] md:px-[2vw]"
                onClick={() => {
                  const heroSection = document.querySelector("#heroSection");
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: "smooth" });
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
                  const timeline = document.querySelector("#timeline");
                  if (timeline) {
                    timeline.scrollIntoView({ behavior: "smooth" });
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
                  const storyBehind = document.querySelector("#storyBehind");
                  if (storyBehind) {
                    storyBehind.scrollIntoView({ behavior: "smooth" });
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
                  const footer = document.querySelector("#footer");
                  if (footer) {
                    footer.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Contact Us
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu (only when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-85 backdrop-blur-sm transition-transform transform duration-300 ease-in-out md:hidden h-[100vh] w-[100vw] z-[9999]">
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
                  const heroSection = document.querySelector("#heroSection");
                  if (heroSection) {
                    heroSection.scrollIntoView({ behavior: "smooth" });
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
                  const timeline = document.querySelector("#timeline");
                  if (timeline) {
                    timeline.scrollIntoView({ behavior: "smooth" });
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
                  const storyBehind = document.querySelector("#storyBehind");
                  if (storyBehind) {
                    storyBehind.scrollIntoView({ behavior: "smooth" });
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
                  const footer = document.querySelector("#footer");
                  if (footer) {
                    footer.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Contact Us
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

      <div className="flex flex-col items-center h-fit w-1/2 md:w-fit md:pt-1">
        {/* <div className="flex flex-col"> */}
          
          
          <Image
            src={vitLogo}
            alt="VIT Logo"
            width={150}
            height={100}
            className="pl-2"
          />
        
          <Image
            src={swLogo}
            alt="Student Welfare Logo"
            width={150}
            height={250}
            className="pt-2"
          />
        {/* </div> */}
      </div>

      <Image
            src={ecellLogo}
            alt="ECELL Logo"
            width={100}
            height={50}
            className="cursor-pointer pl-2"
            onClick={() => router.push("/")}
          />

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

export default Navbar;
