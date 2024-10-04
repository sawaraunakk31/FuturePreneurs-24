'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingScreen from "@/components/LoadingScreen";

const LoanConfirmationModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleContinue = () => {
    setIsLoading(true); 
    setTimeout(() => {
      router.push('/round2/page2');
    }, 1000); 
  };

  const handleNo = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/round2/upgrade');
    }, 1000); 
  };

  return (
    <>
      <button onClick={openModal} className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Take Another Loan
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-72 text-center">
            {isLoading ? (
              <div className="flex justify-center items-center h-32 ">
                <LoadingScreen />
              </div>
            ) : (
              <>
                <p className="mb-4 text-lg">Do you want to take another loan?</p>
                <div className="flex justify-around">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                    onClick={handleContinue}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    onClick={handleNo}
                  >
                    No
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoanConfirmationModal;
