"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import LoadingScreen from "@/components/LoadingScreen";
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
      getUserData();
    }
  }, [status, router]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  const getUserData = () => {
    setLoading(true);
    fetch(`/api/userDataGet`, {
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
            router.push("/join&createTeam");
          }
        } else {
          router.push("/userDetails");
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
    <div className="h-[100vh] flex items-center justify-center text-white font-sans bg-[url('../assests/assests/background_image.jpg')] bg-cover bg-center">
      {loading && <LoadingScreen />}
      <div className="w-[90%] max-w-[20rem] md:w-[95%] md:max-w-[28rem] lg:max-w-[32rem] p-[1.5rem] md:p-[2rem] bg-gray-800 rounded-lg shadow-lg flex flex-col justify-between md:h-[32rem] lg:h-[26rem]">
        <div className="text-center mb-[1.5rem]">
          <h1 className="text-[1.75rem] md:text-[2.5rem] lg:text-[3rem] font-bold pb-[0.5rem]">
            {teamName}
          </h1>
        </div>

        <div className="flex items-center justify-start md:justify-between mb-[1.25rem] whitespace-nowrap">
          <span className="text-[1.125rem] md:text-[1.25rem] ml-[1rem]">
            {teamCode}
          </span>
          <button
            className="text-[0.875rem] md:text-[1.125rem] text-gray-400 hover:text-white flex items-center ml-auto md:ml-0 mr-[1rem]"
            onClick={() => handleCopy(teamCode)}
          >
            <FontAwesomeIcon className="mr-[0.5rem]" icon={faCopy} />
            Click here to copy
          </button>
        </div>

        <div className="text-center font-bold">
          <h2 className="text-[1.5rem] md:text-[2rem] lg:text-[2rem] pb-[0.75rem]">
            Share with Members!
          </h2>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
