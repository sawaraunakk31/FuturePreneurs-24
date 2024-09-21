'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import ecellLogo from '@/assests/assests/ecell.jpg'; // Ensure the path is correct

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
  <div className="w-full h-[10vh] bg-white bg-opacity-85 fixed top-0 left-0 right-0 z-50 flex items-center px-10 justify-between">
      {/* ECELL Logo */}
    <div className="flex items-center lg:px-12">
        <Image
        src={ecellLogo}
        alt="ECELL Logo"
        width={100}
        height={50}
        className="cursor-pointer"
        onClick={() => router.push("/")}
        />
    </div>

      {/* Navigation Links Container */}
    <div className="relative flex items-center justify-center">
    {/* Box around navigation links */}
    <div className="absolute w-[80vh] h-[7vh] bg-transparent border-[2px] border-gray-300 rounded-[25px] opacity-100 z-10"></div>

    {/* Navigation Links */}
    <div className="flex space-x-12 z-20 p-4">
    <Link href="#home">
        <div className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer">
        Home
        </div>
    </Link>
    <Link href="#about">
        <div className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer">
        About
        </div>
    </Link>
    <Link href="#timeline">
        <div className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer">
        Timeline
        </div>
    </Link>
    <Link href="#contact">
        <div className="text-black text-lg uppercase hover:text-blue-400 transition duration-300 cursor-pointer">
        Contact Us
        </div>
    </Link>
    </div>
</div>


    {/* Login Button */}
    <div className='lg:mr-7'>
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
