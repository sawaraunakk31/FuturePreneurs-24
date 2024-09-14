
export async function GET(request) {
    const teamCode = Math.random().toString(36).substring(2, 10); 
    
    return new Response(JSON.stringify({ code: teamCode }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
