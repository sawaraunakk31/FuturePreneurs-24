"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import LoadingIcons from "react-loading-icons";

const registerButton = () => {
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const [details, setDetails] = useState(null);
  const router = useRouter();

  // Memoized getData function to avoid re-creating it on every render
  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/userInfo", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessTokenBackend}`, // Fix the Authorization format
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch user info: ${res.status}`);
      }

      const data = await res.json();
      setDetails(data);
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  // Fetch data when the session is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      getData();
    } else {
      setLoading(false);
    }
  }, [status, getData]);

  // Memoized handleClick function to prevent unnecessary re-renders
  const handleClick = useCallback(() => {
    setLoading(true);

    if (details?.user?.hasFilledDetails) {
      if (details?.user?.teamId) {
        router.push(details?.user?.teamRole == 0 ? "/leaderDashboard" : "/memberDashboard");
      } else {
        setLoading(false);
        router.push("/");
        router.push("/join&createTeam");
      }
    } else {
      setLoading(false);
      router.push("/");
      router.push("/userDetails");
    }

    setLoading(false);
  }, [details, router]);

  return (
    <div className="absolute" style={{ top: "5%", left: "5%" }}>
      {status !== "authenticated" ? (
        <button
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:text-black"
          onClick={() => {
            // router.push('/');
            // setLoading(true);
            // signIn("google");
          }}
        >
          {loading ? <LoadingIcons.Oval /> : "Registrations Closed!"}
        </button>
      ) : (
        <button
          className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 px-10 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:text-black"
          onClick={handleClick}
          disabled={loading} // Disable button when loading to avoid duplicate clicks
        >
          {loading ? (
            <LoadingIcons.Oval />
          ) : (
            "Dashboard"
          )}
        </button>
      )}
    </div>
  );
};

export default registerButton;
