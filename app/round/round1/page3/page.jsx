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
import logo from '../logo.svg';

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
    const handleContinue = () => {
        setIsOverlayOpen(true);
    };
    const closeOverlay = () => {
        setIsOverlayOpen(false);
    };
    const openConfirm = () => {
        setIsOverlayOpen(false);
        setIsConfirmOpen(true);
    };
    const closeConfirm = () => {
        setIsConfirmOpen(false);
    };
    const openAgreement = () => {
        setIsConfirmOpen(false);
        setIsAgreementOpen(true);
    };
    const closeAgreement = () => {
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

    const getName = (id) => {
        const obj = file.find(item => item.id == id);
        return obj ? (obj.name.length > 24 ? `${obj.name.substring(0, 20)}...` : obj.name) : 'Unknown Company';
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
                                    setSelectedItem(selectedItem && selectedItem.id === item.id ? null : {id: index+1, name: getName(index+1), highestBid: 0 })
                                }}
                            >
                                <h2 className={`text-xl font-bold ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'text-white'
                                    : 'text-[#8481FA]'
                                }`}>{`Item ${index + 1}`}</h2>
                                <p className={`text-sm pt-2 pb-1 ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'text-white'
                                    : 'text-black'
                                }`}>Highest</p>
                                <p className={`font-semibold pb-1 px-2 rounded-md w-[100%] ${
                                    selectedItem && selectedItem.id === index+1 
                                    ? 'text-black bg-white'
                                    : 'text-white bg-[#8481FA]'
                                }`}>₹{(0).toFixed(2)}Cr</p>
                            </div>
                        ))}
                    </div>

                    {/* Item Details */}
                    <div className="w-1/4 p-6 pl-0">
                        <div className="py-4 h-full flex flex-col justify-between bg-[linear-gradient(114deg,rgba(232,232,232,0.10)_15.11%,rgba(0,56,255,0.10)_81.96%)] border-white border-4 shadow-xl rounded-2xl">
                            {selectedItem ? (
                                <>
                                    <div className="text-center h-[15%]">
                                        <h1 className="text-xl font-bold text-black">{selectedItem.name}</h1>
                                    </div>
                                    <hr className="border-white border-2 w-full mb-2"/>
                                    <div className="m-2 h-full">
                                        <ul className="list-inside text-black">
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Current Bid</span>
                                                <span className="bg-white w-[40%] px-2 text-right">₹{0}</span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Revenue</span>
                                                <span className="bg-white w-[40%] px-2 text-right">{selectedItem.id}</span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Profit</span>
                                                <span className="bg-white w-[40%] px-2 text-right">{selectedItem.id}</span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Value</span>
                                                <span className="bg-white w-[40%] px-2 text-right">{selectedItem.id}</span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Yield</span>
                                                <span className="bg-white w-[40%] px-2 text-right">{selectedItem.id}</span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>Rating</span>
                                                <span className="bg-white w-[40%] px-2 text-right">{selectedItem.id}</span>
                                            </li>
                                            <hr className="border-white w-full my-1"/>
                                            <li className="flex justify-between items-center font-semibold">
                                                <span>D/E Ratio</span>
                                                <span className="bg-white w-[40%] px-2 text-right">{selectedItem.id}</span>
                                            </li>
                                        </ul>
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
                        <div className="text-2xl font-bold h-[15%] w-full text-center pt-6">
                            Do You Wish To Apply For Loan ?
                        </div>
                        <div className="text-md font-bold py-4 px-6 w-[60%] mx-auto text-center flex flex-col md:flex-row bg-opacity-50 bg-white text-black items-center justify-between rounded-lg shadow-md m-1">
                            <span className="mb-2 md:mb-0">Range: 5Cr to 10Cr</span>
                            <span>Interest: 13%</span>
                        </div>
                        <div className="text-md font-bold py-4 px-6 w-[60%] mx-auto text-center flex flex-col md:flex-row bg-opacity-50 bg-white text-black items-center justify-between rounded-lg shadow-md m-1">
                            <span className="mb-2 md:mb-0">Range: 10Cr to 15Cr</span>
                            <span>Interest: 17%</span>
                        </div>
                        <div className="text-md font-bold py-4 px-6 w-[60%] mx-auto text-center flex flex-col md:flex-row bg-opacity-50 bg-white text-black items-center justify-between rounded-lg shadow-md m-1">
                            <span className="mb-2 md:mb-0">Range: 15Cr to 20Cr</span>
                            <span>Interest: 21%</span>
                        </div>
                        <div className="text-md font-bold py-4 px-6 w-[60%] mx-auto text-center flex flex-col md:flex-row bg-opacity-50 bg-white text-black items-center justify-between rounded-lg shadow-md m-1">
                            <span className="mb-2 md:mb-0">Range: Above 20Cr</span>
                            <span>Interest: 25%</span>
                        </div>
                        <input
                            type='number'
                            step='100000'
                            className="mt-5 p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                            placeholder="Enter the loan amount"
                            value={loanAmount}
                        />
                        <div className="flex justify-between w-1/3 mt-2">
                            <button
                                className="px-4 py-2 font-semibold shadow-lg transition-transform transform bg-[#8381E7] text-white hover:scale-105 hover:bg-[#5754b3] border rounded-md"
                                onClick={openConfirm}
                            >
                                Confirm
                            </button>
                            <button
                                className="px-4 py-2 font-semibold shadow-lg transition-transform transform bg-[#8381E7] text-white hover:scale-105 hover:bg-[#5754b3] border rounded-md"
                                onClick={closeOverlay}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>    
                </div>
            )}

            {isConfirmOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
                    <div className="flex flex-col h-[80vh] w-[90%] md:w-[70%] lg:w-[50%] border-white border-4 rounded-xl shadow-xl overflow-hidden bg-[#6865C9] text-white items-center justify-center">
                        {/* Header */}
                        <div className="text-2xl font-bold h-[15%] w-full text-center pt-6">
                            Your Applied Loan Amount is
                        </div>
                        <div className="text-lg font-bold py-4 px-6 w-[60%] mx-auto text-center flex flex-col md:flex-row bg-opacity-50 bg-white text-black items-center justify-centre rounded-lg shadow-md m-1">
                            <span>₹{loanAmount}Cr/-</span>
                        </div>
                        <div className="flex justify-between w-1/3 mt-2">
                            <button
                                className="px-4 py-2 font-semibold shadow-lg transition-transform transform bg-[#8381E7] text-white hover:scale-105 hover:bg-[#5754b3] border rounded-md"
                                onClick={openAgreement}
                            >
                                Confirm
                            </button>
                            <button
                                className="px-4 py-2 font-semibold shadow-lg transition-transform transform bg-[#8381E7] text-white hover:scale-105 hover:bg-[#5754b3] border rounded-md"
                                onClick={closeConfirm}
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