import mongoose from 'mongoose';
import { connectMongo } from "@/libs/mongodb";
import { Users } from "@/models/user.model";
import { TeamModel } from "@/models/team.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongo();

        const leaderEmail = 'aryanshar17@gmail.com';//get user email

        const leaderUser = await Users.findOne({ email: leaderEmail });
        if (!leaderUser || !leaderUser.email) {
            return NextResponse.json({ message: "Leader not found" }, { status: 404 });
        }

        const team = await TeamModel.findOne({ leaderEmail });
        if (!team) {
            return NextResponse.json({ message: "Team not found for this leader" }, { status: 404 });
        }

        const oldLeaderId = team.teamLeaderId;

        const { newLeaderId } = await req.json();

        let newLeaderIdToUse = newLeaderId;
        let newLeader;

        if (newLeaderIdToUse && mongoose.Types.ObjectId.isValid(newLeaderIdToUse)) {
            newLeader = await Users.findById(newLeaderIdToUse);
            if (!newLeader) {
                return NextResponse.json({ message: "New leader not found" }, { status: 404 });
            }
        } else {
            if (team.members.length > 1) {
                newLeaderIdToUse = team.members[1];
                newLeader = await Users.findById(newLeaderIdToUse);
            } else {
                return NextResponse.json({ message: "No valid member to assign as a leader" }, { status: 400 });
            }
        }

        const updatedMembers = team.members
            .filter(member => !member.equals(oldLeaderId)) 
            .map(member => member.toString()); 

        updatedMembers.unshift(newLeader._id.toString()); 

        await TeamModel.findByIdAndUpdate(
            team._id,
            {
                $set: {
                    teamLeaderId: newLeader._id,
                    leaderName: newLeader.name,
                    leaderEmail: newLeader.email,
                    members: updatedMembers, 
                },
            },
            { new: true }
        );

        await Users.findByIdAndUpdate(
            oldLeaderId,
            { $set: { teamId: null, teamLeaderId: null } }
        );

        await Users.updateMany(
            { _id: { $in: updatedMembers } },
            { $set: { teamLeaderId: newLeader._id, teamId: team._id } }
        );

        return NextResponse.json({
            message: "Leader changed successfully",
            status: 200,
        });
    } catch (err) {
        console.error("Error in leaderLeave:", err);
        return NextResponse.json({ message: err.message }, { status: 500 });
    }
}
