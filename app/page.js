"use client";
import Navbar from '../components/Navbar';
import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import UserDetail from './userDetails/user.js'
export default function page() {
  return (
    <main>
      <Navbar />
      <div>Futurepreneurs 10.0</div>
      <Link href={'/userDetails'}>Sign In</Link>
      <UserDetail></UserDetail>
    </main>
  );
}





