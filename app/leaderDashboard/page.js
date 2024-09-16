'use client';
import React from 'react';

export default function Home() {
  const teamMembers = [
    { id: 1, name: 'Full Name 1', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX', buttonLabel: 'Leave' },
    { id: 2, name: 'Full Name 2', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX', buttonLabel: 'Remove' },
    { id: 3, name: 'Full Name 3', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX', buttonLabel: 'Remove' },
    { id: 4, name: 'Full Name 4', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX', buttonLabel: 'Remove' },
  ];

  return (
    <div className="bg-[url('../assests/assests/background_image.jpg')] text-white min-h-screen flex flex-col items-center justify-center p-5 overflow-hidden">
      <h1 className="text-4xl mb-4 text-center">Your Team</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-screen-md h-full">
        {teamMembers.map((member) => (
          <div key={member.id} className="bg-[#1a1a3f] rounded-xl p-5 text-center shadow-md mx-auto flex flex-col items-center justify-between h-full">
            <img
              src="../assests/assests/background_image.jpg" 
              alt="Team Member"
              className="w-24 h-24 mb-2 mx-auto"
            />
            <h2 className="text-xl mb-2">{member.name}</h2>
            <p className="text-sm">Registration Number: {member.registrationNumber}</p>
            <p className="text-sm">Mobile Number: {member.mobileNumber}</p>
            <button
              className="bg-blue-500 text-white py-2 px-5 rounded-md cursor-pointer mt-3 transition-colors duration-300 hover:bg-[#1e5db8]"
            >
              {member.buttonLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
