import { connectMongo } from '@/libs/mongodb';
import { Users } from '@/models/user.model';
import { TeamModel } from '@/models/team.model';
import { NextResponse } from 'next/server';

// Function to generate a random 5-6 letter team name
const generateTeamName = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let TeamName = '';
    const nameLength = 5;
    for (let i = 0; i < nameLength; i++) {
        TeamName += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return TeamName;
};

export async function GET() {
    console.log("Processing consent-based users into teams");
    try {
        // Connect to the MongoDB database
        await connectMongo();

        // Step 1: Find users with consent: true and no teamId
        const unassignedUsers = await Users.find({ 
            consent: true,
            $or: [
                { teamId: { $exists: false } },
                { teamId: null }
            ] 
        });
        const unassignedCount = unassignedUsers.length;
        console.log("Total unassigned users:", unassignedCount);

        if (unassignedCount === 0) {
            return NextResponse.json({ message: 'No users found to assign teams' }, { status: 200 });
        }

        let teamIndex = 0;
        const createdTeams = [];

        // Step 2: Process users in groups of 4
        for (let i = 0; i < unassignedCount; i += 4) {
            // Create a new team with a random 5-6 letter name
            const TeamName = generateTeamName();
            const teamMembers = unassignedUsers.slice(i, i + 4); // Slice users into groups of 4
            const teamLeader = teamMembers[0]; // The first user in the group becomes the team leader

            // Step 3: Create the team in TeamModel
            const newTeam = await TeamModel.create({
                teamName: TeamName,
                members: teamMembers.map(member => member._id), // Save members' IDs
                teamLeaderId: teamLeader._id, // Assign the leader's ID
                leaderName: teamLeader.name, // Assign the leader's name
                leaderEmail: teamLeader.email // Assign the leader's email
            });

            // Step 4: Update the users with their new team info
            await Users.updateMany(
                { _id: { $in: teamMembers.map(member => member._id) } }, // Update all members in this team
                {
                    $set: {
                        teamId: newTeam._id,         // Assign the newly created team ID
                        teamLeaderId: teamLeader._id, // Assign the leader's ID for all members
                        teamRole: 1                  // Assign the role of team member (1)
                    }
                }
            );

            // Update the team leader's role to 0
            await Users.updateOne(
                { _id: teamLeader._id },
                {
                    $set: {
                        teamRole: 0 // Assign the role of team leader (0)
                    }
                }
            );

            console.log(`Created team ${teamIndex + 1} with name ${TeamName} and members:`, teamMembers.map(m => m._id));
            createdTeams.push(newTeam); // Store the created team

            teamIndex++;
        }

        // Step 5: Handle leftover users if the number of users is not a multiple of 4
        const remainingMembers = unassignedCount % 4;
        if (remainingMembers > 0) {
            const leftoverMembers = unassignedUsers.slice(-remainingMembers); // Get remaining users
            const leftoverLeader = leftoverMembers[0]; // Assign the first leftover member as leader

            // Step 6: Create a new team for leftover members
            const leftoverTeamName = generateTeamName();
            const leftoverTeam = await TeamModel.create({
                teamName: leftoverTeamName,
                members: leftoverMembers.map(member => member._id),
                teamLeaderId: leftoverLeader._id
            });

            // Step 7: Update the leftover users with their new team info
            await Users.updateMany(
                { _id: { $in: leftoverMembers.map(member => member._id) } },
                {
                    $set: {
                        teamId: leftoverTeam._id,
                        teamLeaderId: leftoverLeader._id,
                        teamRole: 1 // Assign the role of team member (1) by default
                    }
                }
            );

            // Set the first leftover member as the team leader
            await Users.updateOne(
                { _id: leftoverLeader._id },
                {
                    $set: {
                        teamRole: 0 // Set as team leader (0)
                    }
                }
            );

            console.log(`Created leftover team with name ${leftoverTeamName} and members:`, leftoverMembers.map(m => m._id));
            createdTeams.push(leftoverTeam); // Store the created leftover team
        }

        // Step 8: Respond with a success message and team details
        return NextResponse.json(
            { message: 'success', totalUnassigned: unassignedCount, teamsCreated: teamIndex + (remainingMembers > 0 ? 1 : 0), createdTeams },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error while processing teams:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
