"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import LoadingIcons from "react-loading-icons";

const JoinTeam = ({ teamCode: propTeamCode }) => {
  const [teamCode, setTeamCode] = useState(propTeamCode || "");
  const [teamName, setTeamName] = useState("");
  const [message, setMessage] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalLoading, setIsMoadalLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     //Checks if session is not ready and redirects to root.

  //     router.push("/");
  //   } else if (status === "authenticated") {
  //     router.push('/')
  //     // toast.success("Logged In");
  //     getUserData();
  //     localStorage.setItem("asdf", "asdf");
  //   }
  // }, [status, router]);

  useEffect(()=>{
    getUserData();
  })

  const getUserData = () => {
    fetch(`/api/userDetails`, {
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
        const user = data.user;
        if (user.hasFilledDetails == false) {
          router.push("/userDetails");
        } else {
            if (user.teamId) {
              const redirect =
                user.teamRole == "1"
                  ? "/memberDashboard"
                  : "/leaderDashboard";
              router.push(redirect);
            }
        }
      });
  };

  useEffect(() => {
    if (propTeamCode) {
      simulateTyping(propTeamCode);
    }
  }, [propTeamCode]);

  const simulateTyping = async (code) => {
    for (let i = 0; i < code.length; i++) {
      setTeamCode(code.substring(0, i + 1));
      await new Promise((resolve) => setTimeout(resolve, 300)); // Delay for typing effect
    }

    // To auto click the button
    // setTimeout(() => {
    //   fetchTeamName();
    // }, 800);
  };

  const fetchTeamName = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/getTeamViaToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.accessTokenBackend,
        },
        body: JSON.stringify({ teamCode: teamCode }),
      });

      if (response.ok) {
        const data = await response.json();

        setTeamName(data.teamDetails.teamName);
        setShowDialog(true); // Show the dialog box
      } else {
        showMessage("Team code not found. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      showMessage("An error occurred while fetching team name.");
      setLoading(false);
    }
    // TODO: ShowMessage if already in a team
  };

  const handleConfirmJoin = async () => {
    // Send a request to the API to join the team with the team code.
    setIsMoadalLoading(true);
    try {
      const response = await fetch("/api/joinTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.accessTokenBackend,
        },
        body: JSON.stringify({ teamCode: teamCode }),
      });

      if (response.ok) {
        setIsMoadalLoading(false);
        showMessage("Successfully joined the team.", "success");
        setShowDialog(false);
        setTimeout(() => {
          window.location.href = "/memberDashboard";
        }, 1000);
      } else {
        showMessage(
          "Failed to join the team. Please check the team code.",
          "error"
        );
      }
    } catch (error) {
      setIsMoadalLoading(false);
      console.log("Error joining the team:", error);
      showMessage("An error occurred while joining the team.", "error");
    }
  };

  const showMessage = (text, type = "info") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage("");
    }, 5000); // Hide the messages after 5 seconds
  };

  return (
    <div className="bg-white h-[100vh] w-[100vw] flex flex-col items-center justify-around">
      <NavBar/>
      <div className="bg-[#141B2B] h-[45vh] w-[70vw] md:h-[57vh] md:w-[45vw] rounded-md flex flex-col justify-center">
        <div className="text-2xl lg:text-4xl font-bold text-center py-8 text-white">
          Enter Team Code
        </div>
        <div className="flex flex-col gap-4 w-[inherit] justify-around content-center">
          <div className="flex flex-col justify-center items-center gap-8">
          <form>
            <input 
              type="text" 
              placeholder="Enter Team Code" 
              className="w-[53vw] md:w-[30vw] lg:w-[15vw] focus:font-bold active:scale-95 transition-all duration-300 rounded-md p-2 text-black"/>
            <button type="Submit" className=" items-center md-7 rounded-3xl w-[30vw] md:w-[20vw] lg:w-[11vw] bg-gradient-to-b from-[#FF7E7E] to-[#FFEF99] transition-transform ease-in-out duration-300 hover:scale-110 active:scale-95 bg-blue-500 text-white p-2 border">
              Join Team
            </button>
          </form>
          {message && (
            <div
              className={`mt-4 border ${
                message.type === "success"
                  ? "border-green-500 text-green-500"
                  : "border-red-500 text-red-500"
              } bg-white dark:bg-gray-800 p-2 rounded-md`}
            >
              {message.text}
            </div>
          )}

          {/* Dialog Box */}
          {showDialog && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-96">
                <p className="text-gray-700 dark:text-gray-300">
                  Do you want to join Team-{teamName}?
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    disabled={isModalLoading}
                    className="bg-blue-500 text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded px-4 py-2 hover:bg-blue-600 focus:outline-none mr-2"
                    onClick={() => handleConfirmJoin()}
                  >
                    {isModalLoading ? (
                      <LoadingIcons.Oval height="20px" />
                    ) : (
                      "Yes"
                    )}
                  </button>
                  <button
                    className="text-gray-500 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none"
                    onClick={() => {
                      setShowDialog(false);
                      setLoading(false);
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default JoinTeam;
