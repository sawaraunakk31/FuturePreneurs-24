import time from '@/constant/round0/time';
import { connectMongo } from "@/libs/mongodb";
import { Round0 } from "@/models/round0.model";
import { TeamModel } from '@/models/team.model';
import { Event1Test } from "@/models/user.model";
import { getTokenDetails } from "@/utils/getTokenDetails";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(req, res) {

  await connectMongo();
  console.log('inside route')
  const token = await getToken({ req });
  const auth = token
    ? token.accessTokenFromBackend
    : req.headers.get("Authorization").split(" ")[1];
  let userId = await getTokenDetails(auth);

  try{
  
    // const teamId = Event1Test.findOneById({ _id: userId });
  
    const qualTeam = await TeamModel.find({ teamLeaderId: userId });
    console.log('adsffffffdffffffffffffff',qualTeam);
    if (!qualTeam) {
      return NextResponse.json({ message: "team not found" }, { status: 404 });
    }
    const quizStartTime = new Date("October 2, 2024 19:42:00");
    const currentTime = new Date();
    console.log('Current Time:', currentTime);
    console.log('Quiz Start Time:', quizStartTime);
    if (currentTime < quizStartTime) {
      return NextResponse.json({
        message: "Quiz has not started yet",
        canStart: false, // Flag to indicate that the quiz cannot be started yet
      }, { status: 403 });
    } else{
    await Round0.findOneAndUpdate(
      { teamId: qualTeam._id },
      {
        $set: {
          questionCategory: 'easy',
          questionPointer: 0,
        },
      },
      {new:true}
    );
    return NextResponse.json({message:'Round0 started'},{status:200});
  }
}catch(error){
    return NextResponse.json({message:error},{status:500});
  }
}

  // try {

  //   let startTime = new Date(January ${time.quizStartTime.day}, 2024 ${time.quizStartTime.hour}:${time.quizStartTime.minute}:${time.quizStartTime.second});
  //   startTime.toTimeString();
  //   startTime = startTime - 4;
  //   console.log(startTime);
    
  //   // const currentTime = new Date();
  //   const currentTime = startTime;

  //   console.log('curentTime', currentTime, 'startTime', startTime);
  //   console.log('asdf', Math.abs(currentTime - startTime))

  //   if (Math.abs(currentTime - startTime) <= 20 * 60 * 1000) {
  //     console.log('correct')
      // await Round0.findOneAndUpdate(
      //   { teamId: teamId },
      //   {
      //     $set: {
      //       questionCategory: 'easy',
      //       questionPointer: 0,
      //     },
      //   }
      // );
      // return NextResponse.json({message:'Round0 started'},{status:200});
      
  //   } else if (currentTime < startTime) {
  //     return NextResponse.json({
  //       time: currentTime,
  //       message: 'Quiz has not started yet',
  //     },
  //   {status:403});
  //   } else {
  //     return NextResponse.json({
  //       time: currentTime,
  //       message: 'Too late',
  //     },{status:404});
  //   }
  // } catch (error) {
  //   return NextResponse.json({message:error.toString()},{status:500})
  // }
  