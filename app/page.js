'use client';

import React from 'react';
import Navbar from '../components/Navbar'; // Ensure this path is correct
import Footer from '../components/Footer'; // Ensure this path is correct
import { useSession } from "next-auth/react";
import '../components/footer.css';

const Page = () => {
  const { data: session, status } = useSession();

  const testing = async () => {
    try {
      const res = await fetch("/api/testing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.accessTokenBackend}`, // Ensure accessTokenBackend exists
          "Access-Control-Allow-Origin": "*", // This might not be needed in client-side requests
        },
        body: JSON.stringify({
          "key": "value",
        }),
      });

      if (res.ok) {
        console.log("Success");
      } else {
        console.error("Failed to fetch", res.statusText);
      }
    } catch (error) {
      console.error("Error during fetch", error);
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
