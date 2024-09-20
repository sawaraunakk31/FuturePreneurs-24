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
    const auth = token
      ? token.accessTokenFromBackend
      : req.headers.get("Authorization").split(" ")[1];

    if (!auth) {
      return NextResponse.json(
        { message: "Authorization token missing" },
        { status: 401 }
      );
    }
    let userId = await getTokenDetails(auth);

    // const leaderEmail = "john.doehehehe@example.com"; // Hardcoded for now, can be replaced later

    const leaderUser = await Users.findById(userId);
    if (!leaderUser || !leaderUser.email) {
      return NextResponse.json(
        { message: "Leader not found" },
        { status: 404 }
      );
    }

    const team = await TeamModel.findById({ _id:leaderUser.teamId });
    if (!team) {
      return NextResponse.json(
        { message: "Team not found for this leader" },
        { status: 404 }
      );
    }

    const oldLeaderId = team.teamLeaderId;
    const oldLeader = await TeamModel.findById(oldLeaderId);

    const { index } = await req.json();

    if(!index){
        return NextResponse.json({message:"Select a leader"},{status:400});
    }
    let num = index;
    let newLeaderId;
    let newLeader;

    if (team.members.length > 1) {
        newLeaderId = team.members[num];
        newLeader = await Users.findById(newLeaderId);
      } else {
        return NextResponse.json(
          { message: "No valid member to assign as a leader" },
          { status: 400 }
        );
      }

    // const newLeaderId = team.members[num];

    // const newLeader = await TeamModel.findById(newLeaderId);

    if(!newLeader){
        return NextResponse.json({message:"Leader not found"},{status:404});
    }

    // await Users.findOneAndUpdate(
    //     { _id: newLeaderId },
    //     { $set: { teamLeaderId:newLeaderId , teamRole:0 } },
    //     { new: true }
    // );

    // await Users.findOneAndUpdate(
    //     { _id: oldLeaderId },
    //     { $set: { teamId:null, teamLeaderId:null , teamRole:null } },
    //     { new: true }
    // );

    // await TeamModel.findOneAndUpdate(
    //     { _id: team._id },
    //     { $set: { teamLeaderId:newLeaderId , leaderName: newLeader.name , leaderEmail: newLeader.email } },
    //     { new: true }
    // );
    
      

    const updatedMembers = team.members
      .filter(
        (member) => !member.equals(oldLeaderId) && !member.equals(newLeader._id)
      )
      .map((member) => member.toString());

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

    await Users.findByIdAndUpdate(oldLeaderId, {
      $set: { teamId: null, teamLeaderId: null , teamRole:null},
    });

    await Users.findByIdAndUpdate(newLeaderId,{
        $set: { teamRole:0 }
    })

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
