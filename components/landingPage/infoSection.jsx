'use client';
import React from 'react';
import logoFP from '@/assests/assests/fp_logo_new.png'; // Adjust the path as needed
import Image from 'next/image';

export default function InfoSection() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      minHeight:'100%'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0' }}>The Ultimate</h1>
        <h2 style={{ fontSize: '2rem', margin: '10px 0' }}>Business Simulation Game</h2>
      </header>

      <div style={{ width: '200px', height: '200px', marginBottom: '20px' }}>
        <Image 
          src={logoFP} 
          alt="Logo" 
          width={200} 
          height={200} 
          style={{ objectFit: 'contain' }} 
        />
      </div>

      <section style={{ maxWidth: '600px', textAlign: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '15px' }}>
          Experience the thrill of running your own virtual business in our cutting-edge simulation game. 
          Navigate challenges, make strategic decisions, and watch your empire grow.
        </p>
        <p style={{ fontSize: '1.2rem' }}>
          Whether you're a seasoned entrepreneur or just starting out, Futurepreneurs 10.0 offers 
          an immersive experience that will sharpen your business acumen and test your skills.
        </p>
      </section>

      <footer style={{ 
        width: '100%', 
        overflow: 'hidden',
        background: '#f0f0f0',
        padding: '10px 0',
      }}>
        <div style={{
          display: 'flex',
          animation: 'marquee 25s linear infinite',
        }}>
          <span style={{ paddingRight: '50px' }}>
            FUTUREPRENEURS 10.0 • WE BREED BUSINESS • FUTUREPRENEURS
          </span>
          <span style={{ paddingRight: '50px' }}>
            FUTUREPRENEURS 10.0 • WE BREED BUSINESS • FUTUREPRENEURS
          </span>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
