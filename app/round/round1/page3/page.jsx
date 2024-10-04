"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { socket } from "@/app/socket.js";
import LoadingScreen from "@/components/LoadingScreen";
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import back from '../back2.svg';
import file from '@/public/constant/round1/bonds.json';
import { set } from "mongoose";
import logo from '../logo.png';

export default function PreBidder() {
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();
    const [items, setItems] = useState([]);
    const [timeLeft, setTimeLeft] = useState(900);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isAgreementOpen, setIsAgreementOpen] = useState(false);
    const [isBiddingStart, setIsBiddingStart] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [team, setTeam] = useState("BharatwaleJain");
    const [loanAmount, setLoanAmount] = useState(null);
    const [interest, setInterest] = useState(null);
    const [score, setScore] = useState(null);
    const [currentDate, setCurrentDate] = useState("");
    const [lenderName, setLenderName] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [teamLeaderName, setTeamLeaderName] = useState("");
    const [nominee1, setNominee1] = useState("");
    const [nominee2, setNominee2] = useState("");
    const [nominee3, setNominee3] = useState("");
    const [lenderSignature, setLenderSignature] = useState("");
    const [teamLeaderSignature, setTeamLeaderSignature] = useState("");

    useEffect(() => {
        const date = new Date().toLocaleDateString("en-GB");
        setCurrentDate(date);
    }, []);

    const divRef = useRef(null);
    useEffect(() => {
        if (isBiddingStart) {
            if (divRef.current) {
                divRef.current.scrollTop = 0;
            }
            setSelectedItem(null);
        }
    }, [isBiddingStart]);

    const router = useRouter();
    const handleInputChange = (e) => {
        let value = e.target.value;
        value = value.replace(/[^0-9]/g, '');
        if (value.length > 10) {
            toast.error('Value cannot exceed 999.99 Cr.', { duration: 500 });
            return;
        }
        setLoanAmount(value);
        setInterest(0.15);
        setScore(65);
    };
    const handleContinue = () => {
        setIsOverlayOpen(true);
    };
    const closeOverlay = () => {
        setIsOverlayOpen(false);
    };
    const openConfirm = () => {
        let numericValue = parseInt(loanAmount, 10);
        if (numericValue % 100000 !== 0) {
            toast.error('Please enter a value in multiples of 1 lakh.');
            return;
        }
        if (numericValue > 9999900000) {
            toast.error('Value cannot exceed 999.99 Cr.');
            return;
        }
        setIsOverlayOpen(false);
        setIsConfirmOpen(true);
    };
    const closeConfirm = () => {
        setIsConfirmOpen(false);
        setIsOverlayOpen(true);
    };
    const openAgreement = () => {
        setIsConfirmOpen(false);
        setIsAgreementOpen(true);
    };
    const closeAgreement = () => {
        setIsAgreementOpen(false);
    };
    const doneAgreement = () => {
        setIsAgreementOpen(false);
    };

    useEffect(() => {
        async function fetchData() {
            const data = Array.from({ length: 50 }, (v, i) => ({
                id: i + 1,
                name: `Item ${i + 1}`,
                price: 0,
            }));
            setItems(data);
        }
        fetchData();

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) return prevTime - 1;
                setIsBiddingStart(true);
                clearInterval(timer);
                toast.error("Bidding is started.");
                return 0;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [status]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const getObject = (id) => {
        const obj = file.find(item => item.id == id);
        return obj ? obj : null;
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <Toaster />
            {loading && <LoadingScreen />}
            <div className="absolute inset-0 -z-10">
                <Image
                    src={back}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt="Background"
                />
            </div>
            <div className="flex flex-col w-[90%] lg:w-[80%] border-black border shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-center bg-[#6865C9] text-white py-4 px-6 text-center h-[10vh] border-white border-4 shadow-xl scale-105 rounded-xl">
                    <h1 className="text-2xl font-semibold">{team}</h1>
                    <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
                    <button
                        className="px-4 py-1.5 bg-[#FFE55B] text-[#573712] rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105 hover:bg-[#FFBE5C]"
                        onClick={handleContinue}
                    >
                        Apply Loan
                    </button>
                </div>

                {/* Main content */}
                <style jsx>{`
                    .hide-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;  /* Safari and Chrome */
                    }
                    @keyframes blink {
                        0% { opacity: 1; }
                        50% { opacity: 0; }
                        100% { opacity: 1; }
                        100% { opacity: 1; }
                    }
                    .blink-text {
                        animation: blink 1s forwards;
                    }
                `}</style>
                <div
                    ref={divRef}
                    className={`flex bg-[#F3F4F6] text-black leading-relaxed w-full h-[72vh] overflow-hidden ${
                        isBiddingStart ? 'pointer-events-none' : ''
                    }`}
                    style={{
                        background: 'linear-gradient(180deg, #FFF 0%, #DAD0FF 47%, #FFF 100%)',
                    }}>
                    {/* Items Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 p-8 w-3/4 overflow-y-auto hide-scrollbar">
                        {items.map((item, index) => (
                            <div
                                key={index+1}
                                className={`p-4 justify-center rounded-2xl shadow-lg transform transition-transform duration-300 ease-in-out text-center cursor-pointer border-white border-4 ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'bg-[#8481FA] scale-110 transition-transform cursor-pointer'
                                    : 'bg-[linear-gradient(114deg,rgba(232,232,232,0.10)_15.11%,rgba(0,56,255,0.10)_81.96%)] hover:scale-105 cursor-pointer'
                                }`}
                                onClick={() => {
                                    setSelectedItem(selectedItem && selectedItem.id === item.id ? null : {id: index+1, obj: getObject(index+1), highestBid: 0 })
                                }}
                            >
                                <h2 className={`text-xl font-bold ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'text-white'
                                    : 'text-[#8481FA]'
                                }`}>{`Bond ${index + 1}`}</h2>
                                <p className={`text-sm pt-2 pb-1 ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'text-white'
                                    : 'text-black'
                                }`}>Highest Bid</p>
                                <p className={`font-semibold pb-1 px-2 rounded-md w-[100%] ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'text-black bg-white'
                                    : 'text-white bg-[#8481FA]'
                                }`}>
                                    <span className={selectedItem && selectedItem.id === index + 1 ? 'blink-text text-black' : 'text-white'}>
                                        ₹{(0).toFixed(2)} Cr
                                        {/* ₹{(item.highestBid / 10000000).toFixed(2)} Cr */}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Item Details */}
                    <div className="w-1/4 p-6 pl-0">
                        <div className="pt-4 pb-0 h-full flex flex-col justify-between bg-[linear-gradient(114deg,rgba(232,232,232,0.10)_15.11%,rgba(0,56,255,0.10)_81.96%)] border-white border-4 shadow-xl rounded-2xl">
                            {selectedItem ? (
                                <>
                                    <div className="text-center h-[10%]">
                                        <h1 className="text-xl font-bold text-black">{selectedItem.obj.name.length > 24 ? `${selectedItem.obj.name.substring(0, 20)}...` : selectedItem.obj.name}</h1>
                                    </div>
                                    <hr className="border-white border-2 w-full mb-2"/>
                                    <div className="m-2 h-[60%]">
                                        <ul className="list-inside text-black">
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Current Bid</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    ₹ {(selectedItem.highestBid/10000000).toFixed(2)} Cr
                                                </span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Net Revenue</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    ₹ {(selectedItem.obj.revenue/10000000).toFixed(2)} Cr
                                                </span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Profit</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    ₹ {(selectedItem.obj.profit/10000000).toFixed(2)} Cr
                                                </span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Cash Reserve</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    ₹ {(selectedItem.obj.reserve/10000000).toFixed(2)} Cr
                                                </span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Yield</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    {selectedItem.obj.yield}
                                                </span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Rating</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    {selectedItem.obj.rating}
                                                </span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>D/E Ratio</span>
                                                <span className="bg-white w-[40%] px-2 text-right">
                                                    {selectedItem.obj.ratio}
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                    <hr className="border-white border-2 w-full mt-2"/>
                                    <div className="p-2 pb-0 text-left h-[30%] text-sm font-semibold text-black overflow-hidden text-wrap">
                                        {selectedItem.obj.overview.length > 175 ? `${selectedItem.obj.overview.substring(0, 170)}...` : selectedItem.obj.overview}
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col justify-center items-center h-full text-center">
                                    <h1 className="text-xl text-black">No Item Selected</h1>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {isOverlayOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
                    <div className="flex flex-col h-[80vh] w-[90%] md:w-[70%] lg:w-[50%] border-white border-4 rounded-xl shadow-xl overflow-hidden bg-[#6865C9] text-white items-center justify-center">
                        {/* Header */}
                        <div className="text-2xl font-bold mb-6 w-full text-center">
                            Do You Wish To Apply For Loan ?
                        </div>
                        <div className="text-md font-bold py-2 px-4 w-[70%] lg:w-[60%] mx-auto text-center flex flex-col md:flex-row bg-opacity-25 bg-white text-black items-center justify-between rounded-lg shadow-md m-2">
                            <span className="mb-2 md:mb-0">Range: 5Cr to 10Cr</span>
                            <span>Interest: 15%</span>
                        </div>
                        <div className="text-md font-bold py-2 px-4 w-[70%] lg:w-[60%] mx-auto text-center flex flex-col md:flex-row bg-opacity-25 bg-white text-black items-center justify-between rounded-lg shadow-md m-2">
                            <span className="mb-2 md:mb-0">Range: 10Cr to 15Cr</span>
                            <span>Interest: 18%</span>
                        </div>
                        <div className="text-md font-bold py-2 px-4 w-[70%] lg:w-[60%] mx-auto text-center flex flex-col md:flex-row bg-opacity-25 bg-white text-black items-center justify-between rounded-lg shadow-md m-2">
                            <span className="mb-2 md:mb-0">Range: 15Cr to 20Cr</span>
                            <span>Interest: 21%</span>
                        </div>
                        <div className="text-md font-bold py-2 px-4 w-[70%] lg:w-[60%] mx-auto text-center flex flex-col md:flex-row bg-opacity-25 bg-white text-black items-center justify-between rounded-lg shadow-md m-2">
                            <span className="mb-2 md:mb-0">Range: Above 20Cr</span>
                            <span>Interest: 25%</span>
                        </div>
                        <div className="relative w-1/3">
                            <span className="absolute left-3 top-[52%] align-middle transform -translate-y-1/2 text-[#573712] font-bold text-2xl">₹</span>
                            <input
                                type='text'
                                step='100000'
                                className="my-5 p-2 pl-9 border w-full border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-[#FFE55B] text-[#573712]"
                                placeholder="Enter the Loan Amount"
                                value={loanAmount}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex justify-between w-2/5 mt-2">
                            <button
                                className="px-6 py-1.5 bg-[#FFE55B] text-[#573712] rounded-md font-bold shadow-lg transition-transform transform hover:scale-105 hover:bg-[#FFBE5C] border"
                                onClick={openConfirm}
                            >
                                Confirm
                            </button>
                            <button
                                className="px-6 py-1.5 bg-[#FFE55B] text-[#573712] rounded-md font-bold shadow-lg transition-transform transform hover:scale-105 hover:bg-[#FFBE5C] border"
                                onClick={closeOverlay}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>    
                </div>
            )}

            {isConfirmOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
                    <div className="flex flex-col h-[80vh] w-[90%] md:w-[70%] lg:w-[50%] border-white border-4 rounded-xl shadow-xl overflow-hidden bg-[#6865C9] text-white items-center justify-center my-auto">
                        {/* Header */}
                        <div className="text-2xl font-bold h-[20%] w-full text-center pt-6">
                            Your Applied Loan Amount is
                        </div>
                        <div className="flex flex-row w-full h-[40%] items-center justify-center px-2">
                            {/* Left Section */}
                            <div className="flex flex-col w-2/3 px-10">
                                <div className="text-2xl font-bold py-2 w-[80%] text-center bg-opacity-40 bg-white text-black rounded-lg shadow-md my-2">
                                    ₹ {(loanAmount / 10000000).toFixed(2)} Cr /-
                                </div>
                                <div className="text-md font-bold py-2 w-[80%] text-center bg-opacity-40 bg-white text-black rounded-lg shadow-md mt-2 mb-5">
                                    @{(interest * 100).toFixed(2)}% Interest with CIBIL of {score}
                                </div>
                                <button
                                    className="px-6 py-2 w-[40%] bg-[#FFE55B] text-[#573712] rounded-md font-bold shadow-lg transition-transform transform hover:scale-105 hover:bg-[#FFBE5C] border my-2"
                                    onClick={openAgreement}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="px-6 py-2 w-[40%] bg-white text-[#573712] rounded-md font-bold shadow-lg transition-transform transform hover:scale-105 hover:bg-gray-300 border my-2"
                                    onClick={closeConfirm}
                                >
                                    Go Back
                                </button>
                            </div>
                            {/* Right Section */}
                            <div className="flex w-1/3 items-center justify-center">
                                <Image
                                    src={logo}
                                    className="w-[80%] h-auto"
                                />
                            </div>
                        </div>
                    </div>    
                </div>
            )}

            {isAgreementOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
                    <div className="flex flex-col h-[80vh] w-[90%] md:w-[70%] lg:w-[50%] border-white border-4 rounded-xl shadow-xl overflow-hidden bg-[#6865C9] text-white items-center justify-center">
                        {/* Header */}
                        <div className="text-2xl font-bold w-full text-center pb-2">
                            Loan Agreement
                        </div>
                        <div className="flex flex-row w-full h-[70%] p-4">
                            <style jsx>{`
                                .hide-scrollbar {
                                    -ms-overflow-style: none;
                                    scrollbar-width: none;
                                }
                                .hide-scrollbar::-webkit-scrollbar {
                                    display: none;  /* Safari and Chrome */
                                }
                                @keyframes blink {
                                    0% { opacity: 1; }
                                    50% { opacity: 0; }
                                    100% { opacity: 1; }
                                    100% { opacity: 1; }
                                }
                                .blink-text {
                                    animation: blink 1s forwards;
                                }
                                .placeholder-black::placeholder {
                                    color: black;
                                }
                            `}</style>
                            <div className="px-4 overflow-y-auto hide-scrollbar text-md text-black">
                                <p>This Loan Agreement (the 'Agreement') is entered into on <strong>{currentDate}</strong>, by and between:</p>
                                <div className="my-4">
                                    <p className="font-semibold mb-1">Lender:</p>
                                    <div className="border rounded p-2 w-full mb-2 bg-white bg-opacity-15 font-bold">
                                        Lender's Full Legal Name
                                    </div>
                                </div>
                                <div className="my-4">
                                    <p className="font-semibold mb-1">Team Leader:</p>
                                    <div className="border rounded p-2 w-full mb-2 bg-white bg-opacity-15 font-bold">
                                        Team Leader's Full Legal Name
                                    </div>
                                </div>

                                <div className="my-4">
                                    <p className="font-semibold mb-1">Nominees:</p>
                                    <div className="border rounded p-2 w-full mb-2 bg-white bg-opacity-15 font-bold">
                                        Particpant 1's Full Legal Name
                                    </div>
                                    <div className="border rounded p-2 w-full mb-2 bg-white bg-opacity-15 font-bold">
                                        Particpant 2's Full Legal Name
                                    </div>
                                    <div className="border rounded p-2 w-full mb-2 bg-white bg-opacity-15 font-bold">
                                        Particpant 3's Full Legal Name
                                    </div>
                                </div>

                                <p className="font-bold mt-4">Declaration</p>
                                <p>
                                    I, the Team Leader, along with the Nominees, hereby declare and affirm that they are jointly and severally liable for the repayment of the Loan. They undertake and covenant to pay the principal sum, along with any accrued interest, in accordance with the terms and conditions outlined in this Agreement. Failure to make timely payments will result in a breach of this Agreement and may lead to legal action, including but not limited to recovery of the outstanding amounts due.
                                </p>

                                <p className="font-bold mt-4 mb-2">Loan Details</p>
                                <div className="border rounded py-2 px-5 w-full mb-2 bg-white bg-opacity-15 flex flex-row items-center justify-between font-bold">
                                    <span className="mb-2 md:mb-0">1. Loan Amount</span>
                                    <span>₹ {(loanAmount / 10000000).toFixed(2)} Cr /-</span>
                                </div>
                                <div className="border rounded py-2 px-5 w-full mb-2 bg-white bg-opacity-15 flex flex-row items-center justify-between font-bold">
                                    <span className="mb-2 md:mb-0">2. Interest Rate</span>
                                    <span>@ {(interest * 100).toFixed(2)} %</span>
                                </div>

                                <p className="font-bold mt-4 mb-1">Loan Term</p>
                                <p>The Loan shall be for a term of EOR (end of round) or UNTIL THE FULL AMOUNT IS PAID, commencing on ROUND 1 and ending when the amount is paid in full with interest . The Loan shall be compounded for 2 terms.</p>
                                <p className="font-bold mt-4 mb-1">Default</p>
                                <p>In the event the Team Leader or any of the Nominees fails to make any payment when due, or otherwise breaches this Agreement, the Loan shall be considered in default. The Lender may demand immediate repayment of the full outstanding principal and accrued interest.</p>
                                
                                <p className="font-bold mt-4 mb-1">Signatures</p>
                                <div className="my-4">
                                    <p className="font-semibold mb-1">Lender:</p>
                                    <div className="border rounded p-2 w-full mb-2 bg-white bg-opacity-15 font-bold">
                                        Signature of Lender
                                    </div>
                                    <p className="font-semibold mb-1">Team Leader:</p>
                                    <input
                                        type="text"
                                        placeholder="Signature of Team Leader"
                                        value={teamLeaderSignature}
                                        onChange={(e) => setTeamLeaderSignature(e.target.value)}
                                        className="border rounded p-2 w-full mb-2 bg-white bg-opacity-15 font-bold text-black placeholder-gray-800  "
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between w-2/3 mt-2">
                            <button
                                className="px-6 py-1.5 bg-[#FFE55B] text-[#573712] rounded-md font-bold shadow-lg transition-transform transform hover:scale-105 hover:bg-[#FFBE5C] border"
                                onClick={doneAgreement}
                            >
                                Confirm
                            </button>
                            <button
                                className="px-6 py-1.5 bg-[#FFE55B] text-[#573712] rounded-md font-bold shadow-lg transition-transform transform hover:scale-105 hover:bg-[#FFBE5C] border"
                                onClick={closeAgreement}
                            >
                                Go Back
                            </button>
                        </div>
                    </div>    
                </div>
            )}
        </div >
    );
}