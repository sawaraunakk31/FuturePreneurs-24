import time from '@/constant/round0/time';
import { connectMongo } from "@/libs/mongodb";
import { Round0 } from "@/models/round0.model";
import { TeamModel } from '@/models/team.model';
import { Event1Test } from "@/models/user.model";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, res) {

  await connectMongo();
  console.log('inside route')
  
  const token = await getToken({ req });
  const auth = token
    ? token.accessTokenFromBackend
    : req.headers.get("Authorization").split(" ")[1];
    
  let userId = await getTokenDetails(auth);

  try {
    // Fetch the team based on the leader's userId
    const qualTeam = await TeamModel.findOne({ teamLeaderId: userId });

    if (!qualTeam) {
      return NextResponse.json({ message: "team not found" }, { status: 404 });
    }

    // Fetch the Round0 document associated with this team
    const round0Data = await Round0.findOne({ teamId: qualTeam._id });

    const quizStartTime = new Date("October 3, 2024 16:17:00");
    const currentTime = new Date();
    console.log('Current Time:', currentTime);
    console.log('Quiz Start Time:', quizStartTime);

    if (currentTime < quizStartTime) {
      return NextResponse.json({
        message: "Quiz has not started yet",
        canStart: false,
      }, { status: 403 });
    } else {
      // Log the existing round0Data for debugging
      console.log("Existing Round0 Data:", round0Data);

      if (round0Data.questionCategory !== 'medium' || round0Data.questionPointer !== 0) {
        // Update only if the values are not already set to the desired state
        const updatedData = await Round0.findOneAndUpdate(
          { teamId: qualTeam._id },
          {
            $set: {
              questionCategory: 'medium',
              questionPointer: 0,
            },
          },
          { new: true } // Return the updated document
        );

        // Log the updated document for debugging
        console.log("Updated Round0 Data:", updatedData);
        
        return NextResponse.json({ message: 'Round0 started', data: updatedData }, { status: 200 });
      } else {
        return NextResponse.json({ message: 'Round0 already started' }, { status: 200 });
      }
    }
  } catch (error) {
    console.error('Error in starting the quiz:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
