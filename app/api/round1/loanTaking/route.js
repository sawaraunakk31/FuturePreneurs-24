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
        if (!team) {
            return NextResponse.json({ message: "Team not found" }, { status: 404 });
        }

       
        if (team.teamLeaderId.toString() !== userId.toString()) {
            return NextResponse.json({ message: "You are not the team leader" }, { status: 403 });
        }

       
        const { loanAmount, interest } = await req.json();

       
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

        
        let creditScore;
        if (team.interest === 13) {
            creditScore = 1100;
        } else if (team.interest === 17) {
            creditScore = 1000;
        } else if (team.interest === 21) {
            creditScore = 800;
        } else if (team.interest === 25) {
            creditScore = 600;
        } else {
            console.log("Invalid interest rate for credit score calculation");
        }

        team.creditScore = creditScore;

      
        await team.save();

     
        return NextResponse.json({ 
            message: "Loan created successfully", 
            loanAmount, 
            interest, 
            creditScore 
        }, { status: 200 });

    } catch (e) {
        console.error("Error", e);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}