import { connectMongo } from "@/libs/mongodb";
import { TeamModel } from "@/models/team.model";
import { Users } from "@/models/user.model"; // Import the User model
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/getTokenDetails";

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
        const { index } = await req.json();

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const team = await TeamModel.findOne({ teamLeaderId: userId });

        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

        const members = team.members;
        const userToBeRemovedId = members[index];

        const userToBeRemoved = await Users.findById(userToBeRemovedId);

        if (!userToBeRemoved) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        members.splice(index,1);

        team.members = members;
        await team.save();

        userToBeRemoved.teamLeaderId = null;
        userToBeRemoved.teamId = null;
        userToBeRemoved.teamRole = null;
        await userToBeRemoved.save();

        return NextResponse.json({ message: "You have been removed successfully" }, { status: 200 });
    } catch (e) {
        console.error("Error", e);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
