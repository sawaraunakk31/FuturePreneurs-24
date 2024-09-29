import { connectMongo } from "@/libs/mongodb";
import { TeamModel } from "@/models/team.model";
import { NextResponse } from "next/server";

export async function GET({ req }) {
  try {
    await connectMongo();
    const teams = await TeamModel.find();
    let team;
    for (team of teams) {
      const teamId = team._id;
      const teamName = team.teamName;
      const leaderName = team.leaderName;
      const leaderEmail = team.leaderEmail;
      const newLevel1 = await new Qualifier({
        teamName: teamName,
        teamId: teamId,
        leaderName: leaderName,
        leaderEmail: leaderEmail,
        questionCategory: "instruction",
      });
      await newLevel1.save();
    }
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
