import React from 'react';
import HeroSection from '@/components/landingPage/heroSection';
import Animation from '@/components/landingPage/animation';
import Timeline from '@/components/landingPage/timeline';
import SignInBtn from '@/components/SignInBtn';

export default function page() {
  return (
    <main className='min-h-screen'>
<SignInBtn />
    <Animation/>

    <Timeline />
    </main>
  )
}