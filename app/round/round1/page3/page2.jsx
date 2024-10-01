"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function Loan() {
    const [price, setPrice] = useState("");

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setPrice(value);
        }
    };

    const interestRates = [
        { range: "Below 1 Cr", rate: "5%" },
        { range: "1 Cr - 2.5 Cr", rate: "5%" },
        { range: "2.5 Cr - 5 Cr", rate: "6%" },
        { range: "5 Cr - 10 Cr", rate: "7%" },
        { range: "10 Cr - 20 Cr", rate: "8%" },
        { range: "Above 20 Cr", rate: "9%" },
    ];

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-yellow-200">
            <div className="flex flex-col w-[90%] h-[80%] border-purple-950 border-4 items-center rounded-lg shadow-2xl">
                <div className="text-3xl font-bold w-full h-[8vh] border-purple-950 border-b-4 text-center flex items-center justify-center bg-purple-950 text-white">
                    Loan Details
                </div>
                <div className="text-lg font-bold w-full h-[46vh] border-purple-950 border-b-4 p-8 overflow-y-auto bg-purple-100 text-purple-950">
                    <div className="grid grid-cols-3 gap-8">
                        {interestRates.map((rate, index) => (
                            <div
                                key={index}
                                className="p-4 bg-purple-950 text-white rounded-lg shadow-lg opacity-70 hover:opacity-80 hover:scale-101 transition-transform"
                            >
                                <h2 className="text-2xl font-semibold mb-2">Range: {rate.range}</h2>
                                <p className="text-xl">Interest Rate: {rate.rate}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-lg font-bold w-full h-[26vh] p-8 overflow-y-auto bg-purple-100 text-purple-950">
                    <textarea
                        className="p-2 border rounded-md h-auto w-full resize-none"
                        placeholder="Enter Price"
                        value={price}
                        onChange={handlePriceChange}
                        inputMode="numeric"
                    ></textarea>
                </div>
            </div>
        </div>
    );
}