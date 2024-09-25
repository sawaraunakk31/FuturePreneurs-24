// pages/api/admin/teamStats.js
import { connectMongo } from '@/libs/mongodb';
import { Users } from '@/models/Users.model';
import { TeamModel } from '@/models/team.model';
import { NextResponse } from 'next/server';

export async function GET() {
  // Ensure that this route is a GET request
  try {
    // Connect to the database
    await connectMongo();

    // Count the total number of users
    const totalUsers = await Users.countDocuments();

    // Use aggregation to count teams based on the number of members
    const teamCounts = await TeamModel.aggregate([
      {
        $project: {
          teamSize: { $size: "$members" }, // Create a field `teamSize` based on the number of members
        },
      },
      {
        $group: {
          _id: "$teamSize", // Group by team size
          count: { $sum: 1 }, // Count the number of teams for each team size
        },
      },
    ]);

    // Create an object to store the counts for each team size
    const teamStats = {
      oneMemberTeams: 0,
      twoMemberTeams: 0,
      threeMemberTeams: 0,
      fourMemberTeams: 0,
    };

    // Iterate through the teamCounts and assign the values to the appropriate team size
    teamCounts.forEach((team) => {
      switch (team._id) {
        case 1:
          teamStats.oneMemberTeams = team.count;
          break;
        case 2:
          teamStats.twoMemberTeams = team.count;
          break;
        case 3:
          teamStats.threeMemberTeams = team.count;
          break;
        case 4:
          teamStats.fourMemberTeams = team.count;
          break;
        default:
          break;
      }
    });

    // Send the response back with the counts
    return NextResponse.json({message:'success',teamStats:teamStats,totalUsers:totalUsers},{status:200})
  } catch (error) {
    console.error(error);
    return NextResponse.json({message:'Internal Server Error'},{status:500})
  }
}
