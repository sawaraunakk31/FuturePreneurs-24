import React from "react";

const MyModal = ({ isVisible, onClose, text, onConfirm }) => {
  if (!isVisible) return null;

  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md flex flex-col items-center relative">
        <h3 className="mb-5 text-lg font-semibold text-gray-800">{text}</h3>
        
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white py-2 px-8 rounded-lg shadow hover:bg-red-600 transition duration-300"
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

export default MyModal;
