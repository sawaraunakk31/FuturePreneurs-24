"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const Page3 = () => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanAmount, setLoanAmount] = useState('');
  const [interst,setInterst]=useState('');

  // Handle modal open/close
  const openModal = () => {
    setIsModalOpen(true);
  };

  const router = useRouter();
  const handleContinue = () => {
    router.push("./page4")
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleChange =(e) =>{
    handleInputChange(e);
    const loanAmount=e.target.value;
    handleLoan(loanAmount);

  }



  // Handle input validation (only digits)
  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      
      setLoanAmount(value);
      localStorage.setItem('loanAmount', value);
      }

    };
      // Allows only digits
    

  
    const handleCheckLoan =()=>{
      if( loanAmount>=50000000 && loanAmount % 10000===0)
      {
        setLoanAmount(loanAmount);
        openModal();
        
      }
  
      else if(loanAmount<50000000){
        setLoanAmount('');
        alert("The minimum loan amount you can apply for is ₹5 crore ");
        
     }
     else {
      setLoanAmount('');
      alert("Loans should be in multiples of lakhs only ");
      
   }
   };
    

  



  


  const handleLoan =(loanAmount) => {

     if(loanAmount>=50000000 && loanAmount<=100000000)
    {
      setInterst(13);
    }
    else if(loanAmount>100000000 && loanAmount<=150000000)
    {
      setInterst(17);
    }

    else if(loanAmount>15000000 && loanAmount<=200000000)
    {
      setInterst(21);
    }
    else{
      setInterst(25);
    }
  

  
  }

 

  

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-200 via-white-200 to-purple-400">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Loan</h1>
        
        {/* Slabs (without hover effect) */}
       {/*  <div className="bg-gray-100 p-2 rounded-md mb-4 text-sm text-center">
          Range: 2 Cr to 3 Cr<br/>Interest: 10%
        </div>
        <div className="bg-gray-100 p-2 rounded-md mb-4 text-sm text-center">
          Range: 3 Cr to 4 Cr<br/>Interest: 12%
        </div>
        <div className="bg-gray-100 p-2 rounded-md mb-4 text-sm text-center">
          Range: 4 Cr to 5 Cr<br/>Interest: 14%
        </div>
        <div className="bg-gray-100 p-2 rounded-md mb-4 text-sm text-center">
          Range: 5 Cr to 6 Cr<br/>Interest: 18%
        </div> */}

        <div>
          <h2 className='text-lg font-medium mb-4 text-cente'>NOTE:  The minimum loan amount you can apply for is ₹5 crore. </h2>
          
        </div>

        {/* Loan Amount Input */}
        <input type='number' step='10000'
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter the loan amount"
          value={loanAmount}
          onChange={handleChange}
          
        />

        {/* Take Loan Button */}
        <button
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={handleCheckLoan}
        >
          Take Loan
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-72 text-center">
            <p className="mb-4 text-lg">Are you sure you are taking loan of {loanAmount} with {interst} % Interest ?</p>
            <div className="flex justify-around">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
                onClick={handleContinue}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                onClick={closeModal}
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
