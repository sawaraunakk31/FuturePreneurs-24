"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page2() {
    const [timeLeft, setTimeLeft] = useState(6); // 10 minutes countdown
    const [isTimerOver, setIsTimerOver] = useState(false);
    
    const router = useRouter();

    const handleContinue = () => {
        if (isTimerOver) {
            router.push("./page3");
        }
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
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = "/path-to-pdf/Class and objects.pdf"; // Path to your uploaded PDF (TO BE ADDED)
        link.download = "Hello ji.pdf";
        link.click();
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-200 via-white-200 to-purple-400">
            <div className="p-6 rounded-xl bg-white shadow-2xl w-[80%] md:w-[60%] lg:w-[40%] relative">
                {/* Heading */}
                <div className="flex justify-between items-center pb-4 mb-6">
                    <h1 className="text-2xl font-semibold">Document</h1>
                    <span className="text-lg font-bold">{formatTime(timeLeft)}</span>
                </div>

                {/* Inner Box for Document Content */}
                <div className="bg-gray-100 p-4 mb-6 rounded-lg h-64 overflow-auto shadow-inner">
                    <p className="text-gray-700 text-justify justify-center items-center leading-relaxed">
                        The Importance of Time Management
                        Time management is an essential skill that allows individuals to prioritize tasks and allocate their time effectively to achieve their goals. In today’s fast-paced world, where distractions abound and the demand for productivity is high, mastering time management can lead to significant improvements in both personal and professional life.
                        At its core, time management involves planning and organizing how much time you spend on specific activities. Good time management enables you to work smarter, not harder, ensuring that you get more done in less time, even when time is tight and pressures are high. It also helps reduce stress, enhance focus, and promote a sense of control over your life.
                        One of the key components of effective time management is setting clear goals. Goals should be specific, measurable, achievable, relevant, and time-bound (SMART). By defining what you want to achieve, you can prioritize your tasks accordingly. For example, if your goal is to complete a project by a certain date, you can break down the project into smaller tasks, set deadlines for each task, and allocate time for them in your schedule.
                        <br /><br />Another important aspect of time management is prioritization. Not all tasks are created equal; some are more important or urgent than others. The Eisenhower Matrix, which categorizes tasks based on urgency and importance, can be a helpful tool. Tasks can be divided into four quadrants: urgent and important, important but not urgent, urgent but not important, and neither urgent nor important. By focusing on tasks that fall into the first two categories, you can ensure that you’re spending your time on activities that truly matter.
                        In addition to prioritization, learning to say no is crucial for effective time management. With numerous commitments and responsibilities vying for your attention, it’s easy to overextend yourself. By recognizing your limits and declining requests that don’t align with your goals or values, you can free up time for what truly matters.
                        Finally, technology can be an ally in managing time effectively. Various apps and tools are available to help track tasks, set reminders, and create schedules. These tools can streamline processes and enhance productivity, allowing individuals to make the most of their time.
                        In conclusion, time management is a vital skill that can lead to greater success and fulfillment. By setting clear goals, prioritizing tasks, learning to say no, and leveraging technology, anyone can improve their time management skills and enjoy the benefits of a more organized and productive life.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4">
                    {/* Download PDF Button */}
                    <button
                        onClick={handleDownload}
                        className="p-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-md shadow-lg transition-transform transform hover:scale-105"
                    >
                        Download PDF
                    </button>

                    {/* Proceed Button */}
                    <button
                        disabled={!isTimerOver}
                        className={`p-3 text-white font-bold rounded-md shadow-lg transition-transform transform hover:scale-105 ${isTimerOver
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-400 cursor-not-allowed"
                            }`}
                            onClick={handleContinue}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
}
