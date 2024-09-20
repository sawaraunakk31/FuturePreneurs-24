import React, { useState } from 'react';

const MyModal = ({ isVisible, onClose, onConfirm, text }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md flex flex-col items-center relative">
        <h3 className="mb-5 text-lg font-semibold text-gray-800">{text}</h3>
        
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={onConfirm}
            className="bg-blue-600 text-white py-2 px-8 rounded-lg shadow hover:bg-blue-700 transition duration-300"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-8 rounded-lg shadow hover:bg-gray-400 transition duration-300"
          >
           No
          </button>
        </div>
      </div>
    </div>
  );
};

 const ChangeLeaderModal = ({ isOpen, onClose, members, onConfirm }) => {
  // Store the selected member's index
  const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md flex flex-col items-center relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          Which member do you want to choose as a new team leader?
        </h3>
        <ul className="w-full">
          {members.map((member, index) => (
            index !== 0 && ( // Ensure the first member (leader) is excluded
              <li key={index} className="mb-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="leader"
                    value={index} // Use index as value
                    onChange={() => setSelectedMemberIndex(index)} // Set index as selected
                    className="mr-2"
                  />
                  <span className="text-gray-700">{member.name}</span>
                </label>
              </li>
            )
          ))}
        </ul>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => {
              onConfirm(selectedMemberIndex); // Pass the selected index
              onClose(); // Close the modal
            }}
            disabled={selectedMemberIndex === null} // Disable if no member is selected
            className="bg-blue-600 text-white py-2 px-8 rounded-lg shadow hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-8 rounded-lg shadow hover:bg-gray-400 transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export {MyModal,ChangeLeaderModal};