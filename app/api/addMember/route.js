import { connectMongo } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import { Users } from "@/models/user.model";
import { TeamModel } from "@/models/team.model";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/getTokenDetails";


export async function POST(req) {
  if (req.method === "POST") {
    try {
      await connectMongo();

      const token = await getToken({ req });
      const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization')?.split(' ')[1];

      if (!auth) {
          return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
      }

      const userId = await getTokenDetails(auth);

      const { teamName } = await req.json();
      const user = await Users.findOne({ _id:userId });

      //check if the user exists
      if (user) {
        const team = await TeamModel.findOne({ teamName: teamName });
        //check if the team exists
        if (team) {
          //check if the team has less than 4 members
          if (team.members.length < 4) {
            //check if the user has team ID
            if (user.teamId == null) {
              //adding user to the team
              const updatedTeam = await TeamModel.findOneAndUpdate(
                { teamName },
                { $push: { members: user._id } },
                { new: true }
              );
              const updatedUser = await Users.findOneAndUpdate(
                { email },
                {
                  $set: {
                    teamId: updatedTeam._id,
                    teamLeaderId: updatedTeam.teamLeaderId,
                  },
                },
                { new: true }
              );
              if (updatedTeam && updatedUser) {
                return NextResponse.json({
                  message: "Successfully added to the team",
                  status: 200,
                });
              } else {
                throw new Error("Internal Server Error");
              }
            } else {
              throw new Error("You are already in a team");
            }
          } else {
            throw new Error("Team is already full");
          }
        } else {
          throw new Error("Team does not exist");
        }
      } else {
        throw new Error("User does not exist");
      }
    } catch (err) {
      return NextResponse.json({ message: err.message, status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed", status: 405 });
  }
}
