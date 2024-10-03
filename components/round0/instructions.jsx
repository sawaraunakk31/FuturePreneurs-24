"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CountdownTimer from "./counter1[1]";

const Instructions = () => {
  const [buttonEnabled, setButtonEnabled] = useState(false); // Manages button state
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const targetDate = new Date("2024-10-03T22:00");

  // Function to check current time and enable button between 22:00 and 22:30
  const checkTime = () => {
    const currentTime = new Date();
    const startTime = targetDate.getTime(); // 22:00
    const endTime = new Date("2024-10-03T22:30").getTime(); // 22:30
    const currentTimestamp = currentTime.getTime();

    //Enable the button when the current time is between 22:00 and 22:30
    if (currentTimestamp >= startTime && currentTimestamp <= endTime) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  };

  useEffect(() => {
    // Check time every second
    const intervalId = setInterval(checkTime, 1000);

    // Initial check
    checkTime();

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const startQuiz = () => {
    setLoading(true);
    fetch("/api/round0/startQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: session?.accessTokenBackend
          ? `Bearer ${session.accessTokenBackend}`
          : "",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        setLoading(false);

        // Handle different status codes here
        if (res.status === 200) {
          toast.success("Quiz started successfully.");
          location.reload();
          return res.json(); // Process the valid JSON response
        } else if (res.status === 403) {
          toast.error("Quiz has not started yet.");
        } else if (res.status === 404) {
          toast.error("Team not found.");
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }

        // Return an empty object to avoid parsing issues if no JSON is returned
        return {};
      })
      .then((data) => {
        if (Object.keys(data).length !== 0) {
          // Process data if it's not an empty object
          console.log(data);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error("An error occurred while starting the quiz.");
        console.log(err);
      });
  };

  return (
    <main className="min-h-[100vh] text-black flex flex-col items-center">
      <div className="flex flex-col items-start w-[90vw] px-8 py-4 border rounded-xl m-2 text-xl">
        <div className="px-[43%]">
          <CountdownTimer targetDate={targetDate} />
        </div>
        <p>Welcome to the Qualifying Round of Futurepreneurs 10.0!</p>
        <br />
        <p>
          This qualifying round will evaluate your entrepreneurial knowledge and business
          understanding. Your performance on this quiz will determine your eligibility to
          advance to the next round.
        </p>
        <br />
        <p>Quiz Instructions:</p>
        <ul className="list-inside list-disc">
          <li>Participants can start the quiz between 10 PM to 10:30 PM.</li>
          <li>
            The duration of the quiz is 40 minutes. The last submission will be at 11.10
            PM.
          </li>
          <li>
            The Quiz can only be accessed from the Team Leaders dashboard with the
            Leader's registered email ID.
          </li>
          <li>
            Only one submission per team will be accepted. Multiple submissions will
            result in disqualification of the team.
          </li>
          <li>
            The quiz can only be submitted after completion, otherwise, it will
            auto-submit after 40 minutes.
          </li>
          <li>The Quiz contains only Single Choice Correct questions.</li>
          <li>There is no negative marking.</li>
          <li>You can skip the questions, but you cannot navigate backwards.</li>
          <br/>
          <p class="flex flex-row justify-center items-center pl-[34%] text-4xl font-bold ">THE QUIZ IS NOW OVER!</p>

        </ul>
      </div>
      <div>
        {/* <button
          className={`px-4 py-2 rounded-full text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none m-4 w-full h-12 flex items-center justify-center font-bold hover:opacity-80`}
          onClick={() => startQuiz()}
          disabled={!buttonEnabled} // Disable until time hits 22:00 and after 22:30
        >
          {loading ? "Loading..." : buttonEnabled ? "Start Quiz" : "Quiz Locked"}
        </button> */}
      </div>
      <Toaster />
    </main>
  );
};
export default Instructions;
