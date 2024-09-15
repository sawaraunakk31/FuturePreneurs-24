import { MongoClient } from 'mongodb';
import { z } from 'zod';

// Define validation schema using Zod
const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, 'Name is required').trim(), // Ensure name is not empty and trim leading/trailing spaces
  regNo: z.string().regex(/^\d{2}[A-Za-z]{3}\d{4}$/, 'Invalid registration number format'), // Updated regex
  number: z.string().regex(/^\d{10}$/, 'Invalid phone number format'), // Ensure 10 digits for phone number
});

const uri = 'mongodb+srv://vyaskaran1409:rwkCoQ1a4RehJzcZ@cluster0.iucnw8o.mongodb.net/'; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export async function POST(req) {
  console.log("Connected");
  try {
    const parsedData = await req.json();
    userSchema.parse(parsedData);
    
    await client.connect();
    const db = client.db('test');
    const collection = db.collection('users');
    await collection.insertOne(parsedData);

    return new Response(JSON.stringify({ message: 'Form submitted successfully' }), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.errors }), { status: 400 });
    } else {
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
  } finally {
    await client.close();
  }
}
