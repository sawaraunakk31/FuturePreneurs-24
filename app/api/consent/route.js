import mongoose from 'mongoose';
import { connectMongo } from "@/libs/mongodb";
import { Users } from "@/models/user.model";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { getTokenDetails } from "@/utils/getTokenDetails";

export async function POST(req) {
  if (req.method === 'POST') {
    try {

      await connectMongo();
      
      const token = await getToken({ req });
      const auth = token ? token.accessTokenFromBackend : req.headers.get('Authorization')?.split(' ')[1];
      
      if (!auth) {
        return NextResponse.json({ message: "Authorization token missing" }, { status: 401 });
      }
      
      const userId = await getTokenDetails(auth);
      const user = await Users.findById(userId);
      
      const { consent } = await req.json();

      // Check if user exists
      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }

      user.consent = consent;
      await user.save();
      
      console.log(user);

      return NextResponse.json({ message: "Successfully changed the consent", status: 200,});

    } catch (err) {
      return NextResponse.json({ message: err.message, status: 500 });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed", status: 405 });
  }
}