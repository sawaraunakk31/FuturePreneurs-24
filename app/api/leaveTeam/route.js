import mongoose from 'mongoose';
import { connectMongo } from "@/libs/mongodb";
import { Users } from "@/models/user.model";
import { TeamModel } from "@/models/team.model";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method === 'POST') {
    try {
      await connectMongo();
      const { email, teamName } = await req.json();

      // Find the user based on email
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      // Find the team based on the team name
      const team = await TeamModel.findOne({ teamName });
      if (!team) {
        throw new Error("Team not found");
      }

      // Check if the user is in the team
      if (!team.members.includes(user._id)) {
        throw new Error("User is not a member of this team");
      }

      // If the user is the team leader, additional handling is needed
      if (team.teamLeaderId.equals(user._id)) {
        if (team.members.length > 1) {
          // If there are other members, assign a new leader
          const newLeaderId = team.members.find(
            (memberId) => !memberId.equals(user._id)
          );
          team.teamLeaderId = newLeaderId;

          // Update the new leader's details in Users model
          await Users.findByIdAndUpdate(newLeaderId, {
            teamLeaderId: newLeaderId,
          });
        } else {
          // If the team has no other members, delete the team
          await TeamModel.findByIdAndDelete(team._id);
        }
      }

      // Remove the user from the team members array
      await TeamModel.findByIdAndUpdate(team._id, {
        $pull: { members: user._id },
      });

      // Update the user to remove team association
      await Users.findByIdAndUpdate(user._id, {
        $set: { teamId: null, teamLeaderId: null },
      });

      return NextResponse.json({
        message: "Successfully left the team",
        status: 200,
      });
    } catch (err) {
      return NextResponse.json({ message: err.message, status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed", status: 405 });
  }
}
