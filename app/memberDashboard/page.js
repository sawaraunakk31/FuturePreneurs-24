'use client';
import React from 'react';
import img1 from '@/assests/assests/dashboard_image.png';

export default function Home() {
  const teamLeader = [
    { id: 1, name: 'Full Name', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX' },
  ];
  const teamMembers = [
    { id: 1, name: 'Full Name', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX', buttonLabel: 'Leave' },
    { id: 2, name: 'Full Name', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX', buttonLabel: 'Leave' },
    { id: 3, name: 'Full Name', registrationNumber: '2XXXXXXXX', mobileNumber: 'XXXXXXXXXX', buttonLabel: 'Leave' },
  ];

  return (
    <div className="bg-[url('../assests/assests/background_image.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-center p-5 text-white">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center drop-shadow-lg">Your Team</h1>

      {/* Grid for Team Leader and Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-screen-lg px-4">
        
        {/* Team Leader Card */}
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

        {/* Team Members Cards */}
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-[#141B2B] rounded-lg p-6 text-center shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-between"
          >
            <img src={img1.src} alt="Team Member" className="w-24 h-24 mb-4 rounded-full shadow-md" />
            <h2 className="text-2xl font-bold mb-2">{member.name}</h2>
            <p className="text-sm mb-1">Registration Number: {member.registrationNumber}</p>
            <p className="text-sm">Mobile Number: {member.mobileNumber}</p>
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-full mt-3 font-semibold transition-colors duration-300 hover:bg-[#1e5db8] focus:outline-none"
            >
              {member.buttonLabel}
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}
