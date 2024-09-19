"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ecellLogo from '@/assests/assests/ecell.jpg';
import closed from '@/assests/assests/close.jpg';
import hamburger from '@/assests/assests/Hamburger.jpg';

function NavBar() {
    const [navbar, setNavbar] = useState(false);

    return (
        <nav className="w-full bg-blur opacity-75 fixed top-0">
            <div className="relative flex items-center justify-between px-4 py-3 mx-auto lg:w-full md:px-8">
                {/* LOGO */}
                <Link href="/" className="flex items-center">
                    <Image
                        src={ecellLogo}
                        alt="ECELL"
                        width={navbar ? 100 : 133} // Adjust logo size based on state
                        height={navbar ? 50 : 64}
                        className="transition-transform duration-300" // Smooth transition for logo size
                    />
                </Link>

                {/* HAMBURGER BUTTON FOR MOBILE */}
                <div className="md:hidden relative">
                    <button
                        className="p-2 text-black rounded-md outline-none focus:border-black"
                        onClick={() => setNavbar(!navbar)}
                    >
                        <Image
                            src={navbar ? closed : hamburger}
                            width={30}
                            height={30}
                            alt={navbar ? "Close menu" : "Open menu"}
                        />
                    </button>

                    {/* MOBILE MENU */}
                    <div
                        className={`fixed top-0 right-0 h-screen w-64 bg-white bg-opacity-75 p-4 rounded-l-md md:hidden transition-transform duration-300 ease-in-out transform ${
                            navbar ? 'translate-x-0' : 'translate-x-full'
                        }`}
                        style={{ boxShadow: '0 0 10px rgba(0,0,0,0.2)', zIndex: 10 }} // Ensure it appears above other content
                    >
                        <ul className="flex flex-col items-center space-y-6 mb-4">
                            <li>
                                <Link href="#Home" className="text-xl text-black hover:text-blue-600" onClick={() => setNavbar(false)}>Home</Link>
                            </li>
                            <li>
                                <Link href="#About" className="text-xl text-black hover:text-blue-600" onClick={() => setNavbar(false)}>About</Link>
                            </li>
                            <li>
                                <Link href="#Timeline" className="text-xl text-black hover:text-blue-600" onClick={() => setNavbar(false)}>Timeline</Link>
                            </li>
                            <li>
                                <Link href="#Contact" className="text-xl text-black hover:text-blue-600" onClick={() => setNavbar(false)}>Contact Us</Link>
                            </li>
                        </ul>
                        {/* Sign In Button in Mobile Menu */}
                        <div className="flex justify-center mt-4">
                            <button
                                className="w-40 h-12 rounded-full bg-gradient-to-b from-[#FF7E7E] to-[#FFEF99] shadow-lg text-white font-semibold"
                                style={{ border: 'none', cursor: 'pointer' }}
                                onClick={() => setNavbar(false)} 
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </div>

                {/* DESKTOP MENU AND SIGN IN BUTTON */}
                <div className="hidden md:flex items-center w-full">
                    <div className="flex flex-1 items-center justify-center gap-8">
                        <div
                            className="flex items-center space-x-8 bg-white rounded-full px-4 py-2 shadow-lg"
                            style={{ width: '600px', height: '50px', boxShadow: '1px 1px 6px 0px #000000BF' }}
                        >
                            <Link href="#Home" className="text-xl flex-1 text-black text-center hover:text-blue-600">Home</Link>
                            <Link href="#About" className="text-xl flex-1 text-center text-black hover:text-blue-600">About</Link>
                            <Link href="#Timeline" className="text-xl flex-1 text-center text-black hover:text-blue-600">Timeline</Link>
                            <Link href="#Contact" className="text-xl flex-1 text-center text-black hover:text-blue-600">Contact Us</Link>
                        </div>
                    </div>
                    {/* Sign In Button */}
                    <div className="ml-6"> 
                        <button
                            className="w-44 h-12 rounded-full bg-gradient-to-b from-[#FF7E7E] to-[#FFEF99] shadow-lg text-white font-semibold"
                            style={{ border: 'none', cursor: 'pointer' }}
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
