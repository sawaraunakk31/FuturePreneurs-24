import { connectMongo } from '@/libs/mongodb';
import { Users } from '@/models/user.model';
import { TeamModel } from '@/models/team.model';
import { NextResponse } from 'next/server';

export async function POST(req) {
  // Ensure that this route is a GET request
  try {
    // Connect to the database
    await connectMongo();

  }catch(error){
    
  }
}