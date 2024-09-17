'use client';
import React from 'react';
import Navbar from '../components/navbar'; // Ensure this import path is correct
import Footer from '../components/footer'; // Ensure this import path is correct
import RegisterButton from '@/components/registerButton';
import TimerGradient from '../components/timerGradient';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
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
      router.push('/userDetails');
    }
  };

  return (
    <main>
       <Navbar /> 
      <div>Futurepreneurs 10.0</div>
      {/* <SignInBtn /> */}
      <RegisterButton />

      <button onClick={testing}>Click me</button>
      <TimerGradient />
      <Footer />
    </main>
  );
};

export default Page;