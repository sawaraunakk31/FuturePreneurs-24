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

    // Fetch all teams with exactly 1 member
    const oneMemberTeams = await TeamModel.find({ members: { $size: 1 } });

    // Initialize teamStats for one-member teams
    const teamStats = {
      oneMemberTeams: oneMemberTeams.length,
    };

    // Check if the number of one-member teams is a multiple of 4
    const isEven = teamStats.oneMemberTeams % 4 === 0;

    let firstTeamCount;
    if (isEven) {
      firstTeamCount = teamStats.oneMemberTeams / 4;
    } else {
      firstTeamCount = Math.floor(teamStats.oneMemberTeams / 4);
    }

    console.log("Total one-member teams:", teamStats.oneMemberTeams);

    // Ensure firstTeamCount does not exceed available teams
    firstTeamCount = Math.min(firstTeamCount, oneMemberTeams.length);

    // Initialize an array to hold the merged teams
    const mergedTeams = [];

    // Merge teams in batches of four until all are processed
    for (let i = 0; i < firstTeamCount * 4; i += 4) {
      // Get the current set of four one-member teams
      const teamGroup = oneMemberTeams.slice(i, i + 4);

      // Select the first team as the "base" team
      const firstTeam = teamGroup[0];

      // Merge members from other teams in the group into the first team
      for (let j = 1; j < teamGroup.length; j++) {
        const leftoverTeam = teamGroup[j];
        
        // Add leftover team members to the first team
        firstTeam.members.push(...leftoverTeam.members);

        // Update the first team with the merged members
        await TeamModel.findByIdAndUpdate(firstTeam._id, {
          $set: { members: firstTeam.members } // Update the member list
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

        // Add the first team with the merged members to the array
        mergedTeams.push(firstTeam);

        // Optionally delete the leftover team if needed
        await TeamModel.deleteOne({ _id: leftoverTeam._id });
        console.log(`Deleted leftover team with ID: ${leftoverTeam._id}`);
      }
      console.log(`Merged teams ${i / 4 + 1}:`, firstTeam);
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
