"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Instructions() {
    const [isChecked, setIsChecked] = useState(false);
    const router = useRouter();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleContinue = () => {
        if (isChecked) {
            router.push("../page2");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-yellow-200">
            <div className="flex flex-col w-[90%] h-[80%] border-purple-950 border-4 items-center rounded-lg shadow-2xl">
                <div className="text-3xl font-bold w-full h-[8vh] border-purple-950 border-b-4 text-center flex items-center justify-center bg-purple-950 text-white">
                    Instructions
                </div>
                <div className="text-lg font-bold w-full h-[72vh] px-4 pt-4 overflow-y-auto bg-purple-100 text-purple-950">
                    <ul className="list-disc list-inside pb-6">
                        <li>There are 25 items to bid on.</li>
                        <li>Each item will be available for 3 minutes.</li>
                        <li>The highest bidder will win the item.</li>
                        <li>The bidder with the highest wallet balance will win.</li>
                        <li>There are 25 items to bid on.</li>
                        <li>Each item will be available for 3 minutes.</li>
                        <li>The highest bidder will win the item.</li>
                        <li>The bidder with the highest wallet balance will win.</li>
                        <li>There are 25 items to bid on.</li>
                        <li>Each item will be available for 3 minutes.</li>
                        <li>The highest bidder will win the item.</li>
                        <li>The bidder with the highest wallet balance will win.</li>
                        <li>There are 25 items to bid on.</li>
                        <li>Each item will be available for 3 minutes.</li>
                        <li>The highest bidder will win the item.</li>
                        <li>The bidder with the highest wallet balance will win.</li>
                        <li>There are 25 items to bid on.</li>
                        <li>Each item will be available for 3 minutes.</li>
                        <li>The highest bidder will win the item.</li>
                        <li>The bidder with the highest wallet balance will win.</li>
                    </ul>
                    <div className="text-xl font-bold w-full h-[10vh] border--purple-950 border-t-4 border-purple-950 text-center flex flex-row items-center justify-between align-middle">
                        <div className="flex items-center justify-items-start">
                            <input
                                type="checkbox"
                                id="accept"
                                className="mr-2"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="accept">I have read the Instructions and accept them.</label>
                        </div>
                        <button
                            className={`px-2 py-1 bg-purple-950 text-white rounded-md shadow-xl ${isChecked ? 'opacity-80 hover:opacity-100 hover:scale-110' : 'opacity-40 cursor-not-allowed'} justify-items-end`}
                            disabled={!isChecked}
                            onClick={handleContinue}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}