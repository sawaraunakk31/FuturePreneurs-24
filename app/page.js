'use client';

import React from 'react';
 main
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';
import RegisterButton from '@/components/registerButton';
 main
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Page = () => {
  const { data: session, status } = useSession();
main


  const router = useRouter();
  
main
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

main
      if (res.ok) {
        console.log("Success");
      } else {
        console.error("Failed to fetch", res.statusText);
      }
    } catch (error) {
      console.error("Error during fetch", error);

    if(res.status === 200){
      console.log("Success");
      router.push('/userDetails');
main
    }
  };

  return (
    <main>
       <Navbar /> 
      <div>Futurepreneurs 10.0</div>
      {/* <SignInBtn /> */}
      <RegisterButton />

      <button onClick={testing}>Click me</button>
      <Footer />
    </main>
  );
};

export default Page;