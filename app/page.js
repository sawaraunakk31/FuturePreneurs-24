import React from 'react';
import Animation from '@/components/landingPage/animation';
import Timeline from '@/components/landingPage/timeline';
import Faqpage from '@/components/FAQcomp/faqpage';

export default function page() {
  return (
    <main className='min-h-screen'>
    <Animation/>
    <Timeline />
    <Faqpage/>
    </main>
  )
}