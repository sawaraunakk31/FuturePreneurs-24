"use client";
import React, { useEffect, useState } from "react";
import img1 from "@/assests/assests/teammember.jpg";
import { useRouter } from "next/navigation";
import {MyModal,ChangeLeaderModal} from "@/components/Modal";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/components/LoadingScreen";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar";

export default function Page() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [check, setcheck] = useState(0);

  useEffect(() => {
    setLoading(true);
    if (status == "unauthenticated") {
      setLoading(false);
      toast.error("Please Log in or Sign up");
      router.push("/");
    } else if (status == "authenticated") {
      setLoading(false);
      getUserData();
      getData();
    }
  }, [status, router]);


  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Full Name 1",
      regNo: "2XXXXXXXX",
      mobNo: "XXXXXXXXXX",
      buttonLabel: "Leave",
    },
    {
      id: 2,
      name: "Full Name 2",
      regNo: "2XXXXXXXX",
      mobNo: "XXXXXXXXXX",
      buttonLabel: "Remove",
    },
    {
      id: 3,
      name: "Full Name 3",
      regNo: "2XXXXXXXX",
      mobNo: "XXXXXXXXXX",
      buttonLabel: "Remove",
    },
    {
      id: 4,
      name: "Full Name 4",
      regNo: "2XXXXXXXX",
      mobNo: "XXXXXXXXXX",
      buttonLabel: "Remove",
    },
  ]);

  const [teamName, setTeamName] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMemberId, setModalMemberId] = useState(null);
  const [modalType, setModalType] = useState("");
  const [leaveLeaderModal, setLeaveLeaderModal] = useState("");
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(null);
  const [handleDeleteModal, setHandleDeleteModal] = useState(false);
  const [deleteText,setDeleteText] = useState('');

  const getUserData = async () => {
    const res = await fetch("/api/userInfo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
  
      Authorization: `Bearer ${session?.accessTokenBackend}`,
      "Access-Control-Allow-Origin": "*",
    });
    
    const data = await res.json();
  
    if(data?.user?.hasFilledDetails==true){
      if(data?.user?.teamId){
        if(data?.user?.teamRole==0){
          setLoading(false);
        }else{
          setLoading(false);
          router.push('/memberDashboard')
        }
      }else{
        setLoading(false);
        router.push('/join&createTeam');
      }
    }else{
      setLoading(false);
      router.push('/userDetails');
    }
  }

  const getData = async () => {
    setLoading(true);
    const res = await fetch("/api/userDataGet", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },

      Authorization: `Bearer ${session?.accessTokenBackend}`,
      "Access-Control-Allow-Origin": "*",
    });

    const data = await res.json();
    setTeamName(data?.team?.teamName);
    setTeamMembers(data?.members);
    setcheck(data?.user?.teamRole);
    setLoading(false);
  };

  const handleShowModal = (id = null, type = "") => {
    if (id === 0) {
      if (teamMembers.length > 1) {
        setLeaveLeaderModal(true);
      } else {
        setHandleDeleteModal(true);
        setDeleteText("Do you want to delete the Team?");
        // toast.error("Delete the team");
      }
    } else {
      setModalMemberId(id);
      setModalType(type);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setModalMemberId(null);
    setModalType("");
    setShowModal(false);
  };

  const handleRemove = async (index) => {
    setLoading(true);
    try {
      console.log("inside fetch");
      const response = await fetch("/api/removeMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
        },
        body: JSON.stringify({ index }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Team Member is removed");
        setLoading(false);
        window.location.reload();
      } else {
        toast.error("Team code not found. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred while fetching team name.");
      setLoading(false);
    }
    // const updatedTeamMembers = teamMembers.filter((member) => member.id !== modalMemberId);
    // setTeamMembers(updatedTeamMembers);
    handleCloseModal();
  };

  const deleteTeam = async () => {
    setLoading(true);
    console.log("team delete");
    try {
      console.log("inside delete");
      const response = await fetch("/api/deleteTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`,
        },
        body: JSON.stringify({  }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Team is deleted");
        setLoading(false);
        router.push('/join&createTeam');
      } else {
        toast.error("Team can't be deleted");
        setLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred while fetching team name.");
      setLoading(false);
    }
    // const updatedTeamMembers = teamMembers.filter((member) => member.id !== modalMemberId);
    // setTeamMembers(updatedTeamMembers);
    handleCloseModal();
  };

  const handleAddTeamMember = () => {
    router.push("/teamDetails");
  };

  return (
    <div className=" bg-[url(../assests/assests/bg_website.png)] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-4 text-black pt-[12vh]">
      {loading && <LoadingScreen />}
      <Navbar/>
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-center drop-shadow-lg">
        {teamName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl px-4 py-6  ">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-[#141B2B] opacity-85 rounded-lg p-3 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-between"
          >
            <img
              src={img1.src}
              alt="Team Member"
              className="w-16 h-16 mb-3 rounded-full shadow-md"
            />
            <h2 className="text-lg font-bold mb-1 text-white">{member?.name}</h2>
            <h2 className="text-lg font-bold mb-1 text-white">Team Role: {member?.teamRole === 0 ? "Leader" : "Member"}</h2>
            <p className="text-xs mb-1 text-white">Reg. No.: {member?.regNo}</p>
            <p className="text-xs text-white">Mobile No.: {member?.mobNo}</p>
            {/* {teamMembers.length>1 && <button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-1 px-4 rounded-full mt-2 font-semibold transition-colors duration-300 hover:text-black  focus:outline-none text-sm"
              onClick={() => handleShowModal(index, "remove")}
            >
              {index == 0 ? "Leave" : "Remove"}
            </button>} */}
          </div>
        ))}
      </div>

      {teamMembers.length < 4 && (
        <div className="flex justify-center mt-4 w-full">
          <button
            className="bg-green-600 text-white py-2 px-6 rounded-full font-semibold transition-colors duration-300 hover:bg-green-700 focus:outline-none shadow-lg text-[0.9rem] max-w-[150px]"
            onClick={() => handleShowModal(null, "add")}
          >
            Add Member
          </button>
        </div>
      )}

      {/* {teamMembers.length == 1 && (
        <div className="flex justify-center mt-4 w-full">
          <button
            className="bg-red-600 text-white py-2 px-6 rounded-full font-semibold transition-colors duration-300 hover:bg-red-700 focus:outline-none shadow-lg text-[0.9rem] max-w-[150px]"
            onClick={() => handleShowModal(null, "")}
          >
            Delete Team
          </button>
        </div>
      )} */}

      {showModal && (
        <MyModal
          isVisible={true}
          onClose={handleCloseModal}
          onConfirm={() => {
            if (modalType == "remove") {
              console.log(modalMemberId);
              handleRemove(modalMemberId);
            } else if(modalType=="add") {
              handleAddTeamMember();
            }else{
              console.log('inside  delete team');

              deleteTeam();
            }
          }}
          text={
            modalType === "remove"
              ? "Do you want to remove this member?"
              : modalType ==="add" ? "Do you want to add a member?"
              :"Do you want to delete the team?"
          }
        />
      )}
      {handleDeleteModal && (
        <MyModal
        isVisible={true}
        onClose={handleCloseModal}
        onConfirm={deleteTeam}
        text={deleteText}
      />
      )}
        

      {/*  ye new leaader selection ka h  */}
     
     {leaveLeaderModal && (
      <ChangeLeaderModal
        isOpen={leaveLeaderModal}
        onClose={() => setLeaveLeaderModal(false)}
        members={teamMembers}
        onConfirm={(selectedMemberIndex) => {
          if (selectedMemberIndex !== null) { // Check if a valid index is selected
            setNum(selectedMemberIndex); // Store the selected member's index in `num`
            console.log("New leader index:", selectedMemberIndex);
          }
          setLeaveLeaderModal(false); // Close the modal after confirmation
        }}
      />
    )}
    


      <Toaster />
    </div>
  );
}
