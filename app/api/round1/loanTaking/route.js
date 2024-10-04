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
        const teamLeader = await (team.leaderName);
        const p1 = await Users.findById(team.members[1]);
        const p2 = await Users.findById(team.members[2]);
        const p3 = await Users.findById(team.members[3]);
        const participant1 = await (p1.name);
        const participant2 = await (p2.name);
        const participant3 = await (p3.name);
    
        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

        if (team.teamLeaderId.toString() !== userId.toString()) {
            return NextResponse.json({ message: "You are not the team leader" }, { status: 403 });
        }

        const { loanAmount, interest, creditScore } = await req.json();
       
        if (loanAmount <= 0) {
            return NextResponse.json({ message: "Invalid loan amount" }, { status: 400 });
        }

        if (interest <= 0) {
            return NextResponse.json({ message: "Invalid interest rate" }, { status: 400 });
        }

        if (team.loanAmount && !(team.loanAmount === null)) {
            return NextResponse.json({ message: "Loan already taken" }, { status: 402 });
        }
       
        team.loanAmount = loanAmount;
        team.interest = interest;
        team.wallet = loanAmount;
        team.creditScore = creditScore;

        await team.save();

        return NextResponse.json({ 
            message: "Loan created successfully", 
            loanAmount, 
            interest, 
            creditScore,
            teamLeader,
            participant1,
            participant2,
            participant3
        }, { status: 200 });

    } catch (e) {
        console.error("Error", e);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}