"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingIcons from "react-loading-icons";

const registerButton = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [details, setDetails] = useState(null);
  const [team,setTeam] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(true);
      getData();
    } else {
        getData();
    }
  },[]);

  const getData = async () => {
    setLoading(true);
    const res = await fetch("/api/userInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      Authorization: `Bearer ${session?.accessTokenBackend}`,
      "Access-Control-Allow-Origin": "*",
    });

    const data = await res.json();
    setDetails(data);
    setTeam(data.user.teamId);
    setLoading(false);
  };

  const handleClick = ()=>{
    setLoading(true);
    if(details.user.teamId){
        if(details.user.teamRole===0){
            router.push('/leaderDashboard')
            setLoading(false);
        }else{
            router.push('/memberDashboard')
            setLoading(false);
        }
    }else{
        if(details.user.hasFilledDetails){
            router.push('/join&createTeam')
            setLoading(false);
        }else{
            router.push('/userDetails')
            setLoading(false);
        }
    }
  }

  return (
    <>
      {status !== "authenticated" ? (
        <button
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:text-black"
          onClick={() => {
            signIn("google");
          }}
        >
          {loading ? <LoadingIcons.Oval/> :'Register!'}
        </button>
      ) : (
        <button
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:text-black"
          onClick={() => {handleClick()}}
        >
          {loading ? <LoadingIcons.Oval/> : (team ? 'Dashboard' : 'Register!')}
        </button>
      )
      }
    </>
  );
};
export default registerButton;
