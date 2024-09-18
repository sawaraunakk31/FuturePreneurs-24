import mongoose from 'mongoose';
import { connectMongo } from "@/libs/mongodb";
import { Users } from "@/models/user.model";
import { TeamModel } from "@/models/team.model";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/getTokenDetails";

export async function POST(req) {
  if (req.method === 'POST') {
    try {

      await connectMongo();
      
      const token = await getToken({ req });
      const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization')?.split(' ')[1];
      
      if (!auth) {
        return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
      }

      const userId = await getTokenDetails(auth);
      const user = await Users.findById(userId);
      
      // Check if user exists
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      const teamId = user.teamId;
      const team = await TeamModel.findById(teamId);

      // Check if team exists
      if (!team) {
        return NextResponse.json({ message: "Team not found" }, { status: 404 });
      }

      // Check if the user is in the team
      if (!team.members.includes(user._id)) {
        throw new Error("User is not a member of this team");
      } else if (user.teamRole==0) {
        throw new Error("User is the leader of this team, delete the team");
      }

      // // If the user is the team leader, additional handling is needed
      // if (team.teamLeaderId.equals(user._id)) {
      //   if (team.members.length > 1) {
      //     // If there are other members, assign a new leader
      //     const newLeaderId = team.members.find(
      //       (memberId) => !memberId.equals(user._id)
      //     );
      //     team.teamLeaderId = newLeaderId;

      //     // Update the new leader's details in Users model
      //     await Users.findByIdAndUpdate(newLeaderId, {
      //       teamLeaderId: newLeaderId,
      //     });
      //   } else {
      //     // If the team has no other members, delete the team
      //     await TeamModel.findByIdAndDelete(team._id);
      //   }
      // }

      // Remove member from team and save
      const members = team.members;
      const newMembers = members.filter(item => item !== userId);
      team.members = newMembers;
      await team.save();

      //  Update user to remove team association
      user.teamLeaderId = null;
      user.teamId = null;
      user.teamRole = null;
      await user.save();

      return NextResponse.json({ message: "Successfully left the team", status: 200,});

    } catch (err) {
      return NextResponse.json({ message: err.message, status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed", status: 405 });
  }
}