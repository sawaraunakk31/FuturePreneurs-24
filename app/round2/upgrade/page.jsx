'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const UpgradeForm = () => {
    const router = useRouter(); // Initialize the router for navigation
    const [checkedInputs, setCheckedInputs] = useState([false, false, false, false]);
    const [timeRemaining, setTimeRemaining] = useState(0.1 * 60); // Example timer (0.1 minutes)
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

    // Function to handle checking inputs
    const handleCheck = (index) => {
        setCheckedInputs((prevChecked) =>
            prevChecked.map((checked, i) => (i === index ? !checked : checked))
        );
    };

    // Function to handle opening the confirmation dialog
    const handleSubmitClick = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Check if no checkbox is selected
        const isAnyCheckboxSelected = checkedInputs.some((checked) => checked);
        if (!isAnyCheckboxSelected) {
            alert('No checkbox is selected. Please select at least one option.');
            return; // Do not proceed to the confirmation dialog
        }

        setIsDialogOpen(true); // Open the confirmation dialog if at least one checkbox is selected
    };

    // Function to handle form submission
    const handleConfirmSubmit = async () => {
        setIsDialogOpen(false); // Close the dialog

        // Set flag in localStorage to trigger alert on next page load
        localStorage.setItem('formAutoSubmitted', 'true');

        router.replace('../../round2/venture'); // Redirect to venture folder
    };

    const handleCancelSubmit = () => {
        setIsDialogOpen(false); // Close the dialog
    };

    // Timer logic: update every second
    useEffect(() => {
        if (timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer); // Cleanup the timer on unmount
        } else {
            // Set flag in localStorage to trigger alert on next page load
            localStorage.setItem('formAutoSubmitted', 'true');

            alert('Time is up! The form has been automatically submitted.'); // Alert the user
            router.replace('../../round2/venture'); // Redirect to venture folder when timer hits 0
        }
    }, [timeRemaining, router]); // Added `router` as a dependency

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <main className="bg-gradient-to-br from-purple-600 via-white to-purple-400 w-full h-full">
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    {/* Timer display */}
                    <div className="text-center mb-6 text-lg font-bold text-red-600">
                        Time Remaining: {formatTime(timeRemaining)}
                    </div>

                    <h1 className="text-2xl font-semibold text-center mb-4">Upgrade</h1>
                    <form onSubmit={handleSubmitClick}>
                        {Array.from({ length: 3 }, (_, index) => (
                            <div className="mb-4" key={index}>
                                {/* Option label */}
                                <label
                                    className="block text-gray-700 font-bold mb-1"
                                    htmlFor={`option${index + 1}`}
                                >
                                    Option {index + 1}
                                </label>

                                {/* Checkbox and 1.5cr label */}
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`option${index + 1}`}
                                        name={`option${index + 1}`}
                                        checked={checkedInputs[index]}
                                        onChange={() => handleCheck(index)}
                                        className={`shadow appearance-none border rounded leading-tight focus:outline-none focus:shadow-outline h-4 w-4 transition ease-in-out duration-300 ${
                                            checkedInputs[index]
                                                ? 'bg-blue-600'
                                                : 'bg-gray-200'
                                        }`}
                                    />
                                    <label
                                        htmlFor={`option${index + 1}`}
                                        className="text-gray-700 font-bold"
                                    >
                                        Add 1.5cr
                                    </label>
                                </div>
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Submit
                        </button>
                    </form>

                    {/* Confirmation Dialog */}
                    {isDialogOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
                                <h2 className="text-lg font-bold mb-4">Confirm Submission</h2>
                                <p>Are you sure you want to submit the selected options?</p>
                                <div className="flex justify-between mt-4">
                                    <button
                                        onClick={handleConfirmSubmit}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={handleCancelSubmit}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default UpgradeForm;
