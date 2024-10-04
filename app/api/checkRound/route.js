import { connectMongo } from "@/libs/mongodb";
import { TeamModel } from "@/models/team.model";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectMongo();
  try {
    const token = await getToken({ req });
    const auth = token
      ? token.accessTokenFromBackend
      : req.headers.get("Authorization").split(" ")[1];
    let userId = await getTokenDetails(auth);

    const team = await TeamModel.findOne({ teamLeaderId: userId });
    if (!team) {
      return NextResponse.json({ message: "team not found" }, { status: 404 });
    }

    const level = team.level;

    return NextResponse.json(
      {
        message: "Successfully got the next question!",
        level: level,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}