"use client";

import { signIn,signOut,useSession } from "next-auth/react";

export default function SignInBtn() {
  const { status } = useSession();

  return (
    <div className="relative w-[190px] h-12 bg-white rounded-[25px] overflow-hidden [background:linear-gradient(180deg,rgb(255,126.44,126.44)_0%,rgb(255,238.68,153)_100%)]">
      <div className="absolute top-2 left-[52px] [font-family:'Gantari-Regular',Helvetica] font-normal text-black text-[30px] tracking-[0] leading-[normal] whitespace-nowrap">
      {status === "authenticated" ? (
        <button
          onClick={() => {signOut();}} >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => {signIn("google");}} >
          Login
        </button>
      )}
      </div>
    </div>)
}