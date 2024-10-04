"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from 'next/image';
import back from '../back.svg';

export default function Instructions() {
    const router = useRouter();
    const handleContinue = () => {
        router.push("./page1");
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
            <div
                className="flex flex-col h-[52vh] w-[90%] md:w-[60%] lg:w-[40%] border-black border rounded-xl shadow-xl overflow-hidden bg-[#6865C9] text-white items-center justify-center"
                style={{
                    border: '8px solid',
                    borderImageSource: 'linear-gradient(112.72deg, #A89AFC 30.87%, rgba(255, 255, 255, 0) 64.76%)',
                    borderImageSlice: 1,
                    borderRadius: '16px',
                }}
            >
                {/* Header */}
                <div className="text-3xl font-bold">
                    FUTUREPRENEURS 10.0
                </div>
                <div
                    className="py-[6%] text-5xl font-extrabold"
                    style={{
                        background: 'linear-gradient(180deg, #FFE35B 34.65%, #FFBA4C 77.17%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    ROUND 1
                </div>
                <button
                    className="px-4 py-2 font-semibold shadow-lg transition-transform transform bg-[#8381E7] text-white hover:scale-105 hover:bg-[#5754b3] border rounded-md"
                    onClick={handleContinue}
                    style={{
                        border: '2.84px solid',
                        borderImageSource: 'linear-gradient(101.11deg, #DAC9FF 38.45%, rgba(148, 120, 153, 0) 86.99%)',
                        borderImageSlice: 1,
                    }}
                >
                    Continue
                </button>
            </div>
        </div >
    );
}