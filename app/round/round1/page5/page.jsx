"use client";
import React, { useEffect, useState } from "react";

const Page4 = () => {
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        const date = new Date().toLocaleDateString("en-GB");
        setCurrentDate(date);
    }, []);

    const [lenderName, setLenderName] = useState("");
    const [registrationNumber, setRegistrationNumber] = useState("");
    const [teamLeaderName, setTeamLeaderName] = useState("");
    const [nominee1, setNominee1] = useState("");
    const [nominee2, setNominee2] = useState("");
    const [nominee3, setNominee3] = useState("");
    const [lenderSignature, setLenderSignature] = useState("");
    const [teamLeaderSignature, setTeamLeaderSignature] = useState("");

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-200 via-white-200 to-purple-400">
            <div className="flex flex-col items-center p-8">
                <h1 className="text-3xl font-bold mb-5">Loan Agreement</h1>
                <div className="w-full md:w-1/2 bg-gray-50 p-6 border rounded-lg shadow-lg">
                    <div className="overflow-y-auto h-96 p-4">
                        <p>This Loan Agreement (the 'Agreement') is entered into on <strong>{currentDate}</strong>, by and between:</p>

                        <div className="my-4">
                            <p className="font-semibold">Lender:</p>
                            <input
                                type="text"
                                placeholder="Lender's Full Legal Name"
                                value={lenderName}
                                onChange={(e) => setLenderName(e.target.value)}
                                className="border rounded p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Registration Number"
                                value={registrationNumber}
                                onChange={(e) => setRegistrationNumber(e.target.value)}
                                className="border rounded p-2 w-full mb-2"
                            />
                        </div>

                        <div className="my-4">
                            <p className="font-semibold">Team Leader:</p>
                            <input
                                type="text"
                                placeholder="Full Legal Name of the Team Leader"
                                value={teamLeaderName}
                                onChange={(e) => setTeamLeaderName(e.target.value)}
                                className="border rounded p-2 w-full mb-2"
                            />
                        </div>

                        <div className="my-4">
                            <p className="font-semibold">Nominees:</p>
                            <input
                                type="text"
                                placeholder="Full Legal Name of Nominee 1"
                                value={nominee1}
                                onChange={(e) => setNominee1(e.target.value)}
                                className="border rounded p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Full Legal Name of Nominee 2"
                                value={nominee2}
                                onChange={(e) => setNominee2(e.target.value)}
                                className="border rounded p-2 w-full mb-2"
                            />
                            <input
                                type="text"
                                placeholder="Full Legal Name of Nominee 3"
                                value={nominee3}
                                onChange={(e) => setNominee3(e.target.value)}
                                className="border rounded p-2 w-full mb-2"
                            />
                        </div>

                        <p className="font-bold mt-4">Declaration</p>
                        <p>
                            I, The Team Leader, along with the Nominees, hereby declare and affirm that they are jointly and severally liable for the repayment of the Loan. They undertake and covenant to pay the principal sum, along with any accrued interest, in accordance with the terms and conditions outlined in this Agreement. Failure to make timely payments will result in a breach of this Agreement and may lead to legal action, including but not limited to recovery of the outstanding amounts due.
                        </p>

                        <p className="font-bold mt-4">Loan Details</p>
                        <div className="mb-4">
                            <p className="font-semibold">1. Loan Amount: X</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">2. Interest Rate: Y%</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">3. Loan Term:</p>
                            <p>
                                The Loan shall be for a term of EOR (end of round) or UNTIL THE FULL AMOUNT IS PAID, commencing on ROUND 1 and ending when the amount is paid in full with interest . The Loan shall be compounded for 2 terms.</p>
                        </div>
                        <div className="mb-4">
                            <p className="font-semibold">4. Default:</p>
                            <p>
                                In the event the Team Leader or any of the Nominees fails to make any payment when due, or otherwise breaches this Agreement, the Loan shall be considered in default. The Lender may demand immediate repayment of the full outstanding principal and accrued interest.</p>
                        </div>

                        <p className="font-semibold">Signatures</p>
                        <div className="my-4">
                            <p className="font-semibold">Lender:</p>
                            <input
                                type="text"
                                placeholder="Signature of Lender"
                                value={lenderSignature}
                                onChange={(e) => setLenderSignature(e.target.value)}
                                className="border rounded p-2 w-full mb-2"
                            />
                        </div>
                        <div className="my-4">
                            <p className="font-semibold">Team Leader:</p>
                            <input
                                type="text"
                                placeholder="Signature of Team Leader"
                                value={teamLeaderSignature}
                                onChange={(e) => setTeamLeaderSignature(e.target.value)}
                                className="border rounded p-2 w-full mb-2"
                            />
                        </div>
                    </div>

                    {/* Buttons without footer-like style */}
                    <div className="flex justify-between mt-6">
                        <button className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600">Go Back</button>
                        <button className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page4;
