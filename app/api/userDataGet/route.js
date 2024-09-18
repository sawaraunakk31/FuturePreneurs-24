import { connectMongo } from "@/libs/mongodb";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { Users } from "@/models/user.model";
import { TeamModel } from "@/models/team.model";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectMongo();

    const token = await getToken({ req });
    const auth = token
      ? token.accessTokenFromBackend
      : req.headers.get("Authorization")?.split(" ")[1];

    if (!auth) {
      return NextResponse.json(
        { message: "Authorization token missing" },
        { status: 401 }
      );
    }

    const userId = await getTokenDetails(auth);

    const user = await Users.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const team = await TeamModel.findById(user.teamId);

    const teamMembers = await team.members;
    const finalMembers = [];
    for (let i = 0; i < teamMembers.length; i++) {
      let member = await Users.findById(teamMembers[i]);
      finalMembers.push(member);
    }

    return NextResponse.json(
      { message: "success", user: user, team: team, members: finalMembers },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "error", error: err.message },
      { status: 500 }
    );
  }
}
