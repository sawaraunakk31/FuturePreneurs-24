'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import LoadingScreen from '@/components/LoadingScreen';
import img1 from '@/assests/assests/teammember.jpg';
import Modal from '@/components/Modal';
import MyModal from '@/components/Modal';
import toast, { Toaster } from 'react-hot-toast';

export default function Home() {
  const { data: session, status } = useSession();
  const [teamName,setTeamName] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [showModal,setShowModal]=useState(false);

  const handleShowModal=()=>{
    setShowModal(!showModal)
  }

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
            if (user.teamRole == 0) {
              setLoading(false);
              router.push("/leaderDashboard");
            }else{
              setLoading(false)
            }
          } else {
            setLoading(false);
            router.push("/join&createTeam");
          }
        } else {
          setLoading(false);
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

  const handleLeave = async()=>{
    setLoading(true);
    const res = await fetch("/api/leaveTeam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        // teamName: teamName
      }),
    });
  
    if (res.status==200){
      setLoading(false);
      toast.success('Left the team successfully');
      router.push('/join&createTeam');
    } else {
      setLoading(false);
      toast.error("Error while leaving the team, please try again");
    }
  }

  return (
    <div className="bg-white bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-5 text-black">
      {loading && <LoadingScreen/>}
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center drop-shadow-lg">{teamName}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-screen-lg px-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#141B2B] rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-between"
          >
            <img src={img1.src} alt="Team Member" className="w-24 h-24 mb-4 rounded-full shadow-md" />
            <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
            <p className="text-sm mb-1">Registration Number: {member.regNo}</p>
            <p className="text-sm">Mobile Number: {member.mobNo}</p>
          </div>
        ))}
      </div>
      <button
        onClick={handleShowModal}
        className="bg-blue-600 text-white py-3 px-10 rounded-full mt-8 text-lg font-semibold transition-colors duration-300 hover:bg-[#1e5db8] focus:outline-none"
      >
        Leave
      </button>
      {showModal&&<MyModal
        isVisible={showModal}
        onClose={handleShowModal}  // Closes the modal on "No" or background click
        onConfirm={handleLeave}    // Calls handleLeave when "Yes" is clicked
        text="Do you want to leave this team?"
      />
      }
      <Toaster/>
    </div>
  );
}