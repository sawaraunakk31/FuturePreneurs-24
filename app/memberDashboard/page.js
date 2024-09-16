'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import img1 from '@/assests/assests/teammember.jpg';
import Modal from '@/components/Modal';
import MyModal from '@/components/Modal';

export default function Home() {
  const router = useRouter();
  
  const teamLeader = [
    { id: 1, name: 'Full Name', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX' },
  ];

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Full Name', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX' },
    { id: 2, name: 'Full Name', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX' },
    { id: 3, name: 'Full Name', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX' }
  ]);
  const [showModal,setShowModal]=useState(false)
  const handleShowModal=()=>{
    setShowModal(!showModal)
  }
  const handleLeave = () => {
    if (teamMembers.length > 0) {
      const updatedTeamMembers = teamMembers.slice(1);
      setTeamMembers(updatedTeamMembers);
      router.push('/join&createTeam');
    } else {
      alert("No more members to remove!");
    }
  };

  return (
    <div className="bg-[url('../assests/assests/background_image.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-5 text-white">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center drop-shadow-lg">Your Team</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-screen-lg px-4">
        {teamLeader.map((leader) => (
          <div
            key={leader.id}
            className="bg-[#141B2B] rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-between"
          >
            <img src={img1.src} alt="Team Leader" className="w-24 h-24 mb-4 rounded-full shadow-md" />
            <h2 className="text-2xl font-bold mb-2">{leader.name}</h2>
            <p className="text-sm mb-1">Registration Number: {leader.registrationNumber}</p>
            <p className="text-sm">Mobile Number: {leader.mobileNumber}</p>
          </div>
        ))}

        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#141B2B] rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-between"
          >
            <img src={img1.src} alt="Team Member" className="w-24 h-24 mb-4 rounded-full shadow-md" />
            <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
            <p className="text-sm mb-1">Registration Number: {member.registrationNumber}</p>
            <p className="text-sm">Mobile Number: {member.mobileNumber}</p>
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
    </div>
  );
}
