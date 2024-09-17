'use client';
import React from 'react';
import Navbar from '../components/Navbar'; // Ensure this import path is correct
import Footer from '../components/Footer'; // Ensure this import path is correct
import RegisterButton from '@/components/registerButton';
import CountdownTimer from '@/components/counter';
import SignInBtn from '@/components/SignInBtn';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Header from '../components/Header/Header';

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const targetDate = new Date("2024-10-05T18:00");
  const testing = async () => {
    const res = await fetch("/api/userData", {
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
       <br></br>
       <br></br>
       <Header/>
       
      <div>Futurepreneurs 10.0</div>
      <SignInBtn />
      <RegisterButton />
      <Footer/>
      <button onClick={testing}>Click me</button>
      <CountdownTimer targetDate={targetDate} />
    </main>
  );
};

export default Page;