"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const Page3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [interest, setInterest] = useState(0);
  const router = useRouter();
 

  // Handle modal open/close
  const openModal = () => {
    setIsModalOpen(true);
  };

 /*  const closeModal = () => {
    setIsModalOpen(false);
  }; */


  const closeHandle =() =>
  {
    setIsModalOpen(false);
    setLoanAmount('');

  }

  // Handle input validation (only digits) and store as a number
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setLoanAmount(Number(value)); // Convert to number
      localStorage.setItem('loanAmount', value);
    }
  };

  // Check loan validation
  const handleCheckLoan = () => {
    const loanAmountNum = Number(loanAmount);
    if(! loanAmountNum){
      alert("Enter the loan amount");
    }
     else if (loanAmountNum >= 50000000 && loanAmountNum % 10000 === 0) {
      setLoanAmount(loanAmountNum); // Make sure it's a number
      
      openModal();
    } else if (loanAmountNum < 50000000) {
      setLoanAmount('');
      alert("The minimum loan amount you can apply for is ₹5 crore");
    } else {
      setLoanAmount('');
      alert("Loans should be in multiples of lakhs only");
    }
  };

  // Determine the interest based on the loan amount
  const handleLoan = (loanAmountNum) => {

    if (loanAmountNum >= 50000000 && loanAmountNum <= 100000000) {
      setInterest(13); // Set interest as a number
    } else if (loanAmountNum > 100000000 && loanAmountNum <= 150000000) {
      setInterest(17); // Set interest as a number
    } else if (loanAmountNum > 150000000 && loanAmountNum <= 200000000) {
      setInterest(21); // Set interest as a number
    } else {
      setInterest(25); // Set interest as a number
    }
  };

  // Handle continue and send data to the backend
  const handleContinue = async () => {
    try {
      const response = await fetch('/api/round1/loanTaking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loanAmount: Number(loanAmount), // Make sure loanAmount is sent as a number
          interest: Number(interest), // Make sure interest is sent as a number
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Loan applied successfully");
        router.push("./page4");
      }else if(response.status==402) 
      {
        alert("loan already taken");
        router.push("./page4");
      }
      else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Failed to apply for the loan", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-200 via-white-200 to-purple-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Loan</h1>
         {/* Slabs (without hover effect) */}
         <div className="bg-gray-100 p-2 rounded-md mb-4 text-sm text-center">
          Range: 5 Cr to 10 Cr<br/>Interest: 13%
        </div>
        <div className="bg-gray-100 p-2 rounded-md mb-4 text-sm text-center">
          Range: 10.1 Cr to 15 Cr<br/>Interest: 17%
        </div>
        <div className="bg-gray-100 p-2 rounded-md mb-4 text-sm text-center">
          Range: 15.1 Cr to 20 Cr<br/>Interest: 21%
        </div>
        <div className="bg-gray-100 p-2 rounded-md mb-4 text-sm text-center">
          Range: Above 20 Cr<br/>Interest: 25%
        </div> 
        <input
          type='number'
          step='10000'
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter the loan amount"
          value={loanAmount}
          onChange={(e) => {
            handleInputChange(e);
            handleLoan(Number(e.target.value)); 
          }}
        />
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleCheckLoan}
        >
          Take Loan
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-72 text-center">
            <p className="mb-4 text-lg">
              Are you sure you are taking a loan of {loanAmount} with {interest}% interest?
            </p>
            <div className="flex justify-around">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                onClick={handleContinue}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                onClick={closeHandle}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page3;
