
'use client';
import React from 'react';
import Navbar from '@/components/navbar'; // Ensure this import path is correct
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
  const targetDate = new Date("2024-10-05T18:00");

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
      <div className='w-[100vw] h-[100vh]'>
        <div className='z-1 absolute h-[10vh] w-[100vw]'><Navbar /></div>
        <div className='h-[100vh]'>
          <div className='left-[15vw] bottom-[100%] z-0 absolute lg:h-[10%] lg:w-[10vw] hidden md:block'>
            <MyComponent />
          </div>
          <div>

            {/* Gradient lines as divs */}
            <div style={{
              position: 'absolute',
              top: '26%',
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(to right, #B9B7B7 17%, #D1CECE 73%, #FEFEFE 100%)',
              zIndex: 0
            }} />

            <div className='absolute top-[3%] left-[5%] h-[12vh] z-0'>
              <Logo />
            </div>

            <div style={{
              position: 'absolute',
              top: '60%',
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(to right, #B9B7B7 17%, #D1CECE 73%, #FEFEFE 100%)',
              zIndex: 0
            }} />
          </div>

          <div className='absolute top-[60%] left-[1%] z-0 hidden md:block'>
            <MyComponent4 />
          </div>

          <div className='absolute bottom-[27%] left-[5%] md:left-[6%] z-30'>
            <RegisterButton />
          </div>

          <div className='absolute top-[60%] left-[15vw] z-0 hidden md:block'>
            <MyComponent2 />
          </div>

          <div>
            <CountdownTimer targetDate={targetDate} />
          </div>

          <div className='absolute bottom-[73%] left-[70%] z-0 hidden md:block'>
            <MyComponent3 />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HeroSection;