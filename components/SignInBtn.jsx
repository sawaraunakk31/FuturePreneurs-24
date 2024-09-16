"use client";

import { signIn,signOut,useSession } from "next-auth/react";

export default function SignInBtn() {
  const { status } = useSession();

  return (
    <div className="flex text-black w-12 font-bold text-xl md:text-sm bg-blue-500 p-3 rounded-lg">
      {status === "authenticated" ? (
        <button
          onClick={() => {signOut();}} >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => {signIn("google");}} >
          Sign In
        </button>
      )}
    </div>)
}