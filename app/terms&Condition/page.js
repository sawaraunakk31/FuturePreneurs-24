"use client"
import NavBar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";
import { to } from "@react-spring/web";

export default function page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [check, setCheck] = useState();

  const getData = () => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/userDetails`, {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        
        const user = data.user;
        setCheck(user.consent);
        // if (user.hasFilledDetails == true) {
        //   if (user.teamId !== null) {
        //     const redirect = user.teamRole=='1' ? '/memberDashboard' : '/leaderDashboard';
        //     router.push(redirect);
        //   } else {
        //     router.push("/makeTeam");
        //   }
        // }
      })
  }

  function consent() {
    fetch(process.env.NEXT_PUBLIC_SERVER + '/user/consent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        "consent": true
      })
    }).then((res) => res.json())
      .then((data) => {
        router.push("/makeTeam")
        // location.reload();
      })
  }

  function disagreeConsent() {
    fetch(process.env.NEXT_PUBLIC_SERVER + '/user/consent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        "consent": false
      })
    }).then((res) => res.json())
      .then((data) => {
        // router.push("/makeTeam")
        location.reload();
      })
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
    <main className="h-[100vh] w-[100vw] flex items-center justify-center bg-white">
    <NavBar />
      <div className="bg-[#141B2B] h-[80vh] w-[90vw] md:h-[80vh] md:w-[80vw] lg:h-[50vh] lg:w-[50vw] rounded-md flex justify-around  content-around flex-col portrait:lg:w-[90vw] portrait:lg:h-[70vh]">
        <div className="text-white hidden md:block lg:block text-center font-bold text-[4vh] lg:text-[5vh]  ">
          Agreement!
        </div>
        <p className="text-white flex flex-wrap max-md:text-base text-center">
            I understand that if I do not create a team or join an existing team before the end of registrations, I would be added to a random team.
        </p>
        <div className="mt-3 flex flex-col justify-evenly items-center gap-5">
          <button onClick={() => { consent() }} className="sm:landscape:w-[15vw]  mb-7 rounded-3xl bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] text-center portrait:lg:w-[30vw]  md:max-w-[25vw] md:text-[20px] landscape:md:text-[1.6vh] lg:w-[15vw] w-[50vw] h-[5vh] hover:scale-110 active:scale-95 transition-transform ease-in-out duration-300">
            I Agree
          </button>
        </div>
    </div>
    </main>
  );
}