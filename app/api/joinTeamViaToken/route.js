import { connectMongo } from "@/libs/mongodb";
import { TeamModel } from "@/models/team.model";
import { TeamToken } from "@/models/teamToken.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongo();
    const { teamCode } = await req.json();
    console.log("ggggggggggggggg",teamCode);
    const team = await TeamToken.findOne({ token: teamCode });

    if (!team) {
      return NextResponse.json({ error: "Token not found" });
    }
    const teamDetails = await TeamModel.findById(team.teamId);

    return NextResponse.json({
      message: "Team Details sent. ",
      status: 200,
      teamDetails: teamDetails,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error occurred ",}, {status: 500 });
  }
}
