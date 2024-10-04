'use client';
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Venturepage = () => {
    const router = useRouter();

    // Function to prevent the context menu from opening
    const disableRightClick = (event) => {
        event.preventDefault();
    };

    // Function to prevent keyboard shortcuts for opening dev tools
    const handleKeyDown = (event) => {
        if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
            event.preventDefault(); // Prevent default action
            alert("Inspecting elements is disabled.");
        }
    };

    useEffect(() => {
        // Attach event listeners
        window.addEventListener('contextmenu', disableRightClick);
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('contextmenu', disableRightClick);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <main className="bg-gradient-to-br from-purple-600 via-white to-purple-400 w-full h-[100vh]">
            {/* Your content goes here */}
        </main>
    );
};

export default Venturepage;
