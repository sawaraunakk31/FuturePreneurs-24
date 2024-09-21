import mongoose from "mongoose";
import { connectMongo } from "@/libs/mongodb";
import { Users } from "@/models/user.model";
import { TeamModel } from "@/models/team.model";
import { NextResponse } from "next/server";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
  try {      
    await connectMongo();
      
    const token = await getToken({ req });
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization')?.split(' ')[1];
    
    if (!auth) {
      return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
    }
    
    const userId = await getTokenDetails(auth);
    const leader = await Users.findById(userId);

    if (!leader) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const team = await TeamModel.findById(leader.teamId);

    if (!team) {
        return NextResponse.json({ message: "Team not found" }, { status: 404 });
    }

    leader.teamLeaderId = null;
    leader.teamId = null;
    leader.teamRole = null;
    await leader.save();

    await TeamModel.deleteOne({_id:  team._id});

    return NextResponse.json({ message: "Team deleted successfully" }, { status: 200 });

  } catch (err) {
    console.error("Error in leaderLeave:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
