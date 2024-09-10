// app/api/teamCode/route.js

export async function GET(request) {
    // Generate an 8-digit alphanumeric code
    const teamCode = Math.random().toString(36).substring(2, 10).toUpperCase(); // Generates a random 8-character code
    
    return new Response(JSON.stringify({ code: teamCode }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
