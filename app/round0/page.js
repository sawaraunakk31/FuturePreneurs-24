"use client";
// import Loader from "@/components/LoadingScreen";
import AnswerForQualifier from "@/components/round0/Answer";
import Instructions from "@/components/round0/instructions";
import QualifierTimer from "@/components/round0/timer";
import QuestionForQualifier from "@/components/round0/Question";
import QuizEnd from "@/components/round0/quizend";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcons from "react-loading-icons";
import Loader from "@/components/round0/loader";
import bgWebsite from "../../assests/assests/bg_website.png";
import ecellLogo from "/assests/assests/ecell.jpg"; // Ensure the path is correct
import vitLogo from "/assests/assests/vit logo.png";
import swLogo from "/assests/assests/sw.png";
import Image from "next/image";
import fpLogo from "@/assests/assests/changed.png"


export default function Qualifier() {
  const [questionCategory, setQuestionCategory] = useState("instruction");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [chronoNumber, setChronoNumber] = useState(0);
  const [teamName, setTeamName] = useState("");
  const [finalAnswer, setFinalAnswer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [test,setTest] = useState('');


  // useEffect(()=>{
  //   const fetchData = async () => {
  //     if (router.isReady) {
  //       if (status === "unauthenticated") {
  //           router.push("/");
  //       } else if (status === "authenticated") {
  //           try {
  //               const userData = await getUserData();
  //               const questionData = await getQuestionData();
  //           } catch (error) {
  //               // Handle errors if necessary
  //               console.error("Error fetching data:", error);
  //           }
  //       }
  //   }
  // };


  // fetchData();
  // },[]);
 
  useEffect(()=>{
    if(status==="unauthenticated"){
      router.push('/');
    }else if(status==="authenticated"){
      setIsLoading(true);
      getUserData();
      getQuestionData();
    }
  },[status,test])


  const checkRound = () => {
    setIsLoading(true);
    setIsLoading(true);
    fetch(`/api/checkRound`, {
      content: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.level == 0){
          setIsLoading(false);
        }else{
          router.push('/');
        }
        setIsLoading(false);
      });
  };

  const autoSubmit = () => {
    setIsLoading(true);
    console.log('hii');
    setIsLoading(true);
    fetch(`/api/round0/autoSubmit`, {
      content: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then(() => {
        setIsLoading(false);
      });
  };


  const getUserData = () => {
    console.log('hii');
    setIsLoading(false);
    fetch(`/api/userInfo`, {
      content: 'application/json',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const user = data.user;
        // setIsLoading(false);
        if (user?.hasFilledDetails) {
            if (user?.teamId == null) {
              router.push('/');
            } else {
              if (user?.teamRole != 0) {
                toast.error("Only leader's can access the quiz");
                router.push('/');
              } else {
                setIsLoading(false);
              }
            }
          }else{
            toast.error('Please register the Event first')
            router.push('/')
          }
        }
      );
  };


  const handleSubmit = async() => {
    setIsLoading(true);
    console.log("submit button is clicked");
    console.log(finalAnswer);
    try {
      const response = await fetch("/api/round0/submitAnswer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
        body: JSON.stringify({
          answer: finalAnswer,
        }),
      });
      if (response.ok) {
        console.log(response);
        setFinalAnswer([]);
        setIsLoading(false);
        getQuestionData();
        setTest(response);
        // location.reload();
      } else {
        console.log("error");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };


  const getQuestionData = () => {
    console.log("hello");
    setIsLoading(false);


    fetch(`/api/round0/getQuestion`, {
      content: "application/json",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessTokenBackend}`,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setQuestionCategory(data.category);
        console.log(questionCategory);
        setQuestionNumber(data.questionNumber);
        console.log(data.questionNumber);
        setChronoNumber(data.chronoNumber);
        console.log(data.chronoNumber);
        setTeamName(data.teamName);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };


  return (
    <main className="min-h-screen pt-[5rem] p-6"
    style={{
      backgroundImage: `url(${bgWebsite.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {isLoading && <Loader />}
      <section>
      <div className="flex justify-between items-start w-full h-fit md:w-full">
{/* ECELL and FP Logos - Left */}
<div className="flex items-center px-5 space-x-6">
  <Image
    src={ecellLogo}
    alt="ECELL Logo"
    width={150}
    height={50}
    className="cursor-pointer pl-2"
    onClick={() => router.push("/")}
  />
  {/* FP Logo - Just after ECELL Logo */}
  <Image
    src={fpLogo}
    alt="FP Logo"
    width={50}
    height={50}
    className="cursor-pointer"
  />
</div>


{/* VIT and SW Logos - Right */}
<div className="flex flex-col items-start ml-auto pr-8 space-y-1"> {/* Added pr-8 to shift VIT logo left */}
  <Image
    src={vitLogo}
    alt="VIT Logo"
    width={150}
    height={100}
    className="pl-2"
  />
  <Image
    src={swLogo}
    alt="Student Welfare Logo"
    width={150}
    height={250}
  />
</div>
</div>




        {/* {isLoading && <Loader />} */}
        <div className="gap-2 z=1">
          {questionCategory === "instruction" && <Instructions />}
          {questionCategory !== "instruction" &&
            questionCategory !== "waiting" && (
              <div className= "text-black">
                <QualifierTimer teamName={teamName} autoSubmit={autoSubmit}/>
                <QuestionForQualifier
                  questionCategory={questionCategory}
                  questionNumber={questionNumber}
                  chronoNumber={chronoNumber}
                  setChronoNumber={setChronoNumber}
                  setQuestionNumber={setQuestionNumber}
                  className=""
                />
                <AnswerForQualifier
                  questionCategory={questionCategory}
                  questionNumber={questionNumber}
                  chronoNumber={chronoNumber}
                  finalAnswer={finalAnswer}
                  setChronoNumber={setChronoNumber}
                  setQuestionNumber={setQuestionNumber}
                  setFinalAnswer={setFinalAnswer}
                />
                <div className="w-full flex  justify-center items-center">
                  {(questionCategory === "hard" && chronoNumber === 4) ? (
                    <button
                      id="nextButton"
                      type="submit"
                      disabled={isLoading}
                      onClick={handleSubmit}
                      className="px-4 py-2  text-white rounded-full cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 mt-4 w-1/4 md:w-1/6 h-12 hover:scale-105 transition-all flex items-center justify-center font-bold"
                    >
                      {isLoading ? (
                        <LoadingIcons.Oval color="black" height="20px" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  ) : (
                    <button
                      id="submitButton"
                      type="submit"
                      disabled={isLoading}
                      onClick={handleSubmit}
                      className="px-4 py-2 text-white rounded-full cursor-pointer bg-gradient-to-r from-purple-500 to-blue-500 mt-4 w-1/4 md:w-1/6 h-12 hover:scale-105 transition-all flex items-center justify-center font-bold"
                    >
                      {isLoading ? (
                        <LoadingIcons.Oval color="black" height="20px" />
                      ) : (
                        "Next"
                      )}
                    </button>
                  )}
                 
                </div>
              </div>
            )}
          {questionCategory === "waiting" && <QuizEnd />}
        </div>
      </section>
    </main>
  );
}

