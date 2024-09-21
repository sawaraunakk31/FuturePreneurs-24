import React from 'react';
import HeroSection from '@/components/landingPage/heroSection';
import Animation from '@/components/landingPage/animation';
import Timeline from '@/components/landingPage/timeline';
import LegacyComponent from '@/components/landingPage/gallery'; 

export default function page() {
  return (
    <main className='min-h-screen'>
    <Animation/>

    <Timeline />

    <LegacyComponent/>
    </main>
  )
}