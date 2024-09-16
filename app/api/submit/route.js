import { connectMongo } from '@/libs/mongodb';
import { z } from 'zod';
import { Users } from '@/models/user.model';
import { getTokenDetails } from '@/utils/getTokenDetails';
import { getToken } from 'next-auth/jwt';

// Define validation schema using Zod
const userSchema = z.object({
  regNo: z.string().regex(/^\d{2}[A-Za-z]{3}\d{4}$/, 'Invalid registration number format'), // Updated regex
  number: z.string().regex(/^\d{10}$/, 'Invalid phone number format'), // Ensure 10 digits for phone number
});

export async function POST(req) {
  console.log("Connected to the server");  // Debug log

  try {
    await connectMongo();
    console.log("MongoDB connected");  // Debug log

    // Extract token from the request
    const token = await getToken({ req });
    const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization')?.split(' ')[1];
    if (!auth) {
      return new Response(JSON.stringify({ error: 'Authorization token missing' }), { status: 401 });
    }

    const userId = await getTokenDetails(auth);
    console.log("User ID fetched:", userId);  // Debug log

    // Parse the incoming request data
    const parsedData = await req.json();
    console.log("Parsed data:", parsedData);  // Debug log

    // Validate parsed data
    userSchema.parse(parsedData);
    const { regNo, number } = parsedData;  // Destructure the parsed data properly
    console.log("Validated regNo and number:", regNo, number);  // Debug log

    // Update user information
    const updateResult = await Users.findByIdAndUpdate(userId, {
      $set: { regNo: regNo, mobNo: Number(number), hasFilledDetails: true },
    });

    console.log("User updated:", updateResult);  // Debug log

    return new Response(JSON.stringify({ message: 'Form submitted successfully' }), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);  // Debug log for validation errors
      return new Response(JSON.stringify({ error: error.errors }), { status: 400 });
    } else {
      console.error("Internal server error:", error);  // General error log
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  }
}
