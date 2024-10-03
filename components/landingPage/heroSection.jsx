
'use client';
import React from 'react';
import Navbar from '@/components/navbar'; 
import RegisterButton from '@/components/registerButton';
import CountdownTimer from '@/components/counter';
import Logo from "@/components/logo";
import MyComponent from '@/components/lines';
import MyComponent2 from '@/components/lines2';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import MyComponent3 from '@/components/ellipse1';
import MyComponent4 from '@/components/ellipse2';

const HeroSection = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const targetDate = new Date("2024-10-02T13:30");

  const testing = async () => {
    const res = await fetch("/api/userData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      Authorization: 'Bearer ${session?.accessTokenBackend}',
      body: JSON.stringify({ "key": "value" }),
    });

    if (res.status === 200) {
      console.log("Success");
      router.push('/userDetails');
    }
  };

  return (
    <main className='p-5'>
      <div className='w-[100vw]  min-h-screen overflow-scroll'>
        <div className='z-[9999] absolute h-[10vh] w-[100vw]'><Navbar /></div>
        <div className='h-[100vh]'>
          <div>
            <MyComponent />
          </div>
          <div>

            {/* Gradient lines as divs */}
            {/* <div style={{
              position: 'absolute',
              top: '26%',
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(to right, #B9B7B7 17%, #D1CECE 73%, #FEFEFE 100%)',
              zIndex: 0
            }} /> */}

            <div  style={{border: "4px solid grey",borderImageSource:
          "linear-gradient(252.97deg, #FEFEFE -0.39%, #ECEAEA 31.09%, #D1CECE 97.59%)", // Apply gradient to the border
        borderImageSlice: 1}}>
              <Logo />
            </div>

            {/* <div style={{
              position: 'absolute',
              top: '60%',
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(to right, #B9B7B7 17%, #D1CECE 73%, #FEFEFE 100%)',
              zIndex: 0
            }} /> */}
          </div>

          <div className='flex flex-col'>
          <div className='z-50 '>
            <MyComponent4 Button={RegisterButton} />
          </div>

          <div>
            <CountdownTimer targetDate={targetDate} />
          </div>
          </div>
        
        </div>
      </div>
    </main>
  );
};

export default HeroSection;