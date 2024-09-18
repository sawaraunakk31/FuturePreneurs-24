import { connectMongo } from "@/libs/mongodb";
import { TeamModel } from "@/models/team.model";
import { TeamToken } from "@/models/teamToken.model";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectMongo();

    const token = await getToken({req})
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization').split(' ')[1]
    let userId = await getTokenDetails(auth);
    const team = await TeamModel.findOne({ teamLeaderId: userId });
    if (!team) {
      return NextResponse.json({ message: "Team Not found" });
    }

    if (!team.teamCode) {
      const teamCode = Math.random().toString(36).substring(2, 10);
      // const teamCode = nanoid(10)
      const newToken = await new TeamToken({
        teamId: team._id,
        token: teamCode,
        createdAt: new Date(),
      }).save();

      await TeamModel.findOneAndUpdate(
        { _id: team._id },
        { $set: { teamCode: teamCode } }
      );

      return NextResponse.json({ teamCode: teamCode, teamName: team.teamName });
    } else {
      const token = await TeamToken.findOne({ teamId: team._id });

      if (!token) {
        return NextResponse.json({ message: "Token not found" });
      }
      const currentTime = new Date();
      const tokenCreationTime = token.createdAt;
      const timeDifference = (currentTime - tokenCreationTime) / (1000 * 60);
      if (timeDifference > 3) {
        const newTeamCode = Math.random().toString(36).substring(2, 10);
        await TeamToken.findOneAndUpdate(
          { teamId: team._id },
          { $set: { token: newTeamCode, createdAt: currentTime } }
        );
        // tt.save();
        await TeamModel.findOneAndUpdate(
          { _id: team._id },
          { $set: { teamCode: newTeamCode } }
        );
        // tm.save();

        return NextResponse.json({
          teamCode: newTeamCode,
          teamName: team.teamName,
        });
      } else {
        return NextResponse.json({
          teamCode: token.token,
          teamName: team.teamName,
        });
      }
    }
  } catch (error) {
    return NextResponse.json({ message: error,}, {status: 500 });
  }
}
