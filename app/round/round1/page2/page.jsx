"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import back from '../back.svg';

export default function Document() {
    const [timeLeft, setTimeLeft] = useState(5);
    const [isTimerOver, setIsTimerOver] = useState(false);
    
    const router = useRouter();

    const handleContinue = () => {
        if (isTimerOver) {
            router.push("./page3");
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/assets/bonds.pdf';
        link.download = 'bonds.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) return prevTime - 1;
                setIsTimerOver(true);
                clearInterval(timer);
                return 0;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
                <div className="flex justify-between items-center bg-white py-4 px-6 h-[11vh] border-black border-b">
                    <h1 className="text-3xl font-semibold">Read Document</h1>
                    <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
                </div>

                {/* Instructions Body */}
                <div className="bg-[#F3F4F6] h-[60vh] overflow-y-auto shadow-inner">
                    <object
                        data="/assets/bonds.pdf"
                        type="application/pdf"
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                    ></object>
                </div>

                {/* Checkbox and Continue Button */}
                <div className="px-6 py-4 flex justify-between items-center bg-white rounded-b-xl h-[11vh] border-black border-t">
                    <button
                        className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600"
                        onClick={handleDownload}
                    >
                        Download PDF
                    </button>
                    {/* <Link href="/assets/bonds.pdf" passHref legacyBehavior>
                        <a
                            className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold shadow-lg transition-transform transform hover:scale-105 hover:bg-green-600" 
                            download
                        >
                            Download PDF
                        </a>
                    </Link> */}
                    <button
                        disabled={!isTimerOver}
                        className={`px-4 py-2 rounded-md font-semibold shadow-lg transition-transform transform ${isTimerOver
                            ? "bg-[#6865C9] text-white hover:scale-105 hover:bg-[#5754b3]"
                            : "bg-gray-300 text-gray-900 cursor-not-allowed"
                            }`}
                        onClick={handleContinue}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div >
    );
}