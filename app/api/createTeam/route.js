import { connectMongo } from "@/libs/mongodb";
import { TeamModel } from "@/models/team.model";
import {Users} from "@/models/user.model"; // Import the User model
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
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
            }
            const name = user.name;
            const email = user.email;

        const {teamName} = await req.json();

        const existingTeamName = await TeamModel.findOne({teamName});

        if (existingTeamName) {
            return NextResponse.json({ message: "Team name already exists" }, {status: 400});
        }

        const newTeam = new TeamModel({
            teamName: teamName,
            leaderName: name,
            leaderEmail: email,
            teamLeaderId: userId,
            members: [userId]  // Initialize with userId in the members array
        });
        await newTeam.save();

        const teamId = await newTeam._id;
        
        const newUser = await Users.findByIdAndUpdate(userId,
            {$set:{
                teamId: teamId,
                teamLeaderId: userId,
                consent:false
            }},
            {new: true}
        )
        console.log('ghjk',newUser);
        newUser.save();

        return NextResponse.json({status:200},{message:"Team Created"});
    } catch (e) {
        console.error("Error", e);
        return NextResponse.json({ status: 500}, {message: "Internal Server Error" });
    }
}