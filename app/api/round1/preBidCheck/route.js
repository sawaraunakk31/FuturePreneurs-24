import { connectMongo } from "@/libs/mongodb";
import { Users } from "@/models/user.model";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { TeamModel } from "@/models/team.model";

export async function POST(req) {
    try {
        await connectMongo();

        const token = await getToken({ req });
        const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization')?.split(' ')[1];

        if (!auth) {
            return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
        }

        const userId = await getTokenDetails(auth);

        const user = await Users.findById(userId);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const teamId = user.teamId;
        const team = await TeamModel.findById(teamId);
        const teamName = await (team.teamName);
    
        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

        if (team.teamLeaderId.toString() !== userId.toString()) {
            return NextResponse.json({ message: "You are not the team leader" }, { status: 403 });
        }

        return NextResponse.json({ 
            message: "Authenticated successfully", 
            teamName,
        }, { status: 200 });

    } catch (e) {
        console.error("Error", e);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}