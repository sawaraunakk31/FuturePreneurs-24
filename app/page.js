import React from 'react';
import Animation from '@/components/landingPage/animation';
import InfoSection from '@/components/landingPage/infoSection';
import Timeline from '@/components/landingPage/timeline';
import Home from '@/components/landingPage/storybehind'
import LegacyComponent from '@/components/landingPage/gallery'; 
import Faqpage from '@/components/FAQcomp/faqpage';

export default function page() {
  return (
    <main className='min-h-screen'>
    <Animation/>
    <InfoSection/>
    <Timeline />
    <Home/>


    <LegacyComponent/>
    <Faqpage/>
    </main>
  )
}