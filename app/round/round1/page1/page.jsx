"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from 'next/image';
import back from '../back.svg';

export default function Instructions() {
    const [isChecked, setIsChecked] = useState(false);
    
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    
    const router = useRouter();
    const handleContinue = () => {
        if (isChecked) {
            router.push("./page2");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="absolute inset-0 -z-10">
                <Image
                    src={back}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt="Background"
                />
            </div>
            <div className="flex flex-col w-[90%] md:w-[60%] lg:w-[40%] border-black border rounded-xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="text-3xl font-semibold bg-[#6865C9] text-white py-4 text-center h-[11vh] border-black border-b">
                    Instructions
                </div>
                {/* Instructions Body */}
                <div className="p-6 bg-[#F3F4F6] text-black leading-relaxed h-[60vh] overflow-y-auto">
                    <ul className="list-disc list-inside space-y-2 text-md font-light">
                        <li>Ensure that your wallet is fully loaded before the auction starts.</li>
                        <li>Each item has a reserve price, and bids must meet or exceed this value.</li>
                        <li>The auction clock will start as soon as the item is displayed.</li>
                        <li>You can only bid once per item within the 3-minute window.</li>
                        <li>If you win an item, it will be added to your account immediately.</li>
                        <li>Bidders can track their total spending via their dashboard.</li>
                        <li>If there is a tie in the highest bid, the first bid placed will win.</li>
                        <li>Bidders will receive notifications for winning or losing an item.</li>
                        <li>The auction ends once all 25 items have been sold.</li>
                        <li>If no bids meet the reserve price, the item will not be sold.</li>
                        <li>Remember to manage your time wisely during the bidding process.</li>
                        <li>Once an item is sold, the next auction will begin immediately after.</li>
                        <li>Bidders are not allowed to withdraw their bids once placed.</li>
                        <li>The leaderboard will update after each item is sold.</li>
                        <li>Make sure you’re connected to a stable internet connection for bidding.</li>
                        <li>All bids are final, and refunds are not available after the bid is placed.</li>
                    </ul>
                </div>
                {/* Checkbox and Continue Button */}
                <div className="px-6 py-4 flex justify-between items-center bg-white rounded-b-xl h-[11vh] border-black border-t">
                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            id="accept"
                            className="w-5 h-5 border-gray-300 rounded-md focus:ring-0 focus:ring-offset-0"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor="accept" className="text-gray-800 text-md">
                            I have read the instructions and accept them.
                        </label>
                    </div>
                    <button
                        className={`px-4 py-2 rounded-md font-semibold shadow-lg transition-transform transform ${isChecked
                            ? "bg-[#6865C9] text-white hover:scale-105 hover:bg-[#5754b3]"
                            : "bg-gray-300 text-gray-900 cursor-not-allowed"
                            }`}
                        disabled={!isChecked}
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div >
    );
}