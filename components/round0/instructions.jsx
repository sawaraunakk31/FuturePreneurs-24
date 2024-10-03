"use client";
//import time from "@/constant/round0/time";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CountdownTimer from "./counter1[1]";
//import LoadingIcons from "react-loading-icons";
//import formLinks from "@/constant/round0/form";

const Instructions = () => {
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [timeRemaining, setTimeRemaining] = useState(60);
  const { data: session, status } = useSession();
  const targetDate = new Date("2024-10-03T21:00");

  /* const calculateTimeRemaining = () => {
    const now = new Date().getTime();

    const targetTime = new Date(
      2024,
      3,
      time.quizStartTime.day,
      time.quizStartTime.hour,
      time.quizStartTime.minute,
      time.quizStartTime.second
    );
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      // Target date has passed
      setButtonEnabled(true);
      return { minutes: "00", seconds: "00", hours: "00" };
    }

    if (Math.floor(timeDiff / 1000) <= 0) {
      console.log("asdf");
    }

    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining);

  
  useEffect(() => {
    // if early then disable button

    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining);
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); */

  // useEffect(() => {
  //   if (timeRemaining > 0) {
  //     const timerInterval = setInterval(() => {
  //       setTimeRemaining((prev) => prev - 1);
  //     }, 1000);

  //     return () => clearInterval(timerInterval); // Clear interval when component unmounts
  //   } else if (timeRemaining == 0) {
  //     setButtonEnabled(true); // Enable button when timer reaches 0
  //   }
  // }, [timeRemaining]);

  const startQuiz = () => {
    // e.preventDefault();
    // console.log("inside");
    setLoading(true);
    fetch("/api/round0/startQuiz", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: session?.accessTokenBackend
          ? `Bearer ${session.accessTokenBackend}`
          : "",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => {
        console.log("inside response", res);
        console.log(res.status);
        if (res.status == 200) {
          console.log("quizStartingNow.");
          location.reload();
        } else if (res.status == 403) {
          toast.error("Quiz has not started yet");
        } else {
          toast.error("too late");
        }
        setLoading(false);
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="min-h-[100vh] text-black flex flex-col items-center">
      <div className="flex flex-col items-start w-[90vw] px-8 py-4 border rounded-xl m-2 text-xl">
        <div className="px-[43%]">
          <CountdownTimer targetDate={targetDate} />
        </div>
        <p>
        Welcome to the Qualifying Round of Futurepreneurs 10.0!
        </p>
        <br />
        <p>
        This qualifying round will evaluate your entrepreneurial knowledge, and business understanding. Your performance on this quiz will determine your eligibility to advance to the next round.
        </p>
        <br />
        <p>
        Quiz Instructions:
        </p>
        <ul className="list-inside list-disc">
          <li>
          Participants can start the quiz between 10 PM to 10:30 PM.
          </li>
          <li>
          The duration of the quiz is 40 minutes. The last submission will be at 11.10 PM.
          </li>
          <li>
          The Quiz can only be accessed from the Team Leaders dashboard with the Leader's registered email ID.
          </li>
          <li>
          Only one submission per team will be accepted. Multiple submissions will result in disqualification of the team.
          </li>
          <li>
          The quiz can only be submitted after completion, otherwise, it will auto-submit after 40 minutes.
          </li>
          <li>
          The Quiz contains only Single Choice Correct questions.
          </li>
          <li>
          There is no negative marking..
          </li>
          <li>
          You can skip the questions, but you cannot navigate backwards.
          </li>
        </ul>
      </div>
      <Toaster />
    </main>
  );
};

export default Instructions;
