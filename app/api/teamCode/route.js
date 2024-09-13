import connectMongo from '@/libs/mongodb';
import { Users } from '@/models/user.model';
import { TeamModel } from '@/models/team.model';

// Function to generate a unique team code
async function generateUniqueTeamCode() {
    let teamCode;
    let isUnique = false;

    // Keep generating new codes until we find a unique one
    while (!isUnique) {
        teamCode = Math.random().toString(36).substring(2, 10);
        const existingTeam = await TeamModel.findOne({ teamCode });
        if (!existingTeam) {
            isUnique = true;
        }
    }

    return teamCode;
}

// Function to update team codes every 20 minutes
async function updateTeamCodes() {
    await connectMongo();  // Ensure connection to MongoDB

    const now = new Date();

    try {
        // Find all teams where the code has expired
        const teams = await TeamModel.find({ codeExpiry: { $lt: now } });

        for (const team of teams) {
            // Generate a new unique team code
            const newTeamCode = await generateUniqueTeamCode();

            // Set a new expiry time (60 seconds from now)
            const newExpiry = new Date(now.getTime() + 20 * 60 * 1000); // 60 seconds

            // Update the team code and expiry time in the database
            team.teamCode = newTeamCode;
            team.codeExpiry = newExpiry;

            // Try saving the updated team data back to the database
            try {
                await team.save();  // This ensures the changes are saved in MongoDB
                console.log('Updated team:', team);
            } catch (saveError) {
                console.error('Error saving team:', saveError.message);
            }
        }

        console.log('Team codes updated at:', now);
    } catch (error) {
        console.error('Error updating team codes:', error.message);
    }
}



updateTeamCodes();
// Set an interval to run the update function every 20 minutes (1200000 milliseconds)
setInterval(updateTeamCodes, 1200000);

// Route to handle team creation
export async function POST(request) {
    // Connect to MongoDB
    await connectMongo();

    try {
        // Parse the JSON data from the request
        const { name, regNo, email, mobNo, teamName, leaderName, leaderEmail } = await request.json();

        // Generate a unique 8-digit alphanumeric team code
        const teamCode = await generateUniqueTeamCode();

        // Set the expiry time to 20 minutes from now
        const codeExpiry = new Date(Date.now() + 20 * 60 * 1000);  // 20 minutes from now

        // Create a new user
        const newUser = new Users({
            name,
            regNo,
            email,
            mobNo,
            hasFilledDetails: true,
            consent: true,
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Create a new team with the user as team leader
        const newTeam = new TeamModel({
            teamName,
            teamLeaderId: savedUser._id,  // Linking the user as team leader
            teamNumber: Math.floor(Math.random() * 100),  // Random team number for example
            leaderName,
            leaderEmail,
            isQualified: false,
            members: [savedUser._id],  // Adding the user as the first member
            teamCode,
            codeExpiry,  // Set the initial expiry time
        });

        // Save the team to the database
        const savedTeam = await newTeam.save();

        // Return the team and user data along with the team code
        return new Response(JSON.stringify({
            message: 'Team and User created successfully',
            team: savedTeam,
            user: savedUser
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error saving data', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
