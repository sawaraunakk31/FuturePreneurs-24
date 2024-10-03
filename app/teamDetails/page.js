"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import LoadingScreen from "@/components/LoadingScreen";
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardNavbar from "@/components/dashboardNavbar";

const TeamDetails = () => {
  const { data: session, status} = useSession();
  const [teamCode, setTeamCode] = useState("ABC123");
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const teamLink = `https://fp/${teamCode}`;

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    if (status == "unauthenticated") {
      setLoading(false);
      toast.error("Please Log in or Sign up");
      router.push("/");
    } else if (status == "authenticated") {
      setLoading(false);
      router.push("/");
      getUserData();
    }
  }, [status, router]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const getUserData = () => {
    setLoading(true);
    fetch(`/api/userInfo`, {
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
        if (user.hasFilledDetails === true) {
          if (user.teamId) {
            if (user.teamRole !== 0) {
              router.push("/memberDashboard");
            }
          } else {
            router.push("/");
          }
        } else {
          router.push("/");
        }
        fetch(`/api/getTeamCode`, {
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
            
            setTeamCode(data.teamCode);
            console.log(data.teamCode);
            setTeamName(data.teamName);
            console.log(data.teamName);
            setLoading(false);
          })
          .catch((err) => {
            console.log("err", err);
            setLoading(true);
          });
      });
    };

  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-center text-white font-sans  bg-[url(../assests/assests/bg_website.png)] bg-cover bg-center">
      {loading && <LoadingScreen />}
      <DashboardNavbar />
      <div className="w-[90%] max-w-[20rem] md:w-[95%] md:max-w-[32rem] lg:max-w-[32rem] p-[1.5rem] md:p-[2rem] bg-gray-800 rounded-lg shadow-lg flex flex-col justify-center md:h-[20rem] lg:h-[18rem] sm:max-w-[20rem] items-centre">
        <div className="text-center mb-[1.5rem]">
          <h1 className="text-[1.75rem] md:text-[2.5rem] lg:text-[3rem] font-bold pb-[0.5rem]">
            {teamName}
          </h1>
        </div>

        <div className="flex items-center justify-start md:justify-between mb-[1.25rem] whitespace-nowrap">
          <span className="text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] ml-[1rem] sm:ml-[1rem] sm:mr-[1rem]">
            {teamCode}
          </span>
          <button
            className="text-[1rem] sm:text-[1.3rem] md:text-[1.5rem] text-gray-400 hover:text-white flex items-center ml-auto md:ml-0 mr-[0.5rem]"
            onClick={() => handleCopy(teamCode)} 
          >
            <FontAwesomeIcon className="mr-[0.5rem]" icon={faCopy} />
            Click here to copy
          </button>
        </div>

        <div className="text-center font-bold">
          <h2 className="text-[1.5rem] sm:text-[1.25rem] md:text-[2rem] lg:text-[2rem] pb-[0.75rem] whitespace-nowrap">
            Share with Members!
          </h2>
        </div>
      </div>
      <Toaster/>
    </div>
  );
};


export default TeamDetails;
