import { connectMongo } from "@/libs/mongodb";
import { TeamModel } from "@/models/team.model";
import { TeamToken } from "@/models/teamToken.model";
import { Users } from "@/models/user.model";
import { getTokenDetails } from "@/utils/authuser";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    await connectMongo();

    const token = await getToken({ req });
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1];
    let userId = await getTokenDetails(auth);

    if (userId === "Token is null") {
      return NextResponse.json({
        message: "Token is null",
      }, {status:403});
    }

    const user = await Users.findById({ _id: userId });

    if (user.TeamId) {
      return NextResponse.json({
        message: "User is already a part of team",
      }, { status:503 });
    }

    const { teamCode } = await req.json();
    const team = await TeamModel.findOne({ teamCode: teamCode });
    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 504});
    }
    if (team.members.length === 4) {
      return NextResponse.json({ error: "Team is Full" });
    }
    const teamToken = await TeamToken.findOne({ teamId: team._id });
    if (!teamToken) {
      return res.status(404).json({ error: "Token not found" }, {status: 505});
    }
    // const currentTime = new Date();
    // const tokenCreationTime = token.createdAt;

    // const timeDifference =
    //     (currentTime - tokenCreationTime) / (1000 * 60); // Difference in minutes
    //have to change this

    // if (timeDifference > 1000000000) {
    //     // Token expired, prompt for a new token
    //     return NextResponse.json({
    //         error: 'Token expired. Ask leader to generate a new token.',
    //     });
    // }
    if (teamCode !== teamToken.token) {
      return NextResponse.json({ error: "Incorrect token" }, {status: 506});
    }
    await Users.findOneAndUpdate(
      { _id: userId },
      { $set: { teamId: team.id, teamRole: 1 } }
    );

    await TeamModel.findOneAndUpdate(
      {
        _id: team._id,
      },
      {
        $push: { members: userId },
      }
    );
    return NextResponse.json({
      message: "You have joined the team!",
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error occurred" }, {status:500});
  }
}
