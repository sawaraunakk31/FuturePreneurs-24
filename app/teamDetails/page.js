<<<<<<< HEAD
export default function page(){
    return (
        <main>
            Register successfully!!
        </main>
    );
}
=======
'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const TeamDetails = () => {
  const [teamCode] = useState('ABC123');
  const [teamName, setTeamName] = useState('');
  const teamLink = `https://fp/${teamCode}`;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="h-[100vh] flex items-center justify-center text-white font-sans bg-[url('../assests/assests/background_image.jpg')] bg-cover bg-center">
      <div className="w-[90%] max-w-[20rem] md:w-[95%] md:max-w-[28rem] lg:max-w-[32rem] p-[1.5rem] md:p-[2rem] bg-gray-800 rounded-lg shadow-lg flex flex-col justify-between md:h-[32rem] lg:h-[26rem]">
        <div className="text-center mb-[1.5rem]">
          <h1 className="text-[1.75rem] md:text-[2.5rem] lg:text-[3rem] font-bold pb-[0.5rem]">Enter Team Details</h1>
        </div>

        <input
          className="w-[85%] px-[1rem] py-[0.75rem] text-center text-black text-[1.125rem] md:text-[1.25rem] rounded-md mb-[1.5rem] mx-auto"
          type="text"
          placeholder="Enter Team Name here"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />

        <div className="flex items-center justify-start md:justify-between mb-[1.25rem] whitespace-nowrap">
          <span className="text-[1.125rem] md:text-[1.25rem] ml-[1rem]">{teamCode}</span>
          <button
            className="text-[0.875rem] md:text-[1.125rem] text-gray-400 hover:text-white flex items-center ml-auto md:ml-0 mr-[1rem]"
            onClick={() => handleCopy(teamCode)}
          >
            <FontAwesomeIcon className="mr-[0.5rem]" icon={faCopy} />Click here to copy
          </button>
        </div>

        <div className="flex items-center justify-start md:justify-between mb-[1.5rem] whitespace-nowrap">
          <span className="text-[1rem] md:text-[1.25rem] break-all ml-[1rem] mr-[0.5rem]">{teamLink}</span>
          <button
            className="text-[0.875rem] md:text-[1.125rem] text-gray-400 hover:text-white flex items-center ml-auto md:ml-0 mr-[3rem]"
            onClick={() => handleCopy(teamLink)}
          >
            <FontAwesomeIcon className="mr-[0.5rem] md:ml-[1rem] lg:ml-[5rem]" icon={faCopy} /> Click here to copy
          </button>
        </div>

        <div className="text-center font-bold">
          <h2 className="text-[1.5rem] md:text-[2rem] lg:text-[2rem] pb-[0.75rem]">Share with Members!</h2>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
>>>>>>> 87388eda33e6a847434da4986d8e873054aff070
