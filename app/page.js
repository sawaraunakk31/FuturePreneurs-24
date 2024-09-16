'use client';
import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Navbar from '../components/Navbar'; // Ensure this import path is correct
import Footer from '../components/Footer'; // Ensure this import path is correct
import { useSession } from "next-auth/react";
import '../components/footer.css';

const Page = () => {
  const { data: session, status } = useSession();
  
  const testing = async () => {
    const res = await fetch("/api/testing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      Authorization: `Bearer ${session.accessTokenBackend}`,
      "Access-Control-Allow-Origin": "*",
      body: JSON.stringify({
        "key": "value",
      }),
    });

    if(res.status === 200){
      console.log("Success");
    }
  };

  return (
    <main>
      <Navbar />
      {/* Removed Futurepreneurs 10.0 text */}
      {/* Removed Sign In Button */}
      {/*<button onClick={testing}>Click me</button>*/}
      <Footer />
    </main>
  );
};

export default Page;
