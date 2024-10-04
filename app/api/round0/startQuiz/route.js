import { connectMongo } from "@/libs/mongodb";
import { Round0 } from "@/models/round0.model";
import { TeamModel } from '@/models/team.model';
import { getTokenDetails } from "@/utils/getTokenDetails";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// Handle POST request to start the quiz
export async function POST(req) {
  await connectMongo();
  console.log('Inside POST route');

  const token = await getToken({ req });
  const auth = token
    ? token.accessTokenFromBackend
    : req.headers.get("Authorization")?.split(" ")[1];

  if (!auth) {
    return NextResponse.json({ message: "Unauthorized: Missing token" }, { status: 401 });
  }

  let userId = await getTokenDetails(auth);

  try {
    const qualTeam = await TeamModel.findOne({ teamLeaderId: userId });
    if (!qualTeam) {
      return NextResponse.json({ message: "Team not found" }, { status: 404 });
    }

    // Get current time in UTC
    const currentTime = new Date(); // Get current time in local time zone
    const quizStartTime = new Date(Date.UTC(2024, 9 - 1, 3, 22, 0, 0));

    // Check if current time is less than quiz start time
    if (currentTime < quizStartTime) {
      return NextResponse.json({
        message: "Quiz has not started yet",
        canStart: false,
      }, { status: 403 });
    }
    else {
      const round0Data = await Round0.findOne({ teamId: qualTeam._id });
      console.log("Existing Round0 Data:", round0Data);

      if (round0Data.questionCategory !== 'medium' || round0Data.questionPointer !== 0) {
        const updatedData = await Round0.findOneAndUpdate(
          { teamId: qualTeam._id },
          {
            $set: {
              questionCategory: 'medium',
              questionPointer: 0,
            },
          },
          { new: true }
        );

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
