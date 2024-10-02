import time from "@/constant/round0/time";
import { connectMongo } from "@/libs/mongodb";
import { Round0 } from "@/models/round0.model"; 
import { TeamModel } from "@/models/team.model";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  // Connect to MongoDB
  await connectMongo();

  // Get the token from the request
  const token = await getToken({ req });
  const auth = token
    ? token.accessTokenFromBackend
    : req.headers.get("Authorization").split(" ")[1];
  
  let userId = await getTokenDetails(auth);

  try {
    const startTime = new Date().getTime();
    const endTime = startTime + 1000 * 60 * time.round0; // Add quiz duration

    console.log("User ID:", userId); // Debugging log
    console.log("User ID Type:", typeof userId); 

    // Use findOne to directly query for the user's team by teamLeaderId
    const team = await TeamModel.findOne({ teamLeaderId: userId });

    if (!team) {
      // If no team is found for the user, return an error
      return NextResponse.json({ message: "Team not found for this user." }, { status: 404 });
    }

    const teamId = team._id;  // Extract team ID
    const teamData = await Round0.findOne({ _id: teamId });

    if (!teamData.startTime) {
      // If startTime is not set, update the document with startTime and endTime
      await Round0.findOneAndUpdate(
        { _id: teamId },
        { startTime, endTime }
      );
      return NextResponse.json(
        {
          message: "Time set successfully",
          startTime,
          endTime,
        },
        { status: 200 }
      );
    } else {
      // If the time is already set, return the existing startTime and endTime
      return NextResponse.json(
        {
          message: "Time already set",
          startTime: teamData.startTime,
          endTime: teamData.endTime,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log("Error:", error);  // Log the error
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
