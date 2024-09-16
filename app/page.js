"use client";
import React from "react";

import Link from "next/link";
import SignInBtn from "@/components/SignInbtn";
import { useSession } from "next-auth/react";
import Navbar from '../components/navbar';
import Footer from '../components/footer';

export default function Page() {
  const { data: session, status } = useSession();
  const testing = async () => {
    const res = await fetch("/api/testing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      Authorization: `Bearer ${session.accessTokenBackend}`,
      "Access-Control-Allow-Origin": "*",
      body: JSON.stringify({
        "key": "value",
      }),
    });
  

    if(res.status===200){
      console.log("Success");
    }
  };
  return (
    <main>
       <Navbar /> 
      <div>Futurepreneurs 10.0</div>
      <SignInBtn />

      <button onClick={testing}>Click me</button>
      <Footer />
    </main>
  );
};
