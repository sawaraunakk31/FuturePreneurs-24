"use client"
import NavBar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";
import toast, { Toaster } from 'react-hot-toast';

export default function page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  const getData = async() => {
    const res = await fetch('/api/userDataGet', {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
  }

  const consent = async() => {
    const res = await fetch('/api/consent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        "consent": true
      })
    })

    if(res.status==200){
      setLoading(false);
      toast.success('Successfully saved consent');
      router.push('/');
    } else {
      setLoading(false);
      toast.error('Please give your consent');
    }
  }
  
  useEffect(() => {
    if (router.isReady) {
      if (status === "unauthenticated") {
        //Checks if session is not ready and redirects to root.
        router.push("/");
      } else if (status === "authenticated") {
        // toast.success("Logged In");
        getData();
      }
    }
  }, [status, router]);

  return (
    <main className="h-[100vh] w-[100vw] flex items-center justify-center  bg-[url(../assests/assests/bg_website.png)]">
    <NavBar />
      {loading && <LoadingScreen/>}
      <div className="bg-[#141B2B] opacity-[85%] h-[80vh] w-[90vw] md:h-[80vh] md:w-[80vw] lg:h-[50vh] lg:w-[50vw] rounded-md flex justify-around  content-around flex-col portrait:lg:w-[90vw] portrait:lg:h-[70vh]">
        <div className="text-white hidden md:block lg:block text-center font-bold text-[4vh] lg:text-[5vh]  ">
          Agreement!
        </div>
        <p className="text-white flex flex-wrap max-md:text-base text-center">
            I understand that if I do not create a team or join an existing team before the end of registrations, I would be added to a random team.
        </p>
        <div className="mt-3 flex flex-col justify-evenly items-center gap-5">
          <button onClick={() => { consent() }} className="sm:landscape:w-[15vw]  mb-7 rounded-3xl text-white text-bold bg-gradient-to-r from-purple-500 to-blue-500 text-center portrait:lg:w-[30vw]  md:max-w-[25vw] md:text-[2rem] landscape:md:text-[1.6vh] lg:w-[15vw] w-[50vw] h-[5vh] hover:scale-110 active:scale-95 transition-transform ease-in-out duration-300">
            I Agree
          </button>
        </div>
    </div>
    <Toaster/>
    </main>
  );
}