'use client';
import React, { useState } from 'react';
import img1 from '@/assests/assests/teammember.jpg';
import { useRouter } from 'next/navigation';
import MyModal from '@/Components/Modal';

export default function Home() {
  const router = useRouter();

  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Full Name 1', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX', buttonLabel: 'Leave' },
    { id: 2, name: 'Full Name 2', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX', buttonLabel: 'Remove' },
    { id: 3, name: 'Full Name 3', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX', buttonLabel: 'Remove' },
    { id: 4, name: 'Full Name 4', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX', buttonLabel: 'Remove' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMemberId, setModalMemberId] = useState(null);
  const [modalType, setModalType] = useState(''); 

 
  const handleShowModal = (id = null, type = '') => {
    setModalMemberId(id); 
    setModalType(type);
    setShowModal(true);
  };

 
  const handleCloseModal = () => {
    setModalMemberId(null);
    setModalType('');
    setShowModal(false);
  };

  
  const handleRemove = () => {
    const updatedTeamMembers = teamMembers.filter((member) => member.id !== modalMemberId);
    setTeamMembers(updatedTeamMembers);
    handleCloseModal();
  };

  const handleAddTeamMember = () => {
    router.push('/teamDetails');
  };

  return (
    <div className="bg-[url('../assests/assests/background_image.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-4 text-white">
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-center drop-shadow-lg">Your Team</h1>
      
   
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl px-4 py-6 bg-black bg-opacity-50 rounded-lg shadow-lg">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#141B2B] rounded-lg p-3 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-between"
          >
            <img src={img1.src} alt="Team Member" className="w-16 h-16 mb-3 rounded-full shadow-md" />
            <h2 className="text-lg font-bold mb-1">{member.name}</h2>
            <p className="text-xs mb-1">Reg. No.: {member.registrationNumber}</p>
            <p className="text-xs">Mobile No.: {member.mobileNumber}</p>
            <button
              className="bg-blue-600 text-white py-1 px-4 rounded-full mt-2 font-semibold transition-colors duration-300 hover:bg-[#1e5db8] focus:outline-none text-sm"
              onClick={() => handleShowModal(member.id, 'remove')} 
            >
              {member.buttonLabel}
            </button>
          </div>
        ))}
      </div>

     
      {teamMembers.length < 4 && (
        <div className="flex justify-center mt-4 w-full">
          <button
          className="bg-green-600 text-white py-2 px-6 rounded-full font-semibold transition-colors duration-300 hover:bg-green-700 focus:outline-none shadow-lg text-[0.9rem] max-w-[150px]"
            
            onClick={() => handleShowModal(null, 'add')} 
          >
            Add Member
          </button>
        </div>
      )}

     
      {showModal && (
        <MyModal
          isVisible={true}
          onClose={handleCloseModal}  
          onConfirm={modalType === 'remove' ? handleRemove : handleAddTeamMember} 
          text={modalType === 'remove' ? "Do you want to remove this member?" : "Do you want to add a member?"}
        />
      )}
    </div>
  );
}
