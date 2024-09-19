'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import ecellLogo from '/assests/assests/ecell.jpg'; // Ensure the path is correct

const Navbar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLoginClick = () => {
    if (status === "authenticated") {
      router.push("/dashboard"); // Redirect to dashboard if logged in
    } else {
      router.push("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <div className="w-full h-[2vh] bg-transparent absolute top-0 z-50 flex items-center px-10 justify-between">
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

      {/* Navigation Links */}
      <div className="flex space-x-12 border-[3px] border-black-600 rounded-3xl px-8 bg-white">
        <Link href="#home"
          className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer">
            Home
          
        </Link>
        <Link href="#about"
          className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer">
            About
          
        </Link>
        <Link href="#timeline"
          className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer">
            Timeline
          
        </Link>
        <Link href="#contact"
          className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer">
            Contact Us
          
        </Link>
      </div>

      {/* Login Button */}
      <div>
        <button
          onClick={handleLoginClick}
          className="px-6 py-2 bg-black text-white rounded-full hover:bg-blue-500 transition duration-300 cursor-pointer"
        >
          {status === "authenticated" ? "Dashboard" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
