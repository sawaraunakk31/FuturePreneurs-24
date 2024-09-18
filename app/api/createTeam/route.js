import { connectMongo } from "@/libs/mongodb";
import { TeamModel } from "@/models/team.model";
import { Users } from "@/models/user.model"; // Import the User model
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { TeamToken } from "@/models/teamToken.model";

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

        const name = user.name;
        const email = user.email;
        const teamIdCheck = user.teamId;

        const { teamName } = await req.json();

        const existingTeamName = await TeamModel.findOne({ teamName });
        if (existingTeamName) {
            return NextResponse.json({ message: "Team name already exists" }, { status: 400 });
        }

        //Check if the user is in a team or not
        if (teamIdCheck!=null) {
            return NextResponse.json({ message: "You are already in a team" }, { status: 401 });      
        }

        let teamCode;
        let isUnique = false;

        // Keep generating new codes until we find a unique one
        while (!isUnique) {
            teamCode = Math.random().toString(36).substring(2, 10);
            const existingTeam = await TeamModel.findOne({ teamCode });
            if (!existingTeam) {
                isUnique = true;
            }
        }
        const newTeam = new TeamModel({
            teamName: teamName,
            leaderName: name,
            leaderEmail: email,
            teamLeaderId: userId,
            teamCode: teamCode, // Generate unique team code
            members: [userId]  // Initialize with userId in the members array
        });
        await newTeam.save();

        const newTeamToken = new TeamToken({
            teamId:newTeam._id,
            token:teamCode,
            createdAt: Date.now(),
        });
        await newTeamToken.save();

        console.log('asdfghjkl',newTeam);

        const teamId = newTeam._id;

        const newUser = await Users.findOneAndUpdate(
            { _id: userId },
            { $set: { teamId: teamId, teamLeaderId: userId, consent: false, teamRole: 0 } },
            { new: true }
        );
        newUser.save();

        return NextResponse.json({ message: "Team Created" }, { status: 200 });
    } catch (e) {
        console.error("Error", e);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
