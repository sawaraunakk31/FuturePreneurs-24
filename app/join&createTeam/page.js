"use client"
import NavBar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";
import toast, { Toaster } from 'react-hot-toast';

export default function page() {
  const { data: session, status } = useSession();
  const [teamName,setTeamName] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const createTeam = async()=>{
    setLoading(true);
    if(teamName.trim()!=''){
      const res = await fetch("/api/createTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          teamName: teamName
        }),
      });
    
      if(res.status==400){
        setLoading(false);
        toast.error('Team name already exists');
      } else if(res.status==401){
        setLoading(false);
        toast.error('You are already in a team');
      }
      if(res.status==200){
        setLoading(false);
        toast.success('Team has been created');
        router.push('/leaderDashboard');
      }
    }else{
      setLoading(false);
      toast.error('Enter a team name');
    }
  }

  const handleJoinTeam=()=>{
    router.push('/teamCode');
  }
  return (
    <main className="h-[100vh] w-[100vw] flex items-center justify-center bg-white">
      <NavBar />
      {loading && <LoadingScreen/>}
      <div className="bg-[#141B2B] h-[80vh] w-[90vw] md:h-[80vh] md:w-[80vw] lg:h-[50vh] lg:w-[50vw] rounded-md flex justify-around  content-around flex-col portrait:lg:w-[90vw] portrait:lg:h-[70vh]">
        <div className=" hidden md:block lg:block text-center font-bold  text-[4vh] lg:text-[5vh]  ">
          Join a Team or Create a Team
        </div>
        <div className=" lg:hidden md:hidden text-center font-bold  text-[4vh] lg:text-[4vw] ">
          Join a Team{" "}
        </div>
        <div className=" lg:hidden md:hidden text-center font-bold  text-[4vh] lg:text-[4vw] ">
          or
        </div>
        <div className=" lg:hidden md:hidden text-center font-bold  text-[4vh] lg:text-[4vw] pb-5 ">
          Create a Team
        </div>
        <div className="flex flex-col lg:flex lg:flex-row lg:gap-4 lg:content-around items-center justify-around ">
          <div className="lg:h-[30vh] flex-col justify-evenly  content-center lg:w-[25vw]">
            <h1 className="text-center text-[4vh] py-5">Join your team</h1>
            <div className="flex flex-col  items-center gap-5">
              <input
                type="text"
                placeholder="Enter team name"
                className=" sm:landscape:w-[20vw] sm:landscape:h-[7vh] md:max-w-[40vw] portrait:lg:w-[30vw] portrait:lg:text-2xl lg:w-[15vw] w-[55vw] h-[5vh] rounded-md text-xl text-slate-900  focus:outline-none focus:placeholder-transparent active:scale-95 transition-all duration-300"
              />
              <button
                className=" sm:landscape:w-[15vw]  mb-7 rounded-3xl bg-gradient-to-r from-[#03A3FE] to-[#00FFA3] text-center portrait:lg:w-[30vw]  md:max-w-[25vw] md:text-[20px] landscape:md:text-[1.6vh] lg:w-[15vw] w-[50vw] h-[5vh] hover:scale-110 active:scale-95 transition-transform ease-in-out duration-300 "
                onClick={handleJoinTeam}
              >
                Find team to join
              </button>
            </div>
          </div>
          <div className="lg:h-[30vh] lg:w-[0vw] w-[70vw] border-2 border-[#D9D9D9] rounded-lg "></div>
          <div className="lg:h-[30vh] flex-col justify-center  content-center lg:w-[25vw]">
            <h1 className="text-center text-[4vh] py-5">Create your team</h1>
            <div className="flex flex-col justify-evenly items-center gap-5">
              <input
                type="text"
                placeholder="Enter team name"
                className=" sm:landscape:w-[20vw] sm:landscape:h-[7vh] md:max-w-[40vw] portrait:md:max-w-[40vw] portrait:lg:w-[30vw] portrait:lg:text-2xl lg:w-[15vw] w-[55vw] h-[5vh] rounded-md text-xl text-slate-900  focus:outline-none focus:placeholder-transparent active:scale-95 transition-all duration-300"
                onChange={(e) => setTeamName(e.target.value)}
              />
              <button
                className="mb-7 sm:landscape:w-[15vw]  rounded-3xl bg-gradient-to-b from-[#FF7E7E] to-[#FFEF99] text-center portrait:lg:w-[30vw]  md:max-w-[25vw] md:text-[1.6vh]  sm:landscape:md:text-[1.7vh] lg:w-[15vw] w-[50vw] h-[5vh] hover:scale-110 active:scale-95 transition-transform ease-in-out duration-300"
                onClick={createTeam}
              >
                Create your own team
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster/>
    </main>
  );
}
