import React from 'react';
import Animation from '@/components/landingPage/animation';
import Timeline from '@/components/landingPage/timeline';
import LegacyComponent from '@/components/landingPage/gallery'; 
import Faqpage from '@/components/FAQcomp/faqpage';

export default function page() {
  return (
    <main className='min-h-screen'>
    <Animation/>
    <Timeline />

    <LegacyComponent/>
    <Faqpage/>
    </main>
  )
}