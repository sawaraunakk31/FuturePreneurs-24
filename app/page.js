"use client";
import React from 'react';
import Link from "next/link";
import Navbar from '../components/Navbar'; // Ensure this path is correct
import UserDetail from './userDetails/user.js'; // Ensure this path is correct

export default function Page() {
  return (
    <main>
      <Navbar />
      <div>Futurepreneurs 10.0</div>
      <Link href={'/userDetails'}>Sign In</Link>
      <UserDetail />
    </main>
  );
}
