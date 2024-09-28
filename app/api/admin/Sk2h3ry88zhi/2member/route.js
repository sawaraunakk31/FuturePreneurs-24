import { connectMongo } from '@/libs/mongodb';
import { Users } from '@/models/user.model';
import { TeamModel } from '@/models/team.model';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log("getCount");
  try {
    await connectMongo();

    // Get total user count
    const totalUsers = await Users.countDocuments();

    // Fetch all teams with exactly 2 members
    const twoMemberTeams = await TeamModel.find({ members: { $size: 2 } });

    // Initialize teamStats for two-member teams
    const teamStats = {
      twoMemberTeams: twoMemberTeams.length,
    };

    // Check if the number of two-member teams is odd or even
    const isEven = teamStats.twoMemberTeams % 2 === 0;

    let firstTeamCount;
    if (isEven) {
      firstTeamCount = teamStats.twoMemberTeams / 2;
    } else {
      firstTeamCount = (teamStats.twoMemberTeams - 1) / 2;
    }

    console.log("Total two-member teams:", teamStats.twoMemberTeams);

    // Ensure firstTeamCount does not exceed available teams
    firstTeamCount = Math.min(firstTeamCount, twoMemberTeams.length);

    // Initialize an array to hold the merged teams
    const mergedTeams = [];

    // Merge teams until all are processed
    for (let i = 0; i < firstTeamCount; i++) {
      if (i < twoMemberTeams.length - firstTeamCount) { // Check to ensure there's a leftover team
        const firstTeam = twoMemberTeams[i]; // Current team from the first group
        const leftoverTeam = twoMemberTeams[i + firstTeamCount]; // Get the corresponding leftover team

        // Directly merge members of both teams into firstTeam
        firstTeam.members.push(...leftoverTeam.members); // Merge the members

        // Update the first team with the merged members
        await TeamModel.findByIdAndUpdate(firstTeam._id, {
          $set: { members: firstTeam.members } // Update members list
        });

        // Update teamLeaderId, teamRole, and teamId for leftoverTeam members in Users collection
        const leaderId = firstTeam.teamLeaderId;  // Get the teamLeaderId of the firstTeam
        const firstTeamId = firstTeam._id;        // Get the firstTeam's teamId
        await Users.updateMany(
          { _id: { $in: leftoverTeam.members } },  // Find all members of leftoverTeam
          {
            $set: { 
              teamLeaderId: leaderId,             // Set teamLeaderId to firstTeam's leaderId
              teamRole: 1,                        // Set teamRole to 1 (as member)
              teamId: firstTeamId                 // Set teamId to firstTeam's ID
            }
          }
        );
        console.log(`Updated teamLeaderId, teamRole, and teamId for leftover team members`);

        mergedTeams.push(firstTeam); // Add the merged first team to the array
        console.log(`Merged Team ${i + 1}:`, firstTeam);

        // Now delete the leftover team after updating users
        await TeamModel.deleteOne({ _id: leftoverTeam._id });
        console.log(`Deleted leftover team with ID: ${leftoverTeam._id}`);
      }
    }

    // Return success response with total user count, team stats, and merged teams
    return NextResponse.json(
      { message: 'success', totalUsers: totalUsers, teamStats: teamStats, mergedTeams: mergedTeams },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
