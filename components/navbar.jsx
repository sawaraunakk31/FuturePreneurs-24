"use client";
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SignInBtn from './SignInBtn';

function NavBar() {
  const [navbar, setNavbar] = useState(false);

  return (
    <nav className="fixed top-0 right-0 z-10 w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          
          <Image
            src="/assests/assests/fplogo.jpg"
            alt="FP Logo"
            width={40}
            height={40}
          />
        </Link>
        
        {/* HAMBURGER BUTTON FOR MOBILE */}
        <div className="md:hidden relative">
          <button
            className="p-2 text-black rounded-md outline-none focus:border-black"
            onClick={() => setNavbar(!navbar)}
          >
            <Image
               src={navbar ? "/assests/close.jpg" : "/assests/hamburger.jpg"}
              width={30}
              height={30}
              alt={navbar ? "Close menu" : "Open menu"}
            />
          </button>

          {/* MOBILE MENU */}
          <div
  className={`absolute top-full right-0 bg-white bg-opacity-75 p-4 rounded-md w-64 md:hidden transition-transform transform ${
    navbar ? 'translate-x-0' : 'translate-x-full'
  }`}
  style={{ boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}  // Debugging shadow
  >

            <ul className="flex flex-col items-center space-y-6">
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
              <li>
                <SignInBtn/>
              </li>
            </ul>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex flex-1 justify-center space-x-6">
          <Link href="#Home" className="hover:text-blue-600">Home</Link>
          <Link href="#About" className="hover:text-blue-600">About</Link>
          <Link href="#Timeline" className="hover:text-blue-600">Timeline</Link>
          <Link href="#Contact" className="hover:text-blue-600">Contact Us</Link>
          <SignInBtn/>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
